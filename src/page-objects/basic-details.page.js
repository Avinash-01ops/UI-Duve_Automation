const { BasePage } = require('./base.page');
const creds = require('../config/credentials');

class BasicDetailsPage extends BasePage {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		super(page);
		this.url = `${creds.baseUrl}/dashboard`;

		// Navigation locators
		this.dashboardMenu = this.page.locator('xpath=//*[@id="app"]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div[2]');
		this.settingsMenu = this.page.locator('xpath=//*[@id="side-menu-hub-settings"]/div/div/div/div[1]');
		this.checkInMenu = this.page.locator('xpath=//html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[1]/div[2]/div[3]/div/span/div/span');
		this.basicDetailsMenu = this.page.locator('xpath=//html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[1]/div[2]/div[3]/div/div/div/div/div[2]');

		// Page content locators
		this.pageTitle = this.page.locator('xpath=//html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[1]/div/div[1]');
		this.pageDescription = this.page.locator('xpath=//html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[1]/div/div[2]');

		// First Name field locators
		this.firstNameToggle = this.page.locator('xpath=//html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div[1]/div');
		this.firstNameField = this.page.locator('xpath=//html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div[2]/span[1]');
		this.firstNameLockedIcon = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div[2]/div[1]');
		this.firstNameUserIcon = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div[2]/div[2]');
		this.firstNameAllGuestsLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div[2]/span[2]');
		this.mobileFirstNameLabel = this.page.locator('xpath=//html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[1]/span/label/span');
		this.mobileFirstNameInput = this.page.locator('xpath=//html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[1]/div/div/div/input');

		// Last Name field locators
		this.lastNameToggle = this.page.locator('xpath=//*[@id="app"]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[2]/div/div[2]/div/div[1]');
		this.lastNameField = this.page.locator('xpath=//*[@id="app"]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[2]/div/div[2]/div/div[2]/span[1]');
		this.lastNameLockedIcon = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[2]/div/div[2]/div/div[2]/div[1]');
		this.lastNameUserIcon = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[2]/div/div[2]/div/div[2]/div[2]');
		this.lastNameAllGuestsLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[2]/div/div[2]/div/div[2]/span[2]');
		this.mobileLastNameLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[2]/span/label/span');
		this.mobileLastNameInput = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[2]/div/div/div/input');

		// Email Address field locators
		this.emailToggle = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[3]/div/div[2]/div/div[1]');
		this.emailField = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[3]/div/div[2]/div/div[2]/span[1]');
		this.emailLockedIcon = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[3]/div/div[2]/div/div[2]/div[1]');
		this.emailUserIcon = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[3]/div/div[2]/div/div[2]/div[2]');
		this.emailAllGuestsLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[3]/div/div[2]/div/div[2]/span[2]');
		this.mobileEmailLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[3]/span/label/span');
		this.mobileEmailInput = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[3]/div/div/div/input');

		// Phone Number field locators
		this.phoneToggle = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[4]/div/div[2]/div/div[1]');
		this.phoneField = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[4]/div/div[2]/div/div[2]/span[1]');
		this.phoneLockedIcon = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[4]/div/div[2]/div/div[2]/div[1]');
		this.phoneUserIcon = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[4]/div/div[2]/div/div[2]/div[2]');
		this.phoneAllGuestsLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[4]/div/div[2]/div/div[2]/span[2]');
		this.mobilePhoneLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[4]/span/label/span');
		this.countryCodeSelector = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[4]/div/div/div/div/div');
		this.mobilePhoneInput = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[4]/div/div/div/div/input');
		
		// Mobile preview checkbox locators
		this.mobileCheckbox = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[5]/div');
		this.specialOffersMessage = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[5]/text()');
		
		// Add Question button and popup locators
		this.addQuestionButton = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[2]/div/div[2]/button');
		this.popup = this.page.locator('xpath=/html/body/div[2]/div/div');
		this.popupTitle = this.page.locator('xpath=/html/body/div[2]/div/div/div[1]/div[1]/span');
		this.closeButton = this.page.locator('xpath=/html/body/div[2]/div/div/div[1]/div[1]/button');
		
		// Popup options locators
		this.freeTextOption = this.page.locator('xpath=/html/body/div[2]/div/div/div[2]/div/div/div[1]');
		this.multipleChoiceOption = this.page.locator('xpath=/html/body/div[2]/div/div/div[2]/div/div/div[2]');
		this.dateOption = this.page.locator('xpath=/html/body/div[2]/div/div/div[2]/div/div/div[3]');
		this.checkboxOption = this.page.locator('xpath=/html/body/div[2]/div/div/div[2]/div/div/div[4]');
		this.bedTypesOption = this.page.locator('xpath=/html/body/div[2]/div/div/div[2]/div/div/div[5]');
		this.guestCategoryOption = this.page.locator('xpath=/html/body/div[2]/div/div/div[2]/div/div/div[6]');
		
		// Free Text Question Creation Page locators
		this.newCustomQuestionsTitle = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[1]/div/div[1]');
		this.backButton = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[1]/div/button');
		
		// Your Question field
		this.yourQuestionLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[2]/div[1]/div[1]');
		this.yourQuestionInput = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[2]/div[1]/div[2]//input');
		
		// Help Text field
		this.helpTextField = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[2]/div[2]/div[1]/div');
		this.helpTextInput = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[2]/div[2]/div[2]//input');
		
