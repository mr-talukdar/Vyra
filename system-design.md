# VYRA System Design

## 1. Purpose and current status

VYRA is a cross-platform employee learning and engagement application. The
intended product combines learning activities, quizzes, daily challenges,
announcements, points, streaks, leaderboards, profiles, and administrative
workflows in a mobile-first experience.

The repository is currently at the prototype and backend-foundation stage:

- The mobile application has the primary navigation and visual dashboard
  experience.
- The API can start, expose health endpoints, and handle Supabase-backed
  signup and sign-in requests.
- Prisma is configured for PostgreSQL connectivity, but the schema contains no
  application domain models.
- Mobile screens still use local/demo data and are not connected to the API.
- Authorization, persisted product behavior, shared contracts, deployment, and
  production operations are not implemented.

This document describes both the implemented system and the target direction.
Planned items are intentionally marked as such and must not be interpreted as
available functionality.

## 2. System goals

### Product goals

1. Give employees one place to learn, participate, and track progress.
2. Provide short, repeatable engagement loops through quizzes and challenges.
3. Make announcements and learning content available from the mobile client.
4. Reward participation with points, streaks, badges, and recognition.
5. Give authorized administrators controlled content and reporting workflows.

### Engineering goals

1. Keep the first release as a modular monolith that can evolve without
   premature service decomposition.
2. Keep authentication, authorization, validation, and business rules on the
   server.
3. Use typed contracts at API boundaries and preserve a clear separation
   between mobile UI state and server state.
4. Make domain mutations auditable, idempotent where necessary, and safe to
   retry.
5. Establish automated tests and operational controls before production
   release.

## 3. Current architecture

```text
┌──────────────────────────────┐
│ React Native / Expo mobile   │
│ Expo Router + NativeWind     │
│ Local prototype content      │
└──────────────┬───────────────┘
               │  planned REST integration
               ▼
┌──────────────────────────────┐
│ Express 5 API                │
│ health routes                │
│ auth routes                  │
│ request IDs and error layer  │
└───────┬──────────────┬───────┘
        │              │
        ▼              ▼
┌──────────────┐  ┌─────────────────┐
│ Supabase Auth│  │ PostgreSQL       │
│ implemented  │  │ via Prisma 7     │
└──────────────┘  │ connectivity     │
                  │ configured only  │
                  └─────────────────┘
```

The repository is a pnpm monorepo:

```text
apps/mobile/       Expo mobile client
packages/contracts/Shared request/response contracts (not implemented)
services/api/      Express REST API
```

### Component responsibilities

#### Mobile application

The mobile app owns screen rendering, navigation, local assets, form
presentation, and user interactions. Implemented routes include Home, Learn,
Leaderboard, Profile, and announcement detail. The home screen is composed from
reusable stats, featured challenge, daily challenge, and announcement
components.

The mobile app does not yet have:

- an API client or environment-based API URL;
- an authentication/session provider;
- protected-route handling;
- TanStack Query or Zustand state wiring;
- server-backed loading, empty, retry, and error states.

#### API service

The API owns request validation, authentication orchestration, business logic,
authorization, and future domain endpoints. It currently uses:

- Express JSON middleware;
- request ID middleware;
- generic 404 and 500 error middleware;
- `/health/live` and `/health/ready`;
- `/api/auth/sign-up`;
- `/api/auth/sign-in`.

The API is intended to remain a modular monolith. Feature modules should be
organized around domains rather than split into independent services until
scale or operational boundaries justify that change.

#### Supabase

Supabase currently provides the authentication client used by the API.
Supabase PostgreSQL is the planned application database and Supabase Storage is
the planned file-storage option. The server uses the publishable Supabase
credentials for the auth client and a server-only direct PostgreSQL connection
for Prisma.

#### Shared contracts

`packages/contracts` is reserved for stable request, response, and shared
validation definitions. It is currently empty. Contracts should be introduced
before the mobile client begins consuming feature endpoints.

## 4. Implemented request flows

### 4.1 API startup and diagnostics

1. `services/api/src/server.ts` starts the Express application.
2. Environment values are parsed with Zod during configuration loading.
3. JSON requests receive a request ID, preserving a valid `x-request-id` when
   provided.
4. Unknown routes return a structured `NOT_FOUND` response.
5. Unhandled errors return a structured internal-error response.

Current health endpoints:

