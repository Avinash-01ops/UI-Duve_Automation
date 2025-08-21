const { test, expect } = require('../../fixtures/test-fixtures');
const creds = require('../../config/credentials');

test.describe('Login functionalities', () => {
	// Allow more time for slow redirects and 2FA
	test.setTimeout(120_000);
	// Invalid credentials should not leave the login page and should show an error
	test('rejects invalid credentials', async ({ freshPage, freshLoginPage }) => {
		await freshLoginPage.open();
		await freshLoginPage.login('invalid@duve.com', 'wrong-password');
		await expect(freshPage).toHaveURL(/\/login/i);
		const errorLocator = freshPage.getByRole('alert').or(freshPage.getByText(/invalid|incorrect|wrong|try again/i));
		await expect(errorLocator).toBeVisible({ timeout: 10000 });
	});

	// Valid credentials should navigate away from login (to dashboard/home) with 2FA
	test('accepts valid credentials and redirects to dashboard', async ({ freshPage, freshLoginPage }) => {
		await freshLoginPage.open();
		await freshLoginPage.login(creds.username, creds.password);
		await freshLoginPage.completeTwoFactor('121212');
		await freshLoginPage.waitForDashboard();
		await expect(freshPage).not.toHaveURL(/\/login/i);

		// Open dashboard page explicitly in a new tab, then close it
		const dashboardPage = await freshPage.context().newPage();
		try {
			await dashboardPage.goto(`${creds.baseUrl}/dashboard`);
		} catch (_) {
			await dashboardPage.goto(creds.baseUrl);
		}
		await expect(dashboardPage).toHaveURL(new RegExp(`${creds.baseUrl.replace(/[-\/\\.^$*+?()|[\\]{}]/g, r => r === '/' ? '\\/' : `\\${r}`)}`));
		await dashboardPage.close();

		// Close the original page as well
		await freshPage.close();
	});
});


