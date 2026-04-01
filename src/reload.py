"""
This script sets up a livereload server to automatically rebuild and reload parts of the website
when certain files change. It watches for changes in portfolio data, templates, and markdown files,
and triggers rebuilds or browser reloads as appropriate.

Usage:
    uv run src/reload.py

The server will watch for changes and serve the site with live reloading enabled.
"""

from livereload import Server

# Initialize the livereload server
server = Server()

# Watch the JSON file and rebuild the portfolio when it changes
server.watch("portfolio/index.json", "python src/render_portfolio.py")

# Watch the output HTML file and reload the browser when it changes
server.watch("portfolio/index.html")

# Watch template files and rebuild the portfolio when they change
server.watch("templates/card-img.html", "python src/render_portfolio.py")
server.watch("templates/portfolio.html", "python src/render_portfolio.py")

# Watch markdown, essay metadata, and essay template; rebuild README pages
server.watch("**/*.md", "uv run python src/render_readmes.py")
server.watch("essays/**/essay.json", "uv run python src/render_readmes.py")
server.watch("templates/essay_page.html.j2", "uv run python src/render_readmes.py")

# Serve the project root directory with live reload enabled
server.serve(root=".", open_url_delay=1)
