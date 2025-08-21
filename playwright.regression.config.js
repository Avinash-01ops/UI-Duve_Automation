const base = require('./playwright.config');
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
	...base,
	timeout: 120_000,
	testDir: 'src/tests/regression',
	fullyParallel: true,
	workers: 2,
	globalSetup: require.resolve('./global-setup'),
	use: {
		...base.use,
		headless: false,
		storageState: require('./src/config/credentials').storageStatePath,
		actionTimeout: 15_000,
		navigationTimeout: 60_000,
		launchOptions: {
			...(base.use && base.use.launchOptions ? base.use.launchOptions : {}),
			slowMo: process.env.PW_SLOWMO ? Number(process.env.PW_SLOWMO) : 300
		}
	},
	projects: [
		{ name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } }
	]
};