| Method | Path | Current behavior |
|---|---|---|
| `GET` | `/health/live` | Returns HTTP 200 when the process is responding. |
| `GET` | `/health/ready` | Returns a simulated ready response after a timer; it does not yet query PostgreSQL. |

### 4.2 Signup

`POST /api/auth/sign-up`:

1. Validates email and password with the shared auth Zod schema.
2. Calls `SupabaseClient.auth.signUp`.
3. Maps duplicate-user errors to HTTP 409.
4. Maps weak-password errors to HTTP 400.
5. Returns a confirmation-required response when Supabase does not create a
   session immediately.
6. Returns user and session tokens when an active session is created.

### 4.3 Sign-in

`POST /api/auth/sign-in`:

1. Validates email and password with the same auth schema.
2. Calls `SupabaseClient.auth.signInWithPassword`.
3. Maps invalid credentials to HTTP 401.
4. Maps an unconfirmed email to HTTP 403.
5. Returns user ID and session tokens on success.
6. Returns a confirmation-required response when no session is available.

The shared response helpers are in
`services/api/src/lib/utils.ts`. Token storage, refresh, sign-out, token
verification, and mobile session persistence are not implemented.

## 5. Target logical architecture

The API should evolve into the following modules while remaining one deployable
service:

```text
API
├── platform
│   ├── configuration
│   ├── request IDs
│   ├── HTTP errors
│   ├── logging
│   └── health checks
├── auth
│   ├── Supabase session integration
│   ├── authentication middleware
│   ├── users and profiles
│   └── roles and permissions
├── dashboard
│   ├── summary read model
│   └── progress aggregation
├── announcements
│   ├── publishing lifecycle
│   └── audience filtering
├── quizzes
│   ├── quiz content
│   ├── attempts and scoring
│   └── rewards
├── challenges
│   ├── daily challenge completion
│   ├── points
│   └── streak calculation
├── leaderboards
│   └── scoped ranking queries
├── administration
│   ├── content management
│   ├── moderation
│   └── audit events
└── media and reporting
    ├── approved uploads
    └── privacy-aware analytics
```

Each module should keep its route/controller, validation, service, repository,
and contract concerns identifiable. Controllers should translate HTTP input and
output; domain services should own business rules; repositories should own
Prisma queries and transaction boundaries.

## 6. Planned data model

The current Prisma schema has only the PostgreSQL datasource and generated
client configuration. The following model groups are planned and require
product decisions before migrations are created.

### Identity and access

- `UserProfile`: application profile linked to a Supabase Auth user.
- `Organization`, `Team`, or equivalent scope entities if the product is
  multi-tenant.
- `Role`, `Permission`, and assignments for employee, editor, moderator, and
  administrator capabilities.

### Engagement

- `UserProgress`: current points, streak, and aggregate progress.
- `PointLedgerEntry`: immutable reasoned point changes.
- `Badge` and `UserBadge`: recognition definitions and awards.
- `Challenge` and `ChallengeCompletion`: challenge rules and idempotent
  completions.

### Learning

- `Quiz`, `QuizQuestion`, and `QuizOption`.
- `QuizAttempt` and `QuizAnswer`.
- Optional course/module entities if learning content expands beyond quizzes.

### Content

- `Announcement`, including status, author, publication dates, and audience
  scope.
- Content revision or moderation records where editing and approval require
  history.

### Operations and privacy

- `AuditEvent` for administrative and security-sensitive actions.
- Optional notification preferences and delivery records.
- Media metadata linked to private Supabase Storage objects, if uploads are
  approved.

Domain mutations that award points, complete challenges, or finalize quiz
attempts should use database transactions and unique constraints to prevent
duplicate rewards.

## 7. API design direction

The API should use versioned, JSON REST endpoints once the first vertical slice
is implemented:

```text
/api/v1/auth/*
/api/v1/me
/api/v1/dashboard
/api/v1/announcements
/api/v1/quizzes
/api/v1/challenges
/api/v1/leaderboards
/api/v1/admin/*
```

The existing `/api/auth/sign-up` and `/api/auth/sign-in` routes should either be
kept as compatibility routes or migrated deliberately when versioning is
introduced.

All feature endpoints should define:

- request and response schemas in `packages/contracts`;
- consistent success and error envelopes;
- authentication requirements;
- authorization requirements;
- pagination and sorting rules for collections;
- stable error codes;
- request ID propagation.

