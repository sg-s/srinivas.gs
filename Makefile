

repo=$(shell basename $(CURDIR))

.PHONY: build portfolio


portfolio:
	uv run python src/render_portfolio.py

readmes:
	uv run python src/render_readmes.py

build: portfolio readmes


serve:
	uv run python src/reload.py