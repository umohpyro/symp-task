import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('[data-test=username]', 'standard_user');
  await page.fill('[data-test=password]', 'secret_sauce');
  await page.click('[data-test=login-button]');
});
test.afterEach(async ({ page }) => {
  await page.close();
});



test('Verify that the items are sorted by Name ( A -> Z )', async ({ page }) => {
  await expect(page.locator(".active_option")).toHaveText("Name (A to Z)");

  const inventoryItems = await page.locator(".inventory_item_name").allInnerTexts();
  let sortedItems: string[] = [];

  inventoryItems.forEach(itemName => {
    sortedItems.push(itemName);
  });

  sortedItems.sort((a: any, b: any) => a - b);

  for (let i = 0; i < inventoryItems.length; i++) {
    expect((sortedItems[i] === inventoryItems[i])).toBeTruthy();
  }
});

test('Verify that the items are sorted by Name ( Z -> A )', async ({ page }) => {
  await page.locator('[data-test="product_sort_container"]').selectOption("za");

  await expect(page.locator(".active_option")).toHaveText("Name (Z to A)");

  // await page.waitForTimeout(5000)

  const inventoryItems = await page.locator(".inventory_item_name").allInnerTexts();
  let sortedItems: string[] = [];

  inventoryItems.forEach(itemName => {
    sortedItems.push(itemName);
  });

  sortedItems.sort((a: any, b: any) => b - a);

  for (let i = 0; i < inventoryItems.length; i++) {
    console.log(sortedItems[i]);
    
    expect((sortedItems[i] === inventoryItems[i])).toBeTruthy();
  }
});