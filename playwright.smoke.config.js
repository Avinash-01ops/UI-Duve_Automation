const base = require('./playwright.config');
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
	...base,
	testDir: 'src/tests/smoke',
	workers: 1,
	timeout: 120_000,
	expect: { timeout: 20_000 },
	globalSetup: require.resolve('./global-setup'),
	use: {
		...base.use,
		headless: false,
		slowMo: process.env.PW_SLOWMO ? Number(process.env.PW_SLOWMO) : 300,
		actionTimeout: 15_000,
		navigationTimeout: 60_000,
		trace: 'off',
		screenshot: 'off',
		video: 'off'
	},
	projects: [
		{ name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome', storageState: require('./src/config/credentials').storageStatePath } }
	]
};


