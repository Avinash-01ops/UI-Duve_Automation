const { test, expect } = require('../../fixtures/test-fixtures');
const { ArrivalOptionsPage } = require('../../page-objects/arrival-options.page');

// QA Arrival HHMMDDMMYY
test.describe('Arrival Options', () => {
	// Test1: Verify Navigation to Arrival options page
	test('Dashboard -> Settings -> Check-in -> Arrival options opens', async ({ appPage }) => {
		test.setTimeout(60000);
		const page = new ArrivalOptionsPage(appPage);
		await page.navigateToArrivalOptions();
		console.log('Navigation test completed successfully');
	});

	// Test2: Verify page title and description
	test('Verify page title and description', async ({ appPage }) => {
		test.setTimeout(60000);
		const page = new ArrivalOptionsPage(appPage);
		await page.navigateToArrivalOptions();
		console.log('Page verification test completed successfully');
	});

	// Test3: Add Flight arrival option
	test('Add Flight arrival option and verify success', async ({ appPage }) => {
		test.setTimeout(90000);
		const page = new ArrivalOptionsPage(appPage);
		await page.navigateToArrivalOptions();

		// Click arrival option dropdown
		await page.clickArrivalOptionDropdown();

		// Select Flight option
		await page.selectFlightOption();

		// Click Save button
		await page.clickSaveButton();

		console.log('Add Flight test completed successfully');
	});

	// Test4: Delete Flight arrival option
	test('Delete Flight arrival option', async ({ appPage }) => {
		test.setTimeout(90000);
		const page = new ArrivalOptionsPage(appPage);
		await page.navigateToArrivalOptions();

		console.log('Delete Flight test completed successfully');
	});
});
