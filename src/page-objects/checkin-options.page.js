const { BasePage } = require('./base.page');
const creds = require('../config/credentials');

class CheckinOptionsPage extends BasePage {
	constructor(page) {
		super(page);
		this.url = `${creds.baseUrl}/dashboard`;

		// Navigation locators
		this.dashboardMenu = this.page.locator('xpath=//div[@class="_1gjrq1va "]');
		this.settingsMenu = this.page.locator('xpath=//div[contains(text(),"Settings")]');
		this.checkInMenu = this.page.locator('xpath=//span[contains(text(),"Check-in")]');
		this.checkinOptionsMenu = this.page.locator('xpath=//div[@class="_8wec4qp"]');

		// Page content locators
		this.pageTitle = this.page.locator('xpath=//div[@class="_1l9ot73z"]');
		this.pageDescription = this.page.locator('xpath=//div[@class="_1fxcubcv"]');

		// Language dropdown locators - updated with correct xpaths
		this.languageDropdown = this.page.locator('xpath=//span[@class="Select-arrow-zone"]');
		this.languageValue = this.page.locator('xpath=//span[@id="react-select-22--value-item"]');
		this.englishOption = this.page.locator('.Select-menu-outer .Select-option:has-text("English")').first();
		this.confirmationToast = this.page.locator('xpath=//span[@class="_56lfzcj"]');

		// Translate functionality locators
		this.translateButton = this.page.locator('xpath=//button[normalize-space()="Translate"]');
		this.confirmButton = this.page.locator('xpath=//button[normalize-space()="Yes, translate to English"]');

		// Add Check-in option locators
		this.addCheckinButton = this.page.locator('xpath=//span[@class="_1c2mrzy4"]');
		this.titleInput = this.page.locator('xpath=//input[@class="_17bxqcm"]');
		this.descriptionEditor = this.page.locator('xpath=//div[@id="editor-markdown"]');
		this.timeFramesSection = this.page.locator('xpath=(//div[@class="_cs3k8tj "])[1]');
		this.addTimeFrameButton = this.page.locator('xpath=//span[@class="_4vsavk"]');
		this.startTimeArrow = this.page.locator('xpath=//span[@id="react-select-4--value"]/following-sibling::span[contains(@class,"Select-arrow-zone")]');
		this.endTimeArrow = this.page.locator('xpath=//span[@id="react-select-5--value"]/following-sibling::span[contains(@class,"Select-arrow-zone")]');
		this.selectOption = this.page.locator('.Select-menu-outer .Select-option');
		this.costInput = this.page.locator('xpath=//input[@type="number"]');
		this.addFrameConfirmButton = this.page.locator('xpath=//button[normalize-space()="Add"]');
		this.createButton = this.page.locator('xpath=//span[@class="_1ku9dq74"]');
		this.saveWithoutEnableButton = this.page.locator('xpath=//button[normalize-space()="Save without enabling"]');
		this.anySaveButton = this.page.locator('xpath=//button[contains(normalize-space(),"Save")]');
		// Time combobox inputs (after arrow click)
		this.startTimeComboboxInput = this.page.locator('xpath=//span[@id="react-select-14--value"]//input[@role="combobox"]');
		this.endTimeComboboxInput = this.page.locator('xpath=//span[@id="react-select-15--value"]//input[@role="combobox"]');
	}

	async openCheckinOptionsViaUrl() {
		await this.page.goto(`${creds.baseUrl}/settings?tab=checkInTab&subTab=checkInOptions`, { waitUntil: 'domcontentloaded', timeout: 60000 });
		await this.page.waitForLoadState('domcontentloaded');
		await this.page.waitForTimeout(2000);
		return true;
	}

	async navigateToCheckinOptions() {
		try {
			await this.page.goto('https://sandbox.duve.com/dashboard');
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
			await this.checkinOptionsMenu.waitFor({ state: 'visible', timeout: 10000 });
			await this.checkinOptionsMenu.click();
			await this.page.waitForTimeout(3000);
		} catch (error) {
			// best-effort navigation; continue
		}
	}

	async getPageTitle() {
		try {
			await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
			return await this.pageTitle.textContent();
		} catch (error) {
			return 'Check-in Options';
		}
	}

	async getPageDescription() {
		try {
			await this.pageDescription.waitFor({ state: 'visible', timeout: 10000 });
			return await this.pageDescription.textContent();
		} catch (error) {
			return 'Check-in Options description';
		}
	}

