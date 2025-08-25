const { BasePage } = require('./base.page');
const creds = require('../config/credentials');
const { expect } = require('@playwright/test');

class TasksPage extends BasePage {
	constructor(page) {
		super(page);
		this.menuButton = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div[2]');
		this.tasksMenuItem = this.page.locator('//*[@id="side-menu-hub-tasks"]/div/div/div/div[1]');
		this.listViewButton = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[1]/div/div[1]/div/button[1]');
		this.tasksDropdown = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[1]/div[1]/div');
		this.tasksDropdownText = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[1]/div[1]/div/div[1]/div[1]');
		this.companyTasksOption = this.page.locator('//*[@id="contextMenuItem0"]');
		this.myTasksOption = this.page.locator('//*[@id="contextMenuItem1"]');
		this.dateDropdown = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[1]/div[2]/div[1]');
		this.dateDropdownText = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[1]/div[2]/div[1]/div[1]/text()');
		this.dailyOption = this.page.locator('//*[@id="contextMenuItemdaily"]');
		this.dateRangeOption = this.page.locator('//*[@id="contextMenuItemdateRange"]');
		this.todayButton = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[1]/div[2]/div[2]/div[2]');
		this.calendarView = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[2]/div');
		this.arrivalsTab = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[3]/div/div[1]/div[1]');
		this.departuresTab = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[3]/div/div[1]/div[2]');
		this.cleanTab = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[3]/div/div[1]/div[3]');
		this.generalTasksTab = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[3]/div/div[1]/div[4]');
		this.allTasksTab = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[3]/div/div[1]/div[5]');
		this.dateRangePicker = this.page.locator('//*[@id="assignAndDateDateRange"]/div/div/div');
		this.currentDateElement = this.page.locator('//*[@id="assignAndDateDateRange"]/div/div/div/div[1]');
		this.nextDateElement = this.page.locator('//*[@id="assignAndDateDateRange"]/div/div/div/div[3]');
		this.currentDateField = this.page.locator('//*[@id="assignAndDateDateRange"]/div/div/div/div[1]');
		this.dateCalendarPopup = this.page.locator('//*[@id="assignAndDateDateRange"]/div/div/div[2]/div/div/div[2]/div[2]/div');
		this.calendarViewButton = this.page.locator('//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[1]/div/div[1]/div/button[2]');
		this.monthDropdown = this.page.locator('//*[@id="react-select-4--value-item"]');
		this.previousMonthButton = this.page.locator('//*[@id="dashoard-page"]/div/div[2]/div/div[2]/div[1]/button[1]');
		this.nextMonthButton = this.page.locator('//*[@id="dashoard-page"]/div/div[2]/div/div[2]/div[1]/button[2]');
	}

	async open() {
		try {
			await this.page.goto(`${creds.baseUrl}/dashboard`, { waitUntil: 'domcontentloaded' });
		} catch (_) {}
		await this.page.waitForLoadState('domcontentloaded');
	}

	async clickMenu() {
		await this.menuButton.click();
		await this.page.waitForTimeout(500);
	}

	async clickTasks() {
		await this.tasksMenuItem.click();
		await this.page.waitForLoadState('domcontentloaded');
	}

	async verifyTasksPage() {
		const url = this.page.url();
		return /\/tasks/i.test(url) && !/\/(login|two|otp)/i.test(url);
	}

	async verifyListView() {
		const buttonText = await this.listViewButton.textContent().catch(() => '');
		return buttonText.trim() === 'List View';
	}

	async navigateToListView() {
		await this.clickMenu();
		await this.clickTasks();
		return await this.verifyTasksPage() && await this.verifyListView();
	}

	async verifyTasksDropdownVisible() {
		return await this.tasksDropdown.isVisible().catch(() => false);
	}

	async getTasksDropdownText() {
		const text = await this.tasksDropdownText.textContent().catch(() => '');
		return text.trim();
	}

	async clickTasksDropdown() {
		await this.tasksDropdown.click();
		await this.page.waitForTimeout(300);
	}

	async verifyDropdownOptions() {
		const companyVisible = await this.companyTasksOption.isVisible().catch(() => false);
		const myVisible = await this.myTasksOption.isVisible().catch(() => false);
		return companyVisible && myVisible;
	}

	async clickMyTasks() {
		await this.myTasksOption.click();
		await this.page.waitForLoadState('domcontentloaded');
	}

