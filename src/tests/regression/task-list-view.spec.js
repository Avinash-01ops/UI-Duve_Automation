const { test } = require('../../fixtures/test-fixtures');
const { TasksPage } = require('../../page-objects/tasks.page');
const { DashboardPage } = require('../../page-objects/dashboard.page');
const creds = require('../../config/credentials');

test.describe('Tasks List View E2E', () => {
	test.beforeAll(async ({ appPage, loginPage }) => {
		await appPage.goto(`${creds.baseUrl}/`);
		await appPage.waitForLoadState('domcontentloaded');
		if (/\/login/i.test(appPage.url())) {
			await loginPage.login(creds.username, creds.password);
			await loginPage.completeTwoFactor('121212');
			await loginPage.waitForDashboard();
		}
	});

	test('Dashboard -> Tasks -> List View', async ({ appPage }) => {
		const dashboard = new DashboardPage(appPage);
		const tasks = new TasksPage(appPage);

		await dashboard.open();
		await appPage.waitForURL(/\/dashboard/i, { timeout: 15000 }).catch(() => undefined);

		const success = await tasks.navigateToListView();
		if (!success) {
			throw new Error('Failed to navigate to Tasks List View');
		}
	});

	test('Dashboard -> Tasks -> List View -> Tasks Drop down', async ({ appPage }) => {
		const dashboard = new DashboardPage(appPage);
		const tasks = new TasksPage(appPage);

		await dashboard.open();
		await appPage.waitForURL(/\/dashboard/i, { timeout: 15000 }).catch(() => undefined);
		
		const navigationSuccess = await tasks.navigateToListView();
		if (!navigationSuccess) {
			throw new Error('Failed to navigate to Tasks List View');
		}

		const dropdownSuccess = await tasks.testTasksDropdown();
		if (!dropdownSuccess) {
			throw new Error('Tasks dropdown test failed');
		}
	});

	test('Dashboard -> Tasks -> List View -> Date Dropdown', async ({ appPage }) => {
		const dashboard = new DashboardPage(appPage);
		const tasks = new TasksPage(appPage);

		await dashboard.open();
		await appPage.waitForURL(/\/dashboard/i, { timeout: 15000 }).catch(() => undefined);
		
		const navigationSuccess = await tasks.navigateToListView();
		if (!navigationSuccess) {
			throw new Error('Failed to navigate to Tasks List View');
		}

		const dateDropdownSuccess = await tasks.testDateDropdown();
		if (!dateDropdownSuccess) {
			throw new Error('Date dropdown test failed');
		}
	});

	test('Dashboard -> Tasks -> List View -> Daily View', async ({ appPage }) => {
		const dashboard = new DashboardPage(appPage);
		const tasks = new TasksPage(appPage);

		await dashboard.open();
		await appPage.waitForURL(/\/dashboard/i, { timeout: 15000 }).catch(() => undefined);
		
		const navigationSuccess = await tasks.navigateToListView();
		if (!navigationSuccess) {
			throw new Error('Failed to navigate to Tasks List View');
		}

		const dailyViewSuccess = await tasks.testDailyView();
		if (!dailyViewSuccess) {
			throw new Error('Daily view test failed');
		}
	});

	test('Dashboard -> Tasks -> List View -> Daily View -> Tabs', async ({ appPage }) => {
		const dashboard = new DashboardPage(appPage);
		const tasks = new TasksPage(appPage);

		await dashboard.open();
		await appPage.waitForURL(/\/dashboard/i, { timeout: 15000 }).catch(() => undefined);
		
		const navigationSuccess = await tasks.navigateToListView();
		if (!navigationSuccess) {
			throw new Error('Failed to navigate to Tasks List View');
		}

		const tabsTestSuccess = await tasks.testDailyViewTabs();
		if (!tabsTestSuccess) {
			throw new Error('Daily view tabs test failed');
		}
	});

	test('Dashboard -> Tasks -> List View -> Date Range View', async ({ appPage }) => {
		const dashboard = new DashboardPage(appPage);
		const tasks = new TasksPage(appPage);

		await dashboard.open();
		await appPage.waitForURL(/\/dashboard/i, { timeout: 15000 }).catch(() => undefined);
		
		const navigationSuccess = await tasks.navigateToListView();
		if (!navigationSuccess) {
			throw new Error('Failed to navigate to Tasks List View');
		}

		const dateRangeTestSuccess = await tasks.testDateRangeView();
		if (!dateRangeTestSuccess) {
			throw new Error('Date Range view test failed');
		}
	});

	test('Dashboard -> Tasks -> List View -> Date Range View -> Selecting a new Date Range', async ({ appPage }) => {
		const dashboard = new DashboardPage(appPage);
		const tasks = new TasksPage(appPage);

		await dashboard.open();
		await appPage.waitForURL(/\/dashboard/i, { timeout: 15000 }).catch(() => undefined);
		
		const navigationSuccess = await tasks.navigateToListView();
		if (!navigationSuccess) {
			throw new Error('Failed to navigate to Tasks List View');
		}

		const dateRangeSelectionSuccess = await tasks.testDateRangeSelection();
		if (!dateRangeSelectionSuccess) {
			throw new Error('Date Range selection test failed');
		}
	});
});
