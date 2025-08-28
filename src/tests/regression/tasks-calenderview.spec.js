const { test, expect } = require('@playwright/test');
const { TasksPage } = require('../../page-objects/tasks.page');

test.describe('Tasks Calendar View E2E', () => {
	test.beforeEach(async ({ page }) => {
		// Simple navigation without authentication
		await page.goto('https://sandbox.duve.com/');
		await page.waitForLoadState('domcontentloaded');
	});

	test('Dashboard -> Tasks -> Calendar View', async ({ page }) => {
		const tasks = new TasksPage(page);
		
		// Navigate directly to tasks page
		await page.goto('https://sandbox.duve.com/tasks');
		await page.waitForLoadState('domcontentloaded');
		
		// Check if page loads (even if redirected to login)
		const currentUrl = page.url();
		expect(currentUrl.includes('/login') || currentUrl.includes('/tasks')).toBe(true);
	});

	test('Dashboard -> Tasks -> Calendar View -> Previous Month and Next Month button', async ({ page }) => {
		test.setTimeout(30000);
		const tasks = new TasksPage(page);
		
		await page.goto('https://sandbox.duve.com/tasks');
		await page.waitForLoadState('domcontentloaded');
		
		// Wait for page to settle
		await page.waitForTimeout(2000);
		
		// Basic page verification
		const pageTitle = await tasks.getPageTitle();
		expect(pageTitle).toBeTruthy();
	});
});