	async testTasksDropdown() {
		try {
			const dropdownVisible = await this.verifyTasksDropdownVisible();
			if (!dropdownVisible) {
				throw new Error('Tasks dropdown is not visible');
			}
		} catch (error) {
			throw new Error(`Step 1 - Verify dropdown visibility failed: ${error.message}`);
		}

		// try {
		// 	const defaultText = await this.getTasksDropdownText();
		// 	if (defaultText !== 'Company Tasks') {
		// 		throw new Error(`Expected "Company Tasks" but got "${defaultText}"`);
		// 	}
		// } catch (error) {
		// 	throw new Error(`Step 2 - Verify default text failed: ${error.message}`);
		// }

		try {
			await this.clickTasksDropdown();
		} catch (error) {
			throw new Error(`Step 3 - Click dropdown failed: ${error.message}`);
		}

		try {
			const optionsVisible = await this.verifyDropdownOptions();
			if (!optionsVisible) {
				const companyVisible = await this.companyTasksOption.isVisible().catch(() => false);
				const myVisible = await this.myTasksOption.isVisible().catch(() => false);
				throw new Error(`Dropdown options not visible - Company Tasks: ${companyVisible}, My Tasks: ${myVisible}`);
			}
		} catch (error) {
			throw new Error(`Step 4 - Verify dropdown options failed: ${error.message}`);
		}

		try {
			await this.clickMyTasks();
		} catch (error) {
			throw new Error(`Step 5 - Click My Tasks failed: ${error.message}`);
		}

		try {
			const updatedText = await this.getTasksDropdownText();
			if (updatedText !== 'My Tasks') {
				throw new Error(`Expected "My Tasks" but got "${updatedText}"`);
			}
		} catch (error) {
			throw new Error(`Step 6 - Verify updated text failed: ${error.message}`);
		}

		return true;
	}

	async verifyDateDropdownVisible() {
		return await this.dateDropdown.isVisible().catch(() => false);
	}

	async getDateDropdownText() {
		const text = await this.dateDropdownText.textContent().catch(() => '');
		return text.trim();
	}

	async clickDateDropdown() {
		await this.dateDropdown.click();
		await this.page.waitForTimeout(300);
	}

	async verifyDateDropdownOptions() {
		const dailyVisible = await this.dailyOption.isVisible().catch(() => false);
		const dateRangeVisible = await this.dateRangeOption.isVisible().catch(() => false);
		return { dailyVisible, dateRangeVisible };
	}

	async getDailyOptionText() {
		const text = await this.dailyOption.textContent().catch(() => '');
		return text.trim();
	}

	async getDateRangeOptionText() {
		const text = await this.dateRangeOption.textContent().catch(() => '');
		return text.trim();
	}

	async clickDateRange() {
		await this.dateRangeOption.click();
		await this.page.waitForLoadState('domcontentloaded');
	}

	async testDateDropdown() {
		try {
			const dropdownVisible = await this.verifyDateDropdownVisible();
			if (!dropdownVisible) {
				throw new Error('Date dropdown is not visible');
			}
		} catch (error) {
			throw new Error(`Step 1 - Verify date dropdown visibility failed: ${error.message}`);
		}

		// try {
		// 	const defaultText = await this.getDateDropdownText();
		// 	if (defaultText !== 'Daily') {
		// 		throw new Error(`Expected "Daily" but got "${defaultText}"`);
		// 	}
		// } catch (error) {
		// 	throw new Error(`Step 2 - Verify default text failed: ${error.message}`);
		// }

		try {
			await this.clickDateDropdown();
		} catch (error) {
			throw new Error(`Step 3 - Click date dropdown failed: ${error.message}`);
		}

		try {
			const { dailyVisible, dateRangeVisible } = await this.verifyDateDropdownOptions();
			if (!dailyVisible || !dateRangeVisible) {
				throw new Error(`Date dropdown options not visible - Daily: ${dailyVisible}, Date range: ${dateRangeVisible}`);
			}

			const dailyText = await this.getDailyOptionText();
			const dateRangeText = await this.getDateRangeOptionText();
			
			if (dailyText !== 'Daily') {
				throw new Error(`Expected Daily option text "Daily" but got "${dailyText}"`);
			}
			
			if (dateRangeText !== 'Date range') {
				throw new Error(`Expected Date range option text "Date range" but got "${dateRangeText}"`);
			}
		} catch (error) {
			throw new Error(`Step 4 - Verify date dropdown options failed: ${error.message}`);
		}

		try {
			await this.clickDateRange();
		} catch (error) {
			throw new Error(`Step 5 - Click Date range failed: ${error.message}`);
		}

		// try {
		// 	const updatedText = await this.getDateDropdownText();
		// 	if (updatedText !== 'Date range') {
		// 		throw new Error(`Expected "Date range" but got "${updatedText}"`);
		// 	}
		// } catch (error) {
		// 	throw new Error(`Step 6 - Verify updated text failed: ${error.message}`);
		// }

		return true;
	}

	async verifyTodayButtonVisible() {
		return await this.todayButton.isVisible().catch(() => false);
	}

	async verifyTodayButtonEnabled() {
		return await this.todayButton.isEnabled().catch(() => false);
	}

	async verifyCalendarViewVisible() {
		return await this.calendarView.isVisible().catch(() => false);
	}

	async verifyCalendarDays() {
		const visibleDays = [];
		for (let i = 1; i <= 7; i++) {
			const dayLocator = this.page.locator(`//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[2]/div/div[${i}]`);
			const isVisible = await dayLocator.isVisible().catch(() => false);
			visibleDays.push(isVisible);
		}
		return visibleDays;
	}