Authentication should use Supabase-issued access tokens. The API must verify
the token before serving protected resources and derive the user identity from
the verified claims rather than from request body data.

## 8. Mobile integration direction

The first end-to-end mobile slice should be:

```text
Sign up/sign in
      │
      ▼
Persist and restore Supabase session
      │
      ▼
Load authenticated profile
      │
      ▼
Fetch dashboard summary and announcements
      │
      ▼
Render loading, empty, error, retry, and success states
```

Recommended client boundaries:

- an API client with a configurable base URL;
- a session provider backed by Supabase auth state;
- an auth-aware Expo Router layout;
- TanStack Query for server state and cache invalidation;
- Zustand only for local UI state that does not belong on the server;
- React Hook Form and shared Zod contracts for forms.

The current static home components should be reused as presentation
components. Their data dependencies should be replaced incrementally rather
than rebuilding the screens.

## 9. Security and reliability design

The following controls are required before production use:

1. Verify Supabase access tokens on protected API routes.
2. Add role and resource-scope authorization on every administrative or
   user-specific operation.
3. Configure CORS, security headers, request-size limits, and rate limiting.
4. Never log passwords, access tokens, refresh tokens, or database credentials.
5. Replace the simulated readiness check with a bounded PostgreSQL probe.
6. Add timeout, retry, and failure handling around external dependencies.
7. Configure Supabase Row Level Security and server-side data-access boundaries.
8. Use private storage objects and signed URLs for approved user uploads.
9. Record security-sensitive administrative actions in an audit trail.
10. Define backup, restore, incident response, and secret-rotation procedures.

## 10. Testing strategy

Already present:

- Vitest API test runner;
- Supertest HTTP tests for health, 404, errors, and request IDs;
- a separate PostgreSQL connectivity smoke test;
- TypeScript typecheck scripts for the workspace packages.

Still required:

- signup and sign-in controller tests for validation and Supabase failure
  mappings;
- mocked Supabase tests that do not require external services;
- real readiness success, failure, and timeout tests;
- repository and transaction tests for domain rules;
- authorization and tenant-scope tests;
- mobile component and navigation tests;
- API/mobile integration tests for the first vertical slice;
- CI checks for typecheck, lint, tests, and build artifacts.

## 11. Implementation status and remaining work

### Implemented

- pnpm monorepo structure.
- Expo mobile shell, tab navigation, announcement detail route, theme, and
  reusable UI components.
- Express API startup and JSON middleware.
- Environment parsing with Zod.
- Request IDs and generic structured error handling.
- Liveness endpoint.
- Simulated readiness endpoint.
- Prisma 7 PostgreSQL adapter and generated client setup.
- Supabase client setup.
- Validated signup flow with duplicate, weak-password, confirmation, and
  session responses.
- Validated sign-in flow with invalid-credential, unconfirmed-email,
  confirmation, and session responses.
- Basic API and database connectivity tests.

### Immediate next steps

1. Finalize product scope, roles, organization boundaries, and acceptance
   criteria.
2. Create shared contracts for auth and the first dashboard slice.
3. Replace simulated readiness with a real, bounded Prisma database probe.
4. Add auth tests and complete sign-out, refresh, confirmation, and token
   verification flows.
5. Define Prisma domain models, migrations, seed data, and RLS boundaries.
6. Add authentication middleware and protected `/me` and dashboard endpoints.
7. Add the mobile API client, session restoration, and auth-aware routing.
8. Connect the existing dashboard and announcements UI to server state.

### Subsequent product work

- Persist announcements and implement publishing and audience rules.
- Implement quiz authoring, attempts, scoring, and rewards.
- Implement daily challenge completion, points, and streaks.
- Implement privacy-aware scoped leaderboards.
- Connect profile data and account management.
- Add administrative content, moderation, reporting, and audit workflows.
- Add approved media storage and notification delivery.

### Release and operations work

- Fix and enforce lint and typecheck baselines.
- Add CI/CD workflows and environment-specific deployment configuration.
- Configure Expo preview and production releases.
- Add structured logs, metrics, tracing, alerts, and dashboards.
- Define backups, restore validation, incident response, and operational
  runbooks.
- Complete accessibility, privacy, threat-model, and performance reviews.

## 12. Architectural decisions still required

The following decisions should be recorded before the database and contracts
are finalized:

