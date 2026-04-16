"""
This script reads a JSON file describing portfolio items and renders Bootstrap card HTML for each item using Jinja2 templates.
If output_path is given, writes the HTML to that file (just the cards),
else writes the full HTML page to index.html in the same directory as json_path.
"""

import copy
import json
import os
from jinja2 import Environment, FileSystemLoader


def _portfolio_template_env():
    template_dir = os.path.join(os.path.dirname(__file__), "..", "templates")
    return Environment(loader=FileSystemLoader(template_dir))


def _start_year_sort_key(item):
    try:
        return int(item.get("start_year", 9999))
    except Exception:
        return 9999


def sort_portfolio_items(items):
    """Same ordering as the portfolio page: newest ``start_year`` first."""
    return sorted(items, key=_start_year_sort_key, reverse=True)


def rewrite_item_paths_for_site_root(item):
    """Rewrite ``./assets/...`` and ``../...`` paths for the repository root ``index.html``."""
    out = copy.deepcopy(item)
    img = out.get("img")
    if isinstance(img, str) and img.startswith("./"):
        out["img"] = "portfolio/" + img[2:]
    link = out.get("link")
    if isinstance(link, str) and link.startswith("../") and not link.startswith("http"):
        out["link"] = link[3:]
    links = out.get("links")
    if isinstance(links, list):
        new_links = []
        for lk in links:
            if not isinstance(lk, dict):
                new_links.append(lk)
                continue
            lk = copy.deepcopy(lk)
            v = lk.get("value", "")
            if isinstance(v, str) and v.startswith("../") and not v.startswith("http"):
                lk["value"] = v[3:]
            new_links.append(lk)
        out["links"] = new_links
    return out


def prepare_item_for_card(item):
    """Add ``list_group`` and ``footer_text`` for ``templates/card-img.html`` (mutates ``item``)."""
    if "links" in item and isinstance(item["links"], list):
        item["list_group"] = [
            f'<a href="{link["value"]}" target="_blank" rel="noopener noreferrer">{link["key"]}</a>'
            for link in item["links"]
        ]
    start_year = item.get("start_year", "")
    end_year = item.get("end_year", "")
    if start_year and end_year:
        item["footer_text"] = f"{start_year}-{end_year}"
    else:
        item["footer_text"] = f"{start_year}"
    return item


def render_homepage_portfolio_preview_html(repo_root, limit=4):
    """
    Portfolio card grid for the site homepage from ``portfolio/index.json``.

    Uses ``templates/card-img-home.html`` and ``css/portfolio-preview.css`` only — no Bootstrap,
    so global typography and the header circuit layout are not affected.
    """
    json_path = os.path.join(str(repo_root), "portfolio", "index.json")
    if not os.path.isfile(json_path):
        return "<!-- portfolio preview skipped: missing portfolio/index.json -->"

    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    items = sort_portfolio_items(data.get("items", []))
    preview_sources = []
    for it in items:
        if not it.get("img"):
            continue
        preview_sources.append(it)
        if len(preview_sources) >= limit:
            break

    if not preview_sources:
        return "<!-- portfolio preview: no items with header images -->"

    env = _portfolio_template_env()
    card_template = env.get_template("card-img-home.html")

    cols_html = []
    for raw in preview_sources:
        card_item = rewrite_item_paths_for_site_root(raw)
        prepare_item_for_card(card_item)
        cols_html.append(card_template.render(**card_item))

    preview_css = (
        '<link rel="stylesheet" href="./css/portfolio-preview.css" type="text/css">'
    )
    row = "".join(cols_html)
    return (
        f'<div class="portfolio-preview">{preview_css}'
        '<div class="portfolio-preview-grid">'
        f"{row}</div></div>"
    )


def render_portfolio_cards(json_path="portfolio/index.json"):
    """
    Reads a JSON file describing portfolio items and renders Bootstrap card HTML for each item using Jinja2 templates.
    If output_path is given, writes the HTML to that file (just the cards),
    else writes the full HTML page to index.html in the same directory as json_path.
    """
    env = _portfolio_template_env()

    with open(json_path, "r") as f:
        data = json.load(f)

    items = sort_portfolio_items(data.get("items", []))
    card_template_name = data.get("template") + ".html"
    card_template = env.get_template(card_template_name)

    cards_html = []
    for item in items:
        card_item = copy.deepcopy(item)
        prepare_item_for_card(card_item)
        card_html = card_template.render(**card_item)
        cards_html.append(card_html)

    # Render the full page using the portfolio.html template
    page_template = env.get_template("portfolio.html")
    # Pass the cards as 'items' to match the template

    page_html = page_template.render(
        title=data.get("title", "Portfolio"),
        lead_paragraph=data.get("lead_paragraph", ""),
        cards=cards_html,
    )
    dir_path = os.path.dirname(json_path)
    index_html_path = os.path.join(dir_path, "index.html")
    with open(index_html_path, "w") as f:
        f.write(page_html)

    print(f"Rendered {len(items)} cards")


if __name__ == "__main__":
    render_portfolio_cards()
