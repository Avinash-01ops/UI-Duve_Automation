const base = require('@playwright/test');
const { LoginPage } = require('../page-objects/login.page');
const creds = require('../config/credentials');
const { createLogger } = require('../utils/logger');

const test = base.test.extend({
	// Worker-scoped context shared by all tests in the worker
	appContext: [async ({ browser }, use) => {
		const context = await browser.newContext({
			storageState: creds.storageStatePath
		});

		// Suppress outbound email triggering during tests by short-circuiting known endpoints
		const shouldDisableEmail = process.env.DISABLE_EMAIL !== '0';
		if (shouldDisableEmail) {
			const emailBlockPatterns = [
				'**/api/**/email**',
				'**/api/**/emails**',
				'**/api/**/mail**',
				'**/notifications/**/email**',
				'**/sendgrid/**',
				'**.sendgrid.com/**',
				'**.mailgun.net/**',
				'**.postmarkapp.com/**',
				'**.amazonaws.com/**ses/**'
			];
			for (const pattern of emailBlockPatterns) {
				await context.route(pattern, (route) => route.fulfill({ status: 204, contentType: 'application/json', body: '{}' }));
			}
		}
		await use(context);
		await context.close();
	}, { scope: 'worker' }],

	// Worker-scoped page (single window) shared by all tests
	appPage: [async ({ appContext }, use, workerInfo) => {
		// workerInfo is available for worker-scoped fixtures
		const safeName = `worker-${workerInfo.parallelIndex}-${workerInfo.project.name}-${Date.now()}.log`;
		const logger = createLogger({ fileName: safeName });
		const page = await appContext.newPage();

		// Attach listeners
		page.on('console', (msg) => logger.console(msg));
		page.on('pageerror', (err) => logger.error('pageerror', { message: err?.message }));
		page.on('request', (req) => logger.debug('request', { method: req.method(), url: req.url() }));
		page.on('response', async (res) => logger.debug('response', { status: res.status(), url: res.url() }));
		page.on('framenavigated', (frame) => {
			if (frame === page.mainFrame()) logger.info('navigated', { url: frame.url() });
		});

		await use(page);
		// Page will be closed when appContext closes
	}, { scope: 'worker' }],

	loginPage: async ({ appPage }, use) => {
		const loginPage = new LoginPage(appPage);
		await use(loginPage);
	},

	// Non-authenticated, isolated context/page for login-flow validation
	freshContext: async ({ browser }, use) => {
		const context = await browser.newContext();
		await use(context);
		await context.close();
	},
	freshPage: async ({ freshContext }, use) => {
		const page = await freshContext.newPage();
		await use(page);
		// closed with freshContext
	},
	freshLoginPage: async ({ freshPage }, use) => {
		const loginPage = new LoginPage(freshPage);
		await use(loginPage);
	}
});

module.exports = { test, expect: base.expect };


