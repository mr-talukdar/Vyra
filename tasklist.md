# Vyra task list

> Generated from [ROADMAP.md](./ROADMAP.md). Update the roadmap first when scope or status changes, then keep this checklist synchronized.

Legend: `[x]` done · `[~]` partially complete · `[ ]` not started · `[!]` blocked

## Phase A - Repository conventions and requirements

- [~] **SETUP-001** — Preserve and record the baseline _( PARTIAL )_
  - Objective: Establish a reproducible baseline without losing existing work.
  - Dependencies: None.
- [!] **SETUP-002** — Confirm product scope and acceptance criteria _( BLOCKED )_
  - Objective: Turn product goals into versioned, testable requirements.
  - Dependencies: `SETUP-001`.
- [ ] **SETUP-003** — Normalize repository conventions _( NOT STARTED )_
  - Objective: Make VYRA naming and workspace usage consistent without
  - Dependencies: `SETUP-002`.
- [x] **SETUP-004** — Establish deterministic development scripts _( DONE )_
  - Objective: Provide explicit, non-deceptive scripts for mobile/API
  - Dependencies: `SETUP-003`.
## Phase B - Architecture, API foundation, and contracts

- [!] **ARCH-001** — Record the modular-monolith and data-access decisions _( BLOCKED )_
  - Objective: Finalize module boundaries, transaction ownership, and the
  - Dependencies: `SETUP-002`.
- [ ] **CONTRACT-001** — Create the shared contracts package _( NOT STARTED )_
  - Objective: Define stable request/response schemas for the first slice.
  - Dependencies: `ARCH-001`, `SETUP-004`.
- [~] **API-001** — Harden application startup and configuration _( PARTIAL )_
  - Objective: Make startup typed, environment-aware, and safe.
  - Dependencies: `ARCH-001`, `SETUP-004`.
- [~] **API-002** — Define HTTP errors and request middleware _( PARTIAL )_
  - Objective: Provide consistent safe responses and request diagnostics.
  - Dependencies: `API-001`, `CONTRACT-001`.
- [~] **API-003** — Replace simulated readiness with dependency health _( PARTIAL )_
  - Objective: Make liveness and readiness meaningful.
  - Dependencies: `API-001`, `DB-002`.
- [ ] **API-004** — Add API security middleware _( NOT STARTED )_
  - Objective: Establish safe defaults before protected features ship.
  - Dependencies: `API-001`, `API-002`, `SETUP-002`.
## Phase C - Database and authentication

- [ ] **DB-001** — Model the initial domain and constraints _( NOT STARTED )_
  - Objective: Define a normalized, auditable MVP schema.
  - Dependencies: `SETUP-002`, `ARCH-001`.
- [~] **DB-002** — Configure Prisma and Supabase connections _( PARTIAL )_
  - Objective: Establish safe local and production database connectivity.
  - Dependencies: `ARCH-001`, `DB-001`, `API-001`.
- [ ] **DB-003** — Create and verify migrations and seed data _( NOT STARTED )_
  - Objective: Make schema changes repeatable and testable.
  - Dependencies: `DB-002`.
- [ ] **DB-004** — Configure Supabase RLS and data-access boundaries _( NOT STARTED )_
  - Objective: Prevent cross-user and cross-tenant data access.
  - Dependencies: `DB-003`, `AUTH-002`, `SETUP-002`.
- [ ] **AUTH-001** — Implement authentication bootstrap _( NOT STARTED )_
  - Objective: Provide the selected sign-in, sign-out, refresh, and
  - Dependencies: `SETUP-002`, `API-001`, `ARCH-001`.
- [ ] **AUTH-002** — Add users, roles, and authorization middleware _( NOT STARTED )_
  - Objective: Make identity and permissions available to modules.
  - Dependencies: `DB-001`, `AUTH-001`.
- [ ] **AUTH-003** — Build account management and privacy controls _( NOT STARTED )_
  - Objective: Support profile viewing/editing and account lifecycle safely.
  - Dependencies: `AUTH-002`, `DB-004`, `SETUP-002`.
## Phase D - First end-to-end vertical slice

- [ ] **DASH-001** — Implement dashboard read model and service _( NOT STARTED )_
  - Objective: Replace hard-coded points/streak values with persisted,
  - Dependencies: `DB-003`, `AUTH-002`, `CONTRACT-001`.
- [ ] **DASH-002** — Expose the dashboard endpoint _( NOT STARTED )_
  - Objective: Provide a protected, documented dashboard API.
  - Dependencies: `DASH-001`, `API-002`, `AUTH-002`.
