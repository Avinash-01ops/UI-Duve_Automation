const { BasePage } = require('./base.page');
const creds = require('../config/credentials');

class LoginPage extends BasePage {
	constructor(page) {
		super(page);
		this.usernameInput = this.page.getByPlaceholder(/email|username/i);
		this.passwordInput = this.page.getByPlaceholder(/password/i);
		this.submitButton = this.page.getByRole('button', { name: /sign in|log in/i });

		// 2FA controls based on provided DOM snippet
		this.twoFactorDigits = this.page.locator('input._1qarredw[maxlength="1"][type="number"]');
		this.twoFactorByIndex = this.page.locator('input[index][maxlength="1"][type="number"]');
		this.continueButton = this.page.getByRole('button', { name: /continue|verify|submit/i });
	}

	async open() {
		await this.goto(`${creds.baseUrl}/login`);
	}

	async login(username, password) {
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);
		await Promise.all([
			this.page.waitForLoadState('networkidle'),
			this.submitButton.click()
		]);
	}

	async completeTwoFactor(code) {
		const codeString = String(code).trim();
		// Prefer class-based selector; fallback to index attribute
		let inputs = this.twoFactorDigits;
		let firstVisible = null;
		for (const locator of [this.twoFactorDigits, this.twoFactorByIndex]) {
			try {
				if (await locator.first().isVisible({ timeout: 3000 })) {
					inputs = locator;
					firstVisible = locator.first();
					break;
				}
			} catch (_) { /* ignore */ }
		}
		if (!firstVisible) return true; // No 2FA required

		await firstVisible.click();
		await this.page.keyboard.type(codeString, { delay: 40 });

		// Click continue if visible; otherwise press Enter
		try {
			if (await this.continueButton.isVisible({ timeout: 2000 })) {
				await this.continueButton.click();
			} else {
				await this.page.keyboard.press('Enter');
			}
		} catch (_) {
			await this.page.keyboard.press('Enter');
		}
		return true;
	}

	async waitForDashboard() {
		const escaped = creds.baseUrl.replace(/[-\/\\.^$*+?()|[\\]{}]/g, (r) => (r === '/' ? '\\/' : `\\${r}`));
		const notAuthScreens = new RegExp(`${escaped}(?!\/(login|two|otp)).*`);
		
		// Increase timeout and add better error handling
		try {
			await this.page.waitForURL(notAuthScreens, { timeout: 300000 }); // 5 minutes
		} catch (error) {
			console.log('Timeout waiting for dashboard, checking current URL...');
			const currentUrl = this.page.url();
			console.log('Current URL:', currentUrl);
			
			// If we're still on login page, try to wait a bit more
			if (currentUrl.includes('/login')) {
				console.log('Still on login page, waiting additional time...');
				await this.page.waitForTimeout(10000); // Wait 10 more seconds
				await this.page.waitForURL(notAuthScreens, { timeout: 60000 }); // Try 1 more minute
			} else {
				throw error; // Re-throw if it's a different issue
			}
		}
	}
}

module.exports = { LoginPage };