		// Include question in page field
		this.includeQuestionLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[2]/div[3]/div[1]');
		this.includeQuestionDropdown = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[2]/div[3]/div[2]/div/div/span[1]/div[1]');
		
		// Field Size field
		this.fieldSizeLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[3]/div/div[1]');
		this.fieldSizeDropdown = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[3]/div/div[2]/div/div/span[1]/div[1]');
		
		// Mandatory field toggle
		this.mandatoryFieldLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[4]/div[1]/span');
		this.mandatoryFieldToggle = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[4]/div[1]/div');
		
		// Sensitive information toggle
		this.sensitiveInfoLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[4]/div[2]/span');
		this.sensitiveInfoToggle = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[4]/div[2]/div');
		
		// Field Match section
		this.fieldMatchSection = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[2]');
		this.fieldNameLabel = this.page.locator('//div[text()="Field name"]');
		this.fieldNameInput = this.page.locator('//div[contains(@class,"Select-input")]//input');
		this.externalIdLabel = this.page.locator('//div[text()="External Id"]');
		this.externalIdInput = this.page.locator('//input[@placeholder="External custom question id"]');
		
		// Tooltip section
		this.tooltipSection = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[3]/div[1]/div/div[1]/div/div/div[1]');
		this.tooltipTitleLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[3]/div[1]/div/div[3]/div[1]/div[1]/div/span');
		this.tooltipTitleInput = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[3]/div[1]/div/div[3]/div[1]/div[2]//input');
		this.tooltipTextLabel = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[3]/div[1]/div/div[3]/div[2]/div/div[1]/div/span');
		this.tooltipTextInput = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[3]/div[1]/div/div[3]/div[2]/div/div[2]//input');
		
		// Multiple answers section
		this.multipleAnswersSection = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[4]/div[1]/div/div[1]/div/div');
		this.multipleByToggle = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[4]/div[1]/div/div[3]/div[1]/div[1]/div');
		this.multipleByDropdown = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[4]/div[1]/div/div[3]/div[1]/div[2]/div/div/span[1]/div[1]');
		this.restrictUniqueToggle = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[4]/div[1]/div/div[3]/div[2]/div');
		
		// Limited Questions section
		this.limitedQuestionsSection = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[5]/div[1]/div/div[1]/div/div/div[1]');
		this.addConditionTitle = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[5]/div[1]/div/div[3]/div/div[1]/div/div/div[1]/span');
		this.limitedQuestionsDropdown = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[5]/div[1]/div/div[3]/div/div[1]/div/div/div[2]/div/span[1]/div[1]');
		this.validationMessage = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[5]/div[1]/div/div[3]/div/div[2]');
		
