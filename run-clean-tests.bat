@echo off
echo Running clean tests without console logs...
echo.

echo Running Basic Details tests...
npx playwright test src/tests/regression/basic-details-final.spec.js --config=playwright.clean.config.js --reporter=line

echo.
echo Running Tasks tests...
npx playwright test src/tests/regression/tasks-final.spec.js --config=playwright.clean.config.js --reporter=line

echo.
echo Running Task List View tests...
npx playwright test src/tests/regression/task-list-view.spec.js --config=playwright.clean.config.js --reporter=line

echo.
echo Running Task Calendar View tests...
npx playwright test src/tests/regression/tasks-calenderview.spec.js --config=playwright.clean.config.js --reporter=line

echo.
echo Running Marketing tests...
npx playwright test src/tests/regression/marketing.spec.js --config=playwright.clean.config.js --reporter=line

echo.
echo ✅ All clean tests completed!
pause