- [ ] **MOB-001** — Add the mobile API and session foundation _( NOT STARTED )_
  - Objective: Connect the Expo app to a configurable API safely.
  - Dependencies: `AUTH-001`, `CONTRACT-001`, `API-002`.
- [ ] **MOB-002** — Add dashboard query, cache, and UI states _( NOT STARTED )_
  - Objective: Reuse the existing home UI with real server state.
  - Dependencies: `DASH-002`, `MOB-001`.
- [ ] **MOB-003** — Add auth-aware routing and profile bootstrap _( NOT STARTED )_
  - Objective: Prevent protected screens from rendering as authenticated
  - Dependencies: `AUTH-001`, `MOB-001`.
- [ ] **MOB-004** — Complete the first slice acceptance check _( NOT STARTED )_
  - Objective: Demonstrate the smallest meaningful product path end to end.
  - Dependencies: `DASH-002`, `MOB-002`, `MOB-003`, `TEST-003`.
## Phase E - Core employee features

- [~] **ANN-001** — Build announcement domain and read APIs _( PARTIAL )_
  - Objective: Persist and serve announcements with lifecycle and audience
  - Dependencies: `DB-001`, `DB-003`, `AUTH-002`, `CONTRACT-001`.
- [~] **ANN-002** — Integrate announcement list/detail UI _( PARTIAL )_
  - Objective: Replace local announcements while preserving the current UX.
  - Dependencies: `ANN-001`, `MOB-002`.
- [ ] **ANN-003** — Add administrative announcement lifecycle _( NOT STARTED )_
  - Objective: Allow approved roles to create, edit, publish, archive, and
  - Dependencies: `ANN-001`, `AUTH-002`, `ADMIN-001`.
- [ ] **QUIZ-001** — Model quiz content and publishing rules _( NOT STARTED )_
  - Objective: Define weekly quiz content, questions, answers, scoring, and
  - Dependencies: `DB-001`, `SETUP-002`.
- [ ] **QUIZ-002** — Implement attempts, scoring, and rewards _( NOT STARTED )_
  - Objective: Make quiz completion correct and idempotent.
  - Dependencies: `QUIZ-001`, `DB-003`, `AUTH-002`.
- [~] **QUIZ-003** — Integrate weekly quiz mobile flow _( PARTIAL )_
  - Objective: Turn the existing featured challenge into a usable quiz path.
  - Dependencies: `QUIZ-002`, `MOB-001`, `MOB-002`.
- [ ] **QUIZ-004** — Add quiz administration and moderation _( NOT STARTED )_
  - Objective: Provide safe content authoring and publication.
  - Dependencies: `QUIZ-001`, `ANN-003`, `ADMIN-001`.
- [~] **CHAL-001** — Define daily challenge, points, and streak rules _( PARTIAL )_
  - Objective: Make completion and streak calculations explicit and fair.
  - Dependencies: `SETUP-002`, `DB-001`.
- [ ] **CHAL-002** — Implement challenge completion and streak service _( NOT STARTED )_
  - Objective: Persist completion and calculate rewards server-side.
  - Dependencies: `CHAL-001`, `AUTH-002`, `DB-003`.
- [~] **CHAL-003** — Integrate daily challenge UI _( PARTIAL )_
  - Objective: Connect the existing card to challenge state and mutation.
  - Dependencies: `CHAL-002`, `MOB-002`.
- [~] **LEAD-001** — Implement scoped leaderboards _( PARTIAL )_
  - Objective: Define and serve fair, privacy-aware rankings.
  - Dependencies: `DB-001`, `CHAL-002`, `QUIZ-002`, `AUTH-002`, `SETUP-002`.
- [~] **PROFILE-001** — Connect the profile screen _( PARTIAL )_
  - Objective: Display authenticated profile and progress from the API.
  - Dependencies: `AUTH-003`, `DASH-001`, `MOB-002`, `SETUP-002`.
## Phase F - Administration, reporting, and media

- [!] **ADMIN-001** — Define the role and permission matrix _( BLOCKED )_
  - Objective: Make every administrative operation explicitly authorized.
  - Dependencies: `SETUP-002`, `AUTH-002`.
- [ ] **ADMIN-002** — Implement user/content management operations _( NOT STARTED )_
  - Objective: Provide controlled administrative management.
  - Dependencies: `ADMIN-001`, `DB-004`, `API-002`.
- [ ] **ADMIN-003** — Add reporting and moderation workflows _( NOT STARTED )_
  - Objective: Support abuse/content reports and accountable resolution.
  - Dependencies: `ADMIN-001`, `SETUP-002`.