1. Is Supabase Auth the only identity provider, or is enterprise SSO required?
2. Is the first release single-organization or multi-tenant?
3. Which roles and scopes are required for the MVP?
4. Which profile fields are employee-editable?
5. What are the exact point, streak, quiz retry, and leaderboard rules?
6. Which content requires moderation or approval?
7. Which uploads and analytics are in scope for the first release?
8. What are the API hosting, database, backup, and deployment environments?

Until these decisions are made, domain models and authorization rules should
remain explicit implementation tasks rather than inferred behavior.

## 13. Definition of done for the first production-capable slice

The first slice is complete when an employee can:

1. Create an account and complete email confirmation.
2. Sign in, sign out, and restore a valid session.
3. Load a protected profile and dashboard from the API.
4. View persisted points, streak data, and announcements.
5. Receive consistent loading, empty, error, and retry states in the mobile
   app.
6. Be denied access when unauthenticated or unauthorized.
7. Exercise the flow through automated API and mobile integration tests.
8. Run the application through documented CI and deployment checks.

## 14. Complete end-product architecture

The production system is designed as a modular monolith behind a single public
API. This keeps transactions and business rules simple for the first release
while leaving clear boundaries for future extraction if a module develops
independent scale or deployment requirements.

```text
                                      ┌─────────────────────┐
                                      │ Admin web console   │
                                      │ (future client)     │
                                      └──────────┬──────────┘
                                                 │ HTTPS
┌─────────────────────┐                          │
│ Employee mobile app │──────────────┐           │
│ Expo / React Native │              │           │
└─────────────────────┘              ▼           ▼
                              ┌────────────────────────┐
                              │ CDN / API gateway      │
                              │ TLS, rate limits, WAF  │
                              └────────────┬───────────┘
                                           │ HTTPS/JSON
                              ┌────────────▼───────────┐
                              │ VYRA API               │
                              │ stateless modular      │
                              │ monolith               │
                              └──┬──────┬──────┬───────┘
                                 │      │      │
                    ┌────────────┘      │      └────────────┐
                    ▼                   ▼                   ▼
             ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
             │ Supabase     │   │ PostgreSQL   │   │ Object       │
             │ Auth         │   │ via Prisma   │   │ Storage      │
             └──────────────┘   └──────┬───────┘   └──────────────┘
                                       │
                                ┌──────▼───────┐
                                │ Read/cache   │
                                │ layer        │
                                │ (optional)   │
                                └──────────────┘

       ┌──────────────────┐     ┌──────────────────┐
       │ Job worker       │────▶│ Queue/scheduler  │
       │ notifications,   │     └──────────────────┘
       │ reports, totals  │
       └────────┬─────────┘
                │
        ┌───────▼────────┐
        │ Push provider  │
        │ Expo/APNs/FCM  │
        └────────────────┘

API, worker, database, storage, and observability are private or restricted
except for the API gateway and explicitly signed media URLs.
```

### Runtime components

| Component | Responsibility | Scaling model |
|---|---|---|
| Mobile client | Employee experience, session-aware navigation, cached server data | Per-device |
| API gateway | TLS termination, request limits, routing, optional WAF | Managed horizontal scale |
| API service | Authentication, authorization, domain commands, queries | Stateless horizontal scale |
| PostgreSQL | Source of truth for identity projection, content, progress, and audit data | Managed primary with backups |
| Supabase Auth | User registration, email confirmation, sessions, password recovery | Managed service |
| Object storage | Private media and approved attachments | Managed durable storage |
| Worker | Notifications, scheduled rollups, reports, and non-request work | Independently scalable |
| Queue/scheduler | Reliable asynchronous delivery and retries | Managed queue preferred |
| Observability stack | Logs, metrics, traces, alerts, and audit search | Managed or centrally operated |

## 15. Domain architecture

### Identity and tenancy

The application should support a single organization for the first release
while keeping organization scope explicit in the model. Every user-owned or
organization-owned record should carry an organization boundary where
applicable.

```text
Organization 1 ─── * Team
Organization 1 ─── * UserProfile
UserProfile  * ─── * Role
UserProfile 1 ─── 1 UserProgress
```

Supabase Auth remains the identity provider. `UserProfile` is the application's
projection of the authenticated identity and stores product-specific fields.
The API must never trust a user ID supplied by the mobile client for
user-specific operations; it derives the subject from the verified access
token.

