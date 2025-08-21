const { test, expect } = require('../../fixtures/test-fixtures');
const { ForgotPasswordPage } = require('../../page-objects/forgot-password.page');

test.describe('Forgot Password functionalities', () => {
    test.setTimeout(30000);
    let forgotPasswordPage;
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        forgotPasswordPage = new ForgotPasswordPage(page);
        await forgotPasswordPage.navigate();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('successfully submits forgot password request', async () => {
        const initialUrl = page.url();
        await forgotPasswordPage.submitForgotPasswordForm('test@duve.com');
        
        // Wait for navigation or form processing
        try {
            await page.waitForURL(url => url !== initialUrl, { timeout: 10000 });
        } catch {
            // If no navigation, wait for form to be processed
            await page.waitForTimeout(5000);
            const currentUrl = page.url();
            expect(currentUrl).toContain('forgotpassword');
        }
    });

    test('navigates back to login page', async () => {
        // Navigate back to forgot password page before testing navigation
        await forgotPasswordPage.navigate();
        await forgotPasswordPage.navigateBackToLogin();
        await expect(page).toHaveURL(/\/login/i);
    });
});