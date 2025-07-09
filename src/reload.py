from livereload import Server

# Watch the JSON file and rebuild the portfolio when it changes
server = Server()
server.watch("portfolio/index.json", "python src/render_portfolio.py")

# Watch the output HTML file and reload the browser when it changes
server.watch("portfolio/index.html")

# You can also watch template files if you want:
server.watch("templates/card-img.html", "python src/render_portfolio.py")
server.watch("templates/portfolio.html", "python src/render_portfolio.py")

server.watch("**/*.md", "uv run python src/render_readmes.py")

# Serve the portfolio directory (or project root)
server.serve(root=".", open_url_delay=1)
