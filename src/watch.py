import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
import os


class PortfolioHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith("portfolio/index.json"):
            print("Detected change in index.json, rebuilding portfolio...")
            subprocess.run(["python", "src/render_portfolio.py"])


if __name__ == "__main__":
    path = "portfolio/index.json"
    event_handler = PortfolioHandler()
    observer = Observer()
    observer.schedule(event_handler, path=os.path.dirname(path) or ".", recursive=False)
    observer.start()
    print("Watching for changes to portfolio/index.json...")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
