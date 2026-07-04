const puppeteer = require('puppeteer');
const path = require('path');

const OUTPUT_DIR = 'C:\\Users\\Laptop Solutions\\.gemini\\antigravity\\brain\\b977b1e8-1e7d-4a96-92b5-5fbc40e859d9';

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    // 1. Home page
    console.log('Navigating to Home page...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'preview_home.png'),
      fullPage: true
    });
    console.log('Home page screenshot saved.');

    // 2. Menu page - click the Menu nav link
    console.log('Navigating to Menu page...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));
    
    // Try clicking menu nav link
    const menuLink = await page.$('a[href*="menu"], nav a:has-text("Menu"), a:contains("Menu")');
    if (menuLink) {
      await menuLink.click();
    } else {
      // Try evaluate to find and click menu link
      await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a, button'));
        const menuLink = links.find(l => l.textContent.trim().toLowerCase() === 'menu');
        if (menuLink) menuLink.click();
      });
    }
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'preview_menu.png'),
      fullPage: true
    });
    console.log('Menu page screenshot saved.');

    // 3. Custom Cakes page
    console.log('Navigating to Custom Cakes page...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));
    
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a, button'));
      const cakeLink = links.find(l => l.textContent.toLowerCase().includes('custom') || l.textContent.toLowerCase().includes('cake'));
      if (cakeLink) cakeLink.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'preview_custom_cake.png'),
      fullPage: true
    });
    console.log('Custom Cakes page screenshot saved.');

    // 4. Checkout page - add item to cart first
    console.log('Taking Checkout page screenshot...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    
    // Try to add an item to cart
    const addToCartBtn = await page.$('button[class*="cart"], button[class*="add"], button:contains("Add")');
    if (!addToCartBtn) {
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const addBtn = btns.find(b => b.textContent.toLowerCase().includes('add') || b.textContent.toLowerCase().includes('cart'));
        if (addBtn) addBtn.click();
      });
    } else {
      await addToCartBtn.click();
    }
    await new Promise(r => setTimeout(r, 1000));
    
    // Navigate to checkout
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a, button'));
      const checkoutLink = links.find(l => l.textContent.toLowerCase().includes('checkout') || l.href && l.href.includes('checkout'));
      if (checkoutLink) checkoutLink.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'preview_checkout.png'),
      fullPage: true
    });
    console.log('Checkout page screenshot saved.');

    console.log('\nAll screenshots saved to:', OUTPUT_DIR);
    console.log('Files: preview_home.png, preview_menu.png, preview_custom_cake.png, preview_checkout.png');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
}

takeScreenshots();
