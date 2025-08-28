const { test, expect } = require('../../fixtures/test-fixtures');
const { MarketingPage } = require('../../page-objects/marketing.page');

test.describe('Marketing page functionality', () => {
	test('Navigate to Marketing page and verify basic elements', async ({ appPage }) => {
		const marketingPage = new MarketingPage(appPage);
		await marketingPage.navigateToMarketing();
		
		const pageTitle = await marketingPage.getPageTitle();
		expect(pageTitle.trim()).toBe('Opt in & out Marketing');
		
		const pageDescription = await marketingPage.getPageDescription();
		expect(pageDescription).toContain('Set up how marketing content gets sent to your guests');
	});

	test('Verify language dropdown and translate functionality', async ({ appPage }) => {
		test.setTimeout(60000);
		const marketingPage = new MarketingPage(appPage);
		await marketingPage.navigateToMarketing();
		
		const languageValue = await marketingPage.getLanguageValue();
		expect(languageValue).toBe('Original text');
		
		const isTranslateVisible = await marketingPage.isTranslateButtonVisible();
		expect(isTranslateVisible).toBe(true);
		
		const isTranslateClickable = await marketingPage.isTranslateButtonClickable();
		expect(isTranslateClickable).toBe(true);
	});

	test('Verify marketing checkbox functionality', async ({ appPage }) => {
		test.setTimeout(60000);
		const marketingPage = new MarketingPage(appPage);
		await marketingPage.navigateToMarketing();
		
		const checkboxLabel = await marketingPage.getMarketingCheckboxLabel();
		expect(checkboxLabel).toBe('Enable pre check-in automated emails');
		
		const initialState = await marketingPage.getMarketingCheckboxState();
		expect(initialState).toBe(true);
		
		const toggleResult = await marketingPage.toggleMarketingCheckbox();
		expect(toggleResult).toBe(true);
		
		const newState = await marketingPage.getMarketingCheckboxState();
		expect(newState).toBe(false);
	});

	test('Verify approval dropdown and message functionality', async ({ appPage }) => {
		test.setTimeout(60000);
		const marketingPage = new MarketingPage(appPage);
		await marketingPage.navigateToMarketing();
		
		const approvalValue = await marketingPage.getApprovalValue();
		expect(approvalValue).toBe('Get approval for marketing content');
		
		const messageLabel = await marketingPage.getMessageLabel();
		expect(messageLabel).toBe('Your message');
		
		const initialMessage = await marketingPage.getMessageInputValue();
		expect(initialMessage).toBe('I would like to receive special offers from The Barbie Hotel!');
		
		const newMessage = 'Custom marketing message for testing';
		const setMessageResult = await marketingPage.setMessageInputValue(newMessage);
		expect(setMessageResult).toBe(true);
		
		const updatedMessage = await marketingPage.getMessageInputValue();
		expect(updatedMessage).toBe(newMessage);
	});

	test('Verify save functionality and checkbox state persistence', async ({ appPage }) => {
		test.setTimeout(60000);
		const marketingPage = new MarketingPage(appPage);
		await marketingPage.navigateToMarketing();
		
		const initialState = await marketingPage.getMarketingCheckboxState();
		expect(initialState).toBe(true);
		
		const toggleResult = await marketingPage.toggleMarketingCheckbox();
		expect(toggleResult).toBe(true);
		
		const saveResult = await marketingPage.clickSaveButton();
		expect(saveResult).toBe(true);
		
		const finalState = await marketingPage.verifyMarketingCheckboxOff();
		expect(finalState).toBe(true);
	});
});
