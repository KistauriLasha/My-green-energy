import os
from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # Получаем абсолютный путь к index.html
        path = os.path.abspath("index.html")
        page.goto(f"file://{path}")

        # Ждем немного для применения стилей и инициализации иконок
        page.wait_for_timeout(2000)

        # Скриншот всей страницы
        page.screenshot(path="design_verification.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify()
