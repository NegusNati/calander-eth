# Deployment Plan

## Phase 1 – Assess & Align
- [x] Review build scripts, runtime needs, and env variables.
- [x] Decide service naming, ports, and deployment path for the new stack (use `calendar-frontend`, default path `/opt/passport/calendar-frontend`, attach to proxy network `${PROXY_NETWORK:-web}`).

## Phase 2 – Containerize App
- [x] Enable a standalone Next.js build suitable for slim runtime images.
- [x] Add a `.dockerignore` to keep images lean.
- [x] Add a multi-stage Dockerfile for production.

## Phase 3 – Orchestrate with Docker Compose
- [x] Create `docker-compose.yml` with app + supporting services and healthchecks.
- [x] Capture required `.env` keys and notes for the server.

## Phase 4 – CI/CD Pipeline
- [x] Add a zero-downtime GitHub Actions workflow deploying over SSH.

## Phase 5 – Verification & Follow-ups
- [x] Perform config sanity checks and outline remaining validation (e.g., lint/build).
- [x] Update this plan with completion status and any caveats.

## Env & Secrets Notes
- `.env` on the server (used by `docker compose`):
  - Optional app toggles: `NEXT_PUBLIC_DISABLE_SW`, `NEXT_TELEMETRY_DISABLED`, any future `NEXT_PUBLIC_*` keys for this Next.js app.
  - Optional proxy network override: `PROXY_NETWORK` (defaults to `web`).
- GitHub Action secrets:
  - `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, `DEPLOY_PORT` (optional), `DEPLOY_PATH` (defaults to `/opt/passport/calendar-frontend`), `PROXY_NETWORK` (if not `web`).

## Verification Log
- `pnpm lint` (2025-11-23): ✅ passed.
- Pending: first deploy on the target server to validate network/proxy wiring.
