# Testing Standards

## Quality Metrics

- Backend coverage gate: `>= 60%` (`pytest --cov --cov-fail-under=60` via `pytest.ini`).
- Frontend coverage gate: `lines/functions/statements >= 60%`, `branches >= 50%` (Vitest coverage thresholds in `frontend/vite.config.ts`).

## Test Levels And Commands

### Backend (pytest)

- All: `H:/Mine/Studies/Uni/Fullstack/proj1/venv/Scripts/python -m pytest`
- Unit only: `H:/Mine/Studies/Uni/Fullstack/proj1/venv/Scripts/python -m pytest -m unit`
- Integration only: `H:/Mine/Studies/Uni/Fullstack/proj1/venv/Scripts/python -m pytest -m integration`
- E2E only: `H:/Mine/Studies/Uni/Fullstack/proj1/venv/Scripts/python -m pytest -m e2e`

### Frontend (Vitest/Playwright)

- Unit: `npm run test:unit`
- Integration: `npm run test:integration`
- E2E: `npm run test:e2e`
- All unit+integration: `npm run test`
- Coverage: `npm run test:coverage`

## Naming Convention

### Backend

- Unit tests: `*_unit.py` or marker `@pytest.mark.unit`
- Integration tests: `*_integration.py` or marker `@pytest.mark.integration`
- E2E tests: `*_e2e.py` or marker `@pytest.mark.e2e`
- Test functions must use `test_*` naming.

### Frontend

- Unit tests: `*.unit.test.ts` / `*.unit.test.tsx`
- Integration tests: `*.integration.test.ts` / `*.integration.test.tsx`
- E2E tests: Playwright specs in `frontend/tests/**/*.spec.ts`

## Structure

- Backend:
  - `backend/tests/unit/...`
  - `backend/tests/integration/...`
  - `backend/tests/e2e/...`
- Frontend:
  - `frontend/src/tests/unit/...`
  - `frontend/src/tests/integration/...`
  - `frontend/tests/e2e/...` (Playwright)

Use one assertion topic per test and one behavior per fixture setup for predictable isolation.
