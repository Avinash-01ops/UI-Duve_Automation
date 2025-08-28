const { test, expect } = require('../../fixtures/test-fixtures');
const { BasicDetailsPage } = require('../../page-objects/basic-details.page');

test.describe('Basic Details page functionality', () => {
	test('Navigate to Basic Details page', async ({ appPage }) => {
		const basicDetailsPage = new BasicDetailsPage(appPage);
		await basicDetailsPage.navigateToBasicDetails();
		
		const pageTitle = await basicDetailsPage.getPageTitle();
		expect(pageTitle.trim()).toBe('Basic details');
		
		const isDescriptionVisible = await basicDetailsPage.isPageDescriptionVisible();
		expect(isDescriptionVisible).toBe(true);
	});

	test('Verify all fields on Basic Details page', async ({ appPage }) => {
		test.setTimeout(60000);
		const basicDetailsPage = new BasicDetailsPage(appPage);
		await basicDetailsPage.navigateToBasicDetails();
		
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

	test('Basic Details page "Add question" button check', async ({ appPage }) => {
		test.setTimeout(60000);
		const basicDetailsPage = new BasicDetailsPage(appPage);
		await basicDetailsPage.navigateToBasicDetails();
		
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

	test('Basic Details page -> Add a Free text question', async ({ appPage }) => {
		test.setTimeout(120000);
		const basicDetailsPage = new BasicDetailsPage(appPage);
		await basicDetailsPage.navigateToBasicDetails();
		
		const freeTextResult = await basicDetailsPage.createFreeTextQuestion();
		
		expect(freeTextResult.pageTitle).toBeTruthy();
		expect(freeTextResult.backButtonVisible).toBe(true);
		expect(freeTextResult.backButtonEnabled).toBe(true);
		expect(freeTextResult.questionLabel).toBeTruthy();
		expect(freeTextResult.questionInputValue).toBe(freeTextResult.uniqueQuestionName);
		expect(freeTextResult.helpTextValue).toBe('Test Q1 help text');
		expect(freeTextResult.includeQuestionValue).toBeTruthy();
		expect(freeTextResult.initialFieldSize).toBeTruthy();
		expect(freeTextResult.fieldNameValue).toBe('Test field 1');
		expect(freeTextResult.externalIdValue).toBe('Test External 1');
		expect(freeTextResult.tooltipTitleValue).toBe('Test tooltip 1');
		expect(freeTextResult.tooltipTextValue).toBe('Test tooltip description 1');
		expect(freeTextResult.multipleByEnabled).toBe(true);
		expect(freeTextResult.restrictUniqueEnabled).toBe(true);
		expect(freeTextResult.addConditionTitle).toBeTruthy();
		expect(freeTextResult.popupVisible).toBe(true);
		expect(freeTextResult.popupMessage).toBeTruthy();
		expect(freeTextResult.saveWithoutEnablingVisible).toBe(true);
		expect(freeTextResult.saveWithoutEnablingEnabled).toBe(true);
		expect(freeTextResult.saveAndEnableVisible).toBe(true);
		expect(freeTextResult.saveAndEnableEnabled).toBe(true);
		expect(freeTextResult.questionFound).toBe(true);
		expect(freeTextResult.questionIndex).toBeGreaterThan(0);
	});

	test('Basic Details -> Add Multiple Choice Question', async ({ appPage }) => {
		test.setTimeout(120000);
		const basicDetailsPage = new BasicDetailsPage(appPage);
		await basicDetailsPage.navigateToBasicDetails();
		
		const multipleChoiceResult = await basicDetailsPage.createMultipleChoiceQuestion();
		
		expect(multipleChoiceResult.questionFound).toBe(true);
		expect(multipleChoiceResult.questionIndex).toBeGreaterThan(0);
	});

	test('Basic Details -> Add Date question', async ({ appPage }) => {
		test.setTimeout(120000);
		const basicDetailsPage = new BasicDetailsPage(appPage);
		await basicDetailsPage.navigateToBasicDetails();
		
		const dateQuestionResult = await basicDetailsPage.createDateQuestion();
		
		expect(dateQuestionResult.questionFound).toBe(true);
		expect(dateQuestionResult.questionIndex).toBeGreaterThan(0);
	});

	test('Basic Details -> Add Checkbox question', async ({ appPage }) => {
		test.setTimeout(120000);
		const basicDetailsPage = new BasicDetailsPage(appPage);
		await basicDetailsPage.navigateToBasicDetails();
		
		const checkboxQuestionResult = await basicDetailsPage.createCheckboxQuestion();
		
		expect(checkboxQuestionResult.questionFound).toBe(true);
		expect(checkboxQuestionResult.questionIndex).toBeGreaterThan(0);
	});

	test('Basic Details -> Add Bed Types question', async ({ appPage }) => {
		test.setTimeout(120000);
		const basicDetailsPage = new BasicDetailsPage(appPage);
		await basicDetailsPage.navigateToBasicDetails();
		
		const bedTypesQuestionResult = await basicDetailsPage.createBedTypesQuestion();
		
		expect(bedTypesQuestionResult.questionFound).toBe(true);
		expect(bedTypesQuestionResult.questionIndex).toBeGreaterThan(0);
	});

	test('Basic Details -> Add Guest Category question', async ({ appPage }) => {
		test.setTimeout(120000);
		const basicDetailsPage = new BasicDetailsPage(appPage);
		await basicDetailsPage.navigateToBasicDetails();
		
		const guestCategoryQuestionResult = await basicDetailsPage.createGuestCategoryQuestion();
		
		expect(guestCategoryQuestionResult.questionFound).toBe(true);
		expect(guestCategoryQuestionResult.questionIndex).toBeGreaterThan(0);
	});

	/* Commented out Delete question test script
	test('Basic Details -> Delete a question', async ({ appPage }) => {
		test.setTimeout(120000);
		const basicDetailsPage = new BasicDetailsPage(appPage);
		await basicDetailsPage.navigateToBasicDetails();
		
		await basicDetailsPage.addQuestionButton.click();
		await appPage.waitForTimeout(2000);
		
		const dateOption = appPage.locator('xpath=(//div[normalize-space()="Date"])[1]');
		await dateOption.waitFor({ state: 'visible', timeout: 10000 });
		await dateOption.click();
		await appPage.waitForTimeout(3000);
		
		const questionTitle = basicDetailsPage.generateUniformQuestionTitle('date');
		const questionTitleInput = appPage.locator('xpath=//input[@placeholder="Your new question"]');
		await questionTitleInput.waitFor({ state: 'visible', timeout: 10000 });
		await questionTitleInput.click();
		await questionTitleInput.fill(questionTitle);
		
		const saveButton = appPage.locator('xpath=//button[@class="_5rh3dh1"]');
		await saveButton.waitFor({ state: 'visible', timeout: 10000 });
		await saveButton.click();
		await appPage.waitForTimeout(2000);
		
		const saveWithoutEnablingButton = appPage.locator('xpath=//button[normalize-space()="Save without enabling"]');
		await saveWithoutEnablingButton.waitFor({ state: 'visible', timeout: 10000 });
		await saveWithoutEnablingButton.click();
		await appPage.waitForTimeout(3000);
		
		const questionLocator = appPage.locator(`xpath=//div[@class="_i7ej7mh"][normalize-space()="${questionTitle}"]`);
		await questionLocator.waitFor({ state: 'visible', timeout: 10000 });
		
		const questionDetailReached = await basicDetailsPage.navigateToQuestionDetail(questionTitle);
		expect(questionDetailReached).toBe(true);
		
		const deleteButtonClicked = await basicDetailsPage.clickDeleteButtonOnDetailPage();
		expect(deleteButtonClicked).toBe(true);
		
		const deletionConfirmed = await basicDetailsPage.confirmDeletion();
		expect(deletionConfirmed).toBe(true);
		
		const successMessageVisible = await basicDetailsPage.verifySuccessMessage();
		
		const questionDeleted = await basicDetailsPage.verifyQuestionDeleted(questionTitle);
		expect(questionDeleted).toBe(true);
	});
	*/
});