### Learning and engagement

```text
Quiz 1 ─── * QuizQuestion 1 ─── * QuizOption
UserProfile 1 ─── * QuizAttempt 1 ─── * QuizAnswer
Challenge 1 ─── * ChallengeCompletion
UserProfile 1 ─── * PointLedgerEntry
UserProfile 1 ─── * UserBadge
```

- A quiz can be drafted, scheduled, published, closed, or archived.
- An attempt records the quiz version used, start/finish times, score, and
  completion status.
- A challenge completion has a uniqueness rule for user, challenge, and
  applicable period.
- Points are recorded as immutable ledger entries. Current totals are derived
  or maintained transactionally from that ledger.
- Streak updates occur in the same transaction as a valid daily completion.

### Announcements and moderation

```text
Announcement 1 ─── * AnnouncementRevision
Announcement 1 ─── * AnnouncementAudience
Announcement 1 ─── * ModerationEvent
```

Announcements support draft, review, scheduled, published, archived, and
rejected states. Audience rules must be evaluated server-side. Publishing and
archiving are authorized operations and create audit events.

### Reporting and audit

`AuditEvent` records actor, organization, action, resource type, resource ID,
request ID, timestamp, and a redacted metadata payload. Audit records are
append-only from application code. Reports should read from safe reporting
queries or rollups rather than exposing unrestricted operational tables.

## 16. Data and consistency strategy

PostgreSQL is the source of truth for transactional product data.

### Transaction boundaries

The following operations must be atomic:

- finishing a quiz attempt and awarding its points;
- completing a daily challenge and updating the streak;
- publishing or archiving content and writing its audit event;
- changing roles or organization membership;
- creating a moderation decision and its audit event.

Use database transactions, unique constraints, and idempotency keys for
client-retryable mutations. A repeated request must not award duplicate points
or create duplicate completions.

### Read models

The dashboard and leaderboard should use dedicated query services. If
aggregation becomes expensive, maintain transactional rollups or materialized
views and refresh them through a worker. Cached values are never authoritative
for authorization or reward calculations.

### Data lifecycle

- Active user and content data remains in PostgreSQL.
- Audit data follows a documented retention policy.
- Deleted or deactivated users are anonymized or removed according to legal
  and product requirements.
- Media objects use lifecycle rules and are deleted when their owning record is
  permanently removed.
- Backups are encrypted, retained, and periodically restored in a non-
  production environment.

## 17. End-to-end product workflows

### Authentication and session restoration

```text
Mobile → API: sign up or sign in
API → Supabase Auth: validate credentials
Supabase Auth → API: access/refresh session
API → Mobile: normalized auth response
Mobile → Supabase/session store: persist session securely
Mobile → API: protected request with bearer token
API → Supabase Auth: verify token
API → PostgreSQL: load UserProfile and permissions
API → Mobile: authorized response
```

Sign-out clears the local session and invalidates or discards refresh
credentials. Expired access tokens trigger a single refresh attempt; concurrent
requests must share the refresh result instead of creating a refresh storm.

### Dashboard

1. The mobile app requests `GET /api/v1/dashboard`.
2. Authentication middleware verifies the bearer token.
3. The dashboard service loads the user's profile, progress summary, active
   challenge, featured quiz, and visible announcements.
4. The service applies organization and audience scope.
5. The API returns one versioned dashboard contract.
6. The mobile query cache stores the response with an explicit stale time.

The dashboard endpoint is read-only and must not calculate or award points as a
side effect.

### Quiz completion

1. The client loads a published quiz without exposing answer keys.
2. The client submits selected answers with an idempotency key.
3. The API verifies that the quiz is available to the user.
4. The quiz service validates the attempt and calculates the score server-side.
5. A transaction writes the attempt, answers, point ledger entries, and any
   badge awards.
6. The API returns the finalized score and reward summary.
7. The client invalidates dashboard and leaderboard queries.

### Daily challenge and streak

1. The client loads the current challenge.
2. The client submits completion evidence or the challenge response.
3. The API validates the challenge window and user eligibility.
4. A transaction inserts one completion for the applicable date.
5. The service updates the streak based on the previous completion period.
6. The service writes points and emits an optional notification event.
7. A duplicate submission returns the existing completion result.

### Announcement publishing

