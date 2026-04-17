from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
    page.on("pageerror", lambda exc: print(f"PAGE ERROR: {exc}"))

    try:
        page.goto("http://localhost:4200/pets", timeout=30000)
    except Exception as e:
        print(f"Navigation failed: {e}")

    page.wait_for_timeout(5000)

    # Take screenshot
    os.makedirs("verification/screenshots", exist_ok=True)
    page.screenshot(path="verification/screenshots/petshop_verify.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
