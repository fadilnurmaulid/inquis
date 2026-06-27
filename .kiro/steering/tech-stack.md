# Technology Stack

**Document Type:** Steering Document
**Version:** 1.0
**Status:** Canonical

---

# Purpose

This document defines the official technology stack for INQUIS.

It serves as the implementation reference for all engineering work. Any deviation from this document should be documented and justified.

Educational decisions are defined in:

* `steering/product-vision.md`
* `steering/learning-framework.md`
* `steering/pedagogy.md`

This document focuses solely on implementation technologies.

---

# Design Principles

Technology choices should prioritize:

* maintainability
* scalability
* developer productivity
* deployment simplicity
* competition reliability

Educational requirements always take precedence over technical complexity.

---

# High-Level Architecture

```
Browser
      │
      ▼
Next.js Application
      │
      ├──────── Server Components
      ├──────── Client Components
      ├──────── API Routes
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL (Supabase)
      │
      ▼
Storage / Authentication
```

---

# Frontend

## Framework

* Next.js 15 (App Router)

Reasons:

* React Server Components
* modern routing
* optimized performance
* production-ready deployment
* excellent Vercel integration

---

## Language

TypeScript

Configuration:

* strict mode enabled
* no implicit any
* path aliases enabled

---

## UI Library

React 19

Component-based architecture should be used throughout the application.

---

## Styling

Tailwind CSS

Reasons:

* utility-first workflow
* responsive design
* consistent spacing
* reduced CSS maintenance

---

## Component Library

shadcn/ui

Use as the foundation for:

* dialogs
* tables
* cards
* forms
* navigation
* dropdowns

Child-facing components may extend these primitives with custom styling.

---

## Icons

Lucide React

Icons should remain consistent across all interfaces.

---

## Animation

Framer Motion

Recommended use:

* page transitions
* activity feedback
* onboarding
* celebration sequences

Avoid excessive animation that delays interaction.

---

# Backend

## Runtime

Next.js Server Actions and Route Handlers.

Avoid introducing unnecessary backend services unless required.

---

## Database

PostgreSQL

Hosted using Supabase.

---

## ORM

Prisma

Responsibilities:

* schema definition
* migrations
* database access
* type-safe queries

---

## Authentication

Supabase Auth

Supported roles:

* Child
* Teacher
* Parent
* Administrator

Role-based authorization should be enforced throughout the application.

---

# Storage

Supabase Storage

Used for:

* illustrations
* audio narration
* activity assets
* exported reports

Large static assets should be delivered through CDN.

---

# State Management

Preferred order:

1. React Server Components
2. React Context
3. Zustand (when global client state is required)

Avoid unnecessary global state.

---

# Forms

Recommended libraries:

* React Hook Form
* Zod

Validation should occur on both client and server.

---

# Data Fetching

Preferred order:

* Server Components
* Server Actions
* Route Handlers

Client-side fetching should only be used for highly interactive interfaces.

---

# Audio

Recommended implementation:

* HTML5 Audio API
* Web Audio API (if advanced control becomes necessary)

Audio playback should support:

* narration queue
* replay
* mute
* volume control

---

# Charts

Teacher dashboards should use:

Recharts

Charts should remain simple and readable.

---

# Testing

Recommended testing stack:

| Type      | Tool                  |
| --------- | --------------------- |
| Unit      | Vitest                |
| Component | React Testing Library |
| E2E       | Playwright            |

Critical learning flows should have end-to-end coverage.

---

# Code Quality

Required tools:

* ESLint
* Prettier
* Husky
* lint-staged

Every commit should pass linting before merge.

---

# Project Structure

```
app/
components/
lib/
prisma/
public/
specs/
steering/
```

Additional directories should only be introduced when justified by project growth.

---

# Environment Variables

Typical environment variables include:

```
DATABASE_URL

DIRECT_URL

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

NEXTAUTH_SECRET
```

Secrets must never be committed to source control.

---

# Deployment

Primary deployment:

Vercel

Database:

Supabase

Advantages:

* seamless Next.js deployment
* automatic HTTPS
* preview deployments
* edge network

---

# Performance Targets

| Metric                 | Target   |
| ---------------------- | -------- |
| Initial Load           | < 3 s    |
| Route Transition       | < 500 ms |
| API Response           | < 300 ms |
| Lighthouse Performance | ≥ 85     |

These targets support the competition requirements defined in `steering/lidm-2026.md`.

---

# Security

The application should implement:

* HTTPS only
* Role-based access control
* Row Level Security
* Server-side validation
* Secure cookies
* CSRF protection where applicable

Sensitive business logic should remain on the server.

---

# Logging

Application logging should distinguish between:

* application logs
* audit logs
* authentication events
* error logs

Production logs should exclude personally identifiable information whenever possible.

---

# Monitoring

Recommended services:

* Vercel Analytics
* Vercel Speed Insights
* Sentry (optional)

Monitoring should prioritize production stability during LIDM demonstrations.

---

# Backup Strategy

Database:

* automatic daily backups

Storage:

* versioned assets

Prisma schema should remain under version control.

---

# Dependency Management

Use:

npm

The project should maintain a single package manager across the repository.

---

# Version Control

Git workflow:

* feature branches
* pull requests
* code review before merge

Direct commits to the production branch should be avoided.

---

# Future Expansion

The selected stack should support future additions including:

* AI-assisted scaffolding
* multilingual content
* offline support
* Progressive Web App capabilities
* classroom analytics
* adaptive learning engine

These additions should integrate with the existing architecture without requiring major rewrites.

---

# References

* `steering/product-vision.md`
* `steering/lidm-2026.md`
* `steering/ui-guidelines.md`
* `specs/foundation/architecture.md`
# `steering/tech-stack.md`

