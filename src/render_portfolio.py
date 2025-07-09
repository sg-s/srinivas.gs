import json
import os
from jinja2 import Environment, FileSystemLoader


def render_portfolio_cards(json_path="portfolio/index.json"):
    """
    Reads a JSON file describing portfolio items and renders Bootstrap card HTML for each item using Jinja2 templates.
    If output_path is given, writes the HTML to that file (just the cards),
    else writes the full HTML page to index.html in the same directory as json_path.
    """
    # Set up Jinja2 environment
    template_dir = os.path.join(os.path.dirname(__file__), "..", "templates")
    env = Environment(loader=FileSystemLoader(template_dir))

    with open(json_path, "r") as f:
        data = json.load(f)

    items = data.get("items", [])

    # Sort items by start_year (ascending)
    def get_start_year(item):
        """get the start year of an item"""

        try:
            return int(item.get("start_year", 9999))
        except Exception:
            return 9999

    items = sorted(items, key=get_start_year, reverse=True)
    card_template_name = data.get("template") + ".html"
    card_template = env.get_template(card_template_name)

    cards_html = []
    for item in items:
        # If 'links' field exists, convert to list_group of HTML links
        if "links" in item and isinstance(item["links"], list):
            item["list_group"] = [
                f'<a href="{link["value"]}" target="_blank" rel="noopener noreferrer">{link["key"]}</a>'
                for link in item["links"]
            ]

        start_year = item.get("start_year", "")
        end_year = item.get("end_year", "")
        if start_year and end_year:
            footer_text = f"{start_year}-{end_year}"
        else:
            footer_text = f"{start_year}"
        item["footer_text"] = footer_text

        card_html = card_template.render(**item)
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
