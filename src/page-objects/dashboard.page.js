const { BasePage } = require('./base.page');
const creds = require('../config/credentials');
const { expect } = require('@playwright/test');

class DashboardPage extends BasePage {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		super(page);
		this.url = `${creds.baseUrl}/dashboard`;

		// Core structure
		this.navigation = this.page.getByRole('navigation');
		this.navLinks = this.navigation.locator('a, [role="link"], [data-testid="nav-item"]');
		this.header = this.page.locator('header');
		this.main = this.page.locator('main');

		// Common controls
		this.searchInput = this.page.getByPlaceholder(/search|find|filter/i).or(this.page.locator('input[type="search"]'));
		this.notificationButton = this.page.getByRole('button', { name: /notifications|bell/i }).or(this.page.locator('[aria-label*="notification" i]'));
		this.profileButton = this.page.getByRole('button', { name: /profile|account|user|avatar/i }).or(this.page.locator('[aria-label*="profile" i], [data-testid*="profile" i]'));
		this.logoutButton = this.page.getByRole('menuitem', { name: /logout|sign out/i }).or(this.page.getByRole('button', { name: /logout|sign out/i }));

		// Content/table area (generic)
		this.table = this.page.getByRole('table').or(this.page.locator('table'));
		this.tableRows = this.table.locator('tbody tr');
		this.tableHeaderCells = this.table.locator('thead th, thead td, [role="columnheader"]');

		// Filters / export / pagination (generic)
		this.filterButton = this.page.getByRole('button', { name: /filter|filters|add filter|advanced/i }).or(this.page.locator('[aria-label*="filter" i], [data-testid*="filter" i]'));
		this.applyFilterButton = this.page.getByRole('button', { name: /apply|done|ok/i }).or(this.page.locator('[data-testid*="apply" i]'));
		this.clearFilterButton = this.page.getByRole('button', { name: /clear|reset/i }).or(this.page.locator('[data-testid*="clear" i]'));
		this.exportButton = this.page.getByRole('button', { name: /export|download|csv|xls|xlsx/i }).or(this.page.locator('[aria-label*="export" i], [data-testid*="export" i]'));
		this.nextPageButton = this.page.getByRole('button', { name: /next|›|»/i }).or(this.page.locator('[aria-label*="next" i]'));
		this.prevPageButton = this.page.getByRole('button', { name: /prev|previous|‹|«/i }).or(this.page.locator('[aria-label*="prev" i]'));
	}

	async open() {
		try {
			await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
		} catch (_) { /* tolerate aborts */ }
		await this.page.waitForLoadState('domcontentloaded');
	}

	async isLoaded() {
		await this.page.waitForLoadState('domcontentloaded');
		const url = this.page.url();
		const onOurDomain = url.startsWith(creds.baseUrl);
		const notAuth = !/\/(login|two|otp)/i.test(url);
		for (const locator of [this.navigation, this.main, this.header, this.page.locator('main, header, nav, body > *')]) {
			try {
				if (await locator.first().isVisible({ timeout: 1500 })) {
					return onOurDomain && notAuth;
				}
			} catch (_) { /* ignore */ }
		}
		return onOurDomain && notAuth;
	}

	async isOnLogin() {
		return /\/(login|two|otp)/i.test(this.page.url());
	}

	async getNavItemCount() {
		try { return await this.navLinks.count(); } catch { return 0; }
	}

	async openNavItemByIndex(index) {
		const total = await this.getNavItemCount();
		if (index < 0 || index >= total) return false;
		const initialUrl = this.page.url();
		await this.navLinks.nth(index).click();
		await this.page.waitForLoadState('domcontentloaded');
		try { await this.page.waitForURL(u => u !== initialUrl, { timeout: 5000 }); } catch (_) {}
		return true;
	}

	async hasTable() {
		return await this.table.first().isVisible().catch(() => false);
	}

	async clickFirstRowIfPresent() {
		if (!(await this.hasTable())) return false;
		const rowCount = await this.tableRows.count().catch(() => 0);
		if (rowCount === 0) return false;
		const initialUrl = this.page.url();
		await this.tableRows.first().click();
		await this.page.waitForLoadState('domcontentloaded');
		try { await this.page.waitForURL(u => u !== initialUrl, { timeout: 3000 }); } catch (_) {}
		return true;
	}

	async sortFirstColumnIfPresent() {
		const headerCount = await this.tableHeaderCells.count().catch(() => 0);
		if (headerCount === 0) return false;
		const firstHeader = this.tableHeaderCells.first();
		if (!(await firstHeader.isVisible().catch(() => false))) return false;
		await firstHeader.click();
		await this.page.waitForTimeout(300);
		// Try a second click to toggle direction
		await firstHeader.click();
		await this.page.waitForTimeout(300);
		return true;
	}

	async openFiltersIfPresent() {
		if (await this.filterButton.first().isVisible().catch(() => false)) {
			await this.filterButton.first().click();
			return true;
		}
		return false;
	}

	async applyFiltersIfOpen() {
		if (await this.applyFilterButton.first().isVisible().catch(() => false)) {
			await this.applyFilterButton.first().click();
			await this.page.waitForLoadState('networkidle').catch(() => undefined);
			return true;
		}
		return false;
	}

	async clearFiltersIfOpen() {
		if (await this.clearFilterButton.first().isVisible().catch(() => false)) {
			await this.clearFilterButton.first().click();
			await this.page.waitForLoadState('networkidle').catch(() => undefined);
			return true;
		}
		return false;
	}

	async exportIfPresent() {
		if (await this.exportButton.first().isVisible().catch(() => false)) {
			await this.exportButton.first().click();
			await this.page.waitForTimeout(800);
			return true;
		}
		return false;
	}

	async paginateIfPresent(direction = 'next') {
		const btn = direction === 'prev' ? this.prevPageButton : this.nextPageButton;
		if (await btn.first().isVisible().catch(() => false)) {
			await btn.first().click();
			await this.page.waitForLoadState('networkidle').catch(() => undefined);
			return true;
		}
		return false;
	}

	async openFirstNavItem() {
		const count = await this.getNavItemCount();
		if (count > 0) {
			const initialUrl = this.page.url();
			await this.navLinks.first().click();
			await this.page.waitForLoadState('load');
			try { await this.page.waitForURL(u => u !== initialUrl, { timeout: 5000 }); } catch (_) {}
			return true;
		}
		return false;
	}

	async openNotificationsIfPresent() {
		if (await this.notificationButton.first().isVisible().catch(() => false)) {
			await this.notificationButton.first().click();
			return true;
		}
		return false;
	}

	async openProfileMenuIfPresent() {
		if (await this.profileButton.first().isVisible().catch(() => false)) {
			await this.profileButton.first().click();
			return true;
		}
		return false;
	}

	async logoutIfPossible() {
		const opened = await this.openProfileMenuIfPresent();
		if (!opened) return false;
		if (await this.logoutButton.first().isVisible().catch(() => false)) {
			await this.logoutButton.first().click();
			await this.page.waitForURL(/\/(login|two|otp)/i, { timeout: 15000 }).catch(() => undefined);
			return true;
		}
		return false;
	}

	async searchIfPresent(query) {
		if (await this.searchInput.first().isVisible().catch(() => false)) {
			await this.searchInput.first().fill('');
			await this.searchInput.first().type(query, { delay: 20 });
			await this.page.waitForTimeout(500);
			return true;
		}
		return false;
	}

	async assertDashBoardPage() {
		const loaded = await this.isLoaded();
		expect(loaded).toBeTruthy();
		return true;
	}
}

module.exports = { DashboardPage };
