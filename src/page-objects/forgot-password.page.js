const { BasePage } = require('./base.page');

class ForgotPasswordPage extends BasePage {
    constructor(page) {
        super(page);
        this.url = 'https://sandbox.duve.com/forgotpassword';
        
        // Locators
        this.emailInput = page.locator('input[type="email"]');
        this.submitButton = page.locator('button[type="submit"]');
        this.resetSuccessMessage = page.locator('[role="alert"], div:has-text("email sent"), div:has-text("password reset")');
        this.errorMessage = page.locator('.error-message');
        this.backToLoginLink = page.locator('text=Back to Login');
    }

    /**
     * Navigate to forgot password page
     */
    async navigate() {
        await this.page.goto(this.url);
    }

    /**
     * Submit forgot password form with email
     * @param {string} email - Email address to reset password
     */
    async submitForgotPasswordForm(email) {
        await this.emailInput.fill(email);
        await this.submitButton.click();
    }

    /**
     * Wait for form submission to complete
     * Either we see a success message or we're redirected
     */
    async waitForSubmissionComplete() {
        try {
            // Wait for either success message or URL change
            await Promise.race([
                this.resetSuccessMessage.waitFor({ state: 'visible', timeout: 10000 }),
                this.page.waitForURL(url => !url.includes('/forgotpassword'), { timeout: 10000 })
            ]);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Get error message text
     * @returns {Promise<string>} Error message text
     */
    async getErrorMessage() {
        await this.errorMessage.waitFor({ state: 'visible' });
        return this.errorMessage.textContent();
    }

    /**
     * Click back to login link
     */
    async navigateBackToLogin() {
        await this.backToLoginLink.click();
    }

    /**
     * Check if email input is valid
     * @returns {Promise<boolean>} True if email input is valid
     */
    async isEmailInputValid() {
        const validityState = await this.emailInput.evaluate(el => el.validity.valid);
        return validityState;
    }
}

module.exports = { ForgotPasswordPage };