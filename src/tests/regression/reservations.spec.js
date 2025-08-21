const { test } = require('../../fixtures/test-fixtures');
const { DashboardPage } = require('../../page-objects/dashboard.page');
const { ReservationsPage } = require('../../page-objects/reservations.page');
const creds = require('../../config/credentials');

test.describe('Reservations E2E', () => {
	test.beforeAll(async ({ appPage, loginPage }) => {
		await appPage.goto(`${creds.baseUrl}/`);
		await appPage.waitForLoadState('domcontentloaded');
		if (/\/login/i.test(appPage.url())) {
			await loginPage.login(creds.username, creds.password);
			await loginPage.completeTwoFactor('121212');
			await loginPage.waitForDashboard();
		}
	});

	test('Dashboard -> Reservations -> Upcoming -> Past -> Cancelled', async ({ appPage }) => {
		const dashboard = new DashboardPage(appPage);
		await dashboard.open();
		await appPage.waitForURL(/\/dashboard/i, { timeout: 15000 }).catch(() => undefined);

		const reservations = new ReservationsPage(appPage);
		await reservations.openBase();
		await appPage.waitForURL(/\/reservations(\?|$)/i, { timeout: 15000 }).catch(() => undefined);
		await appPage.waitForTimeout(800);

		await reservations.gotoUpcoming();
		await appPage.waitForTimeout(800);

		await reservations.gotoPast();
		await appPage.waitForTimeout(800);

		await reservations.gotoCancelled();
		await appPage.waitForTimeout(800);
	});
});