1. An authorized editor creates or updates a draft.
2. A moderator or authorized publisher reviews the draft when required.
3. Publishing creates a revision, sets the publication window, and writes an
   audit event.
4. The mobile API filters announcements by organization, team, role, and
   publication status.
5. The client refreshes its announcement query after publication or expiry.

### Notifications

Notifications are asynchronous and never block a successful product mutation.
The API or worker emits a notification event after the transaction commits.
The worker resolves user preferences, sends through Expo/APNs/FCM, records
delivery status, and retries transient failures with bounded backoff.

## 18. API surface

The following is the target API surface. It is not a claim that all endpoints
currently exist.

### Public and authentication endpoints

```text
POST /api/v1/auth/sign-up
POST /api/v1/auth/sign-in
POST /api/v1/auth/refresh
POST /api/v1/auth/sign-out
POST /api/v1/auth/confirm
POST /api/v1/auth/password-reset
```

### Employee endpoints

```text
GET   /api/v1/me
PATCH /api/v1/me
GET   /api/v1/dashboard
GET   /api/v1/announcements
GET   /api/v1/announcements/:id
GET   /api/v1/quizzes
GET   /api/v1/quizzes/:id
POST  /api/v1/quizzes/:id/attempts
GET   /api/v1/challenges/today
POST  /api/v1/challenges/:id/completions
GET   /api/v1/leaderboards
GET   /api/v1/progress
GET   /api/v1/badges
PATCH /api/v1/me/notification-preferences
```

### Administration endpoints

```text
GET   /api/v1/admin/users
PATCH /api/v1/admin/users/:id/roles
POST  /api/v1/admin/announcements
PATCH /api/v1/admin/announcements/:id
POST  /api/v1/admin/announcements/:id/publish
POST  /api/v1/admin/announcements/:id/archive
POST  /api/v1/admin/quizzes
PATCH /api/v1/admin/quizzes/:id
POST  /api/v1/admin/quizzes/:id/publish
GET   /api/v1/admin/reports/engagement
GET   /api/v1/admin/audit-events
```

All collection endpoints should support bounded pagination. Mutating
endpoints should return the changed resource or a stable operation result,
include the request ID, and document authorization and idempotency behavior.

## 19. Client architecture

```text
Expo Router
├── Public routes
│   ├── sign-in
│   ├── sign-up
│   └── confirmation/recovery
├── Authenticated routes
│   ├── home/dashboard
│   ├── learn/quizzes
│   ├── challenges
│   ├── announcements
│   ├── leaderboard
│   └── profile
└── Shared providers
    ├── session provider
    ├── TanStack Query client
    ├── theme provider
    └── error boundary
```

The client uses:

- secure device storage for session material;
- an API client that adds the bearer token and request ID;
- TanStack Query for server data, retries, invalidation, and cache state;
- Zustand for local UI preferences and transient interaction state;
- React Hook Form and shared Zod schemas for forms;
- accessible reusable components with loading and error states.

The client must not calculate authoritative scores, points, streaks, or
permissions. It may optimistically update presentation state, but it must
reconcile with the server response.

## 20. Security model

### Trust boundaries

1. The mobile device is an untrusted client.
2. The API is the enforcement point for identity and authorization.
3. PostgreSQL and storage are private infrastructure.
4. Supabase Auth is an external identity dependency.
5. Administrators are trusted only within explicitly assigned permissions.

### Required controls

- TLS for every network hop that leaves a trusted private network.
- Short-lived access tokens and secure refresh-token storage.
- Token verification on every protected request.
- Role, organization, and resource authorization in service code.
- Input validation, output shaping, bounded pagination, and request-size limits.
- CORS allowlisting, secure headers, rate limiting, and brute-force controls.
- Secret management outside source control and regular rotation.
- Redacted structured logging with no credential or token values.
- Private media buckets and short-lived signed URLs.
- RLS or equivalent database boundaries as defense in depth.
- Audit logging for role, content, moderation, and account lifecycle changes.
- Dependency scanning, code review, and threat-model review before release.

## 21. Availability, performance, and resilience

Initial service-level objectives should be agreed before launch. The technical
baseline should include:

- API availability target of at least 99.5% for the first production release.
- p95 read latency target below 500 ms for dashboard and list endpoints under
  expected load.
