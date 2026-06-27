# Deployment Specification

**Document Type:** Deployment & Operations Specification
**Version:** 1.0
**Status:** Production Ready

---

# Purpose

This document defines the deployment architecture, environments, infrastructure, security, monitoring, backup strategy, and operational requirements for INQUIS.

This specification assumes the application architecture defined in:

* `specs/foundation/architecture.md`
* `steering/tech-stack.md`

It focuses on operational deployment rather than application implementation.

---

# Deployment Goals

The deployment architecture shall provide:

* High availability
* Secure authentication
* Reliable database persistence
* Fast global content delivery
* Automated deployment
* Continuous monitoring
* Scalable infrastructure

The deployment should support both competition demonstration and future production deployment.

---

# Deployment Architecture

```text
                        Users
                          │
                          ▼
                Vercel Edge Network
                          │
                          ▼
                 Next.js Application
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     Clerk Auth      Gemini API      Supabase Storage
          │
          ▼
      PostgreSQL
       (Supabase)
```

The architecture should remain modular to allow future migration to self-hosted infrastructure if required.

---

# Deployment Environments

Three deployment environments shall be maintained.

| Environment | Purpose             |
| ----------- | ------------------- |
| Development | Local development   |
| Staging     | Pre-release testing |
| Production  | Public deployment   |

Each environment should use independent configuration values.

---

# Environment Variables

Sensitive configuration shall be stored using environment variables.

Examples include:

```text
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

CLERK_SECRET_KEY

DATABASE_URL

DIRECT_URL

GOOGLE_GENERATIVE_AI_API_KEY

NEXT_PUBLIC_SUPABASE_URL

SUPABASE_SERVICE_ROLE_KEY

NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Secrets shall never be committed to source control.

---

# Hosting Platform

Primary hosting target:

**Vercel**

Responsibilities:

* Next.js hosting
* Edge deployment
* CDN
* Serverless functions
* Automatic HTTPS

The application should remain portable to other cloud providers if necessary.

---

# Database Deployment

Primary database:

PostgreSQL (Supabase)

Responsibilities:

* learner accounts
* progress
* world completion
* reflections
* teacher data

Database migrations shall be managed through Prisma.

---

# Authentication Deployment

Authentication provider:

Clerk

Responsibilities:

* user registration
* login
* session management
* role assignment

Supported roles:

* Student
* Teacher
* Administrator

Authentication should be enforced for all protected routes.

---

# AI Service Deployment

Primary AI provider:

Google Gemini

Responsibilities:

* inquiry assistant
* teacher support
* feedback generation (future)
* adaptive learning (future)

AI functionality should degrade gracefully if unavailable.

---

# Static Asset Delivery

Assets include:

* illustrations
* animations
* icons
* narration audio

Requirements:

* CDN delivery
* compression
* browser caching
* optimized loading

Large assets should be lazy-loaded where practical.

---

# File Storage

Primary storage:

Supabase Storage

Content includes:

* profile images
* generated reports (future)
* learning assets
* downloadable resources

Storage buckets should enforce appropriate access policies.

---

# CI/CD Pipeline

Recommended deployment pipeline:

```text
Developer Push

↓

GitHub

↓

Automated Build

↓

Lint

↓

Type Check

↓

Tests

↓

Build

↓

Deploy to Vercel

↓

Production
```

Deployment should fail if required quality checks do not pass.

---

# Quality Gates

Before deployment:

* ESLint passes
* TypeScript passes
* Unit tests pass
* Integration tests pass
* Build succeeds

Production deployment should not proceed if any mandatory check fails.

---

# Monitoring

Recommended monitoring includes:

* application uptime
* API response time
* page load performance
* database latency
* authentication failures
* server errors

Monitoring should support proactive issue detection.

---

# Logging

Application logs should include:

* authentication events
* API errors
* database failures
* deployment events
* unexpected exceptions

Logs should avoid storing personally identifiable information beyond operational necessity.

---

# Backup Strategy

Database backups:

* Daily automated backup
* Weekly backup verification
* Point-in-time recovery (where supported)

Uploaded assets should follow provider backup policies or be replicated if required.

---

# Disaster Recovery

Recovery priorities:

1. Restore database
2. Restore authentication
3. Restore storage
4. Redeploy application
5. Validate learner progress integrity

Recovery procedures should minimize data loss and downtime.

---

# Security Requirements

Deployment shall enforce:

* HTTPS
* secure cookies
* encrypted credentials
* role-based authorization
* environment secret management
* CSRF protection
* XSS mitigation
* SQL injection prevention

Security practices should align with modern web application standards.

---

# Performance Targets

| Metric                         | Target   |
| ------------------------------ | -------- |
| Initial Load                   | < 3 s    |
| Largest Contentful Paint (LCP) | < 2.5 s  |
| API Response                   | < 500 ms |
| Route Transition               | < 500 ms |
| Database Query                 | < 200 ms |

Performance should be monitored continuously.

---

# Scalability

The deployment should support:

* increasing learner numbers
* additional learning worlds
* expanded teacher usage
* future AI services
* larger media libraries

Infrastructure should scale without major architectural changes.

---

# Browser Support

Supported browsers:

| Browser | Support |
| ------- | ------- |
| Chrome  | Latest  |
| Edge    | Latest  |
| Firefox | Latest  |
| Safari  | Latest  |

Mobile browsers should provide equivalent functionality on supported tablets.

---

# Operational Checklist

Before production release:

* Environment variables configured
* Database migrated
* Authentication configured
* Storage buckets created
* AI API verified
* SSL active
* Monitoring enabled
* Logging enabled
* Backup verified
* Performance validated

---

# Production Acceptance Criteria

Deployment is considered production-ready when:

* Application is accessible over HTTPS.
* Authentication functions correctly.
* Database connectivity is verified.
* All learning worlds are operational.
* Progress persistence functions correctly.
* Teacher dashboard is accessible to authorized users.
* Automated deployment pipeline succeeds.
* Monitoring and logging are active.
* Backup procedures are verified.
* Performance targets are satisfied.

---

# Future Infrastructure Expansion

Potential future enhancements include:

* Multi-region deployment
* Redis caching
* Background job processing
* Object storage CDN optimization
* AI service abstraction layer
* Kubernetes deployment
* Multi-language content delivery
* Offline-first Progressive Web App (PWA) support

These enhancements should remain compatible with the core architecture defined in `specs/foundation/architecture.md`.

---

# References

* `steering/tech-stack.md`
* `specs/foundation/architecture.md`
* `specs/foundation/requirements.md`
* `steering/ai-policy.md`
