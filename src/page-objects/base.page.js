class BasePage {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		this.page = page;
	}

	async goto(url) {
		await this.page.goto(url);
	}
}

module.exports = { BasePage };


