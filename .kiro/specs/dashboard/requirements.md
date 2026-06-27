# Dashboard Requirements

**Document Type:** Feature Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This document specifies the requirements for the INQUIS Dashboard.

The Dashboard serves as the primary entry point after authentication and provides each user role with an appropriate overview of their learning environment.

This specification covers the shared dashboard architecture only. Detailed teacher functionality is defined in `specs/teacher-panel/requirements.md`.

---

# Scope

Included:

* Dashboard landing experience
* Role-based dashboard rendering
* Learning progress overview
* Navigation
* World progression
* Session continuation
* Quick actions

Excluded:

* Teacher analytics
* Student management
* Reports
* World activity implementation

---

# Dependencies

* `specs/foundation/requirements.md`
* `specs/foundation/architecture.md`
* `steering/ui-guidelines.md`
* `steering/pedagogy.md`

---

# Supported Dashboards

The application shall provide dashboards for:

| User Role | Dashboard          |
| --------- | ------------------ |
| Child     | Learning Dashboard |
| Teacher   | Teaching Dashboard |
| Parent    | Progress Dashboard |

Each dashboard should present information appropriate to the authenticated role.

---

# Functional Requirements

## FR-DASH-001

After successful authentication, users shall be redirected automatically to their respective dashboard.

| Role    | Destination          |
| ------- | -------------------- |
| Child   | `/play/home`         |
| Teacher | `/teacher/dashboard` |
| Parent  | `/parent/dashboard`  |

---

## FR-DASH-002

The child dashboard shall function as the World Map.

It should display:

* available learning worlds
* completed worlds
* locked worlds
* current progress
* companion character

---

## FR-DASH-003

World progression shall follow sequential unlocking rules defined in `product-vision.md`.

Only unlocked worlds may be entered.

---

## FR-DASH-004

Completed worlds shall remain replayable.

Replaying activities should not erase historical progress.

---

## FR-DASH-005

The dashboard shall display the learner's current progress.

Examples include:

* worlds completed
* activities completed
* current learning journey
* earned achievements

Progress should be visual rather than numerical whenever possible.

---

## FR-DASH-006

The dashboard shall allow learners to continue their most recent incomplete activity.

If no activity is in progress, the next recommended activity should be highlighted.

---

## FR-DASH-007

Navigation shall remain visible and consistent throughout dashboard usage.

Child navigation should prioritize icons and illustrations over text.

---

## FR-DASH-008

The dashboard shall preload essential assets for the next activity to reduce loading times.

---

## FR-DASH-009

Dashboard data shall refresh automatically after activity completion.

No manual refresh should be required.

---

## FR-DASH-010

The system shall gracefully handle empty dashboard states.

Examples include:

* new learner
* no completed worlds
* no achievements

---

# Child Dashboard Layout

The recommended layout consists of:

```text
-------------------------------------------------

 Companion Character

-------------------------------------------------

 Progress Journey

-------------------------------------------------

 World Map

-------------------------------------------------

 Continue Learning Button

-------------------------------------------------
```

The World Map should occupy the largest portion of the interface.

---

# World Card Requirements

Each World Card shall display:

* world illustration
* world title
* completion status
* lock status
* progress indicator

Optional:

* companion character
* completion badge

---

# Navigation Requirements

Child dashboard navigation should include:

* Home
* Profile
* Settings (minimal)
* Audio control

Teacher and parent dashboards may include sidebar navigation.

---

# Dashboard States

Each world should support the following states:

| State       | Description       |
| ----------- | ----------------- |
| Locked      | Not yet available |
| Available   | Ready to begin    |
| In Progress | Currently active  |
| Completed   | Finished          |
| Mastered    | Future expansion  |

---

# Progress Visualization

Progress should emphasize learning rather than scores.

Preferred indicators include:

* completed paths
* stars
* badges
* animated milestones

Avoid ranking learners against one another.

---

# Non-Functional Requirements

| Requirement            | Target      |
| ---------------------- | ----------- |
| Dashboard Load         | < 2 seconds |
| Progress Refresh       | < 300 ms    |
| Navigation Response    | < 200 ms    |
| Lighthouse Performance | ≥ 85        |

---

# Business Rules

## BR-DASH-001

Exactly one recommended activity shall be highlighted at any time.

---

## BR-DASH-002

Locked worlds shall remain visible but inaccessible.

---

## BR-DASH-003

Replaying activities shall not reset mastery records.

---

## BR-DASH-004

Dashboard progress shall always reflect persisted database state.

---

# Shared Components

Recommended reusable components include:

| Component          | Purpose                  |
| ------------------ | ------------------------ |
| WorldMap           | Displays learning worlds |
| WorldCard          | Individual world preview |
| ProgressJourney    | Visual learning path     |
| ContinueCard       | Resume learning          |
| AchievementBadge   | Milestone display        |
| DashboardHeader    | Dashboard title          |
| CompanionCharacter | Learning guide           |

---

# Data Requirements

The dashboard requires:

* learner profile
* world completion
* activity completion
* latest session
* achievement history

All dashboard data should be retrieved through shared application services.

---

# Acceptance Criteria

The Dashboard module is complete when:

* Users are redirected to the correct dashboard after login.
* Child dashboard displays the World Map.
* World progression reflects persisted learner progress.
* Locked worlds cannot be entered.
* Completed worlds remain replayable.
* Continue Learning resumes the latest activity.
* Progress updates immediately after activity completion.
* Dashboard loads within the specified performance targets.

---

# Future Expansion

Future versions may include:

* adaptive activity recommendations
* classroom announcements
* seasonal learning events
* personalized companion messages
* AI-powered learning summaries

These features should extend the dashboard without changing its core navigation model.

---

# References

* `steering/product-vision.md`
* `steering/ui-guidelines.md`
* `specs/foundation/requirements.md`
* `specs/dashboard/tasks.md`