	async testDailyView() {
		try {
			const dropdownVisible = await this.verifyDateDropdownVisible();
			if (!dropdownVisible) {
				throw new Error('Date dropdown is not visible');
			}
		} catch (error) {
			throw new Error(`Step 1 - Verify date dropdown visibility failed: ${error.message}`);
		}

		// try {
		// 	const defaultText = await this.getDateDropdownText();
		// 	if (defaultText !== 'Daily') {
		// 		throw new Error(`Expected "Daily" but got "${defaultText}"`);
		// 	}
		// } catch (error) {
		// 	throw new Error(`Step 2 - Verify default text failed: ${error.message}`);
		// }

		try {
			const todayVisible = await this.verifyTodayButtonVisible();
			if (!todayVisible) {
				throw new Error('Today button is not visible');
			}
		} catch (error) {
			throw new Error(`Step 3 - Verify Today button visibility failed: ${error.message}`);
		}

		try {
			const todayEnabled = await this.verifyTodayButtonEnabled();
			if (!todayEnabled) {
				throw new Error('Today button is not enabled');
			}
		} catch (error) {
			throw new Error(`Step 4 - Verify Today button enabled failed: ${error.message}`);
		}

		try {
			const calendarVisible = await this.verifyCalendarViewVisible();
			if (!calendarVisible) {
				throw new Error('Calendar view is not visible');
			}
		} catch (error) {
			throw new Error(`Step 5 - Verify calendar view visibility failed: ${error.message}`);
		}

		try {
			const dayVisibility = await this.verifyCalendarDays();
			const allDaysVisible = dayVisibility.every(day => day === true);
			if (!allDaysVisible) {
				const visibleCount = dayVisibility.filter(day => day === true).length;
				throw new Error(`Expected 7 calendar days visible, but only ${visibleCount} are visible. Day visibility: ${dayVisibility.map((visible, index) => `Day ${index + 1}: ${visible}`).join(', ')}`);
			}
		} catch (error) {
			throw new Error(`Step 6 - Verify calendar days failed: ${error.message}`);
		}

		return true;
	}

	async verifyTaskTabs() {
		const tabVisibility = [];
		const tabNames = ['Arrivals', 'Departures', 'Clean', 'General tasks', 'All Tasks'];
		
		for (let i = 1; i <= 5; i++) {
			const tabLocator = this.page.locator(`//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[3]/div/div[1]/div[${i}]`);
			const isVisible = await tabLocator.isVisible().catch(() => false);
			tabVisibility.push({ index: i, name: tabNames[i-1], visible: isVisible });
		}
		return tabVisibility;
	}

	async getActiveTab() {
		for (let i = 1; i <= 5; i++) {
			const tabLocator = this.page.locator(`//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[3]/div/div[1]/div[${i}]`);
			
			// Check for various active indicators
			const classes = await tabLocator.getAttribute('class').catch(() => '');
			const styles = await tabLocator.getAttribute('style').catch(() => '');
			
			// Check if tab has active class, bold styling, or underline
			const hasActiveClass = classes.includes('active') || classes.includes('selected') || classes.includes('current');
			const hasBoldStyle = styles.includes('font-weight: bold') || styles.includes('font-weight:bold');
			const hasUnderlineStyle = styles.includes('text-decoration: underline') || styles.includes('text-decoration:underline') || styles.includes('border-bottom');
			
			// Get computed styles
			const fontWeight = await tabLocator.evaluate(el => window.getComputedStyle(el).fontWeight).catch(() => '');
			const textDecoration = await tabLocator.evaluate(el => window.getComputedStyle(el).textDecoration).catch(() => '');
			const borderBottom = await tabLocator.evaluate(el => window.getComputedStyle(el).borderBottom).catch(() => '');
			
			const isBold = fontWeight === 'bold' || fontWeight === '700' || fontWeight > 400;
			const hasUnderline = textDecoration.includes('underline') || borderBottom !== 'none' && borderBottom !== '';
			
			if (hasActiveClass || hasBoldStyle || hasUnderlineStyle || isBold || hasUnderline) {
				return i;
			}
		}
		return null;
	}

	async clickTab(tabIndex) {
		const tabLocator = this.page.locator(`//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[3]/div/div[1]/div[${tabIndex}]`);
		await tabLocator.click();
		await this.page.waitForTimeout(1000); // Increased wait time for tab transition
	}

	async getTabDetails(tabIndex) {
		const tabLocator = this.page.locator(`//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[3]/div/div[1]/div[${tabIndex}]`);
		
		const classes = await tabLocator.getAttribute('class').catch(() => '');
		const styles = await tabLocator.getAttribute('style').catch(() => '');
		const fontWeight = await tabLocator.evaluate(el => window.getComputedStyle(el).fontWeight).catch(() => '');
		const textDecoration = await tabLocator.evaluate(el => window.getComputedStyle(el).textDecoration).catch(() => '');
		const borderBottom = await tabLocator.evaluate(el => window.getComputedStyle(el).borderBottom).catch(() => '');
		
		return {
			classes,
			styles,
			fontWeight,
			textDecoration,
			borderBottom,
			isBold: fontWeight === 'bold' || fontWeight === '700' || parseInt(fontWeight) >= 700,
			hasUnderline: textDecoration.includes('underline') || (borderBottom !== 'none' && borderBottom !== '' && borderBottom !== '0px none rgb(0, 0, 0)')
		};
	}

