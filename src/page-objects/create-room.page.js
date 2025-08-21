const { BasePage } = require('./base.page');
const creds = require('../config/credentials');

class CreateRoomPage extends BasePage {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		super(page);
		this.basePath = '/properties';
		this.activeQuery = '?tab=active';
		this.candidatePaths = [
			'/properties?tab=active',
			'/properties'
		];

		// Buttons / modal
		// Primary locator uses the provided DOM structure (button with span "New Room")
		this.newRoomButton = this.page
			.locator('button._5rh3dh1:has(span._1ku9dq74:has-text("New Room"))')
			.or(this.page.getByRole('button', { name: /new\s*room/i }))
			.or(this.page.getByRole('link', { name: /new\s*room/i }))
			.or(this.page.locator('[data-testid*="new-room" i], [aria-label*="new room" i]'))
			.or(this.page.locator('//*[self::button or self::a][contains(translate(normalize-space(.), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "new room")]'));
		this.dialog = this.page.getByRole('dialog').or(this.page.locator('[role="dialog"], .modal, .MuiDialog-root'));
		// Inputs based on provided structure: label text followed by input._17bxqcm
		this.nameInput = this.page.locator('//div[normalize-space()="Name"]/ancestor::div[contains(@class,"_q3b2ke")]//input[contains(@class,"_17bxqcm")]')
			.or(this.page.getByLabel(/name/i));
		this.numberInput = this.page.locator('//div[normalize-space()="Room number"]/ancestor::div[contains(@class,"_q3b2ke")]//input[contains(@class,"_17bxqcm")]')
			.or(this.page.getByLabel(/room\s*number/i));
		this.floorInput = this.page.locator('//div[normalize-space()="Floor"]/ancestor::div[contains(@class,"_q3b2ke")]//input[contains(@class,"_17bxqcm")]')
			.or(this.page.getByLabel(/floor/i));
		this.accommodationTypeControl = this.page.locator('//div[normalize-space()="Accommodation\s*Type"]/following::div[contains(@class,"Select-control")][1]')
			.or(this.page.locator('.Select-control'));
		this.selectMenuOption = (text) => this.page.locator(`.Select-menu-outer .Select-option:has-text("${text}")`).first();
		this.saveButton = this.page.locator('button._5rh3dh1:has(span._1ku9dq74:has-text("Create"))')
			.or(this.page.getByRole('button', { name: /create|save/i }));
		this.createHeader = this.page.locator('span._1ku9dq74:has-text("Create")');
		this.toast = this.page.locator('[role="alert"], .toast, .MuiSnackbar-root');
		this.table = this.page.getByRole('table').or(this.page.locator('table'));
	}

	async gotoActiveRooms() {
		// Try multiple known paths until the "New Room" button is visible
		for (const path of this.candidatePaths) {
			try {
				await this.page.goto(`${creds.baseUrl}${path}`, { waitUntil: 'domcontentloaded' });
				await this.page.waitForLoadState('domcontentloaded');
				try { await this.newRoomButton.first().waitFor({ state: 'visible', timeout: 3000 }); return true; } catch (_) {}
			} catch (_) { /* try next */ }
		}
		return false;
	}

	async openModal() {
		try {
			// Best-effort: remove common overlays that may intercept clicks
			try {
				await this.page.evaluate(() => {
					const selectors = [
						'.zEWidget-launcher',
						'.zEWidget-webWidget',
						'#launcher',
						'[id*="intercom" i]',
						'iframe[src*="zendesk" i]'
					];
					for (const sel of selectors) {
						Array.from(document.querySelectorAll(sel)).forEach(function(el) {
							if (el && el instanceof HTMLElement) {
								el.style.display = 'none';
								el.style.pointerEvents = 'none';
							}
						});
					}
				});
			} catch (_) {}

			const candidates = [
				this.page.locator('div._zm4e4lr button._5rh3dh1:has(span._1ku9dq74:has-text("New Room"))').first(),
				this.page.locator('//button[.//span[contains(normalize-space(),"New Room")]]').first(),
				this.newRoomButton.first(),
				this.page.locator('i.zmdi-plus-circle').first(),
				this.page.locator('button:has-text("New Room")').first(),
				this.page.locator('a:has-text("New Room")').first(),
				this.page.getByRole('button', { name: /new\s*room/i }).first(),
				this.page.getByRole('link', { name: /new\s*room/i }).first()
			];
			for (const cand of candidates) {
				try {
					if (await cand.isVisible({ timeout: 2000 })) {
						try { await cand.scrollIntoViewIfNeeded(); } catch (_) {}
						try { await cand.click(); } catch (_) { try { await cand.click({ force: true }); } catch (_) {} }
						await this.page.waitForLoadState('domcontentloaded');
						// Wait for either dialog, Create header/button, form inputs, or a route change
						const anyInput = this.page.locator('input._17bxqcm').first();
						try { await this.dialog.first().waitFor({ state: 'visible', timeout: 4000 }); } catch (_) {}
						const ok = await this.nameInput.first().isVisible().catch(() => false)
							|| await anyInput.isVisible().catch(() => false)
							|| await this.createHeader.first().isVisible().catch(() => false)
							|| await this.saveButton.first().isVisible().catch(() => false)
							|| /new|create/i.test(this.page.url());
						if (ok) return true;
					}
				} catch (_) { /* try next */ }
			}

			// Fallback: find by inner text via DOM and click
			try {
				const domClicked = await this.page.evaluate(() => {
					const nodes = Array.from(document.querySelectorAll('button, a, [role="button"]'));
					let target = nodes.find(el => /new\s*room/i.test((el.textContent || '')));
					if (!target) {
						const icon = document.querySelector('i.zmdi-plus-circle');
						if (icon && typeof icon.closest === 'function') {
							const btn = icon.closest('button');
							if (btn) target = btn;
						}
					}
					if (target && typeof target.click === 'function') {
						target.click();
						return true;
					}
					return false;
				});
				if (domClicked) {
					try { await this.dialog.first().waitFor({ state: 'visible', timeout: 5000 }); } catch (_) {}
					try { await this.nameInput.first().waitFor({ state: 'visible', timeout: 5000 }); } catch (_) {}
					const ok = await this.nameInput.first().isVisible().catch(() => false)
						|| await this.page.locator('input._17bxqcm').first().isVisible().catch(() => false);
					if (ok) return true;
				}
			} catch (_) {}

			// Last resort: click by bounding box center on the icon or text span
			try {
				const bbTarget = this.page.locator('span._1ku9dq74:has-text("New Room"), i.zmdi-plus-circle').first();
				const box = await bbTarget.boundingBox();
				if (box) {
					await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
					try { await this.nameInput.first().waitFor({ state: 'visible', timeout: 5000 }); return true; } catch (_) {}
				}
			} catch (_) {}
		} catch (_) {}
		return false;
	}

	async selectAccommodationType(typeText) {
		try {
			await this.accommodationTypeControl.first().click();
			const opt = this.selectMenuOption(typeText);
			await opt.waitFor({ state: 'visible', timeout: 5000 });
			await opt.click();
			return true;
		} catch (_) { return false; }
	}

	async createSpecificRoom({ name, number, floor, accommodationType } = {}) {
		await this.gotoActiveRooms();
		const opened = await this.openModal();
		if (!opened) return { created: false, name: null };
		const roomName = name ?? `Auto Room ${Date.now()}`;
		try { await this.nameInput.first().fill(''); await this.nameInput.first().type(String(roomName), { delay: 15 }); } catch (_) {}
		if (number != null) { try { await this.numberInput.first().fill(''); await this.numberInput.first().type(String(number), { delay: 15 }); } catch (_) {} }
		if (floor != null) { try { await this.floorInput.first().fill(''); await this.floorInput.first().type(String(floor), { delay: 15 }); } catch (_) {} }
		if (accommodationType) { await this.selectAccommodationType(accommodationType).catch(() => undefined); }
		await this.saveButton.first().click();
		await this.page.waitForLoadState('networkidle').catch(() => undefined);
		try { await this.toast.first().waitFor({ state: 'visible', timeout: 8000 }); } catch (_) {}
		return { created: true, name: roomName };
	}

	async fillForm({ name, number, type } = {}) {
		const roomName = name ?? `Auto Room ${Date.now()}`;
		try { await this.nameInput.first().fill(''); await this.nameInput.first().type(String(roomName), { delay: 15 }); } catch (_) {}
		if (number != null) {
			try { await this.numberInput.first().fill(''); await this.numberInput.first().type(String(number), { delay: 15 }); } catch (_) {}
		}
		if (type) {
			try {
				await this.typeSelect.first().click();
				await this.page.getByRole('option', { name: new RegExp(type, 'i') }).first().click().catch(() => undefined);
			} catch (_) {}
		}
		return roomName;
	}

	async save() {
		await this.saveButton.first().click();
		await this.page.waitForLoadState('networkidle').catch(() => undefined);
		try { await this.toast.first().waitFor({ state: 'visible', timeout: 8000 }); } catch (_) {}
	}

	async isListed(name) {
		const rowMatch = this.page.locator(`tbody tr:has-text("${name}")`).first();
		try { if (await rowMatch.isVisible({ timeout: 5000 })) return true; } catch (_) {}
		try { if (await this.page.getByText(new RegExp(`^${name}$`, 'i')).first().isVisible({ timeout: 2000 })) return true; } catch (_) {}
		return false;
	}
}

module.exports = { CreateRoomPage };


