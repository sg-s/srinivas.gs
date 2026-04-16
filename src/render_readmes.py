"""
This script finds all README.md files in this repository and converts them into HTML.

Essays under essays/<slug>/ use essay.json plus templates/essay_page.html.j2: Markdown is
rendered to HTML, the site banner is injected at build time, and the page is wrapped in a
shared layout.

All other README.md locations keep the previous behavior: body.html from Markdown, then
header.html + body.html + footer.html concatenated into index.html (temporary body.html is
removed afterward).
"""

import codecs
import json
import os
from pathlib import Path

import markdown
from jinja2 import Environment, FileSystemLoader

from render_portfolio import render_homepage_portfolio_preview_html

BANNER_MARKDOWN = "[![](../../assets/banner.png)](http://srinivas.gs/)"
ESSAY_TEMPLATE = "essay_page.html.j2"


def _repo_root() -> Path:
    """Return the repository root (parent of ``src``)."""
    return Path(__file__).resolve().parent.parent


def _markdown_to_html(text: str) -> str:
    """Convert Markdown to HTML with the same extensions and table tweak as legacy builds."""
    html = markdown.markdown(text, extensions=["markdown.extensions.extra"])
    return html.replace(
        "<table>",
        '<table id="example" class="display" cellspacing="0" width="80%">',
    )


def _is_essay_readme(readme_path: Path, repo_root: Path) -> bool:
    """Return True if ``readme_path`` is ``essays/<slug>/README.md``."""
    try:
        rel = readme_path.resolve().relative_to(repo_root.resolve())
    except ValueError:
        return False
    return (
        len(rel.parts) == 3 and rel.parts[0] == "essays" and rel.parts[2] == "README.md"
    )


def _render_essay_readme(readme_path: Path, repo_root: Path) -> None:
    """Build index.html for an essay from README.md, essay.json, and the shared template."""
    essay_dir = readme_path.parent
    meta_path = essay_dir / "essay.json"
    if not meta_path.is_file():
        msg = (
            f"Essay folder {essay_dir} must contain essay.json "
            f"(required for essays/*/README.md)."
        )
        raise FileNotFoundError(msg)

    meta = json.loads(meta_path.read_text(encoding="utf-8"))
    page_title = meta["page_title"]
    stylesheet = meta["stylesheet"]
    footer_date = meta["footer_date"]
    footer_place = meta["footer_place"]

    readme_text = readme_path.read_text(encoding="utf-8")
    body_html = _markdown_to_html(readme_text)
    banner_html = _markdown_to_html(BANNER_MARKDOWN)

    templates_dir = repo_root / "templates"
    env = Environment(
        loader=FileSystemLoader(str(templates_dir)),
        autoescape=False,
    )
    template = env.get_template(ESSAY_TEMPLATE)
    page_html = template.render(
        page_title=page_title,
        stylesheet=stylesheet,
        footer_date=footer_date,
        footer_place=footer_place,
        banner_html=banner_html,
        body_html=body_html,
    )
    (essay_dir / "index.html").write_text(page_html, encoding="utf-8")


def _inject_portfolio_preview_into_html(
    html: str, readme_path: Path, repo_root: Path
) -> str:
    """Expand ``<!--PORTFOLIO_PREVIEW-->`` in built HTML for the repository root README."""
    marker = "<!--PORTFOLIO_PREVIEW-->"
    if marker not in html:
        return html
    try:
        rel = readme_path.resolve().relative_to(repo_root.resolve())
    except ValueError:
        return html
    if rel.parts != ("README.md",):
        return html

    snippet = render_homepage_portfolio_preview_html(repo_root)
    return html.replace(marker, snippet, 1)


def _render_legacy_readme(path: str, repo_root: Path) -> None:
    """Original header + body + footer concatenation for non-essay README.md paths."""
    path_root = path.replace("README.md", "")

    input_file = codecs.open(path, mode="r", encoding="utf-8")
    text = input_file.read()
    html = _markdown_to_html(text)
    html = _inject_portfolio_preview_into_html(html, Path(path), repo_root)

    body_path = path.replace("README.md", "body.html")
    output_file = codecs.open(body_path, "w", encoding="utf-8")
    output_file.write(html)
    output_file.close()

    filenames = ["header.html", "body.html", "footer.html"]
    filenames = [path_root + filename for filename in filenames]

    with open(path_root + "index.html", "w") as outfile:
        for fname in filenames:
            with open(fname) as infile:
                outfile.write(infile.read())

    os.remove(path_root + "body.html")


if __name__ == "__main__":
    repo_root = _repo_root()
    all_paths: list[str] = []

    for root, _, files in os.walk("./"):
        for file in files:
            if file.endswith("README.md"):
                all_paths.append(os.path.join(root, file))

    for path in all_paths:
        print(path, end=" ")
        readme_path = Path(path)
        if _is_essay_readme(readme_path, repo_root):
            _render_essay_readme(readme_path, repo_root)
        else:
            _render_legacy_readme(path, repo_root)
        print("✅ ")