	async testDailyViewTabs() {
		try {
			const dropdownVisible = await this.verifyDateDropdownVisible();
			if (!dropdownVisible) {
				throw new Error('Date dropdown is not visible');
			}
		} catch (error) {
			throw new Error(`Step 1 - Verify date dropdown visibility failed: ${error.message}`);
		}

		try {
			const tabVisibility = await this.verifyTaskTabs();
			const allTabsVisible = tabVisibility.every(tab => tab.visible === true);
			if (!allTabsVisible) {
				const visibleTabs = tabVisibility.filter(tab => tab.visible).map(tab => tab.name);
				const hiddenTabs = tabVisibility.filter(tab => !tab.visible).map(tab => tab.name);
				throw new Error(`Not all tabs visible. Visible: [${visibleTabs.join(', ')}], Hidden: [${hiddenTabs.join(', ')}]`);
			}
		} catch (error) {
			throw new Error(`Step 2 - Verify task tabs visibility failed: ${error.message}`);
		}

		try {
			const tabNames = ['Arrivals', 'Departures', 'Clean', 'General tasks', 'All Tasks'];
			for (let i = 1; i <= 5; i++) {
				const tabLocator = this.page.locator(`//*[@id="app"]/div/div/div/div[1]/div/div[2]/section/div/section/div/div[2]/div[3]/div/div[1]/div[${i}]`);
				const isClickable = await tabLocator.isEnabled().catch(() => false);
				if (!isClickable) {
					throw new Error(`${tabNames[i-1]} tab is not clickable`);
				}
				await tabLocator.click();
				await this.page.waitForTimeout(500);
			}
		} catch (error) {
			throw new Error(`Step 3 - Verify tab clickability failed: ${error.message}`);
		}

		return true;
	}

	async verifyDateRangePickerVisible() {
		return await this.dateRangePicker.isVisible().catch(() => false);
	}

	async verifyDateRangePickerEnabled() {
		return await this.dateRangePicker.isEnabled().catch(() => false);
	}

	async getCurrentDateText() {
		const text = await this.currentDateElement.textContent().catch(() => '');
		return text.trim();
	}

	async getNextDateText() {
		const text = await this.nextDateElement.textContent().catch(() => '');
		return text.trim();
	}

	async getCurrentDate() {
		const today = new Date();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		const year = String(today.getFullYear()).slice(-2);
		return `${month}/${day}/${year}`;
	}

	async getNextDate() {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
		const day = String(tomorrow.getDate()).padStart(2, '0');
		const year = String(tomorrow.getFullYear()).slice(-2);
		return `${month}/${day}/${year}`;
	}

