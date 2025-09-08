const { test, expect } = require('../../fixtures/test-fixtures');
const { TermsAndConditionsPage } = require('../../page-objects/terms-and-conditions.page');

// QA Terms and Conditions 251224
test.describe('Terms and Conditions', () => {
	// Test1: Verify Navigation and page elements
	test('Dashboard -> Settings -> Check-in -> Terms and Conditions opens with page verification', async ({ appPage }) => {
		test.setTimeout(60000);
		const page = new TermsAndConditionsPage(appPage);
		
		// Navigate to Terms and Conditions page
		const navigationSuccess = await page.navigateToTermsAndConditions();
		expect(navigationSuccess).toBeTruthy();
		
		// Verify page title
		const pageTitle = await page.getPageTitle();
		expect(pageTitle).toBeTruthy();
		
		// Verify page description
		const pageDescription = await page.getPageDescription();
		expect(pageDescription).toBeTruthy();
		

	});

	// Test2: Verify Translation functionality
	test('Translation functionality', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new TermsAndConditionsPage(appPage);
		
		// Navigate to Terms and Conditions page
		const navigationSuccess = await page.navigateToTermsAndConditions();
		expect(navigationSuccess).toBeTruthy();
		
		// Wait for page to fully load
		await appPage.waitForTimeout(3000);
		
		// Test translation functionality
		const translationResult = await page.testTranslationFunctionality();
		expect(translationResult.success).toBeTruthy();
		
		// Verify original text exists
		expect(translationResult.originalText).toBeTruthy();
		
		// Verify translation functionality elements are present
		expect(translationResult.translatedText).toBeTruthy();
		

	});

	// Test3: Verify Show terms and conditions toggle functionality
	test('Show terms and conditions toggle functionality', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new TermsAndConditionsPage(appPage);
		
		// Navigate to Terms and Conditions page
		const navigationSuccess = await page.navigateToTermsAndConditions();
		expect(navigationSuccess).toBeTruthy();
		
		// Wait for page to fully load
		await appPage.waitForTimeout(3000);
		
		// Test show terms toggle functionality
		const toggleResult = await page.testShowTermsToggleFunctionality();
		expect(toggleResult.success).toBeTruthy();
		expect(toggleResult.toggleTest).toBe('PASSED');
		
		// Verify toggle states changed correctly
		expect(toggleResult.afterToggleState).toBe(!toggleResult.initialState);
		expect(toggleResult.finalState).toBe(toggleResult.initialState);
		

	});

	// Test4: Verify Terms and Conditions title update functionality
	test('Terms and Conditions title update functionality', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new TermsAndConditionsPage(appPage);
		
		// Navigate to Terms and Conditions page
		const navigationSuccess = await page.navigateToTermsAndConditions();
		expect(navigationSuccess).toBeTruthy();
		
		// Wait for page to fully load
		await appPage.waitForTimeout(3000);
		
		// Test terms title update functionality
		const titleUpdateResult = await page.testTermsTitleUpdate();
		expect(titleUpdateResult.success).toBeTruthy();
		expect(titleUpdateResult.updateTest).toBe('PASSED');
		
		// Verify title was updated correctly
		expect(titleUpdateResult.titleUpdated).toBeTruthy();
		expect(titleUpdateResult.updatedTitle).toBe(titleUpdateResult.newTitle);
		

	});

	// Test5: Verify Radio button functionality and input fields
	test('Radio button functionality and input fields', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new TermsAndConditionsPage(appPage);
		
		// Navigate to Terms and Conditions page
		const navigationSuccess = await page.navigateToTermsAndConditions();
		expect(navigationSuccess).toBeTruthy();
		
		// Wait for page to fully load
		await appPage.waitForTimeout(3000);
		
		// Test radio button functionality
		const radioButtonResult = await page.testRadioButtonFunctionality();
		expect(radioButtonResult.success).toBeTruthy();
		expect(radioButtonResult.radioButtonTest).toBe('PASSED');
		
		// Verify radio button 2 was clicked and link updated
		expect(radioButtonResult.radio2AfterClick).toBeTruthy();
		expect(radioButtonResult.updatedLink).toBe(radioButtonResult.testLink);
		
		// Verify radio button 1 was clicked and text updated
		expect(radioButtonResult.radio1AfterClick).toBeTruthy();
		expect(radioButtonResult.textUpdated).toBeTruthy();
		

	});
});
