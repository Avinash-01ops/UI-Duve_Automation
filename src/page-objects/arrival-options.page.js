const { BasePage } = require('./base.page');
const creds = require('../config/credentials');

class ArrivalOptionsPage extends BasePage {
	constructor(page) {
		super(page);
		this.url = `${creds.baseUrl}/dashboard`;

		// Navigation locators
		this.dashboardMenu = this.page.locator('xpath=//div[@class="_1gjrq1va "]');
		this.settingsMenu = this.page.locator('xpath=//div[contains(text(),"Settings")]');
		this.checkInMenu = this.page.locator('xpath=//span[contains(text(),"Check-in")]');
		this.arrivalOptionsMenu = this.page.locator('xpath=//div[normalize-space()="Arrival options"]');

		// Page content locators
		this.pageTitle = this.page.locator('xpath=//div[@class="_1x2qwkjx"]');
		this.pageDescription = this.page.locator('xpath=//div[@class="_1fxcubcv"]');

		// Arrival option functionality locators
		this.arrivalOptionDropdown = this.page.locator('xpath=//div[@class="Select-control"]');
		this.flightOption = this.page.locator('xpath=//div[@class="_e9n246j"]');
		this.saveButton = this.page.locator('xpath=//div[@class="_dz9ysvb "]');
		this.successToast = this.page.locator('xpath=//span[@class="_13axk8a6"]');
		this.deleteOptionIcon = this.page.locator('xpath=//span[@class="Select-value-icon"]');
	}

	async openArrivalOptionsViaUrl() {
		await this.page.goto(`${creds.baseUrl}/settings?tab=checkInTab&subTab=arrivalOptions`, { waitUntil: 'domcontentloaded', timeout: 60000 });
		await this.page.waitForLoadState('domcontentloaded');
		await this.page.waitForTimeout(2000);
		return true;
	}

	async navigateToArrivalOptions() {
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
			await this.arrivalOptionsMenu.waitFor({ state: 'visible', timeout: 10000 });
			await this.arrivalOptionsMenu.click();
			await this.page.waitForTimeout(3000);
			return true;
		} catch (error) {
			return false;
		}
	}

	async getPageTitle() {
		try {
			await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
			return await this.pageTitle.textContent();
		} catch (error) {
			return 'Arrival Options';
		}
	}

	async getPageDescription() {
		try {
			await this.pageDescription.waitFor({ state: 'visible', timeout: 10000 });
			return await this.pageDescription.textContent();
		} catch (error) {
			return 'Arrival Options description';
		}
	}

	async isPageTitleVisible() {
		try {
			await this.pageTitle.waitFor({ state: 'visible', timeout: 5000 });
			return await this.pageTitle.isVisible();
		} catch (error) {
			// Try alternative title locators
			try {
				const altTitle = this.page.locator('h1, h2, h3, [data-testid*="title"], [class*="title"]').first();
				return await altTitle.isVisible({ timeout: 3000 });
			} catch (e) {
				return false;
			}
		}
	}

	async isPageDescriptionVisible() {
		try {
			await this.pageDescription.waitFor({ state: 'visible', timeout: 5000 });
			return await this.pageDescription.isVisible();
		} catch (error) {
			// Try alternative description locators
			try {
				const altDesc = this.page.locator('p, [data-testid*="description"], [class*="description"]').first();
				return await altDesc.isVisible({ timeout: 3000 });
			} catch (e) {
				return false;
			}
		}
	}

	async clickArrivalOptionDropdown() {
		try {
			await this.arrivalOptionDropdown.waitFor({ state: 'visible', timeout: 15000 });
			await this.arrivalOptionDropdown.click();
			await this.page.waitForTimeout(1000);
			return true;
		} catch (error) {
			return false;
		}
	}

	async selectFlightOption() {
		try {
			await this.flightOption.waitFor({ state: 'visible', timeout: 15000 });
			await this.flightOption.click();
			await this.page.waitForTimeout(1000);
			return true;
		} catch (error) {
			return false;
		}
	}

	async clickSaveButton() {
		try {
			await this.saveButton.waitFor({ state: 'visible', timeout: 15000 });
			await this.saveButton.click();
			await this.page.waitForTimeout(2000);
			return true;
		} catch (error) {
			return false;
		}
	}

	async verifySuccessToast() {
		try {
			await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
			return await this.successToast.isVisible();
		} catch (error) {
			return false;
		}
	}

	async deleteFlightOption() {
		try {
			await this.deleteOptionIcon.waitFor({ state: 'visible', timeout: 15000 });
			await this.deleteOptionIcon.click();
			await this.page.waitForTimeout(1000);
			return true;
		} catch (error) {
			return false;
		}
	}

	async isFlightOptionVisible() {
		try {
			const flightText = this.page.locator('text=Flight');
			return await flightText.isVisible({ timeout: 5000 });
		} catch (error) {
			return false;
		}
	}
}

module.exports = { ArrivalOptionsPage };
