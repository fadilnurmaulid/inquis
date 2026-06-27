# World 2 Design Specification — Sorting Explorer

**Document Type:** UX & Interaction Design Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This document defines the interaction design, screen structure, and user experience for **World 2: Sorting Explorer**.

It translates the functional requirements into concrete interface behaviors while remaining consistent with the global design system and pedagogical framework.

This document complements:

* `requirements.md`
* `steering/ui-guidelines.md`
* `steering/pedagogy.md`

---

# Learning Experience Overview

World 2 transforms observation into classification.

Learners first examine a collection of mixed objects before organizing them into meaningful groups based on observable characteristics.

The learning sequence follows:

```text
Observe
    ↓
Compare
    ↓
Sort
    ↓
Explain
    ↓
Reflect
```

The emphasis is on reasoning behind classification rather than memorizing answers.

---

# Screen Flow

```text
World Map
      │
      ▼
World Introduction
      │
      ▼
Exploration Scene
      │
      ▼
Sorting Challenge
      │
      ▼
Feedback
      │
      ▼
Reflection
      │
      ▼
Next Challenge
      │
      ▼
World Completion
```

Learners may safely exit after every completed activity.

---

# Information Architecture

```text
World 2

├── Introduction
│
├── Activities
│     ├── Color Sorting
│     ├── Shape Sorting
│     ├── Size Sorting
│     ├── Mixed Attribute Sorting
│     └── Final Challenge
│
├── Reflection
│
└── Completion
```

Every activity should reuse the same interaction pattern to reduce cognitive load.

---

# Activity Layout

```text
-------------------------------------------------

Progress Indicator

-------------------------------------------------

Instruction

-------------------------------------------------

Sorting Area

-------------------------------------------------

Category Containers

-------------------------------------------------

Companion Character

-------------------------------------------------

Hint              Continue

-------------------------------------------------
```

The Sorting Area should occupy the largest portion of the screen.

---

# Introduction Screen

## Components

* World illustration
* World title
* Short narration
* Learning objective
* Begin button
* Skip button (after first completion)

The introduction should establish curiosity without explaining the solution.

---

# Exploration Scene

Purpose:

Allow learners to inspect every object before sorting.

Supported interactions:

* tap
* drag
* rotate (optional)
* inspect

Objects should respond visually when selected.

No validation occurs during exploration.

---

# Sorting Challenge

Each activity consists of:

* instruction
* draggable objects
* category containers
* companion guidance
* optional hints

Sorting should occur using intuitive drag-and-drop interactions.

---

# Category Containers

Each category should provide:

* illustration
* label
* drop zone
* placement animation

Drop zones should clearly indicate when an object can be placed.

---

# Sortable Objects

Objects should provide:

* consistent illustration style
* clear distinguishing attributes
* drag feedback
* placement animation

Objects should return smoothly to their original position if dropped incorrectly.

---

# Companion Character

Responsibilities include:

* introducing activities
* encouraging observation
* providing progressive hints
* celebrating successful classifications
* guiding reflection

The companion should encourage reasoning without giving direct answers.

---

# Hint Interaction

Hints should reveal information progressively.

```text
Hint 1

↓

Hint 2

↓

Hint 3

↓

Final Guidance
```

Each hint should focus attention on observable characteristics rather than correct placement.

---

# Feedback Design

## Correct Classification

Display:

* success animation
* positive narration
* scientific explanation

Duration:

2–4 seconds

---

## Incorrect Classification

Display:

* encouraging narration
* subtle visual cue
* retry opportunity

Avoid punishment or failure messaging.

---

# Reflection Screen

Reflection should ask learners to explain their sorting decisions.

Preferred formats include:

* multiple choice
* image selection
* simple sentence selection

Example prompts:

* Which feature helped you sort the objects?
* Could these objects be grouped differently?
* What did the objects in each group have in common?

---

# Progress Indicator

Display overall progress throughout the world.

Example visualization:

```text
●────●────●────○────○
```

The learner should always know:

* completed activities
* current activity
* remaining activities

---

# Accessibility

The interface should support:

* narration replay
* large touch targets
* high-contrast visuals
* predictable drag behavior
* consistent button placement

All essential interactions should remain usable without requiring extensive reading.

---

# Audio Design

Audio categories include:

| Type        | Purpose                     |
| ----------- | --------------------------- |
| Narration   | Instructions                |
| Interaction | Drag and placement feedback |
| Celebration | Correct classification      |
| Ambient     | Optional atmosphere         |

Narration should remain independently controllable from background audio.

---

# Animation Guidelines

Animations should reinforce:

* dragging
* successful placement
* incorrect placement recovery
* activity completion

Animation duration should generally remain below one second.

---

# Responsive Behavior

Supported devices:

| Device  | Support |
| ------- | ------- |
| Tablet  | Primary |
| Laptop  | Full    |
| Desktop | Full    |

Sorting areas should resize while preserving adequate spacing between objects.

---

# Error Recovery

If an unexpected error occurs:

* preserve learner progress
* restore current activity
* display a friendly recovery message
* allow retry without restarting the world

---

# Completion Experience

After the final reflection, display:

* World Complete illustration
* celebration animation
* classification skill summary
* unlocked World 3 preview
* replay button
* return to dashboard button

Completion should emphasize learning progress rather than achievement rankings.

---

# UX Validation Checklist

Implementation should satisfy the following:

* Learners freely explore before sorting.
* Drag-and-drop interactions feel responsive.
* Category containers are visually clear.
* Hints encourage observation rather than reveal answers.
* Reflection follows every activity.
* Progress remains visible.
* Navigation is predictable.
* Activities remain consistent across the entire world.

---

# References

* `requirements.md`
* `steering/ui-guidelines.md`
* `steering/pedagogy.md`
* `steering/learning-framework.md`
