# VYRA

**Learn. Engage. Grow.**

VYRA is a cross-platform employee learning and engagement application built with React Native and Expo. It brings learning activities, knowledge assessments, announcements, challenges, and performance tracking into one mobile experience.

This project is being developed as a full-stack learning exercise, exploring modern mobile development, backend architecture, database design, authentication, and scalable application patterns.

> **Status:** In development

## Features

### Mobile Experience

- **Personalized dashboard:** Learning activity, earned points, streaks, and quick actions.
- **Weekly quizzes:** Knowledge assessments with score tracking and rewards.
- **Daily challenges:** Short activities designed to encourage consistent participation.
- **Announcements:** Organizational updates and learning content.
- **Leaderboards:** Rankings across teams and organizational regions.
- **User profiles:** Account details and personal progress.

### Planned Platform Capabilities

- Authentication and session management
- Role-based access control
- Administrative content management
- Prescription image submissions and review
- Community story sharing and moderation
- Achievement badges and recognition
- Push notifications
- Reporting and audit trails

Features are being implemented incrementally. The list above describes the intended scope, not a claim that every feature is currently available.

## Tech Stack

### Mobile

| Technology      | Purpose                             |
| --------------- | ----------------------------------- |
| React Native    | Cross-platform mobile UI            |
| Expo            | Mobile development tooling          |
| TypeScript      | Static type checking                |
| Expo Router     | File-based routing and navigation   |
| NativeWind      | Utility-first styling               |
| Zustand         | Client-side state management        |
| TanStack Query  | Server-state management and caching |
| React Hook Form | Form management                     |
| Zod             | Runtime validation                  |

### Backend

| Technology | Purpose                                         |
| ---------- | ----------------------------------------------- |
| Node.js    | JavaScript runtime                              |
| Express    | REST API                                        |
| TypeScript | Backend type safety                             |
| Supabase   | Managed PostgreSQL, authentication, and storage |
| Prisma     | Database schema and migrations                  |
| Zod        | Request and environment validation              |
| Vitest     | Testing                                         |
| Supertest  | HTTP integration testing                        |

### Tooling

- pnpm workspaces
- Git
- ESLint and Prettier
- Android Studio and Android Emulator

The stack describes the planned architecture. Individual services and integrations will be documented as they are implemented.

## Architecture

VYRA uses a pnpm monorepo to keep the mobile application, backend API, and shared contracts organized in one repository.

```text
vyra/
├── apps/
│   └── mobile/          # React Native + Expo application
├── packages/
│   └── contracts/       # Shared types and API contracts
├── services/
│   └── api/             # Express REST API
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

### Responsibilities

**Mobile application**

Handles UI rendering, navigation, user interactions, forms, and presentation of API data.

**Backend API**

Owns application business logic, request validation, authorization, and protected endpoints.

**Supabase**

Provides managed authentication, PostgreSQL, and file storage.

**Shared contracts**

Will contain reusable request and response types, validation schemas, and API contracts where sharing is appropriate.

### State Management

The application separates client state from server state.

- **Zustand:** UI state and shared client-side state.
- **TanStack Query:** API requests, caching, loading states, error handling, and data synchronization.
- **React Hook Form and Zod:** Form state and validation.

## Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/go) or a development build
- Android Studio and Android SDK for local Android emulator development

Local iOS Simulator development requires macOS. Physical iOS devices and cloud build services are alternatives when developing on Linux.

### 1. Clone the repository

```bash
git clone <repository-url>
cd vyra
```

Replace `<repository-url>` with the actual Git repository URL.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the mobile application

```bash
pnpm --filter mobile start
```

Follow the Expo CLI instructions to open the application on your Android emulator or compatible device.

This command assumes the mobile package is named `mobile` in its `package.json`.

### 4. Start the backend

Once the API service has been configured:

```bash
pnpm dev:api
```

The backend requires its environment variables and database connection to be configured before it can start successfully.

Refer to the API service's own documentation for its environment setup and database initialization instructions.

## Development Roadmap

- [x] Initialize the mobile application
- [x] Configure NativeWind
- [ ] Establish the navigation structure
- [ ] Implement the design system and reusable components
- [ ] Build the dashboard UI
- [ ] Implement authentication and user profiles
- [ ] Establish database schema and migrations
- [ ] Build the Express API foundation
- [ ] Integrate mobile and backend authentication
- [ ] Implement quizzes and score tracking
- [ ] Add announcements, challenges, and leaderboards
- [ ] Add administrative workflows
- [ ] Introduce automated tests and deployment workflows

The roadmap reflects development goals and should be updated as milestones are completed.

## Engineering Principles

VYRA is being built around the following principles:

- **Incremental delivery:** Build, test, and refine features in small, verifiable steps.
- **Reusable UI:** Keep components composable and responsibilities clearly defined.
- **Type safety:** Use TypeScript and runtime validation at application boundaries.
- **Separation of concerns:** Keep presentation, client state, server state, and business logic distinct.
- **Server-side authorization:** Enforce permissions in the backend rather than trusting the mobile client.
- **Secure data handling:** Keep privileged credentials off the device and protect sensitive uploads.
- **Testability:** Introduce unit and integration tests as application logic develops.

## Learning Objectives

This project serves as a practical exploration of:

1. React Native fundamentals and native mobile behavior
2. Expo Router and mobile navigation
3. NativeWind and reusable component design
4. Client state versus server state
5. Type-safe REST API development
6. Relational database design and Prisma migrations
7. Authentication and role-based authorization
8. Secure file uploads and storage
9. API testing and error handling
10. Deployment and production readiness

## License

No license has been specified yet.
