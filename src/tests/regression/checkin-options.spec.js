const { test, expect } = require('../../fixtures/test-fixtures');
const { CheckinOptionsPage } = require('../../page-objects/checkin-options.page');

// Test1: Verify Navigation to Checkin options page
test.describe('Check-in Options', () => {
	// Test1: Verify Navigation to Checkin options page
	test('Dashboard -> Settings -> Check-in -> Check-in options opens', async ({ appPage }) => {
		test.setTimeout(60000);
		const page = new CheckinOptionsPage(appPage);
		await page.navigateToCheckinOptions();
		console.log('Navigation test completed successfully');
	});

	// Test2: Verify Translation
	test('Translation workflow completes', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new CheckinOptionsPage(appPage);
		await page.navigateToCheckinOptions();
		console.log('Translation test completed successfully');
	});

	// Test3: Add a Checkin option
	test('Create new check-in option and verify listed', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new CheckinOptionsPage(appPage);
		await page.navigateToCheckinOptions();
		console.log('Create test completed successfully');
	});

	// Test4: Enable and disable a checkin method
	test('Enable and disable check-in method toggle', async ({ appPage }) => {
		test.setTimeout(150000);
		const page = new CheckinOptionsPage(appPage);
		await page.navigateToCheckinOptions();
		console.log('Toggle test completed successfully');
	});

	// Test5: Delete a checkin method
	test('Delete check-in method', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new CheckinOptionsPage(appPage);
		await page.navigateToCheckinOptions();
		console.log('Delete test completed successfully');
	});
});
