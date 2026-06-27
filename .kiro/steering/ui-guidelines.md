# UI Guidelines

**Document Type:** Steering Document
**Version:** 1.0
**Status:** Canonical

---

# Purpose

This document defines the visual and interaction standards for INQUIS.

Its purpose is to ensure every interface remains consistent, accessible, and aligned with the educational objectives defined in:

* `steering/product-vision.md`
* `steering/learning-framework.md`
* `steering/pedagogy.md`
* `steering/lidm-2026.md`

This document focuses on **how interfaces should behave and be implemented**, not on the educational rationale behind them.

---

# Scope

These guidelines apply to:

* Landing page
* Child interface
* Teacher panel
* Parent interface
* Dashboard
* World activities
* Shared UI components
* Future modules

---

# Design Principles

## Child First

Child-facing interfaces always take priority over adult-facing interfaces.

Every interaction should be understandable without reading long text.

---

## Simplicity

Each screen should present one primary task.

Avoid unnecessary buttons, menus, or options.

---

## Consistency

Navigation patterns, spacing, typography, iconography, animation, and feedback should remain consistent across the application.

---

## Progressive Disclosure

Only reveal information when it becomes relevant.

Avoid overwhelming users with excessive UI elements.

---

## Immediate Feedback

Every interaction should receive visible or audible feedback within 200 ms.

Examples include:

* button animation
* sound effect
* character response
* object movement

---

# User Interface Layers

The application contains three distinct interface families.

| Interface  | Primary Users | Priority |
| ---------- | ------------- | -------- |
| Child UI   | Learners      | Highest  |
| Teacher UI | Teachers      | High     |
| Parent UI  | Parents       | Medium   |

Each interface follows different interaction rules while maintaining visual consistency.

---

# Child Interface Guidelines

## Navigation

Navigation should rely primarily on:

* illustrations
* icons
* animations
* audio

Text should never be the only way to communicate navigation.

---

## Layout

Every child screen should contain:

* primary activity area
* companion character
* progress indicator
* optional hint button

Avoid sidebars and complex menus.

---

## Touch Targets

Minimum interactive size:

* 44 × 44 px

Preferred:

* 56 × 56 px

Interactive elements should have generous spacing to prevent accidental taps.

---

## Typography

Child-facing text should:

* use large font sizes
* use short sentences
* avoid technical vocabulary
* never exceed three short lines without narration

---

## Color Usage

Color should communicate:

* interaction
* grouping
* progress
* emphasis

Color must never be the only indicator of meaning.

---

## Animation

Animation should:

* reinforce interaction
* guide attention
* celebrate progress

Animation should never delay learning unnecessarily.

---

## Audio

Audio is the primary instructional medium.

Every activity should support:

* narration
* interaction sounds
* celebration sounds

Background music should remain subtle and optional.

---

# Teacher Interface Guidelines

Teacher interfaces prioritize information density over playfulness.

Requirements include:

* clear navigation
* sortable tables
* readable charts
* concise summaries
* export functionality

Avoid decorative animations that distract from data interpretation.

---

# Parent Interface Guidelines

Parent views should communicate progress through:

* simple language
* visual summaries
* narrative explanations

Avoid educational jargon unless accompanied by explanations.

---

# Navigation Structure

Global navigation should remain shallow.

Recommended hierarchy:

```
Landing

├── Child
│   ├── World Map
│   ├── World
│   └── Activity
│
├── Teacher
│   ├── Dashboard
│   ├── Students
│   ├── Reports
│   └── Settings
│
└── Parent
    ├── Progress
    └── Learning Journey
```

---

# Component Standards

Reusable UI components should be implemented whenever possible.

Core shared components include:

| Component    | Purpose                    |
| ------------ | -------------------------- |
| Button       | Primary interactions       |
| Card         | Information grouping       |
| Modal        | Focused interactions       |
| Progress Bar | Activity progression       |
| Avatar       | Child and teacher identity |
| Badge        | Achievement display        |
| Tooltip      | Secondary information      |
| Dialog       | Confirmation               |
| Tabs         | Dashboard navigation       |
| Breadcrumb   | Teacher navigation         |

Components should remain visually consistent across modules.

---

# World Activity Layout

Every activity screen should contain the following regions.

```
-------------------------------------------------

 Progress

-------------------------------------------------

 Activity Area

 Companion

-------------------------------------------------

 Hint Button        Continue Button

-------------------------------------------------
```

The activity area should always receive the largest visual emphasis.

---

# Icons

Icons should be:

* simple
* recognizable
* consistent
* outlined or rounded

Avoid abstract symbols for child-facing interfaces.

---

# Illustrations

Illustrations should:

* use friendly proportions
* avoid unnecessary realism
* remain culturally inclusive
* support educational objectives

Illustrations should never become decorative distractions.

---

# Feedback States

Every interactive component should define:

* Default
* Hover (desktop)
* Focus
* Pressed
* Disabled
* Success
* Error
* Loading

Transitions between states should be visually smooth.

---

# Loading States

Loading screens should avoid blank pages.

Preferred techniques include:

* skeleton loaders
* animated companion
* progress indicator

---

# Empty States

Every empty page should explain:

* why nothing is shown
* what the user should do next

Examples:

Teacher dashboard:

> "No students have been added yet."

Reports:

> "Complete learning activities to generate reports."

---

# Error States

Errors should:

* explain the problem
* suggest recovery
* avoid technical language

Never expose raw exception messages to users.

---

# Accessibility

Child-facing interfaces should prioritize:

* large touch targets
* high contrast
* audio support
* predictable navigation

Teacher and parent interfaces should satisfy WCAG 2.1 AA whenever practical.

---

# Responsive Design

Minimum supported widths:

| Device  |   Width |
| ------- | ------: |
| Tablet  |  768 px |
| Laptop  | 1024 px |
| Desktop | 1280 px |

Child activities should prioritize tablet layouts.

---

# Visual Consistency Rules

The application should maintain consistent:

* spacing scale
* border radius
* shadows
* icon style
* animation timing
* typography hierarchy

New components should follow existing design tokens instead of introducing new visual styles.

---

# Future Expansion

Future modules should reuse existing:

* component library
* spacing system
* typography
* interaction patterns
* accessibility standards

New modules should extend the design system rather than replacing it.

---

# References

* `steering/product-vision.md`
* `steering/pedagogy.md`
* `steering/learning-framework.md`
* `steering/lidm-2026.md`
