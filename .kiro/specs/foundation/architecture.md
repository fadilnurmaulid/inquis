# Foundation Architecture

**Document Type:** Technical Architecture Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This document defines the architectural blueprint of the INQUIS application foundation.

It specifies how application modules communicate, how data flows through the system, and how the core infrastructure should be organized before feature implementation begins.

This document complements `specs/foundation/requirements.md` and should be considered the primary implementation reference for application architecture.

---

# Dependencies

This architecture depends on:

* `steering/tech-stack.md`
* `steering/ui-guidelines.md`
* `specs/foundation/requirements.md`

---

# Architectural Principles

The application shall follow these principles:

* Feature-oriented organization
* Separation of concerns
* Server-first architecture
* Type safety
* Reusable components
* Predictable state management
* Minimal client-side logic

---

# High-Level Architecture

```text
┌──────────────────────────────────────┐
│              Browser                 │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│        Next.js App Router            │
│                                      │
│  • Server Components                 │
│  • Client Components                 │
│  • Route Handlers                    │
│  • Server Actions                    │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│          Business Layer              │
│                                      │
│ Authentication                       │
│ Authorization                        │
│ Activity Services                    │
│ Progress Services                    │
│ Dashboard Services                   │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│            Prisma ORM                │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│      PostgreSQL (Supabase)           │
└──────────────────────────────────────┘
```

---

# Application Layers

## Presentation Layer

Responsibilities:

* UI rendering
* interaction handling
* animation
* accessibility
* responsive layouts

Contains:

* App Router pages
* layouts
* reusable components

Presentation components should remain free of business logic.

---

## Application Layer

Responsibilities:

* orchestration
* validation
* workflow coordination
* session handling

This layer coordinates requests between the UI and domain services.

---

## Domain Layer

Responsibilities:

* learning progress
* authentication logic
* activity management
* dashboard calculations
* reporting logic

Domain services should be framework-independent whenever practical.

---

## Data Layer

Responsibilities:

* persistence
* queries
* transactions
* migrations

Implemented using Prisma.

---

# Route Architecture

```text
/

├── onboarding/

├── play/
│   ├── home/
│   ├── world/
│   └── activity/
│
├── teacher/
│   ├── dashboard/
│   ├── students/
│   └── reports/
│
└── parent/
    └── dashboard/
```

Each route group owns its own layout.

---

# Component Hierarchy

```text
RootLayout

├── Providers
│
├── Navigation
│
├── Role Layout
│
├── Page Layout
│
└── Feature Components
```

Shared components should reside in `/components`.

Feature-specific components should remain close to their respective routes when appropriate.

---

# Suggested Directory Responsibilities

| Directory     | Responsibility                     |
| ------------- | ---------------------------------- |
| `app/`        | Routing, layouts, pages            |
| `components/` | Shared UI components               |
| `lib/`        | Utilities, services, helpers       |
| `prisma/`     | Database schema and migrations     |
| `public/`     | Static assets                      |
| `specs/`      | Kiro implementation specifications |
| `steering/`   | Canonical project guidance         |

---

# Authentication Flow

```text
User

↓

Login

↓

Supabase Auth

↓

Session Validation

↓

Role Resolution

↓

Authorized Route

↓

Application
```

Authentication should occur before protected content is rendered.

---

# Authorization Model

Role hierarchy:

```text
Administrator

Teacher

Parent

Child
```

Permissions should be enforced using:

* middleware
* server actions
* Row Level Security
* role guards

Authorization must never rely solely on client-side validation.

---

# Database Architecture

Core entities include:

```text
User

├── Teacher
├── Parent
└── Child

Teacher
│
├── Classroom
│
└── Student Assignment

Child
│
├── Progress
├── Activity Session
└── Assessment
```

Additional feature entities should extend this structure rather than replace it.

---

# State Management Strategy

Priority order:

1. Server Components
2. URL state
3. React Context
4. Local component state
5. Zustand (shared client state only)

Avoid unnecessary global state.

---

# Error Handling

The architecture should provide:

* global error boundary
* route-level error handling
* API error responses
* logging hooks

Recoverable errors should present meaningful recovery options.

---

# Asset Pipeline

Static assets include:

* illustrations
* world backgrounds
* icons
* sound effects
* narration audio
* certificates

Assets should be optimized before deployment.

---

# Service Layer

Recommended services include:

| Service          | Responsibility       |
| ---------------- | -------------------- |
| AuthService      | Authentication       |
| UserService      | User management      |
| ClassroomService | Classroom operations |
| ProgressService  | Learning progress    |
| ActivityService  | Activity lifecycle   |
| ReportService    | Report generation    |
| StorageService   | Asset access         |

Business logic should reside inside services rather than UI components.

---

# Data Flow

Typical request flow:

```text
User Action

↓

React Component

↓

Server Action

↓

Domain Service

↓

Prisma

↓

Database

↓

Response

↓

UI Update
```

This flow should remain consistent across all modules.

---

# Shared Providers

The application should initialize:

* Authentication Provider
* Theme Provider
* Audio Provider
* Progress Provider
* Query Provider (if introduced)

Providers should remain lightweight and focused.

---

# Security Architecture

Security measures include:

* HTTPS
* Supabase Authentication
* Row Level Security
* Server-side validation
* Secure session cookies
* Input validation

Sensitive operations should execute exclusively on the server.

---

# Logging Architecture

Application events should be categorized as:

* Authentication
* Learning Activity
* Progress Update
* System Error
* Audit Event

Logs should support debugging without exposing sensitive learner data.

---

# Performance Strategy

Recommended practices:

* Server Components by default
* Lazy loading for large modules
* Dynamic imports where appropriate
* Image optimization
* Audio preloading only when necessary
* Route-level code splitting

---

# Extensibility

Future modules should integrate without architectural changes.

Expected future integrations include:

* AI-assisted learning
* multilingual content
* classroom collaboration
* adaptive pathways
* offline synchronization

The architecture should support these additions through modular services rather than monolithic redesign.

---

# Acceptance Criteria

The architecture is considered complete when:

* Route groups are established.
* Shared providers initialize successfully.
* Authentication flow is operational.
* Authorization boundaries are enforced.
* Service layer separates business logic from presentation.
* Database integration functions through Prisma.
* Feature modules can be added without modifying the foundation architecture.

---

# References

* `steering/tech-stack.md`
* `steering/ui-guidelines.md`
* `specs/foundation/requirements.md`
* `specs/foundation/tasks.md`