- p95 mutation latency target below 1 second excluding asynchronous work.
- Explicit database and upstream timeouts.
- Bounded retries only for safe or idempotent operations.
- Circuit-breaking or graceful degradation for optional notification services.
- Health checks that distinguish process liveness from dependency readiness.
- Horizontal API scaling with no in-memory session or business state.
- Database indexes for user scope, publication windows, challenge periods, and
  leaderboard queries.
- Load tests for dashboard, announcements, quiz submission, and leaderboard
  reads.

When optional services fail, the API should preserve the completed transaction
and report asynchronous delivery failure separately. It must not silently
pretend that a notification, upload, or report succeeded.

## 22. Deployment architecture

### Environments

```text
Local → Preview → Staging → Production
```

- Local uses developer-managed environment values and isolated test data.
- Preview is created for branch or pull-request validation.
- Staging mirrors production topology with non-production credentials.
- Production uses managed secrets, restricted networking, backups, alerts, and
  approval-controlled migrations.

### Delivery pipeline

1. Install from the lockfile.
2. Run formatting and lint checks.
3. Run TypeScript checks.
4. Run unit and API integration tests.
5. Build the API and mobile artifacts.
6. Run database migration validation against a disposable database.
7. Publish an immutable API image or deployment artifact.
8. Apply backward-compatible migrations.
9. Deploy the API using a rolling or blue/green strategy.
10. Run health and smoke checks.
11. Promote the mobile build through Expo/EAS channels.

Database migrations must be backward-compatible with the previous API during
rolling deployments. Destructive changes require a separate migration and
data-retention plan.

## 23. Observability and operations

Every request should produce structured logs containing request ID, route,
status, duration, and safe actor/context identifiers. Logs must be correlated
across API and worker operations.

Track at minimum:

- request count, latency, and error rate by route;
- authentication failures and refresh failures;
- database latency, pool usage, and failed transactions;
- queue depth, job age, retry count, and dead-letter count;
- notification delivery success and failure;
- quiz/challenge completion and duplicate-submission rates;
- mobile crash-free sessions and API failure rates;
- storage upload failures and signed-URL errors.

Alert on sustained error-rate or latency regressions, unavailable
dependencies, exhausted database capacity, failed migrations, queue backlog,
and backup failures. Maintain runbooks for rollback, credential rotation,
database restore, incident response, and data deletion requests.

## 24. Delivery phases for the complete product

### Phase 1: Foundation

- Resolve product scope, tenancy, roles, and rules.
- Create shared contracts and API versioning conventions.
- Harden configuration, security middleware, errors, logging, and health
  checks.
- Add CI with typecheck, lint, test, and build gates.

### Phase 2: Identity and first vertical slice

- Complete auth lifecycle and token verification.
- Add user profiles, roles, permissions, and protected `/me`.
- Create initial migrations and seed data.
- Implement dashboard and announcement read APIs.
- Connect mobile session, dashboard, and announcement flows.

### Phase 3: Engagement

- Implement quiz attempts, scoring, rewards, and idempotency.
- Implement daily challenges, points, and streaks.
- Implement progress and scoped leaderboards.
- Add mobile completion flows and cache invalidation.

### Phase 4: Content and administration

- Add announcement and quiz authoring.
- Add publishing, moderation, role management, and audit events.
- Add profile management, notification preferences, and reporting.

### Phase 5: Production hardening

- Add storage, notifications, worker processing, and scheduled jobs.
- Complete accessibility, privacy, threat modeling, performance, and
  resilience testing.
- Deploy staging and production infrastructure with backups and monitoring.

## 25. End-product acceptance criteria

The complete product is ready for general release when:

1. Employees can register, confirm, sign in, recover access, sign out, and
   restore sessions safely.
2. Every protected operation verifies identity and enforces role and scope.
3. Employees can view and update their allowed profile data.
4. Employees can view announcements, complete quizzes and challenges, earn
   points, maintain streaks, receive badges, and view privacy-aware rankings.
5. Administrators can manage users, content, publishing, moderation, reports,
   and audit history according to the permission matrix.
6. Mobile screens use server-backed data with complete loading, empty, retry,
   offline, and error behavior.
7. Rewards and completions are transactional and idempotent.
8. Notifications, media, and reports are asynchronous where appropriate and
   expose failures explicitly.
9. CI/CD, migrations, backups, restore validation, observability, and incident
   runbooks are operational.
10. Security, privacy, accessibility, performance, and data-retention reviews
    are complete and documented.