# Technology Stack

**Document Type:** Steering Document
**Version:** 1.0
**Status:** Canonical

---

# Purpose

This document defines the official technology stack for INQUIS.

It serves as the implementation reference for all engineering work. Any deviation from this document should be documented and justified.

Educational decisions are defined in:

* `steering/product-vision.md`
* `steering/learning-framework.md`
* `steering/pedagogy.md`

This document focuses solely on implementation technologies.

---

# Design Principles

Technology choices should prioritize:

* maintainability
* scalability
* developer productivity
* deployment simplicity
* competition reliability

Educational requirements always take precedence over technical complexity.

---

# High-Level Architecture

```
Browser
      │
      ▼
Next.js Application
      │
      ├──────── Server Components
      ├──────── Client Components
      ├──────── API Routes
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL (Supabase)
      │
      ▼
Storage / Authentication
```

---

# Frontend

## Framework

* Next.js 15 (App Router)

Reasons:

* React Server Components
* modern routing
* optimized performance
* production-ready deployment
* excellent Vercel integration

---

## Language

TypeScript

Configuration:

* strict mode enabled
* no implicit any
* path aliases enabled

---

## UI Library

React 19

Component-based architecture should be used throughout the application.

---

## Styling

Tailwind CSS

Reasons:

* utility-first workflow
* responsive design
* consistent spacing
* reduced CSS maintenance

---

## Component Library

shadcn/ui

Use as the foundation for:

* dialogs
* tables
* cards
* forms
* navigation
* dropdowns

Child-facing components may extend these primitives with custom styling.

---

## Icons

Lucide React

Icons should remain consistent across all interfaces.

---

## Animation

Framer Motion

Recommended use:

* page transitions
* activity feedback
* onboarding
* celebration sequences

Avoid excessive animation that delays interaction.

---

# Backend

## Runtime

Next.js Server Actions and Route Handlers.

Avoid introducing unnecessary backend services unless required.

---

## Database

PostgreSQL

Hosted using Supabase.

---

## ORM

Prisma

Responsibilities:

* schema definition
* migrations
* database access
* type-safe queries

---

## Authentication

Supabase Auth

Supported roles:

* Child
* Teacher
* Parent
* Administrator

Role-based authorization should be enforced throughout the application.

---

# Storage

Supabase Storage

Used for:

* illustrations
* audio narration
* activity assets
* exported reports

Large static assets should be delivered through CDN.

---

# State Management

Preferred order:

1. React Server Components
2. React Context
3. Zustand (when global client state is required)

Avoid unnecessary global state.

---

# Forms

Recommended libraries:

* React Hook Form
* Zod

Validation should occur on both client and server.

---

# Data Fetching

Preferred order:

* Server Components
* Server Actions
* Route Handlers

Client-side fetching should only be used for highly interactive interfaces.

---

# Audio

Recommended implementation:

* HTML5 Audio API
* Web Audio API (if advanced control becomes necessary)

Audio playback should support:

* narration queue
* replay
* mute
* volume control

---

# Charts

Teacher dashboards should use:

Recharts

Charts should remain simple and readable.

---

# Testing

Recommended testing stack:

| Type      | Tool                  |
| --------- | --------------------- |
| Unit      | Vitest                |
| Component | React Testing Library |
| E2E       | Playwright            |

Critical learning flows should have end-to-end coverage.

---

# Code Quality

Required tools:

* ESLint
* Prettier
* Husky
* lint-staged

Every commit should pass linting before merge.

---

# Project Structure

```
app/
components/
lib/
prisma/
public/
specs/
steering/
```

Additional directories should only be introduced when justified by project growth.

---

# Environment Variables

Typical environment variables include:

```
DATABASE_URL

DIRECT_URL

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

NEXTAUTH_SECRET
```

Secrets must never be committed to source control.

---

# Deployment

Primary deployment:

Vercel

Database:

Supabase

Advantages:

* seamless Next.js deployment
* automatic HTTPS
* preview deployments
* edge network

---

# Performance Targets

| Metric                 | Target   |
| ---------------------- | -------- |
| Initial Load           | < 3 s    |
| Route Transition       | < 500 ms |
| API Response           | < 300 ms |
| Lighthouse Performance | ≥ 85     |

These targets support the competition requirements defined in `steering/lidm-2026.md`.

---

# Security

The application should implement:

* HTTPS only
* Role-based access control
* Row Level Security
* Server-side validation
* Secure cookies
* CSRF protection where applicable

Sensitive business logic should remain on the server.

---

# Logging

Application logging should distinguish between:

* application logs
* audit logs
* authentication events
* error logs

Production logs should exclude personally identifiable information whenever possible.

---

# Monitoring

Recommended services:

* Vercel Analytics
* Vercel Speed Insights
* Sentry (optional)

Monitoring should prioritize production stability during LIDM demonstrations.

---

# Backup Strategy

Database:

* automatic daily backups

Storage:

* versioned assets

Prisma schema should remain under version control.

---

# Dependency Management

Use:

npm

The project should maintain a single package manager across the repository.

---

# Version Control

Git workflow:

* feature branches
* pull requests
* code review before merge

Direct commits to the production branch should be avoided.

---

# Future Expansion

The selected stack should support future additions including:

* AI-assisted scaffolding
* multilingual content
* offline support
* Progressive Web App capabilities
* classroom analytics
* adaptive learning engine

These additions should integrate with the existing architecture without requiring major rewrites.

---

# References

* `steering/product-vision.md`
* `steering/lidm-2026.md`
* `steering/ui-guidelines.md`
* `specs/foundation/architecture.md`
