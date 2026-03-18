from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:8000/john/index.html')

        # Find the card with a link (the first one has a link to an app)
        card = page.locator('.exp-card').first

        # Click the card to expand it
        card.click()

        # Check if the card has the 'active' class
        assert 'active' in card.get_attribute('class'), "Card should be active after clicking"

        # Click the link inside the card
        link = card.locator('a').first
        link.click()

        # Check if the card still has the 'active' class
        assert 'active' in card.get_attribute('class'), "Card should still be active after clicking the link inside it"

        # Click the card again to collapse it
        # We need to click a part of the card that is not the link
        header = card.locator('.exp-header').first
        header.click()

        # Check if the card no longer has the 'active' class
        assert 'active' not in card.get_attribute('class'), "Card should not be active after clicking it again to collapse"

        print("Verification passed successfully.")
        browser.close()

if __name__ == '__main__':
    verify()