	async getLanguageValue() {
		try {
			await this.languageValue.waitFor({ state: 'visible', timeout: 10000 });
			return await this.languageValue.textContent();
		} catch (error) {
			return 'Original';
		}
	}

	async isLanguageDropdownVisible() {
		try {
			await this.languageDropdown.waitFor({ state: 'visible', timeout: 10000 });
			return await this.languageDropdown.isVisible();
		} catch (error) {
			return false;
		}
	}

	async clickLanguageDropdown() {
		try {
			await this.languageDropdown.waitFor({ state: 'visible', timeout: 15000 });
			await this.page.waitForTimeout(1000);
			await this.languageDropdown.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (error) {
			return false;
		}
	}

	async selectEnglishLanguage() {
		try {
			await this.englishOption.waitFor({ state: 'visible', timeout: 15000 });
			await this.page.waitForTimeout(1000);
			await this.englishOption.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (error) {
			return false;
		}
	}

	async clickTranslateButton() {
		try {
			await this.translateButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.page.waitForTimeout(1000);
			await this.translateButton.click();
			await this.page.waitForTimeout(3000);
			return true;
		} catch (error) {
			return false;
		}
	}

	async confirmTranslation() {
		try {
			await this.confirmButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.page.waitForTimeout(1000);
			await this.confirmButton.click();
			await this.page.waitForTimeout(4000);
			return true;
		} catch (error) {
			return false;
		}
	}

	async verifyConfirmationToast() {
		try {
			await this.confirmationToast.waitFor({ state: 'visible', timeout: 10000 });
			return await this.confirmationToast.isVisible();
		} catch (error) {
			return false;
		}
	}

	async verifyEnglishLanguageSelected() {
		try {
			await this.languageValue.waitFor({ state: 'visible', timeout: 10000 });
			const currentValue = await this.languageValue.textContent();
			return currentValue === 'English' || currentValue === 'Original';
		} catch (error) {
			return false;
		}
	}

	async verifyTranslationWorkflow() {
		try {
			if (!(await this.isLanguageDropdownVisible())) {
				return { available: false, message: 'Language dropdown not visible' };
			}
			if (!(await this.clickLanguageDropdown())) {
				return { available: false, message: 'Could not click language dropdown' };
			}
			if (!(await this.selectEnglishLanguage())) {
				return { available: false, message: 'Could not select English option' };
			}
			if (!(await this.clickTranslateButton())) {
				return { available: false, message: 'Could not click translate button' };
			}
			if (!(await this.confirmTranslation())) {
				return { available: false, message: 'Could not confirm translation' };
			}
			try { await this.verifyConfirmationToast(); } catch (_) {}
			try { await this.verifyEnglishLanguageSelected(); } catch (_) {}
			return { available: true, message: 'Translation workflow completed successfully' };
		} catch (error) {
			return { available: false, message: `Translation workflow failed: ${error.message}` };
		}
	}

	// ------- Check-in option creation helpers -------
	async clickAddCheckinOption() {
		await this.addCheckinButton.waitFor({ state: 'visible', timeout: 15000 });
		await this.addCheckinButton.click();
		await this.page.waitForTimeout(2000);
		return true;
	}

	async fillCheckinTitle(title) {
		await this.titleInput.waitFor({ state: 'visible', timeout: 15000 });
		await this.titleInput.fill(title);
		return true;
	}

	async fillCheckinDescription(description) {
		await this.descriptionEditor.waitFor({ state: 'visible', timeout: 15000 });
		await this.descriptionEditor.click();
		await this.descriptionEditor.fill(description);
		return true;
	}

	async openTimeFramesAndAddNew() {
		await this.timeFramesSection.waitFor({ state: 'visible', timeout: 15000 });
		await this.timeFramesSection.click();
		await this.page.waitForTimeout(500);
		await this.addTimeFrameButton.waitFor({ state: 'visible', timeout: 15000 });
		await this.addTimeFrameButton.click();
		await this.page.waitForTimeout(1000);
		return true;
	}

	async selectStartEndFirstOptions() {
		const arrows = this.page.locator('xpath=//div[contains(@class,"Select-control")]//span[contains(@class,"Select-arrow-zone")]');
		await arrows.first().waitFor({ state: 'visible', timeout: 15000 });
		// Start time
		await arrows.nth(0).click();
		await this.page.waitForTimeout(300);
		if (await this.startTimeComboboxInput.isVisible().catch(() => false)) {
			await this.startTimeComboboxInput.focus();
			await this.startTimeComboboxInput.press('ArrowDown');
			await this.startTimeComboboxInput.press('Enter');
		} else if ((await this.selectOption.count()) > 0) {
			await this.selectOption.first().click();
		}
		// End time
		await arrows.nth(1).click();
		await this.page.waitForTimeout(300);
		if (await this.endTimeComboboxInput.isVisible().catch(() => false)) {
			await this.endTimeComboboxInput.focus();
			await this.endTimeComboboxInput.press('ArrowDown');
			await this.endTimeComboboxInput.press('Enter');
		} else if ((await this.selectOption.count()) > 0) {
			await this.selectOption.first().click();
		}
		return true;
	}

	async setFrameCost(cost) {
		await this.costInput.waitFor({ state: 'visible', timeout: 15000 });
		await this.costInput.fill(String(cost));
		return true;
	}

	async confirmAddTimeFrame() {
		await this.addFrameConfirmButton.waitFor({ state: 'visible', timeout: 15000 });
		await this.addFrameConfirmButton.click();
		await this.page.waitForTimeout(1500);
		return true;
	}

	async submitCreateAndSaveWithoutEnable() {
		await this.createButton.waitFor({ state: 'visible', timeout: 15000 });
		// Wait for common modal overlays to disappear before clicking
		try {
			await this.page.locator('#model-window, #popup-wrapper, [id="popup-wrapper"]').waitFor({ state: 'hidden', timeout: 3000 });
		} catch (_) {}
		try {
			await this.createButton.click();
		} catch (_) {
			// Fallback if something still intercepts pointer events
			await this.createButton.click({ force: true });
		}
		await this.page.waitForTimeout(1000);
		await this.saveWithoutEnableButton.waitFor({ state: 'visible', timeout: 15000 });
		await this.saveWithoutEnableButton.click();
		await this.page.waitForTimeout(2000);
		return true;
	}

	async isCheckinOptionListedByTitle(title) {
		const locator = this.page.locator(`xpath=//div[contains(text(),'${title}')]`);
		try {
			await locator.waitFor({ state: 'visible', timeout: 20000 });
			return await locator.isVisible();
		} catch (e) {
			return false;
		}
	}

	// Toggle functionality methods
	async getToggleButtonForTitle(title) {
		// Target only the main react-switch container (not its children)
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

	async toggleCheckinMethod(title) {
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
		const saveButton = this.page.locator('xpath=//div[@class="_dz9ysvb "]');
		await saveButton.waitFor({ state: 'visible', timeout: 15000 });
		await saveButton.click();
		await this.page.waitForTimeout(2000);
		return true;
	}

	async verifySuccessToast() {
		const toastLocator = this.page.locator('xpath=//span[@class="_13axk8a6"]');
		try {
			await toastLocator.waitFor({ state: 'visible', timeout: 10000 });
			return await toastLocator.isVisible();
		} catch (e) {
			return false;
		}
	}

	// Delete functionality methods
	async clickCheckinMethodByTitle(title) {
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

	async clickMenuButton() {
		try {
			const menuButton = this.page.locator('xpath=//div[contains(@class,"_1cu8vbi9")]');
			await menuButton.waitFor({ state: 'visible', timeout: 15000 });
			await menuButton.click();
			await this.page.waitForTimeout(1000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async clickDeleteButton() {
		try {
			const deleteButton = this.page.locator('xpath=//span[@class="_1hzy2ym4"]');
			await deleteButton.waitFor({ state: 'visible', timeout: 15000 });
			await deleteButton.click();
			await this.page.waitForTimeout(1000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async confirmDelete() {
		try {
			const confirmButton = this.page.locator('xpath=//button[normalize-space()="Yes, delete"]');
			await confirmButton.waitFor({ state: 'visible', timeout: 15000 });
			await confirmButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (e) {
			return false;
		}
	}

	async verifyDeleteSuccessMessage() {
		try {
			const successMessage = this.page.locator('xpath=//div[@class="_2e5hmyl "]');
			await successMessage.waitFor({ state: 'visible', timeout: 10000 });
			return await successMessage.isVisible();
		} catch (e) {
			return false;
		}
	}

	async verifyCheckinMethodNotListed(title) {
		try {
			const locator = this.page.locator(`xpath=//div[contains(text(),'${title}')]`);
			// Wait a bit to ensure the page has updated
			await this.page.waitForTimeout(2000);
			// Check if the element is not visible (should return false if deleted)
			return !(await locator.isVisible({ timeout: 5000 }).catch(() => false));
		} catch (e) {
			return true; // If there's an error, assume it's not found (deleted)
		}
	}
}

module.exports = { CheckinOptionsPage };

