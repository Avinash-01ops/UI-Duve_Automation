## Project Setup Notes

- Tests under `src/tests/*`. Page Objects under `src/page-objects/*`.
- Reports output to `src/test-results`.
- Allure results at `src/test-results/allure-results` and HTML report at `src/test-results/allure-report`.

### Scripts

- `npm run test:smoke` / `npm run test:regression` etc.
- `npm run show-report` (Playwright HTML)
- `npm run allure:generate` and `npm run allure:open`
- `npm run lint` / `npm run lint:fix`

### Path Aliases

Configured in `jsconfig.json`:
- `@tests/*` -> `src/tests/*`
- `@pages/*` -> `src/page-objects/*`
- `@utils/*` -> `src/utils/*`
- `@config/*` -> `src/config/*`
- `@fixtures/*` -> `src/fixtures/*`

### Docker

Use the provided Dockerfile (Playwright base image + Java 11 for Allure).

