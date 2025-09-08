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
	
	try {
		console.log('Starting login process...');
		await loginPage.open();
		console.log('Login page opened');
		
		await loginPage.login(creds.username, creds.password);
		console.log('Credentials entered');
		
		await loginPage.completeTwoFactor('121212');
		console.log('2FA completed');
		
		await loginPage.waitForDashboard();
		console.log('Dashboard reached successfully');
	} catch (error) {
		console.error('Login failed:', error.message);
		console.log('Current page URL:', page.url());
		throw error;
	}

	// Ensure directory exists before saving state
	try {
		fs.mkdirSync(path.dirname(creds.storageStatePath), { recursive: true });
	} catch (_) { /* ignore */ }
	await context.storageState({ path: creds.storageStatePath });
	await browser.close();
};


