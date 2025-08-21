const { chromium } = require('@playwright/test');
const creds = require('./src/config/credentials');
const { LoginPage } = require('./src/page-objects/login.page');
const fs = require('fs');
const path = require('path');

/** @type {import('@playwright/test').GlobalSetup} */
module.exports = async (config) => {
	const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(async () => chromium.launch());
	const context = await browser.newContext();
	const page = await context.newPage();

	// Reuse LoginPage helpers to ensure consistent login and 2FA handling
	const loginPage = new LoginPage(page);
	await loginPage.open();
	await loginPage.login(creds.username, creds.password);
	await loginPage.completeTwoFactor('121212');
	await loginPage.waitForDashboard();

	// Ensure directory exists before saving state
	try {
		fs.mkdirSync(path.dirname(creds.storageStatePath), { recursive: true });
	} catch (_) { /* ignore */ }
	await context.storageState({ path: creds.storageStatePath });
	await browser.close();
};


