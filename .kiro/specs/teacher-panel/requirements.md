# Teacher Panel Requirements

**Document Type:** Feature Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This document defines the functional and technical requirements for the Teacher Panel.

The Teacher Panel enables educators to monitor student learning, manage classrooms, review inquiry progress, and generate reports without disrupting the learner experience.

The Teacher Panel is intended to support instructional decision-making rather than replace teacher judgment.

---

# Scope

Included:

* Teacher dashboard
* Classroom management
* Student management
* Progress monitoring
* Learning analytics
* Report generation
* Activity assignment

Excluded:

* System administration
* Parent dashboard
* Child-facing activities
* AI-assisted analytics (future)

---

# Dependencies

* `specs/foundation/requirements.md`
* `specs/dashboard/requirements.md`
* `steering/pedagogy.md`
* `steering/ui-guidelines.md`
* `steering/learning-framework.md`

---

# User Goals

Teachers should be able to:

* monitor student progress
* identify learners needing support
* review inquiry skill development
* assign learning activities
* export learning reports
* manage classroom membership

---

# Functional Requirements

## FR-TP-001 Teacher Dashboard

The Teacher Panel shall provide a dashboard summarizing:

* number of students
* classroom completion rate
* world progression
* recent learning activity
* pending assignments

---

## FR-TP-002 Classroom Management

Teachers shall be able to:

* create classrooms
* rename classrooms
* archive classrooms
* assign students
* remove students

Archived classrooms should remain accessible as historical records.

---

## FR-TP-003 Student Management

Teachers shall be able to view:

* student profile
* enrolled classroom
* completed worlds
* completed activities
* latest learning session
* inquiry skill progression

Teachers shall not be able to modify historical learning records.

---

## FR-TP-004 Student Detail Page

Each student page shall display:

* learner profile
* learning timeline
* world completion
* activity history
* scientific thinking progress
* teacher notes

---

## FR-TP-005 Progress Monitoring

Teachers shall be able to monitor:

* completed activities
* current activity
* completion dates
* replay frequency
* learning continuity

Progress should update automatically after learner activity.

---

## FR-TP-006 Inquiry Skill Tracking

Progress should be organized using the scientific thinking framework defined in `steering/learning-framework.md`.

Examples include:

* Observe
* Question
* Predict
* Explore
* Conclude

Teacher interfaces should emphasize learning development rather than scores.

---

## FR-TP-007 Assignment Management

Teachers shall be able to:

* recommend a world
* recommend specific activities
* reopen completed activities
* schedule future assignments (future)

Assignments should never bypass world progression rules.

---

## FR-TP-008 Report Generation

Teachers shall be able to export:

* student progress
* classroom summary
* inquiry skill overview
* completion history

Supported formats:

* PDF
* CSV

---

## FR-TP-009 Search and Filtering

The Teacher Panel shall support filtering by:

* classroom
* student
* completion status
* world
* activity

Search should remain responsive for large classrooms.

---

## FR-TP-010 Notifications

Teachers should receive notifications for:

* newly completed worlds
* inactive learners
* generated reports
* assignment completion

Notifications should remain informational rather than intrusive.

---

# Teacher Dashboard Layout

Recommended layout:

```text
-------------------------------------------------

Header

-------------------------------------------------

Classroom Summary

Student Overview

-------------------------------------------------

Progress Charts

Recent Activity

-------------------------------------------------

Quick Actions

-------------------------------------------------
```

---

# Student Detail Layout

```text
-------------------------------------------------

Student Profile

-------------------------------------------------

Learning Timeline

-------------------------------------------------

World Progress

-------------------------------------------------

Inquiry Skills

-------------------------------------------------

Teacher Notes

-------------------------------------------------
```

---

# Shared Components

Recommended components:

| Component        | Purpose                |
| ---------------- | ---------------------- |
| ClassroomCard    | Classroom summary      |
| StudentTable     | Student list           |
| StudentProfile   | Learner information    |
| ProgressChart    | Progress visualization |
| SkillProgress    | Inquiry skill display  |
| ActivityTimeline | Learning history       |
| ReportCard       | Export summary         |
| SearchBar        | Student search         |
| FilterPanel      | Dashboard filtering    |

---

# Data Requirements

The Teacher Panel requires:

* classroom records
* teacher profile
* student roster
* progress history
* activity completion
* inquiry skill metrics
* report history

Data should be retrieved through dedicated services rather than direct database access.

---

# Non-Functional Requirements

| Requirement       | Target      |
| ----------------- | ----------- |
| Dashboard Load    | < 2 seconds |
| Student Search    | < 300 ms    |
| Report Generation | < 5 seconds |
| Progress Refresh  | < 300 ms    |

---

# Business Rules

## BR-TP-001

Teachers may manage multiple classrooms.

---

## BR-TP-002

Students belong to one active classroom at a time.

---

## BR-TP-003

Learning history shall remain immutable.

Teachers may annotate progress but shall not alter assessment records.

---

## BR-TP-004

Reports shall reflect persisted learning data only.

Derived analytics should remain reproducible.

---

## BR-TP-005

Assignments shall respect sequential world progression.

Teachers may recommend future worlds but cannot unlock them directly.

---

# Security Requirements

The Teacher Panel shall enforce:

* authenticated access
* role-based authorization
* Row Level Security
* server-side validation

Teachers shall access only classrooms they own or are assigned to.

---

# Acceptance Criteria

The Teacher Panel is complete when:

* Teachers can access their dashboard after authentication.
* Classrooms can be created and managed.
* Student progress is displayed correctly.
* Inquiry skill progression is visualized.
* Search and filtering function correctly.
* Reports can be exported.
* Dashboard data refreshes automatically.
* Unauthorized users cannot access teacher resources.

---

# Future Expansion

Potential future enhancements include:

* AI-assisted classroom insights
* learning trend analysis
* curriculum mapping
* intervention recommendations
* printable observation sheets
* real-time classroom monitoring

These features should extend the existing Teacher Panel without changing its core architecture.

---

# References

* `steering/pedagogy.md`
* `steering/learning-framework.md`
* `steering/ui-guidelines.md`
* `specs/dashboard/requirements.md`
* `specs/teacher-panel/tasks.md`
