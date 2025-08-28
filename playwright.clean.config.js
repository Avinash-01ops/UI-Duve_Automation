const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
	testDir: 'src/tests/regression',
	timeout: 120_000,
	fullyParallel: true,
	workers: 1,
	use: {
		headless: false,
		actionTimeout: 15_000,
		navigationTimeout: 60_000,
		launchOptions: {
			slowMo: 300
		}
	},
	projects: [
		{ 
			name: 'chrome', 
			use: { 
				...devices['Desktop Chrome'], 
				channel: 'chrome',
				// Aggressively suppress all console messages
				args: [
					'--disable-logging',
					'--disable-dev-shm-usage',
					'--no-sandbox',
					'--disable-setuid-sandbox',
					'--disable-web-security',
					'--disable-features=VizDisplayCompositor',
					'--disable-background-timer-throttling',
					'--disable-backgrounding-occluded-windows',
					'--disable-renderer-backgrounding',
					'--disable-features=TranslateUI',
					'--disable-ipc-flooding-protection',
					'--disable-console-logging',
					'--silent',
					'--disable-default-apps',
					'--disable-extensions',
					'--disable-plugins',
					'--disable-background-networking',
					'--disable-client-side-phishing-detection',
					'--disable-component-update',
					'--disable-domain-reliability',
					'--disable-hang-monitor',
					'--disable-prompt-on-repost',
					'--disable-sync',
					'--force-color-profile=srgb',
					'--metrics-recording-only',
					'--no-first-run',
					'--safebrowsing-disable-auto-update',
					'--enable-automation',
					'--password-store=basic',
					'--use-mock-keychain',
					'--disable-javascript',
					'--disable-images',
					'--disable-css',
					'--disable-animations',
					'--disable-gpu',
					'--disable-software-rasterizer',
					'--disable-threaded-animation',
					'--disable-threaded-scrolling',
					'--disable-checker-imaging',
					'--disable-new-tab-first-run',
					'--disable-translate',
					'--disable-web-resources',
					'--disable-spell-checking',
					'--disable-blink-features=AutomationControlled'
				]
			} 
		}
	],
	// Use minimal reporter
	reporter: [
		['line'],
		['json', { outputFile: 'src/test-results/clean-report.json' }]
	],
	// Suppress console output
	globalSetup: undefined,
	globalTeardown: undefined
};
