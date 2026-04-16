"""
Livereload dev server: rebuilds the site when sources change and reloads the browser.

Root ``index.html`` comes from ``src/render_readmes.py`` (README + header + footer).
The portfolio page comes from ``src/render_portfolio.py``. ``make serve`` runs this
script, which performs a **full build once on startup** so ``index.html`` is never stale.

Usage:
    uv run python src/reload.py
"""

from __future__ import annotations

import subprocess
from pathlib import Path

from livereload import Server

REPO_ROOT = Path(__file__).resolve().parent.parent

_CMD_READMES = "uv run python src/render_readmes.py"


def _run(*args: str) -> None:
    subprocess.run(
        ["uv", "run", "python", *args],
        cwd=REPO_ROOT,
        check=True,
    )


def rebuild_portfolio() -> None:
    _run("src/render_portfolio.py")


def rebuild_readmes() -> None:
    _run("src/render_readmes.py")


def rebuild_all() -> None:
    """Portfolio first (writes ``portfolio/index.html``), then all README-derived pages."""
    rebuild_portfolio()
    rebuild_readmes()


def rebuild_from_portfolio_data() -> None:
    """Homepage preview is embedded from ``portfolio/index.json``; refresh both steps."""
    rebuild_all()


if __name__ == "__main__":
    rebuild_all()

    server = Server()

    # Portfolio JSON: homepage cards + portfolio page
    server.watch("portfolio/index.json", rebuild_from_portfolio_data)

    # Portfolio HTML output (reload after render_portfolio)
    server.watch("portfolio/index.html")

    # Card templates
    server.watch("templates/card-img.html", rebuild_portfolio)
    server.watch("templates/portfolio.html", rebuild_portfolio)
    server.watch("templates/card-img-home.html", rebuild_readmes)

    # Site shell for legacy README pages (including root index.html)
    server.watch("header.html", rebuild_readmes)
    server.watch("footer.html", rebuild_readmes)

    # Markdown and essays
    server.watch("**/*.md", _CMD_READMES)
    server.watch("essays/**/essay.json", _CMD_READMES)
    server.watch("templates/essay_page.html.j2", _CMD_READMES)

    # Root page output and homepage-only CSS (reload browser when they change)
    server.watch("index.html")
    server.watch("css/portfolio-preview.css")

    # Rebuild README pages when the readme renderer or portfolio helpers change
    server.watch("src/render_readmes.py", rebuild_readmes)
    server.watch("src/render_portfolio.py", rebuild_from_portfolio_data)

    server.serve(root=".", open_url_delay=1)
