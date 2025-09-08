// Temporary Playwright config without global setup
const { devices } = require('@playwright/test');
const path = require('path');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	testDir: 'src/tests',
	reporter: [
		['list'],
		['json', { outputFile: 'src/test-results/report.json' }],
		['html', { open: 'never' }],
		['allure-playwright']
	],
	timeout: 30_000,
	expect: { timeout: 5_000 },
	// globalSetup: require.resolve('./global-setup'), // Temporarily disabled
	outputDir: 'src/test-results',
	use: {
		headless: true,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'off',
		storageState: '.auth/state.json'
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } }
	]
};

module.exports = config;
