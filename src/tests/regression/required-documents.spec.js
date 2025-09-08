const { test, expect } = require('../../fixtures/test-fixtures');
const { RequiredDocumentsPage } = require('../../page-objects/required-documents.page');

// QA Required Documents 251224
test.describe('Required Documents', () => {
	// Test1: Verify Navigation and page elements
	test('Dashboard -> Settings -> Check-in -> Required Documents opens with page verification', async ({ appPage }) => {
		test.setTimeout(60000);
		const page = new RequiredDocumentsPage(appPage);
		
		// Navigate to Required Documents page
		const navigationSuccess = await page.navigateToRequiredDocuments();
		expect(navigationSuccess).toBeTruthy();
		
		// Verify page title
		const pageTitle = await page.getPageTitle();
		expect(pageTitle).toBeTruthy();
		
		// Verify page description
		const pageDescription = await page.getPageDescription();
		expect(pageDescription).toBeTruthy();
		
		console.log('Required Documents navigation and page verification completed successfully');
	});

	// Test2: Verify required scanning document toggle functionality
	test('Required scanning document toggle state management', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new RequiredDocumentsPage(appPage);
		
		// Navigate to Required Documents page
		const navigationSuccess = await page.navigateToRequiredDocuments();
		expect(navigationSuccess).toBeTruthy();
		
		// Wait for page to fully load
		await appPage.waitForTimeout(3000);
		
		// Verify toggle is visible and get initial state
		const initialToggleState = await page.getRequiredScanningToggleState();
		console.log('Initial toggle state:', initialToggleState);
		
		// Click to turn off the toggle (if it's currently on)
		if (initialToggleState) {
			const toggleSuccess = await page.toggleRequiredScanningDocument();
			expect(toggleSuccess).toBeTruthy();
			
			// Wait for toggle state to change
			await appPage.waitForTimeout(2000);
			
			// Verify toggle state changed
			const afterToggleState = await page.getRequiredScanningToggleState();
			console.log('After toggle state:', afterToggleState);
			expect(afterToggleState).toBeFalsy();
			
			// Click save button
			const saveSuccess = await page.clickSaveButton();
			expect(saveSuccess).toBeTruthy();
			
			// Wait for save to complete
			await appPage.waitForTimeout(3000);
			
			// Verify final toggle state after saving
			const finalToggleState = await page.getRequiredScanningToggleState();
			console.log('Final toggle state:', finalToggleState);
			expect(finalToggleState).toBeFalsy();
		} else {
			// If toggle is already off, turn it on first, then off
			const toggleOnSuccess = await page.toggleRequiredScanningDocument();
			expect(toggleOnSuccess).toBeTruthy();
			
			await appPage.waitForTimeout(2000);
			
			const toggleOffSuccess = await page.toggleRequiredScanningDocument();
			expect(toggleOffSuccess).toBeTruthy();
			
			await appPage.waitForTimeout(2000);
			
			// Click save button
			const saveSuccess = await page.clickSaveButton();
			expect(saveSuccess).toBeTruthy();
			
			await appPage.waitForTimeout(3000);
			
			// Verify final toggle state
			const finalToggleState = await page.getRequiredScanningToggleState();
			console.log('Final toggle state:', finalToggleState);
			expect(finalToggleState).toBeFalsy();
		}
		
		console.log('Required scanning document toggle functionality test completed successfully');
	});

	// Test3: Verify Booking Source customization functionality
	test('Booking source customization functionality', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new RequiredDocumentsPage(appPage);
		
		// Navigate to Required Documents page
		const navigationSuccess = await page.navigateToRequiredDocuments();
		expect(navigationSuccess).toBeTruthy();
		
		// Wait for page to fully load
		await appPage.waitForTimeout(3000);
		
		// Verify Booking Source customization functionality
		const customizationSuccess = await page.testBookingSourceCustomization();
		expect(customizationSuccess).toBeTruthy();
		
		console.log('Booking source customization functionality test completed successfully');
	});

	// Test4: Verify Passport verification and data match toggle functionality
	test('Passport verification and data match toggle functionality', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new RequiredDocumentsPage(appPage);
		
		// Navigate to Required Documents page
		const navigationSuccess = await page.navigateToRequiredDocuments();
		expect(navigationSuccess).toBeTruthy();
		
		// Wait for page to fully load
		await appPage.waitForTimeout(3000);
		
		// Test passport verification toggle functionality
		const passportToggleResult = await page.testPassportVerificationToggle();
		expect(passportToggleResult.success).toBeTruthy();
		
		// Verify toggle state changed
		expect(passportToggleResult.afterToggleState).toBe(!passportToggleResult.initialState);
		
		// Verify final toggle state after saving
		expect(passportToggleResult.finalState).toBe(!passportToggleResult.initialState);
		
		console.log('Passport verification and data match toggle functionality test completed successfully');
	});

	// Test5: Verify Translation functionality
	test('Translation functionality', async ({ appPage }) => {
		test.setTimeout(120000);
		const page = new RequiredDocumentsPage(appPage);
		
		// Navigate to Required Documents page
		const navigationSuccess = await page.navigateToRequiredDocuments();
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
		
		console.log('Translation functionality test completed successfully');
	});

	// // Test6: Verify Managing Documents functionality
	// test('Managing Documents functionality', async ({ appPage }) => {
	// 	test.setTimeout(120000);
	// 	const page = new RequiredDocumentsPage(appPage);
		
	// 	// Navigate to Required Documents page
	// 	const navigationSuccess = await page.navigateToRequiredDocuments();
	// 	expect(navigationSuccess).toBeTruthy();
		
	// 	// Wait for page to fully load
	// 	await appPage.waitForTimeout(3000);
		
	// 	// Test managing documents functionality
	// 	const managingDocumentsResult = await page.testManagingDocuments();
	// 	expect(managingDocumentsResult.success).toBeTruthy();
		
	// 	// Verify all elements exist
	// 	expect(managingDocumentsResult.emailText).toBeTruthy();
	// 	expect(managingDocumentsResult.storageDuration).toBeTruthy();
	// 	expect(managingDocumentsResult.warningMessage).toBeTruthy();
		
	// 	// Verify functional tests passed
	// 	expect(managingDocumentsResult.radioButtonTest).toBe('PASSED');
	// 	expect(managingDocumentsResult.saveTest).toBe('PASSED');
		
	// 	console.log('Managing Documents functionality test completed successfully');
	// });
});