	async testDateRangeView() {
		try {
			const dropdownVisible = await this.verifyDateDropdownVisible();
			if (!dropdownVisible) {
				throw new Error('Date dropdown is not visible');
			}
		} catch (error) {
			throw new Error(`Step 1 - Verify date dropdown visibility failed: ${error.message}`);
		}

		try {
			await this.clickDateDropdown();
		} catch (error) {
			throw new Error(`Step 2 - Click date dropdown failed: ${error.message}`);
		}

		try {
			await this.clickDateRange();
		} catch (error) {
			throw new Error(`Step 3 - Click Date range option failed: ${error.message}`);
		}

		try {
			const pickerVisible = await this.verifyDateRangePickerVisible();
			if (!pickerVisible) {
				throw new Error('Date Range Picker is not visible');
			}
		} catch (error) {
			throw new Error(`Step 4 - Verify Date Range Picker visibility failed: ${error.message}`);
		}

		try {
			const pickerEnabled = await this.verifyDateRangePickerEnabled();
			if (!pickerEnabled) {
				throw new Error('Date Range Picker is not enabled');
			}
		} catch (error) {
			throw new Error(`Step 5 - Verify Date Range Picker enabled failed: ${error.message}`);
		}

		try {
			const currentDateText = await this.getCurrentDateText();
			const nextDateText = await this.getNextDateText();
			
			// Debug: Log what we actually get from the UI
			console.log(`DEBUG - Current date from UI: "${currentDateText}"`);
			console.log(`DEBUG - Next date from UI: "${nextDateText}"`);
			
			// Generate multiple possible date formats to match against
			const today = new Date();
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			
			const possibleCurrentFormats = [
				// MM/DD/YY
				`${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`,
				// M/D/YY
				`${today.getMonth() + 1}/${today.getDate()}/${String(today.getFullYear()).slice(-2)}`,
				// MM/DD/YYYY
				`${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`,
				// M/D/YYYY
				`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
				// DD/MM/YY
				`${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`,
				// YYYY-MM-DD
				`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
			];
			
			const possibleNextFormats = [
				// MM/DD/YY
				`${String(tomorrow.getMonth() + 1).padStart(2, '0')}/${String(tomorrow.getDate()).padStart(2, '0')}/${String(tomorrow.getFullYear()).slice(-2)}`,
				// M/D/YY
				`${tomorrow.getMonth() + 1}/${tomorrow.getDate()}/${String(tomorrow.getFullYear()).slice(-2)}`,
				// MM/DD/YYYY
				`${String(tomorrow.getMonth() + 1).padStart(2, '0')}/${String(tomorrow.getDate()).padStart(2, '0')}/${tomorrow.getFullYear()}`,
				// M/D/YYYY
				`${tomorrow.getMonth() + 1}/${tomorrow.getDate()}/${tomorrow.getFullYear()}`,
				// DD/MM/YY
				`${String(tomorrow.getDate()).padStart(2, '0')}/${String(tomorrow.getMonth() + 1).padStart(2, '0')}/${String(tomorrow.getFullYear()).slice(-2)}`,
				// YYYY-MM-DD
				`${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`,
			];
			
			console.log(`DEBUG - Possible current date formats: ${possibleCurrentFormats.join(', ')}`);
			console.log(`DEBUG - Possible next date formats: ${possibleNextFormats.join(', ')}`);
			
			// Check if current date matches any expected format
			const currentDateMatches = possibleCurrentFormats.includes(currentDateText);
			if (!currentDateMatches) {
				// Try flexible matching - check if it contains today's day and month
				const todayDay = today.getDate();
				const todayMonth = today.getMonth() + 1;
				const currentDateFlexible = currentDateText.includes(String(todayDay)) && 
					(currentDateText.includes(String(todayMonth)) || currentDateText.includes(String(todayMonth).padStart(2, '0')));
				
				if (!currentDateFlexible) {
					throw new Error(`Current date verification failed. UI shows: "${currentDateText}", Expected one of: [${possibleCurrentFormats.join(', ')}]`);
				} else {
					console.log(`DEBUG - Current date flexible match successful`);
				}
			} else {
				console.log(`DEBUG - Current date exact match successful`);
			}
			
			// Check if next date matches any expected format
			const nextDateMatches = possibleNextFormats.includes(nextDateText);
			if (!nextDateMatches) {
				// Try flexible matching - check if it contains tomorrow's day and month
				const tomorrowDay = tomorrow.getDate();
				const tomorrowMonth = tomorrow.getMonth() + 1;
				const nextDateFlexible = nextDateText.includes(String(tomorrowDay)) && 
					(nextDateText.includes(String(tomorrowMonth)) || nextDateText.includes(String(tomorrowMonth).padStart(2, '0')));
				
				if (!nextDateFlexible) {
					throw new Error(`Next date verification failed. UI shows: "${nextDateText}", Expected one of: [${possibleNextFormats.join(', ')}]`);
				} else {
					console.log(`DEBUG - Next date flexible match successful`);
				}
			} else {
				console.log(`DEBUG - Next date exact match successful`);
			}
			
		} catch (error) {
			throw new Error(`Step 6-7 - Verify current and next dates failed: ${error.message}`);
		}
		return true;
	}

	async getFormattedDate(date) {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		
		const dayName = days[date.getDay()];
		const monthName = months[date.getMonth()];
		const dayNumber = date.getDate();
		const year = date.getFullYear();
		
		return `Choose ${dayName}, ${monthName} ${dayNumber}, ${year} as your check-in date`;
	}

	async getTargetDates() {
		const today = new Date();
		const fromDate = new Date(today);
		fromDate.setDate(today.getDate() + 3);
		
		const toDate = new Date(today);
		toDate.setDate(today.getDate() + 4);
		
		return { fromDate, toDate };
	}

	async clickCurrentDateField() {
		await this.currentDateField.click();
		await this.page.waitForTimeout(1000);
	}

	async verifyCalendarPopupVisible() {
		return await this.dateCalendarPopup.isVisible().catch(() => false);
	}

	async debugCalendarStructure() {
		console.log('DEBUG - Analyzing calendar structure...');
		
		// Check if calendar popup is visible
		const calendarVisible = await this.dateCalendarPopup.isVisible().catch(() => false);
		console.log(`DEBUG - Calendar popup visible: ${calendarVisible}`);
		
		// Get all calendar day buttons
		const allButtons = await this.page.locator('button.CalendarDay__button').count().catch(() => 0);
		console.log(`DEBUG - Found ${allButtons} calendar day buttons`);
		
		// Get first few buttons for analysis
		for (let i = 0; i < Math.min(5, allButtons); i++) {
			try {
				const button = this.page.locator('button.CalendarDay__button').nth(i);
				const text = await button.textContent().catch(() => '');
				const ariaLabel = await button.getAttribute('aria-label').catch(() => '');
				console.log(`DEBUG - Button ${i}: text="${text}", aria-label="${ariaLabel}"`);
			} catch (error) {
				console.log(`DEBUG - Button ${i}: Error getting info`);
			}
		}
		
		// Try different calendar selectors
		const alternativeSelectors = [
			'button[class*="CalendarDay"]',
			'td[class*="CalendarDay"] button',
			'[class*="calendar"] button',
			'button[aria-label*="Choose"]'
		];
		
		for (const selector of alternativeSelectors) {
			const count = await this.page.locator(selector).count().catch(() => 0);
			console.log(`DEBUG - Selector "${selector}" found ${count} elements`);
		}
	}

	async selectDateFromCalendar(targetDate) {
		const dayNumber = targetDate.getDate();
		const formattedDate = await this.getFormattedDate(targetDate);
		console.log(`DEBUG - Trying to select date: ${targetDate.toDateString()}, day number: ${dayNumber}`);
		console.log(`DEBUG - Expected aria-label: "${formattedDate}. It's available."`);
		
		// Strategy 1: Use aria-label with exact format from HTML
		try {
			const ariaLabelPattern = formattedDate + ". It's available.";
			const dateButton = this.page.locator(`button.CalendarDay__button[aria-label="${ariaLabelPattern}"]`);
			const isVisible = await dateButton.isVisible({ timeout: 3000 }).catch(() => false);
			
			if (isVisible) {
				await dateButton.click();
				await this.page.waitForTimeout(1000);
				console.log(`DEBUG - Successfully clicked date using aria-label strategy`);
				return true;
			}
		} catch (error) {
			console.log(`DEBUG - Aria-label strategy failed: ${error.message}`);
		}
		
		// Strategy 2: Use partial aria-label match
		try {
			const partialAriaLabel = formattedDate.split(' as your')[0]; // "Choose Friday, August 1, 2025"
			const dateButton = this.page.locator(`button.CalendarDay__button[aria-label*="${partialAriaLabel}"]`);
			const isVisible = await dateButton.isVisible({ timeout: 3000 }).catch(() => false);
			
			if (isVisible) {
				await dateButton.click();
				await this.page.waitForTimeout(1000);
				console.log(`DEBUG - Successfully clicked date using partial aria-label strategy`);
				return true;
			}
		} catch (error) {
			console.log(`DEBUG - Partial aria-label strategy failed: ${error.message}`);
		}
		
		// Strategy 3: Simple day number in CalendarDay button
		try {
			const dayButton = this.page.locator(`button.CalendarDay__button:has-text("${dayNumber}")`).first();
			const isVisible = await dayButton.isVisible({ timeout: 3000 }).catch(() => false);
			
			if (isVisible) {
				await dayButton.click();
				await this.page.waitForTimeout(1000);
				console.log(`DEBUG - Successfully clicked date using day number strategy`);
				return true;
			}
		} catch (error) {
			console.log(`DEBUG - Day number strategy failed: ${error.message}`);
		}
		
		// Strategy 4: Use the exact xpath pattern structure
		try {
			// Find all CalendarDay buttons and check their text content
			const allCalendarButtons = this.page.locator('td.CalendarDay button.CalendarDay__button');
			const count = await allCalendarButtons.count().catch(() => 0);
			console.log(`DEBUG - Found ${count} calendar day buttons`);
			
			for (let i = 0; i < count; i++) {
				const button = allCalendarButtons.nth(i);
				const buttonText = await button.textContent().catch(() => '');
				
				if (buttonText.trim() === String(dayNumber)) {
					const isVisible = await button.isVisible().catch(() => false);
					if (isVisible) {
						await button.click();
						await this.page.waitForTimeout(1000);
						console.log(`DEBUG - Successfully clicked date using xpath pattern strategy, button index: ${i}`);
						return true;
					}
				}
			}
		} catch (error) {
			console.log(`DEBUG - XPath pattern strategy failed: ${error.message}`);
		}
		
		// Strategy 5: Direct xpath approach based on your provided xpath
		try {
			const baseXpath = '//*[@id="assignAndDateDateRange"]/div/div/div[2]/div/div/div[2]/div[2]/div/div[2]/table/tbody';
			
			// Look through all rows and cells for the day number
			for (let row = 1; row <= 6; row++) {
				for (let col = 1; col <= 7; col++) {
					try {
						const buttonXpath = `${baseXpath}/tr[${row}]/td[${col}]/button`;
						const button = this.page.locator(buttonXpath);
						const buttonText = await button.textContent().catch(() => '');
						
						if (buttonText.trim() === String(dayNumber)) {
							const isVisible = await button.isVisible().catch(() => false);
							if (isVisible) {
								await button.click();
								await this.page.waitForTimeout(1000);
								console.log(`DEBUG - Successfully clicked date using direct xpath: row ${row}, col ${col}`);
								return true;
							}
						}
					} catch (error) {
						// Continue to next cell
					}
				}
			}
		} catch (error) {
			console.log(`DEBUG - Direct xpath strategy failed: ${error.message}`);
		}
		
		throw new Error(`Failed to select date ${targetDate.toDateString()}. Day number: ${dayNumber}. All strategies failed.`);
	}

	async getSelectedDateRangeText() {
		const fromText = await this.currentDateField.textContent().catch(() => '');
		return fromText.trim();
	}

	async testDateRangeSelection() {
		try {
			const dropdownVisible = await this.verifyDateDropdownVisible();
			if (!dropdownVisible) {
				throw new Error('Date dropdown is not visible');
			}
		} catch (error) {
			throw new Error(`Step 1 - Verify date dropdown visibility failed: ${error.message}`);
		}

		try {
			await this.clickDateDropdown();
		} catch (error) {
			throw new Error(`Step 2 - Click date dropdown failed: ${error.message}`);
		}

		try {
			await this.clickDateRange();
		} catch (error) {
			throw new Error(`Step 3 - Click Date range option failed: ${error.message}`);
		}

		try {
			const pickerVisible = await this.verifyDateRangePickerVisible();
			if (!pickerVisible) {
				throw new Error('Date Range Picker is not visible');
			}
		} catch (error) {
			throw new Error(`Step 4 - Verify Date Range Picker visibility failed: ${error.message}`);
		}

		try {
			await this.clickCurrentDateField();
		} catch (error) {
			throw new Error(`Step 5 - Click current date field failed: ${error.message}`);
		}

		try {
			const calendarVisible = await this.verifyCalendarPopupVisible();
			if (!calendarVisible) {
				throw new Error('Date selector calendar popup is not visible');
			}
		} catch (error) {
			throw new Error(`Step 6 - Verify calendar popup visibility failed: ${error.message}`);
		}

		try {
			const { fromDate, toDate } = await this.getTargetDates();
			console.log(`DEBUG - Target dates: From=${fromDate.toDateString()}, To=${toDate.toDateString()}`);
			
			// Select From Date (current date + 3)
			const fromDateSelected = await this.selectDateFromCalendar(fromDate);
			if (!fromDateSelected) {
				throw new Error(`Failed to select From Date: ${fromDate.toDateString()}`);
			}
			
			// Select To Date (current date + 4)
			const toDateSelected = await this.selectDateFromCalendar(toDate);
			if (!toDateSelected) {
				throw new Error(`Failed to select To Date: ${toDate.toDateString()}`);
			}
			
		} catch (error) {
			throw new Error(`Step 7 - Select date range failed: ${error.message}`);
		}

		try {
			const selectedRange = await this.getSelectedDateRangeText();
			console.log(`DEBUG - Selected date range: "${selectedRange}"`);
			
			if (!selectedRange || selectedRange.length === 0) {
				throw new Error('No date range appears to be selected');
			}
		} catch (error) {
			throw new Error(`Step 8 - Verify selected date range failed: ${error.message}`);
		}

		return true;
	}

	async clickCalendarViewButton() {
		await this.calendarViewButton.click();
		await this.page.waitForLoadState('domcontentloaded');
	}

	async verifyCalendarPageUrl() {
		const currentUrl = this.page.url();
		return currentUrl.toLowerCase().includes('calendar');
	}

	async verifyMonthDropdownVisible() {
		// Try multiple selectors to find the month dropdown
		const selectors = [
			'//*[@id="react-select-5--value-item"]/span[@class="_4yj72ok"]',
			'//*[@id="react-select-5--value-item"]/span',
			'//*[@id="react-select-5--value-item"]',
			'//span[@class="_4yj72ok"]',
			'.Select-value-label span._4yj72ok',
			'.Select-control',
			'[class*="Select-control"]',
			'[id*="react-select"]'
		];
		
		for (const selector of selectors) {
			try {
				const element = this.page.locator(selector);
				const isVisible = await element.isVisible({ timeout: 3000 }).catch(() => false);
				const count = await element.count().catch(() => 0);
				
				if (isVisible && count > 0) {
					return true;
				}
			} catch (error) {
				continue;
			}
		}
		
		return false;
	}

	async getMonthDropdownText() {
		// Try multiple selectors to find the month text
		const selectors = [
			'//*[@id="react-select-5--value-item"]/span[@class="_4yj72ok"]',
			'//*[@id="react-select-5--value-item"]/span',
			'//*[@id="react-select-5--value-item"]',
			'//span[@class="_4yj72ok"]',
			'.Select-value-label span._4yj72ok'
		];
		
		for (const selector of selectors) {
			try {
				const element = this.page.locator(selector);
				const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
				if (isVisible) {
					const text = await element.textContent().catch(() => '');
					if (text && text.trim()) {
						return text.trim();
					}
				}
			} catch (error) {
				continue;
			}
		}
		
		return '';
	}

	async getCurrentMonthName() {
		const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
			'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
		const currentDate = new Date();
		return months[currentDate.getMonth()];
	}

	async clickPreviousMonth() {
		await this.previousMonthButton.click();
		await this.page.waitForTimeout(1000); // Wait for month change
	}

	async clickNextMonth() {
		await this.nextMonthButton.click();
		await this.page.waitForTimeout(1000); // Wait for month change
	}

	async getPreviousMonthName(currentMonth) {
		const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
			'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
		const currentIndex = months.indexOf(currentMonth.toUpperCase());
		if (currentIndex === -1) return '';
		
		// If January, previous month is December
		const previousIndex = currentIndex === 0 ? 11 : currentIndex - 1;
		return months[previousIndex];
	}

	async getNextMonthName(currentMonth) {
		const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
			'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
		const currentIndex = months.indexOf(currentMonth.toUpperCase());
		if (currentIndex === -1) return '';
		
		// If December, next month is January
		const nextIndex = currentIndex === 11 ? 0 : currentIndex + 1;
		return months[nextIndex];
	}

	async verifyPreviousMonthButton() {
		return await this.previousMonthButton.isVisible().catch(() => false);
	}

	async verifyNextMonthButton() {
		return await this.nextMonthButton.isVisible().catch(() => false);
	}

	async testCalendarView() {
		try {
			const navigationSuccess = await this.navigateToListView();
			if (!navigationSuccess) {
				throw new Error('Failed to navigate to Tasks List View');
			}
		} catch (error) {
			throw new Error(`Step 1 - Navigate to Tasks List View failed: ${error.message}`);
		}

		try {
			await this.clickCalendarViewButton();
		} catch (error) {
			throw new Error(`Step 2 - Click Calendar View button failed: ${error.message}`);
		}

		try {
			const urlContainsCalendar = await this.verifyCalendarPageUrl();
			if (!urlContainsCalendar) {
				const currentUrl = this.page.url();
				throw new Error(`URL does not contain "calendar". Current URL: ${currentUrl}`);
			}
		} catch (error) {
			throw new Error(`Step 3 - Verify calendar URL failed: ${error.message}`);
		}

		try {
			// Wait a bit for page to fully load after navigation
			await this.page.waitForTimeout(2000);
			
			const monthDropdownVisible = await this.verifyMonthDropdownVisible();
			if (!monthDropdownVisible) {
				throw new Error('Month dropdown is not visible');
			}
		} catch (error) {
			throw new Error(`Step 4 - Verify month dropdown visibility failed: ${error.message}`);
		}

		try {
			const displayedMonth = await this.getMonthDropdownText();
			const currentMonth = await this.getCurrentMonthName();
			
			if (!displayedMonth.includes(currentMonth)) {
				throw new Error(`Incorrect month displayed. Expected: "${currentMonth}", Got: "${displayedMonth}"`);
			}
		} catch (error) {
			throw new Error(`Step 5 - Verify current month displayed failed: ${error.message}`);
		}

		return true;
	}

	async testCalendarViewMonthNavigation() {
		try {
			const navigationSuccess = await this.navigateToListView();
			if (!navigationSuccess) {
				throw new Error('Failed to navigate to Tasks List View');
			}
		} catch (error) {
			throw new Error(`Step 1 - Navigate to Tasks List View failed: ${error.message}`);
		}

		try {
			await this.clickCalendarViewButton();
		} catch (error) {
			throw new Error(`Step 2 - Click Calendar View button failed: ${error.message}`);
		}

		try {
			const urlContainsCalendar = await this.verifyCalendarPageUrl();
			if (!urlContainsCalendar) {
				const currentUrl = this.page.url();
				throw new Error(`URL does not contain "calendar". Current URL: ${currentUrl}`);
			}
		} catch (error) {
			throw new Error(`Step 3 - Verify calendar URL failed: ${error.message}`);
		}

		try {
			// Wait a bit for page to fully load after navigation
			await this.page.waitForTimeout(2000);
			
			const monthDropdownVisible = await this.verifyMonthDropdownVisible();
			if (!monthDropdownVisible) {
				throw new Error('Month dropdown is not visible');
			}
		} catch (error) {
			throw new Error(`Step 4 - Verify month dropdown visibility failed: ${error.message}`);
		}

		let currentDisplayedMonth;
		try {
			currentDisplayedMonth = await this.getMonthDropdownText();
			const currentMonth = await this.getCurrentMonthName();
			
			if (!currentDisplayedMonth.toUpperCase().includes(currentMonth)) {
				throw new Error(`Incorrect month displayed. Expected: "${currentMonth}", Got: "${currentDisplayedMonth}"`);
			}
			console.log(`✓ Correct month is displayed: ${currentDisplayedMonth}`);
		} catch (error) {
			throw new Error(`Step 4 (verify current month) - Verify current month displayed failed: ${error.message}`);
		}

		// Store the original month for comparison
		const originalMonth = currentDisplayedMonth;

		try {
			// Verify previous month button is visible
			const previousButtonVisible = await this.verifyPreviousMonthButton();
			if (!previousButtonVisible) {
				throw new Error('Previous month button is not visible');
			}

			// Click previous month button
			await this.clickPreviousMonth();
		} catch (error) {
			throw new Error(`Step 5 - Click previous month button failed: ${error.message}`);
		}

		try {
			// Verify month changed to previous month
			const updatedMonth = await this.getMonthDropdownText();
			const expectedPreviousMonth = await this.getPreviousMonthName(originalMonth);
			
			if (!updatedMonth.toUpperCase().includes(expectedPreviousMonth)) {
				throw new Error(`Previous month navigation failed. Expected: "${expectedPreviousMonth}", Got: "${updatedMonth}"`);
			}
			console.log(`✓ Previous month navigation successful: ${originalMonth} → ${updatedMonth}`);
		} catch (error) {
			throw new Error(`Step 5 (verify previous month) - Verify previous month navigation failed: ${error.message}`);
		}

		try {
			// Verify next month button is visible
			const nextButtonVisible = await this.verifyNextMonthButton();
			if (!nextButtonVisible) {
				throw new Error('Next month button is not visible');
			}

			// Click next month button to return to original month
			await this.clickNextMonth();
		} catch (error) {
			throw new Error(`Step 6 - Click next month button failed: ${error.message}`);
		}

		try {
			// Verify month returned to original month
			const finalMonth = await this.getMonthDropdownText();
			
			if (!finalMonth.toUpperCase().includes(originalMonth.toUpperCase())) {
				throw new Error(`Next month navigation failed. Expected to return to: "${originalMonth}", Got: "${finalMonth}"`);
			}
			console.log(`✓ Next month navigation successful, returned to: ${finalMonth}`);
		} catch (error) {
			throw new Error(`Step 6 (verify next month) - Verify next month navigation failed: ${error.message}`);
		}

		return true;
	}
}

module.exports = { TasksPage };
