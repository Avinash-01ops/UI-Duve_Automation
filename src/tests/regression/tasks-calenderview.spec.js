const { test } = require('../../fixtures/test-fixtures');
const { TasksPage } = require('../../page-objects/tasks.page');
const { DashboardPage } = require('../../page-objects/dashboard.page');
const creds = require('../../config/credentials');

test.describe('Tasks Calendar View E2E', () => {
	test.beforeAll(async ({ appPage, loginPage }) => {
		await appPage.goto(`${creds.baseUrl}/`);
		await appPage.waitForLoadState('domcontentloaded');
		if (/\/login/i.test(appPage.url())) {
			await loginPage.login(creds.username, creds.password);
			await loginPage.completeTwoFactor('121212');
			await loginPage.waitForDashboard();
		}
	});

	test('Dashboard -> Tasks -> Calendar View', async ({ appPage }) => {
		const dashboard = new DashboardPage(appPage);
		const tasks = new TasksPage(appPage);

		await dashboard.open();
		await appPage.waitForURL(/\/dashboard/i, { timeout: 15000 }).catch(() => undefined);

		const calendarViewSuccess = await tasks.testCalendarView();
		if (!calendarViewSuccess) {
			throw new Error('Calendar view test failed');
		}
	});
});
