const { BasePage } = require('./base.page');
const creds = require('../config/credentials');

class SmartEarlyCheckinPage extends BasePage {
	constructor(page) {
		super(page);
		this.url = `${creds.baseUrl}/dashboard`;

		// Navigation locators
		this.dashboardMenu = this.page.locator('xpath=//div[@class="_1gjrq1va "]');
		this.settingsMenu = this.page.locator('xpath=//div[contains(text(),"Settings")]');
		this.checkInMenu = this.page.locator('xpath=//span[contains(text(),"Check-in")]');
		this.smartEarlyCheckinMenu = this.page.locator('xpath=//div[normalize-space()="Smart early check-in"]');

		// Page content locators
		this.pageTitle = this.page.locator('xpath=//div[@class="_1x2qwkjx"]');
		this.pageDescription = this.page.locator('xpath=//div[@class="_1fxcubcv"]');

		// Translation functionality locators
		this.languageDropdown = this.page.locator('xpath=//div[@class="Select-control"]');
		this.englishOption = this.page.locator('xpath=//div[@class="Select-value" and .//span[text()="English"]]');
		this.translateButton = this.page.locator('xpath=//button[normalize-space()="Translate"]');
		this.confirmTranslateButton = this.page.locator('xpath=//button[normalize-space()="Yes, translate to English"]');
		this.successToast = this.page.locator('xpath=//span[@class="_13axk8a6"]');

		// Add new Smart Early Check-in locators
		this.addNewButton = this.page.locator('xpath=//span[@class="_1c2mrzy4"]');
		this.titleInput = this.page.locator('xpath=//input[@class="_17bxqcm"]');
		this.descriptionInput = this.page.locator('xpath=//div[@id="editor-markdown"]');
		this.timeFrameEditButton = this.page.locator('xpath=//div[contains(@class,"_cs3k8tj")]//i[@class="zmdi zmdi-edit"]');
		this.addNewTimeFrameButton = this.page.locator('xpath=//span[@class="_4vsavk"]');
		this.startTimeDropdown = this.page.locator('xpath=//div[@class="Select is-focused is-open is-searchable Select--single"]//span[@class="Select-arrow"]').first();
		this.endTimeDropdown = this.page.locator('xpath=//div[@class="Select is-focused is-open is-searchable Select--single"]//span[@class="Select-arrow"]').last();
		this.costInput = this.page.locator('xpath=//input[@type="number"]');
		this.addButton = this.page.locator('xpath=//button[normalize-space()="Add"]');
		this.createButton = this.page.locator('xpath=//span[@class="_1ku9dq74"]');
		this.saveWithoutEnablingButton = this.page.locator('xpath=//button[normalize-space()="Save without enabling"]');

		// Toggle functionality locators
		this.toggleButton = this.page.locator('xpath=//div[@class="react-switch "]');
		this.saveButton = this.page.locator('xpath=//div[@class="_dz9ysvb "]');

		// Delete functionality locators
		this.deleteButton = this.page.locator('xpath=//span[@class="_1hzy2ym4"]');
		this.confirmDeleteButton = this.page.locator('xpath=//button[normalize-space()="Yes, delete"]');
		this.deleteSuccessMessage = this.page.locator('xpath=//div[@class="_2e5hmyl "]');
	}

	async openSmartEarlyCheckinViaUrl() {
		await this.page.goto(`${creds.baseUrl}/settings?tab=checkInTab&subTab=smartEarlyCheckin`, { waitUntil: 'domcontentloaded', timeout: 60000 });
		await this.page.waitForLoadState('domcontentloaded');
		await this.page.waitForTimeout(2000);
		return true;
	}

	async navigateToSmartEarlyCheckin() {
		try {
			await this.page.goto(this.url);
			await this.page.waitForLoadState('domcontentloaded');
			await this.page.waitForTimeout(2000);
			await this.dashboardMenu.waitFor({ state: 'visible', timeout: 15000 });
			await this.dashboardMenu.click();
			await this.page.waitForTimeout(2000);
			await this.settingsMenu.waitFor({ state: 'visible', timeout: 10000 });
			await this.settingsMenu.click();
			await this.page.waitForTimeout(2000);
			await this.checkInMenu.waitFor({ state: 'visible', timeout: 10000 });
			await this.checkInMenu.click();
			await this.page.waitForTimeout(2000);
			await this.smartEarlyCheckinMenu.waitFor({ state: 'visible', timeout: 10000 });
			await this.smartEarlyCheckinMenu.click();
			await this.page.waitForTimeout(3000);
			return true;
		} catch (error) {
			return false;
		}
	}

