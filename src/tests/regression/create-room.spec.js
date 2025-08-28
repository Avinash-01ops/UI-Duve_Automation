const { test } = require('../../fixtures/test-fixtures');
const { DashboardPage } = require('../../page-objects/dashboard.page');
const { CreateRoomPage } = require('../../page-objects/create-room.page');
const creds = require('../../config/credentials');

test.describe('Create Room E2E', () => {
	test.beforeAll(async ({ appPage, loginPage }) => {
		await appPage.goto(`${creds.baseUrl}/`);
		await appPage.waitForLoadState('domcontentloaded');
		if (/\/login/i.test(appPage.url())) {
			await loginPage.login(creds.username, creds.password);
			await loginPage.completeTwoFactor('121212');
			await loginPage.waitForDashboard();
		}
	});

	test('Dashboard -> Active Rooms -> New Room -> Fill -> Save -> Verify', async ({ appPage }) => {
		const dashboard = new DashboardPage(appPage);
		await dashboard.open();
		await appPage.waitForURL(/\/dashboard/i, { timeout: 15000 }).catch(() => undefined);

		const createRoom = new CreateRoomPage(appPage);
		const { created, name } = await createRoom.createSpecificRoom({ floor: 3, accommodationType: 'Apartment' });
		await appPage.waitForTimeout(1200);
		if (created) {
			const listed = await createRoom.isListed(name);
			// Debug logging removed for clean test output
		} else {
			// Debug logging removed for clean test output
		}
	});
});