- [ ] **ADMIN-004** — Add approved media/storage support _( NOT STARTED )_
  - Objective: Store only confirmed media with safe access and lifecycle.
  - Dependencies: `SETUP-002`, `ARCH-001`, `AUTH-002`.
- [ ] **REPORT-001** — Define engagement analytics and privacy _( NOT STARTED )_
  - Objective: Measure product health without collecting unjustified data.
  - Dependencies: `SETUP-002`, `AUTH-003`, `ADMIN-001`.
## Phase G - Quality, security, and operations

- [~] **TEST-001** — Establish backend test infrastructure _( PARTIAL )_
  - Objective: Add the intended Vitest/Supertest foundation without claiming
  - Dependencies: `SETUP-004`, `API-001`, `API-002`.
- [~] **TEST-002** — Cover health and API failure behavior _( PARTIAL )_
  - Objective: Prove baseline routes and middleware behavior.
  - Dependencies: `API-002`, `API-003`, `TEST-001`.
- [ ] **TEST-003** — Add mobile component and integration tests _( NOT STARTED )_
  - Objective: Protect existing UI while replacing fixtures with data.
  - Dependencies: `CONTRACT-001`, `MOB-001`.
- [~] **QUALITY-001** — Fix and lock baseline quality gates _( PARTIAL )_
  - Objective: Make lint/typecheck output reliable and clean.
  - Dependencies: `SETUP-004`.
- [ ] **QUALITY-002** — Expand feature test coverage _( NOT STARTED )_
  - Objective: Test business rules, contracts, permissions, migrations,
  - Dependencies: `TEST-001`, `TEST-003`, feature tasks.
- [ ] **QUALITY-003** — Add end-to-end and production smoke testing _( NOT STARTED )_
  - Objective: Verify sign-in and employee workflows on a real build/API.
  - Dependencies: `MOB-004`, `QUALITY-002`, `DEPLOY-001`.
- [ ] **SEC-001** — Perform threat modeling and privacy review _( NOT STARTED )_
  - Objective: Identify abuse cases before production.
  - Dependencies: `SETUP-002`, `AUTH-002`, `DB-004`, feature modules.
- [ ] **SEC-002** — Harden dependencies and secrets _( NOT STARTED )_
  - Objective: Keep credentials and dependencies maintainable.
  - Dependencies: `API-001`, `SEC-001`, `DEPLOY-001`.
- [ ] **SEC-003** — Verify privacy, accessibility, and secure UX _( NOT STARTED )_
  - Objective: Make the mobile experience safe and usable.
  - Dependencies: `AUTH-003`, `MOB-002`, `SETUP-002`.
- [ ] **SEC-004** — Add resilience, timeout, and performance controls _( NOT STARTED )_
  - Objective: Keep the system predictable under slow or failing dependencies.
  - Dependencies: `API-002`, `DB-004`, `QUALITY-002`.
- [ ] **QUALITY-004** — Add observability and operational alerts _( NOT STARTED )_
  - Objective: Make production failures diagnosable without leaking data.
  - Dependencies: `API-002`, `API-003`, `SEC-001`.
- [ ] **QUALITY-005** — Define backup, restore, and incident response _( NOT STARTED )_
  - Objective: Prove recovery is possible for the selected database/service.
  - Dependencies: `DB-003`, `SEC-001`, `DEPLOY-001`.
## Phase H - CI/CD, deployment, and documentation

- [!] **DEPLOY-001** — Choose environments and API hosting _( BLOCKED )_
  - Objective: Define reproducible local, preview, staging, and production
  - Dependencies: `SETUP-002`, `ARCH-001`, `API-001`.
- [ ] **DEPLOY-002** — Add CI checks _( NOT STARTED )_
  - Objective: Reject regressions before merge.
  - Dependencies: `SETUP-004`, `TEST-001`, `SEC-002`.
- [ ] **DEPLOY-003** — Configure API deployment and migrations _( NOT STARTED )_
  - Objective: Deploy the API safely with health checks and migration
  - Dependencies: `DEPLOY-001`, `DEPLOY-002`, `API-003`, `DB-003`.
- [ ] **DEPLOY-004** — Configure Expo preview and production releases _( NOT STARTED )_
  - Objective: Produce signed, environment-correct mobile builds.
  - Dependencies: `DEPLOY-001`, `MOB-004`, `SEC-002`.
- [~] **DOC-001** — Complete documentation and acceptance handoff _( PARTIAL )_
  - Objective: Make the implemented system operable and learnable.
  - Dependencies: `DEPLOY-003`, `DEPLOY-004`, `QUALITY-005`.

Total tasks: 57
Done: 1
Partial: 15
Blocked: 4
Not started: 37