	// Translation functionality methods
	async clickLanguageDropdown() {
		try {
			await this.languageDropdown.waitFor({ state: 'visible', timeout: 15000 });
			await this.languageDropdown.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async selectEnglishOption() {
		try {
			await this.englishOption.waitFor({ state: 'visible', timeout: 10000 });
			await this.englishOption.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async clickTranslateButton() {
		try {
			await this.translateButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.translateButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async confirmTranslation() {
		try {
			await this.confirmTranslateButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.confirmTranslateButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async verifySuccessToast() {
		try {
			await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
			return await this.successToast.isVisible();
		} catch (e) {
			return false;
		}
	}

	async verifyTranslationWorkflow() {
		try {
			// Click language dropdown
			const dropdownClicked = await this.clickLanguageDropdown();
			if (!dropdownClicked) return { available: false, error: 'Language dropdown not found' };

			// Select English option
			const englishSelected = await this.selectEnglishOption();
			if (!englishSelected) return { available: false, error: 'English option not found' };

			// Click translate button
			const translateClicked = await this.clickTranslateButton();
			if (!translateClicked) return { available: false, error: 'Translate button not found' };

			// Confirm translation
			const confirmed = await this.confirmTranslation();
			if (!confirmed) return { available: false, error: 'Confirm button not found' };

			// Verify success toast
			const toastVisible = await this.verifySuccessToast();
			if (!toastVisible) return { available: false, error: 'Success toast not found' };

			return { available: true, success: true };
		} catch (error) {
			return { available: false, error: error.message };
		}
	}

	// Add new Smart Early Check-in methods
	async clickAddNewButton() {
		try {
			await this.addNewButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.addNewButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async fillTitle(title) {
		try {
			await this.titleInput.waitFor({ state: 'visible', timeout: 15000 });
			await this.titleInput.fill(title);
			await this.page.waitForTimeout(1000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async fillDescription(description) {
		try {
			await this.descriptionInput.waitFor({ state: 'visible', timeout: 15000 });
			await this.descriptionInput.fill(description);
			await this.page.waitForTimeout(1000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async clickTimeFrameEditButton() {
		try {
			await this.timeFrameEditButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.timeFrameEditButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async clickAddNewTimeFrameButton() {
		try {
			await this.addNewTimeFrameButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.addNewTimeFrameButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async selectStartEndFirstOptions() {
		try {
			// Select first option for start time
			await this.startTimeDropdown.waitFor({ state: 'visible', timeout: 10000 });
			await this.startTimeDropdown.click();
			await this.page.waitForTimeout(1000);
			
			// Select first option for end time
			await this.endTimeDropdown.waitFor({ state: 'visible', timeout: 10000 });
			await this.endTimeDropdown.click();
			await this.page.waitForTimeout(1000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async setFrameCost(cost) {
		try {
			await this.costInput.waitFor({ state: 'visible', timeout: 15000 });
			await this.costInput.fill(cost.toString());
			await this.page.waitForTimeout(1000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async clickAddButton() {
		try {
			await this.addButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.addButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async clickCreateButton() {
		try {
			await this.createButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.createButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async clickSaveWithoutEnablingButton() {
		try {
			await this.saveWithoutEnablingButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.saveWithoutEnablingButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async isSmartEarlyCheckinListedByTitle(title) {
		try {
			const locator = this.page.locator(`xpath=//div[@class="_1c7jovc0 "]//div[@class="_2nbnyxn "][normalize-space()="${title}"]`);
			await locator.waitFor({ state: 'visible', timeout: 10000 });
			return await locator.isVisible();
		} catch (e) {
			return false;
		}
	}

	// Toggle functionality methods
	async getToggleButtonForTitle(title) {
		const toggleLocator = this.page.locator(`xpath=//div[contains(text(),'${title}')]/ancestor::div[contains(@class,'_1yfxjkoq')]//div[@class='react-switch ']`).first();
		return toggleLocator;
	}

	async getToggleStateForTitle(title) {
		try {
			const input = this.page.locator(`xpath=//div[contains(text(),'${title}')]/ancestor::div[contains(@class,'_1yfxjkoq')]//input[@type='checkbox']`).first();
			await input.waitFor({ state: 'attached', timeout: 10000 });
			const ariaChecked = await input.getAttribute('aria-checked');
			return ariaChecked === 'true';
		} catch (e) {
			return false;
		}
	}

	async toggleSmartEarlyCheckin(title) {
		try {
			const toggleButton = await this.getToggleButtonForTitle(title);
			await toggleButton.scrollIntoViewIfNeeded();
			await toggleButton.waitFor({ state: 'visible', timeout: 15000 });
			await toggleButton.click();
			await this.page.waitForTimeout(1000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async clickSaveButton() {
		try {
			await this.saveButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.saveButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	// Delete functionality methods
	async clickSmartEarlyCheckinByTitle(title) {
		try {
			const methodLocator = this.page.locator(`xpath=//div[contains(text(),'${title}')]`);
			await methodLocator.waitFor({ state: 'visible', timeout: 15000 });
			await methodLocator.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async clickDeleteButton() {
		try {
			await this.deleteButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.deleteButton.click();
			await this.page.waitForTimeout(1000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async confirmDelete() {
		try {
			await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.confirmDeleteButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async verifyDeleteSuccessMessage() {
		try {
			await this.deleteSuccessMessage.waitFor({ state: 'visible', timeout: 10000 });
			return await this.deleteSuccessMessage.isVisible();
		} catch (e) {
			return false;
		}
	}

	async verifySmartEarlyCheckinNotListed(title) {
		try {
			const locator = this.page.locator(`xpath=//div[contains(text(),'${title}')]`);
			await this.page.waitForTimeout(2000);
			return !(await locator.isVisible({ timeout: 5000 }).catch(() => false));
		} catch (e) {
			return true;
		}
	}
}

module.exports = { SmartEarlyCheckinPage };
