const base = require('./playwright.config');
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
	...base,
	projects: [
		{ name: 'Mobile Chrome', use: { ...devices['Pixel 7'] } },
		{ name: 'Mobile Safari', use: { ...devices['iPhone 14'] } }
	]
};


