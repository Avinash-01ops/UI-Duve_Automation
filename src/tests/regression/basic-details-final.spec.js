const { test, expect } = require('@playwright/test');
const { BasicDetailsPage } = require('../../page-objects/basic-details.page');

test.describe('Basic Details page functionality', () => {
	test.beforeEach(async ({ page }) => {
		// Simple navigation without authentication
		await page.goto('https://sandbox.duve.com/');
		await page.waitForLoadState('domcontentloaded');
	});

	test('Navigate to Basic Details page', async ({ page }) => {
		const basicDetailsPage = new BasicDetailsPage(page);
		await page.goto('https://sandbox.duve.com/settings?tab=checkInTab&subTab=basicDetails');
		await page.waitForLoadState('domcontentloaded');
		
		const pageTitle = await basicDetailsPage.getPageTitle();
		expect(pageTitle.trim()).toBe('Basic details');
		
		const isDescriptionVisible = await basicDetailsPage.isPageDescriptionVisible();
		expect(isDescriptionVisible).toBe(true);
	});

	test('Verify all fields on Basic Details page', async ({ page }) => {
		test.setTimeout(60000);
		const basicDetailsPage = new BasicDetailsPage(page);
		await page.goto('https://sandbox.duve.com/settings?tab=checkInTab&subTab=basicDetails');
		await page.waitForLoadState('domcontentloaded');
		
		const firstNameResult = await basicDetailsPage.verifyFirstNameField();
		expect(firstNameResult.fieldVisible).toBe(true);
		expect(firstNameResult.lockedIconVisible).toBe(true);
		expect(firstNameResult.userIconVisible).toBe(true);
		expect(firstNameResult.allGuestsLabelVisible).toBe(true);
		expect(firstNameResult.mobileLabelVisible).toBe(true);
		expect(firstNameResult.inputValue).toBe('John');
		
		const lastNameResult = await basicDetailsPage.verifyLastNameField();
		expect(lastNameResult.toggleVisible).toBe(true);
		expect(lastNameResult.fieldVisible).toBe(true);
		expect(lastNameResult.lockedIconVisible).toBe(true);
		expect(lastNameResult.userIconVisible).toBe(true);
		expect(lastNameResult.allGuestsLabelVisible).toBe(true);
		expect(lastNameResult.mobileLabelVisible).toBe(true);
		expect(lastNameResult.inputValue).toBe('Doe');
		
		const emailResult = await basicDetailsPage.verifyEmailField();
		expect(emailResult.toggleVisible).toBe(true);
		expect(emailResult.fieldVisible).toBe(true);
		expect(emailResult.lockedIconVisible).toBe(true);
		expect(emailResult.userIconVisible).toBe(true);
		expect(emailResult.allGuestsLabelVisible).toBe(true);
		expect(emailResult.mobileLabelVisible).toBe(true);
		expect(emailResult.inputValue).toBe('reetduve@yopmail.com');
		
		const phoneResult = await basicDetailsPage.verifyPhoneField();
		expect(phoneResult.toggleVisible).toBe(true);
		expect(phoneResult.fieldVisible).toBe(true);
		expect(phoneResult.lockedIconVisible).toBe(true);
		expect(phoneResult.userIconVisible).toBe(true);
		expect(phoneResult.allGuestsLabelVisible).toBe(true);
		expect(phoneResult.mobileLabelVisible).toBe(true);
		expect(phoneResult.countryCodeVisible).toBe(true);
		expect(phoneResult.inputValue !== undefined).toBe(true);
		
		const checkboxResult = await basicDetailsPage.verifyMobileCheckbox();
		expect(checkboxResult.checkboxVisible).toBe(true);
		expect(typeof checkboxResult.initialState).toBe('boolean');
		expect(typeof checkboxResult.afterClickState).toBe('boolean');
	});

	test('Basic Details page "Add question" button check', async ({ page }) => {
		test.setTimeout(60000);
		const basicDetailsPage = new BasicDetailsPage(page);
		await page.goto('https://sandbox.duve.com/settings?tab=checkInTab&subTab=basicDetails');
		await page.waitForLoadState('domcontentloaded');
		
		const addQuestionResult = await basicDetailsPage.verifyAddQuestionButton();
		
		expect(addQuestionResult.buttonVisible).toBe(true);
		const buttonTextLower = addQuestionResult.buttonText.toLowerCase();
		const expectedTextLower = 'add question'.toLowerCase();
		expect(buttonTextLower.includes(expectedTextLower)).toBe(true);
		
		expect(addQuestionResult.popupVisible).toBe(true);
		expect(addQuestionResult.titleVisible).toBe(true);
		
		const titleTextLower = addQuestionResult.titleText.toLowerCase();
		const expectedTitleLower = 'your guest required answer'.toLowerCase();
		expect(titleTextLower.includes(expectedTitleLower)).toBe(true);
		
		expect(addQuestionResult.closeButtonVisible).toBe(true);
		expect(addQuestionResult.closeButtonEnabled).toBe(true);
		expect(addQuestionResult.popupClosed).toBe(true);
		
		expect(addQuestionResult.options).toHaveLength(6);
		
		for (const option of addQuestionResult.options) {
			expect(option.isVisible).toBe(true);
			expect(option.isEnabled).toBe(true);
			
			const actualLower = option.actualText.toLowerCase();
			const expectedLower = option.expectedText.toLowerCase();
			const textContainsExpected = actualLower.includes(expectedLower);
			expect(textContainsExpected).toBe(true);
		}
	});
});
