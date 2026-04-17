from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:4201/rickymorty")
    page.wait_for_timeout(3000)

    # Take screenshot
    os.makedirs("verification/screenshots", exist_ok=True)
    page.screenshot(path="verification/screenshots/rickymorty.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        os.makedirs("verification/videos", exist_ok=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