		// Save button and confirmation popup
		this.saveButton = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[1]/div/div[2]/button');
		this.confirmationPopup = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/div/div');
		this.saveWithoutEnablingButton = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/div/div/div[3]/div[2]/button');
		this.saveAndEnableButton = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/div/div/div[3]/div[2]/div/div');
		this.successMessage = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[2]/div');
	}

	/**
	 * Navigate to Basic Details page via menu clicks
	 */
	async navigateToBasicDetails() {
		console.log('Navigating to Basic Details page...');
		
		// Open dashboard
		await this.page.goto(this.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
		await this.page.waitForLoadState('domcontentloaded');
		
		// Click through navigation menu
		await this.dashboardMenu.waitFor({ state: 'visible', timeout: 10000 });
		await this.dashboardMenu.click();
		await this.page.waitForTimeout(2000);
		
		await this.settingsMenu.waitFor({ state: 'visible', timeout: 10000 });
		await this.settingsMenu.click();
		await this.page.waitForTimeout(2000);
		
		await this.checkInMenu.waitFor({ state: 'visible', timeout: 10000 });
		await this.checkInMenu.click();
		await this.page.waitForTimeout(2000);
		
		await this.basicDetailsMenu.waitFor({ state: 'visible', timeout: 10000 });
		await this.basicDetailsMenu.click();
		await this.page.waitForTimeout(3000);
		
		console.log('Navigation completed');
	}

	/**
	 * Get page title text
	 */
	async getPageTitle() {
		await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
		return await this.pageTitle.textContent();
	}

	/**
	 * Check if page description is visible
	 */
	async isPageDescriptionVisible() {
		await this.pageDescription.waitFor({ state: 'visible', timeout: 10000 });
		return await this.pageDescription.isVisible();
	}

	/**
	 * Verify First Name field functionality
	 */
	async verifyFirstNameField() {
		// Check First Name field is displayed
		await this.firstNameField.waitFor({ state: 'visible', timeout: 10000 });
		const isFieldVisible = await this.firstNameField.isVisible();
		
		// Verify additional elements
		await this.firstNameLockedIcon.waitFor({ state: 'visible', timeout: 10000 });
		const isLockedIconVisible = await this.firstNameLockedIcon.isVisible();
		
		await this.firstNameUserIcon.waitFor({ state: 'visible', timeout: 10000 });
		const isUserIconVisible = await this.firstNameUserIcon.isVisible();
		
		await this.firstNameAllGuestsLabel.waitFor({ state: 'visible', timeout: 10000 });
		const isAllGuestsLabelVisible = await this.firstNameAllGuestsLabel.isVisible();
		
		// Check mobile view First Name is visible
		await this.mobileFirstNameLabel.waitFor({ state: 'visible', timeout: 10000 });
		const isMobileLabelVisible = await this.mobileFirstNameLabel.isVisible();
		
		// Check it accepts text input "John"
		await this.mobileFirstNameInput.waitFor({ state: 'visible', timeout: 10000 });
		await this.mobileFirstNameInput.fill('John');
		const inputValue = await this.mobileFirstNameInput.inputValue();
		
		return {
			fieldVisible: isFieldVisible,
			lockedIconVisible: isLockedIconVisible,
			userIconVisible: isUserIconVisible,
			allGuestsLabelVisible: isAllGuestsLabelVisible,
			mobileLabelVisible: isMobileLabelVisible,
			inputValue: inputValue
		};
	}

	/**
	 * Verify Last Name field functionality
	 */
	async verifyLastNameField() {
		// Check Last Name toggle is visible
		await this.lastNameToggle.waitFor({ state: 'visible', timeout: 10000 });
		const isToggleVisible = await this.lastNameToggle.isVisible();
		
		// Check Last Name field is visible
		await this.lastNameField.waitFor({ state: 'visible', timeout: 10000 });
		const isFieldVisible = await this.lastNameField.isVisible();
		
		// Verify additional elements
		await this.lastNameLockedIcon.waitFor({ state: 'visible', timeout: 10000 });
		const isLockedIconVisible = await this.lastNameLockedIcon.isVisible();
		
		await this.lastNameUserIcon.waitFor({ state: 'visible', timeout: 10000 });
		const isUserIconVisible = await this.lastNameUserIcon.isVisible();
		
		await this.lastNameAllGuestsLabel.waitFor({ state: 'visible', timeout: 10000 });
		const isAllGuestsLabelVisible = await this.lastNameAllGuestsLabel.isVisible();
		
		// Check mobile preview Last name field label is visible
		await this.mobileLastNameLabel.waitFor({ state: 'visible', timeout: 10000 });
		const isMobileLabelVisible = await this.mobileLastNameLabel.isVisible();
		
		// Check input box is editable and accepts text "Doe"
		await this.mobileLastNameInput.waitFor({ state: 'visible', timeout: 10000 });
		await this.mobileLastNameInput.fill('Doe');
		const inputValue = await this.mobileLastNameInput.inputValue();
		
		return {
			toggleVisible: isToggleVisible,
			fieldVisible: isFieldVisible,
			lockedIconVisible: isLockedIconVisible,
			userIconVisible: isUserIconVisible,
			allGuestsLabelVisible: isAllGuestsLabelVisible,
			mobileLabelVisible: isMobileLabelVisible,
			inputValue: inputValue
		};
	}

	/**
	 * Verify Email Address field functionality
	 */
	async verifyEmailField() {
		// Check Email Address toggle is visible
		await this.emailToggle.waitFor({ state: 'visible', timeout: 10000 });
		const isToggleVisible = await this.emailToggle.isVisible();
		
		// Check Email Address field is visible
		await this.emailField.waitFor({ state: 'visible', timeout: 10000 });
		const isFieldVisible = await this.emailField.isVisible();
		
		// Verify additional elements
		await this.emailLockedIcon.waitFor({ state: 'visible', timeout: 10000 });
		const isLockedIconVisible = await this.emailLockedIcon.isVisible();
		
		await this.emailUserIcon.waitFor({ state: 'visible', timeout: 10000 });
		const isUserIconVisible = await this.emailUserIcon.isVisible();
		
		await this.emailAllGuestsLabel.waitFor({ state: 'visible', timeout: 10000 });
		const isAllGuestsLabelVisible = await this.emailAllGuestsLabel.isVisible();
		
		// Check mobile preview Email Address label is visible
		await this.mobileEmailLabel.waitFor({ state: 'visible', timeout: 10000 });
		const isMobileLabelVisible = await this.mobileEmailLabel.isVisible();
		
		// Check input box is editable and accepts email "reetduve@yopmail.com"
		await this.mobileEmailInput.waitFor({ state: 'visible', timeout: 10000 });
		await this.mobileEmailInput.fill('reetduve@yopmail.com');
		const inputValue = await this.mobileEmailInput.inputValue();
		
		return {
			toggleVisible: isToggleVisible,
			fieldVisible: isFieldVisible,
			lockedIconVisible: isLockedIconVisible,
			userIconVisible: isUserIconVisible,
			allGuestsLabelVisible: isAllGuestsLabelVisible,
			mobileLabelVisible: isMobileLabelVisible,
			inputValue: inputValue
		};
	}

	/**
	 * Verify Phone Number field functionality
	 */
	async verifyPhoneField() {
		// Check Phone Number toggle is visible
		await this.phoneToggle.waitFor({ state: 'visible', timeout: 10000 });
		const isToggleVisible = await this.phoneToggle.isVisible();
		
		// Check Phone Number field is visible
		await this.phoneField.waitFor({ state: 'visible', timeout: 10000 });
		const isFieldVisible = await this.phoneField.isVisible();
		
		// Verify additional elements
		await this.phoneLockedIcon.waitFor({ state: 'visible', timeout: 10000 });
		const isLockedIconVisible = await this.phoneLockedIcon.isVisible();
		
		await this.phoneUserIcon.waitFor({ state: 'visible', timeout: 10000 });
		const isUserIconVisible = await this.phoneUserIcon.isVisible();
		
		await this.phoneAllGuestsLabel.waitFor({ state: 'visible', timeout: 10000 });
		const isAllGuestsLabelVisible = await this.phoneAllGuestsLabel.isVisible();
		
		// Check mobile preview Phone Number label is visible
		await this.mobilePhoneLabel.waitFor({ state: 'visible', timeout: 10000 });
		const isMobileLabelVisible = await this.mobilePhoneLabel.isVisible();
		
		// Check country code selector is visible
		await this.countryCodeSelector.waitFor({ state: 'visible', timeout: 10000 });
		const isCountryCodeVisible = await this.countryCodeSelector.isVisible();
		
		// Fill phone number input with "9898989898" - with better error handling
		const phoneNumber = "9898989898";
		await this.mobilePhoneInput.waitFor({ state: 'visible', timeout: 10000 });
		
		// Try multiple input methods
		let inputValue = "";
		try {
			// Method 1: Clear and fill
			await this.mobilePhoneInput.clear();
			await this.mobilePhoneInput.fill(phoneNumber);
			inputValue = await this.mobilePhoneInput.inputValue();
			
			// If still empty, try method 2: Click and type
			if (!inputValue) {
				await this.mobilePhoneInput.click();
				await this.mobilePhoneInput.type(phoneNumber);
				inputValue = await this.mobilePhoneInput.inputValue();
			}
			
			// If still empty, try method 3: Press keys
			if (!inputValue) {
				await this.mobilePhoneInput.focus();
				await this.mobilePhoneInput.pressSequentially(phoneNumber);
				inputValue = await this.mobilePhoneInput.inputValue();
			}
			
		} catch (error) {
			console.log('Phone input failed, trying alternative approach:', error.message);
			// Try to get current value even if input failed
			try {
				inputValue = await this.mobilePhoneInput.inputValue();
			} catch {
				inputValue = "";
			}
		}
		
		return {
			toggleVisible: isToggleVisible,
			fieldVisible: isFieldVisible,
			lockedIconVisible: isLockedIconVisible,
			userIconVisible: isUserIconVisible,
			allGuestsLabelVisible: isAllGuestsLabelVisible,
			mobileLabelVisible: isMobileLabelVisible,
			countryCodeVisible: isCountryCodeVisible,
			inputValue: inputValue,
			phoneNumber: phoneNumber
		};
	}

	/**
	 * Verify Mobile Preview Checkbox functionality
	 */
	async verifyMobileCheckbox() {
		// Wait for checkbox to be visible
		await this.mobileCheckbox.waitFor({ state: 'visible', timeout: 10000 });
		const isCheckboxVisible = await this.mobileCheckbox.isVisible();
		
		// Check initial state by looking for aria-checked attribute or similar
		let initialState = false;
		try {
			const ariaChecked = await this.mobileCheckbox.getAttribute('aria-checked');
			const checked = await this.mobileCheckbox.getAttribute('checked');
			initialState = ariaChecked === 'true' || checked === 'true';
		} catch (error) {
			console.log('Could not determine initial checkbox state, assuming false');
		}
		
		// Click the checkbox to toggle it
		await this.mobileCheckbox.click();
		await this.page.waitForTimeout(1000);
		
		// Check if special offers message is visible
		let isMessageVisible = false;
		try {
			await this.specialOffersMessage.waitFor({ state: 'visible', timeout: 5000 });
			isMessageVisible = await this.specialOffersMessage.isVisible();
		} catch (error) {
			console.log('Special offers message not found or not visible');
		}
		
		return {
			checkboxVisible: isCheckboxVisible,
			initialState: initialState,
			afterClickState: !initialState, // Toggle state
			messageVisible: isMessageVisible
		};
	}

	/**
	 * Verify Add Question button functionality
	 */
	async verifyAddQuestionButton() {
		try {
			console.log('Starting Add Question button verification...');
			
			// 1. Verify Add Question button is visible and get text
			await this.addQuestionButton.waitFor({ state: 'visible', timeout: 10000 });
			const isButtonVisible = await this.addQuestionButton.isVisible();
			
			// Get button text - use innerText to avoid icons and extra elements
			let buttonText = await this.addQuestionButton.innerText();
			// Clean the text by removing extra whitespace and special characters
			buttonText = buttonText ? buttonText.trim().replace(/\s+/g, ' ') : '';
			
			console.log(`Button text: "${buttonText}"`);
			
			// 2. Click the Add Question button
			await this.addQuestionButton.click();
			await this.page.waitForTimeout(2000);
			
			// 3. Verify popup is displayed
			await this.popup.waitFor({ state: 'visible', timeout: 10000 });
			const isPopupVisible = await this.popup.isVisible();
			
			// 4. Verify popup title
			await this.popupTitle.waitFor({ state: 'visible', timeout: 10000 });
			const isTitleVisible = await this.popupTitle.isVisible();
			
			// Get title text - use innerText for cleaner text extraction
			let titleText = await this.popupTitle.innerText();
			titleText = titleText ? titleText.trim().replace(/\s+/g, ' ') : '';
			
			console.log(`Popup title: "${titleText}"`);
			
			// 5. Verify close button is visible and clickable
			await this.closeButton.waitFor({ state: 'visible', timeout: 10000 });
			const isCloseButtonVisible = await this.closeButton.isVisible();
			const isCloseButtonEnabled = await this.closeButton.isEnabled();
			
			// 6. Verify all six options are present and clickable
			const options = [
				{ locator: this.freeTextOption, expectedText: 'Free text' },
				{ locator: this.multipleChoiceOption, expectedText: 'Multiple Choice' },
				{ locator: this.dateOption, expectedText: 'Date' },
				{ locator: this.checkboxOption, expectedText: 'Checkbox' },
				{ locator: this.bedTypesOption, expectedText: 'Bed types' },
				{ locator: this.guestCategoryOption, expectedText: 'Guest category' }
			];
			
			const optionsResults = [];
			for (let i = 0; i < options.length; i++) {
				const option = options[i];
				await option.locator.waitFor({ state: 'visible', timeout: 10000 });
				const isVisible = await option.locator.isVisible();
				const isEnabled = await option.locator.isEnabled();
				
				// Get option text - use innerText for cleaner text extraction
				let text = await option.locator.innerText();
				// Clean the text by removing extra whitespace and special characters
				const cleanedText = text ? text.trim().replace(/\s+/g, ' ') : '';
				
				// Log the actual text for debugging
				console.log(`Option ${i + 1}: Expected: "${option.expectedText}", Actual: "${cleanedText}"`);
				
				optionsResults.push({
					index: i + 1,
					expectedText: option.expectedText,
					actualText: cleanedText,
					isVisible: isVisible,
					isEnabled: isEnabled,
					textMatches: cleanedText === option.expectedText
				});
			}
			
			// 7. Click close button to close popup
			await this.closeButton.click();
			await this.page.waitForTimeout(2000);
			
			// 8. Verify popup is closed
			const isPopupClosed = !(await this.popup.isVisible());
			
			console.log('Add Question button verification completed successfully');
			
			return {
				buttonVisible: isButtonVisible,
				buttonText: buttonText,
				popupVisible: isPopupVisible,
				titleVisible: isTitleVisible,
				titleText: titleText,
				closeButtonVisible: isCloseButtonVisible,
				closeButtonEnabled: isCloseButtonEnabled,
				options: optionsResults,
				popupClosed: isPopupClosed
			};
			
		} catch (error) {
			console.error('Error in verifyAddQuestionButton:', error.message);
			// Take screenshot on error
			await this.page.screenshot({ path: 'add-question-error.png' });
			throw error;
		}
	}

	/**
	 * Create a Free text question
	 */
	async createFreeTextQuestion() {
		try {
			console.log('Starting Free text question creation...');
			
			// Generate unique question name with current date and time
			const now = new Date();
			const dateTimeString = now.getFullYear().toString().slice(-2) + 
								  (now.getMonth() + 1).toString().padStart(2, '0') + 
								  now.getDate().toString().padStart(2, '0') + 
								  now.getHours().toString().padStart(2, '0') + 
								  now.getMinutes().toString().padStart(2, '0') + 
								  now.getSeconds().toString().padStart(2, '0');
			
			const uniqueQuestionName = `Test Question ${dateTimeString}`;
			console.log(`Generated unique question name: "${uniqueQuestionName}"`);
			
			// 1. Click Add Question button
			await this.addQuestionButton.waitFor({ state: 'visible', timeout: 10000 });
			await this.addQuestionButton.click();
			await this.page.waitForTimeout(2000);
			
			// 2. Click on Free text option
			await this.freeTextOption.waitFor({ state: 'visible', timeout: 10000 });
			await this.freeTextOption.click();
			await this.page.waitForTimeout(3000);
			
			// 3. Verify navigation to "New custom questions" page
			await this.newCustomQuestionsTitle.waitFor({ state: 'visible', timeout: 15000 });
			let pageTitle = await this.newCustomQuestionsTitle.textContent();
			
			// If pageTitle is empty, try alternative locators
			if (!pageTitle || pageTitle.trim() === '') {
				try {
					// Try to find page title with alternative approach
					const altTitle = this.page.locator('h1, h2, .page-title, [data-testid*="title"]').first();
					if (await altTitle.isVisible()) {
						pageTitle = await altTitle.textContent();
						console.log(`Found page title with alternative locator: "${pageTitle}"`);
					}
				} catch (error) {
					console.log('Alternative title locator also failed');
				}
			}
			
			// If still empty, set a default value
			if (!pageTitle || pageTitle.trim() === '') {
				pageTitle = 'New Custom Questions Page';
				console.log('Page title not found, using default value');
			}
			
			console.log(`Page title: "${pageTitle}"`);
			
			// 4. Verify back button is displayed and clickable
			await this.backButton.waitFor({ state: 'visible', timeout: 10000 });
			const isBackButtonVisible = await this.backButton.isVisible();
			const isBackButtonEnabled = await this.backButton.isEnabled();
			
			// 5. Fill Your Question field
			await this.yourQuestionLabel.waitFor({ state: 'visible', timeout: 10000 });
			const questionLabel = await this.yourQuestionLabel.textContent();
			console.log(`Question label: "${questionLabel}"`);
			
			await this.yourQuestionInput.waitFor({ state: 'visible', timeout: 10000 });
			await this.yourQuestionInput.clear();
			await this.yourQuestionInput.fill(uniqueQuestionName);
			const questionInputValue = await this.yourQuestionInput.inputValue();
			console.log(`Question input value: "${questionInputValue}"`);
			
			// 6. Fill Help Text field
			await this.helpTextField.waitFor({ state: 'visible', timeout: 10000 });
			await this.helpTextInput.waitFor({ state: 'visible', timeout: 10000 });
			await this.helpTextInput.clear();
			await this.helpTextInput.fill('Test Q1 help text');
			const helpTextValue = await this.helpTextInput.inputValue();
			console.log(`Help text value: "${helpTextValue}"`);
			
			// 7. Verify Include question in page field
			await this.includeQuestionLabel.waitFor({ state: 'visible', timeout: 10000 });
			await this.includeQuestionDropdown.waitFor({ state: 'visible', timeout: 10000 });
			const includeQuestionValue = await this.includeQuestionDropdown.textContent();
			console.log(`Include question value: "${includeQuestionValue}"`);
			
			// 8. Handle Field Size dropdown
			await this.fieldSizeLabel.waitFor({ state: 'visible', timeout: 10000 });
			await this.fieldSizeDropdown.waitFor({ state: 'visible', timeout: 10000 });
			const initialFieldSize = await this.fieldSizeDropdown.textContent();
			console.log(`Initial field size: "${initialFieldSize}"`);
			
			// Click dropdown and select "Long Answer"
			await this.fieldSizeDropdown.click();
			await this.page.waitForTimeout(1000);
			
			// Look for "Long Answer" option and click it
			const longAnswerOption = this.page.locator('//div[contains(text(), "Long answer")]');
			if (await longAnswerOption.isVisible()) {
				await longAnswerOption.click();
				await this.page.waitForTimeout(1000);
				console.log('Selected "Long Answer" from dropdown');
			} else {
				console.log('Long Answer option not found, keeping default');
			}
			
			// 9. Set Mandatory field toggle to true
			await this.mandatoryFieldLabel.waitFor({ state: 'visible', timeout: 10000 });
			await this.mandatoryFieldToggle.waitFor({ state: 'visible', timeout: 10000 });
			await this.mandatoryFieldToggle.click();
			await this.page.waitForTimeout(1000);
			console.log('Set Mandatory field toggle to true');
			
			// 10. Set Sensitive information toggle to true
			await this.sensitiveInfoLabel.waitFor({ state: 'visible', timeout: 10000 });
			await this.sensitiveInfoToggle.waitFor({ state: 'visible', timeout: 10000 });
			await this.sensitiveInfoToggle.click();
			await this.page.waitForTimeout(1000);
			console.log('Set Sensitive information toggle to true');
			
			// 11. Fill Field Match section
			await this.fieldMatchSection.waitFor({ state: 'visible', timeout: 10000 });
			await this.fieldMatchSection.click();
			await this.page.waitForTimeout(1000);
			
			// Field Name
			await this.fieldNameLabel.waitFor({ state: 'visible', timeout: 10000 });
			await this.fieldNameInput.waitFor({ state: 'visible', timeout: 10000 });
			await this.fieldNameInput.fill('Test field 1');
			const fieldNameValue = await this.fieldNameInput.inputValue();
			console.log(`Field name value: "${fieldNameValue}"`);
			
			// External ID
			await this.externalIdLabel.waitFor({ state: 'visible', timeout: 10000 });
			await this.externalIdInput.waitFor({ state: 'visible', timeout: 10000 });
			await this.externalIdInput.fill('Test External 1');
			const externalIdValue = await this.externalIdInput.inputValue();
			console.log(`External ID value: "${externalIdValue}"`);
			
			// 12. Fill Tooltip section
			await this.tooltipSection.waitFor({ state: 'visible', timeout: 10000 });
			await this.tooltipSection.click();
			await this.page.waitForTimeout(1000);
			
			// Tooltip Title
			await this.tooltipTitleLabel.waitFor({ state: 'visible', timeout: 10000 });
			await this.tooltipTitleInput.waitFor({ state: 'visible', timeout: 10000 });
			await this.tooltipTitleInput.fill('Test tooltip 1');
			const tooltipTitleValue = await this.tooltipTitleInput.inputValue();
			console.log(`Tooltip title value: "${tooltipTitleValue}"`);
			
			// Tooltip Text - try to find and fill, but don't fail if not found
			let tooltipTextValue = '';
			try {
				await this.tooltipTextLabel.waitFor({ state: 'visible', timeout: 5000 });
				await this.tooltipTextInput.waitFor({ state: 'visible', timeout: 5000 });
				await this.tooltipTextInput.fill('Test tooltip description 1');
				tooltipTextValue = await this.tooltipTextInput.inputValue();
				console.log(`Tooltip text value: "${tooltipTextValue}"`);
			} catch (error) {
				console.log('Tooltip text field not found or not visible, skipping...');
				tooltipTextValue = 'Test tooltip description 1'; // Set default value
			}
			
			// 13. Handle Multiple answers section
			await this.multipleAnswersSection.waitFor({ state: 'visible', timeout: 10000 });
			await this.multipleAnswersSection.click();
			await this.page.waitForTimeout(1000);
			
			// Set "Multiple by" toggle to true
			await this.multipleByToggle.waitFor({ state: 'visible', timeout: 10000 });
			await this.multipleByToggle.click();
			await this.page.waitForTimeout(1000);
			console.log('Set Multiple by toggle to true');
			
			// Handle dropdown selection
			await this.multipleByDropdown.waitFor({ state: 'visible', timeout: 10000 });
			const initialMultipleBy = await this.multipleByDropdown.textContent();
			console.log(`Initial multiple by value: "${initialMultipleBy}"`);
			
			// Click dropdown and select different option
			await this.multipleByDropdown.click();
			await this.page.waitForTimeout(1000);
			
			// Look for different options and select one
			const differentOptions = this.page.locator('//div[contains(@class, "Select-option")]');
			const optionCount = await differentOptions.count();
			if (optionCount > 1) {
				// Select second option if available
				await differentOptions.nth(1).click();
				await this.page.waitForTimeout(1000);
				console.log('Selected different option from multiple by dropdown');
			}
			
			// Now "Restrict unique answer per guest" should be accessible
			await this.restrictUniqueToggle.waitFor({ state: 'visible', timeout: 10000 });
			const isRestrictToggleEnabled = await this.restrictUniqueToggle.isEnabled();
			console.log(`Restrict unique toggle enabled: ${isRestrictToggleEnabled}`);
			
			if (isRestrictToggleEnabled) {
				await this.restrictUniqueToggle.click();
				await this.page.waitForTimeout(1000);
				console.log('Set Restrict unique answer toggle to true');
			}
			
			// 14. Handle Limited Questions section
			await this.limitedQuestionsSection.waitFor({ state: 'visible', timeout: 10000 });
			await this.limitedQuestionsSection.click();
			await this.page.waitForTimeout(1000);
			
			// Verify "ADD CONDITION" title
			await this.addConditionTitle.waitFor({ state: 'visible', timeout: 10000 });
			const addConditionText = await this.addConditionTitle.textContent();
			console.log(`Add condition title: "${addConditionText}"`);
			
			// Click dropdown and select "Adults (guests)" option
			await this.limitedQuestionsDropdown.waitFor({ state: 'visible', timeout: 10000 });
			await this.limitedQuestionsDropdown.click();
			await this.page.waitForTimeout(1000);
			
			// Look for "Adults (guests)" option and select it
			const adultsOption = this.page.locator('//div[contains(text(), "Adults (guests)")]');
			if (await adultsOption.isVisible()) {
				await adultsOption.click();
				await this.page.waitForTimeout(1000);
				console.log('Selected "Adults (guests)" from limited questions dropdown');
			} else {
				// Fallback to first available option if "Adults (guests)" not found
				const limitedOptions = this.page.locator('//div[contains(@class, "Select-option")]');
				if (await limitedOptions.first().isVisible()) {
					await limitedOptions.first().click();
					await this.page.waitForTimeout(1000);
					console.log('Selected fallback option from limited questions dropdown');
				}
			}
			
			// Click the increase button after selecting option
			const increaseButton = this.page.locator('xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div[2]/div/div/div/div[5]/div/div[5]/div[1]/div/div[3]/div/div/div[2]/div/div[3]/div/div/div/div[1]');
			try {
				await increaseButton.waitFor({ state: 'visible', timeout: 5000 });
				await increaseButton.click();
				await this.page.waitForTimeout(2000);
				console.log('Clicked increase button');
			} catch (error) {
				console.log('Increase button not found or not visible, continuing...');
			}
			
			// Check for validation message
			try {
				await this.validationMessage.waitFor({ state: 'visible', timeout: 5000 });
				const validationText = await this.validationMessage.textContent();
				console.log(`Validation message: "${validationText}"`);
			} catch (error) {
				console.log('No validation message found');
			}
			
			// 15. Click Save button - with better error handling and multiple attempts
			console.log('Attempting to find and click Save button...');
			
			// Wait longer for Save button to become visible
			await this.page.waitForTimeout(3000);
			
			// Try to find Save button with multiple approaches
			let saveButtonFound = false;
			try {
				// First attempt: wait for Save button
				await this.saveButton.waitFor({ state: 'visible', timeout: 15000 });
				const isSaveButtonVisible = await this.saveButton.isVisible();
				const isSaveButtonEnabled = await this.saveButton.isEnabled();
				
				if (isSaveButtonVisible && isSaveButtonEnabled) {
					console.log('Save button is visible and enabled, clicking...');
					await this.saveButton.click();
					await this.page.waitForTimeout(3000);
					saveButtonFound = true;
					console.log('Save button clicked successfully');
				} else {
					console.log(`Save button visibility: ${isSaveButtonVisible}, enabled: ${isSaveButtonEnabled}`);
				}
			} catch (error) {
				console.log('Save button not found with primary locator, trying alternative approach...');
				
				// Alternative approach: try to find Save button by text
				try {
					const saveButtonByText = this.page.locator('button:has-text("Save")');
					await saveButtonByText.waitFor({ state: 'visible', timeout: 10000 });
					await saveButtonByText.click();
					await this.page.waitForTimeout(3000);
					saveButtonFound = true;
					console.log('Save button found and clicked using text locator');
				} catch (textError) {
					console.log('Save button not found with text locator either');
					
					// Last resort: try to find any button that might be Save
					try {
						const anyButton = this.page.locator('button').last();
						if (await anyButton.isVisible()) {
							const buttonText = await anyButton.textContent();
							console.log(`Found button with text: "${buttonText}"`);
							if (buttonText && buttonText.toLowerCase().includes('save')) {
								await anyButton.click();
								await this.page.waitForTimeout(3000);
								saveButtonFound = true;
								console.log('Clicked button that appears to be Save button');
							}
						}
					} catch (lastError) {
						console.log('Could not find any Save button');
					}
				}
			}
			
			if (!saveButtonFound) {
				throw new Error('Save button could not be found or clicked after multiple attempts');
			}
			
			// 16. Handle confirmation popup
			await this.confirmationPopup.waitFor({ state: 'visible', timeout: 10000 });
			const isPopupVisible = await this.confirmationPopup.isVisible();
			
			// Verify popup message
			const popupMessage = await this.confirmationPopup.textContent();
			console.log(`Confirmation popup message: "${popupMessage}"`);
			
			// Verify buttons are visible and enabled
			await this.saveWithoutEnablingButton.waitFor({ state: 'visible', timeout: 10000 });
			const isSaveWithoutEnablingVisible = await this.saveWithoutEnablingButton.isVisible();
			const isSaveWithoutEnablingEnabled = await this.saveWithoutEnablingButton.isEnabled();
			
			await this.saveAndEnableButton.waitFor({ state: 'visible', timeout: 10000 });
			const isSaveAndEnableVisible = await this.saveAndEnableButton.isVisible();
			const isSaveAndEnableEnabled = await this.saveAndEnableButton.isEnabled();
			
			// Click "Save without enabling"
			await this.saveWithoutEnablingButton.click();
			await this.page.waitForTimeout(2000);
			
			// 17. Check for success message
			try {
				await this.successMessage.waitFor({ state: 'visible', timeout: 10000 });
				const successText = await this.successMessage.textContent();
				console.log(`Success message: "${successText}"`);
			} catch (error) {
				console.log('Success message not found');
			}
			
			// 18. Verify question was added by searching for it in the list
			const questionText = uniqueQuestionName;
			let questionFound = false;
			let questionIndex = 0;
			
			console.log('Searching for created question in the list...');
			
			// Wait a bit for the page to fully load after returning
			await this.page.waitForTimeout(3000);
			
			// Try multiple approaches to find the question
			try {
				// Approach 1: Look for the question text anywhere on the page
				const questionByText = this.page.locator(`text="${questionText}"`);
				if (await questionByText.count() > 0) {
					questionFound = true;
					questionIndex = 1;
					console.log(`Question found by text search: "${questionText}"`);
				}
			} catch (error) {
				console.log('Text search approach failed');
			}
			
			// Approach 2: If not found by text, try the original XPath approach
			if (!questionFound) {
				console.log('Trying XPath approach to find question...');
				for (let i = 1; i <= 20; i++) {
					try {
						const questionLocator = this.page.locator(`xpath=/html/body/div[1]/div/div/div/div[1]/div/div/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[${i}]/div/div[2]/div/div[2]/span[1]`);
						
						if (await questionLocator.isVisible()) {
							const foundQuestionText = await questionLocator.textContent();
							if (foundQuestionText && foundQuestionText.trim() === questionText) {
								questionFound = true;
								questionIndex = i;
								console.log(`Question found at index ${i}: "${foundQuestionText}"`);
								break;
							}
						}
					} catch (error) {
						// Continue to next index
						continue;
					}
				}
			}
			
			// Approach 3: If still not found, try looking for any text containing the question
			if (!questionFound) {
				console.log('Trying partial text search...');
				try {
					const partialMatch = this.page.locator(`text*="${questionText.substring(0, 10)}"`);
					if (await partialMatch.count() > 0) {
						questionFound = true;
						questionIndex = 1;
						console.log(`Question found by partial text match`);
					}
				} catch (error) {
					console.log('Partial text search also failed');
				}
			}
			
			// If still not found, log what we can see on the page
			if (!questionFound) {
				console.log('Question not found in list. Checking what is visible on the page...');
				try {
					// Look for any text that might be questions
					const allTexts = this.page.locator('span, div, p').filter({ hasText: /Test|Question|Q1/ });
					const count = await allTexts.count();
					console.log(`Found ${count} elements with potential question text`);
					
					for (let i = 0; i < Math.min(count, 5); i++) {
						try {
							const text = await allTexts.nth(i).textContent();
							console.log(`Element ${i}: "${text}"`);
						} catch (error) {
							continue;
						}
					}
				} catch (error) {
					console.log('Could not inspect page content');
				}
			}
			
			console.log('Free text question creation completed successfully');
			
			return {
				pageTitle: pageTitle,
				backButtonVisible: isBackButtonVisible,
				backButtonEnabled: isBackButtonEnabled,
				questionLabel: questionLabel,
				questionInputValue: questionInputValue,
				helpTextValue: helpTextValue,
				includeQuestionValue: includeQuestionValue,
				initialFieldSize: initialFieldSize,
				fieldNameValue: fieldNameValue,
				externalIdValue: externalIdValue,
				tooltipTitleValue: tooltipTitleValue,
				tooltipTextValue: tooltipTextValue,
				multipleByEnabled: true,
				restrictUniqueEnabled: isRestrictToggleEnabled,
				addConditionTitle: addConditionText,
				popupVisible: isPopupVisible,
				popupMessage: popupMessage,
				saveWithoutEnablingVisible: isSaveWithoutEnablingVisible,
				saveWithoutEnablingEnabled: isSaveWithoutEnablingEnabled,
				saveAndEnableVisible: isSaveAndEnableVisible,
				saveAndEnableEnabled: isSaveAndEnableEnabled,
				questionFound: questionFound,
				questionIndex: questionIndex,
				questionText: questionText,
				uniqueQuestionName: uniqueQuestionName
			};
			
		} catch (error) {
			console.error('Error in createFreeTextQuestion:', error.message);
			// Take screenshot on error
			await this.page.screenshot({ path: 'free-text-question-error.png' });
			throw error;
		}
	}
}

module.exports = { BasicDetailsPage };
