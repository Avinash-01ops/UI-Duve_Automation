const { BasePage } = require('./base.page');
const creds = require('../config/credentials');

class ReservationsPage extends BasePage {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		super(page);
		this.basePath = '/reservations';
		this.tabPauseMs = Number(process.env.TAB_DEMO_WAIT_MS || 1200);

		// Tabs/filters commonly present
		this.upcomingTab = this.page.getByRole('tab', { name: /upcoming/i })
			.or(this.page.getByRole('button', { name: /upcoming/i }))
			.or(this.page.getByRole('link', { name: /upcoming/i }))
			.or(this.page.locator('//*[normalize-space()="Upcoming"]'));
		this.pastTab = this.page.getByRole('tab', { name: /past|history/i })
			.or(this.page.getByRole('button', { name: /past|history/i }))
			.or(this.page.getByRole('link', { name: /past|history/i }))
			.or(this.page.locator('//*[normalize-space()="Past" or normalize-space()="History"]'));
		this.cancelledTab = this.page.getByRole('tab', { name: /cancelled|canceled/i })
			.or(this.page.getByRole('button', { name: /cancelled|canceled/i }))
			.or(this.page.getByRole('link', { name: /cancelled|canceled/i }))
			.or(this.page.locator('//*[normalize-space()="Cancelled" or normalize-space()="Canceled"]'));

		// Common content area - table/list
		this.table = this.page.getByRole('table').or(this.page.locator('table'));
		this.list = this.page.locator('[role="list"], ul[role], ol[role], [data-testid*="list" i]');
	}

	async clickTabIfVisible(locator) {
		try {
			const target = locator.first();
			if (await target.isVisible({ timeout: 2000 })) {
				await target.click();
				await this.page.waitForLoadState('domcontentloaded');
				await this.page.waitForTimeout(this.tabPauseMs);
				return true;
			}
		} catch (_) {}
		return false;
	}

	async openBase() {
		try {
			await this.page.goto(`${creds.baseUrl}${this.basePath}`, { waitUntil: 'domcontentloaded' });
			await this.page.waitForLoadState('domcontentloaded');
			return true;
		} catch (_) { return false; }
	}

	async isLoaded() {
		const urlOk = /\/reservations(\?|$)/i.test(this.page.url());
		if (!urlOk) return false;
		for (const locator of [this.upcomingTab, this.table, this.list]) {
			try { if (await locator.first().isVisible({ timeout: 800 })) return true; } catch (_) {}
		}
		return urlOk;
	}

	async gotoUpcoming() {
		if (await this.clickTabIfVisible(this.upcomingTab)) {
			await this.page.waitForURL(/\/reservations\?tab=upcoming/i, { timeout: 15000 }).catch(() => undefined);
			return true;
		}
		try {
			await this.page.goto(`${creds.baseUrl}${this.basePath}?tab=upcoming`, { waitUntil: 'domcontentloaded' });
			await this.page.waitForTimeout(this.tabPauseMs);
			return true;
		} catch (_) { return false; }
	}

	async gotoPast() {
		if (await this.clickTabIfVisible(this.pastTab)) {
			await this.page.waitForURL(/\/reservations\?tab=past/i, { timeout: 15000 }).catch(() => undefined);
			return true;
		}
		try {
			await this.page.goto(`${creds.baseUrl}${this.basePath}?tab=past`, { waitUntil: 'domcontentloaded' });
			await this.page.waitForTimeout(this.tabPauseMs);
			return true;
		} catch (_) { return false; }
	}

	async gotoCancelled() {
		if (await this.clickTabIfVisible(this.cancelledTab)) {
			await this.page.waitForURL(/\/reservations\?tab=(cancelled|canceled)/i, { timeout: 15000 }).catch(() => undefined);
			return true;
		}
		try {
			await this.page.goto(`${creds.baseUrl}${this.basePath}?tab=cancelled`, { waitUntil: 'domcontentloaded' });
			await this.page.waitForTimeout(this.tabPauseMs);
			return true;
		} catch (_) { return false; }
	}
}

module.exports = { ReservationsPage };


