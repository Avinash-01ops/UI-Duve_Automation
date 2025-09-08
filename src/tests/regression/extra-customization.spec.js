const { test, expect } = require('../../fixtures/test-fixtures');
const { ExtraCustomizationPage } = require('../../page-objects/extra-customization.page');

// QA Extra Customization 251224
test.describe('Extra Customization', () => {
	// Test1: Verify Navigation and page elements
	test('Dashboard -> Settings -> Check-in -> Extra Customization opens with page verification', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new ExtraCustomizationPage(appPage);
		
		// Ensure authentication before navigation
		const authSuccess = await page.ensureAuthenticated();
		expect(authSuccess).toBeTruthy();
		
		// Navigate to Extra Customization page
		const navigationSuccess = await page.navigateToExtraCustomization();
		expect(navigationSuccess).toBeTruthy();
		
		// Verify page title
		const pageTitle = await page.getPageTitle();
		expect(pageTitle).toBeTruthy();
		
		// Verify page description
		const pageDescription = await page.getPageDescription();
		expect(pageDescription).toBeTruthy();

	});

	// Test2: Complete Extra Customization workflow with guest verification and booking source
	test('Complete Extra Customization workflow with guest verification, booking source and save', async ({ appPage }) => {
		test.setTimeout(180000);
		const page = new ExtraCustomizationPage(appPage);
		
		// Execute complete workflow
		const workflowResult = await page.testExtraCustomizationWorkflow();
		expect(workflowResult.success).toBeTruthy();
		expect(workflowResult.workflowTest).toBe('PASSED');
		
		// Verify default dropdown value was Enabled (as shown in actual page)
		expect(workflowResult.defaultDropdownValue).toBe('Enabled');
		
		// Verify page elements loaded correctly
		expect(workflowResult.pageTitle).toBeTruthy();
		expect(workflowResult.pageDescription).toBeTruthy();
		
		// Verify success message appears
		expect(workflowResult.successMessage).toBeTruthy();

	});
});
