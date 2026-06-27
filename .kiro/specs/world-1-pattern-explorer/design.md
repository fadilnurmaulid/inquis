# World 1 Design Specification — Pattern Explorer

**Document Type:** UX & Interaction Design Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This document defines the interaction design, screen flow, information architecture, and UI behavior for **World 1: Pattern Explorer**.

It complements:

* `requirements.md` (functional requirements)
* `steering/ui-guidelines.md` (global design system)

This document focuses on implementation details for the learner experience.

---

# Learning Experience Overview

The learner explores a visually rich environment filled with objects exhibiting recognizable patterns.

Instead of presenting questions immediately, the interface encourages observation through exploration.

The activity sequence follows:

```text
Explore
    ↓
Observe
    ↓
Identify
    ↓
Reflect
    ↓
Continue
```

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
Observation Activity
      │
      ▼
Feedback
      │
      ▼
Reflection
      │
      ▼
Next Activity
      │
      ▼
World Completion
```

The learner may exit safely after every completed activity.

---

# Information Architecture

```text
World 1

├── Introduction
│
├── Activities
│     ├── Activity 1
│     ├── Activity 2
│     ├── Activity 3
│     ├── Activity 4
│     └── Activity 5
│
├── Reflection
│
└── Completion
```

Activities should remain modular and independently reusable.

---

# Activity Layout

```text
-------------------------------------------------

Progress Indicator

-------------------------------------------------

Instruction

-------------------------------------------------

Interactive Activity Area

-------------------------------------------------

Companion Character

-------------------------------------------------

Hint              Continue

-------------------------------------------------
```

The interactive area should occupy approximately 60–70% of the available screen.

---

# Introduction Screen

## Components

* World illustration
* World title
* Short narration
* Begin button
* Skip button (after first completion)

The introduction should not exceed approximately 30 seconds of narration.

---

# Exploration Scene

Purpose:

Allow learners to investigate objects without evaluation.

Available interactions:

* tap
* drag
* inspect
* compare

No scoring should occur during this phase.

---

# Observation Activities

Each activity should consist of:

* objective
* interactive canvas
* optional hint
* completion validation

Example activity categories:

| Activity              | Goal                 |
| --------------------- | -------------------- |
| Find Matching Object  | Pattern recognition  |
| Continue the Sequence | Sequence observation |
| Spot the Difference   | Visual comparison    |
| Color Pattern         | Repeating structures |
| Shape Pattern         | Spatial observation  |

Individual implementations should follow the same interaction model.

---

# Companion Character

Responsibilities:

* greet learners
* introduce activities
* provide hints
* celebrate progress
* encourage reflection

The companion should never reveal complete solutions unless explicitly allowed by future accessibility settings.

---

# Hint Interaction

Hint progression:

```text
Hint 1

↓

Hint 2

↓

Hint 3

↓

Final Guidance
```

Only one hint level should be visible at a time.

Requesting hints should always remain optional.

---

# Feedback Design

## Correct Response

Display:

* success animation
* encouraging narration
* brief scientific explanation

Duration:

2–4 seconds

---

## Incorrect Response

Display:

* supportive encouragement
* suggestion to observe again

Avoid:

* red warning screens
* failure messages
* negative sounds

---

# Reflection Screen

Reflection should consist of:

* one simple question
* optional illustration
* voice narration
* continue button

Preferred interaction methods:

* multiple choice
* picture selection
* simple verbal reasoning (future)

Reflection should remain lightweight and age-appropriate.

---

# Progress Indicator

The learner should always know:

* current activity
* remaining activities
* overall world progress

Recommended visualization:

```text
●────●────○────○────○
```

Completed activities should remain visually distinguishable.

---

# Accessibility

The design should support:

* narration replay
* high-contrast visuals
* large touch targets
* consistent button placement
* predictable navigation

Reading should never be required to complete activities.

---

# Audio Design

Audio types include:

| Type        | Purpose                |
| ----------- | ---------------------- |
| Narration   | Instructions           |
| Interaction | Immediate feedback     |
| Celebration | Positive reinforcement |
| Ambient     | Optional atmosphere    |

Users should be able to mute background audio independently from narration.

---

# Animation Guidelines

Animations should:

* reinforce interactions
* direct attention
* celebrate achievements

Avoid animations longer than one second unless used during world transitions.

---

# Responsive Behavior

Target devices:

| Device  | Support |
| ------- | ------- |
| Tablet  | Primary |
| Laptop  | Full    |
| Desktop | Full    |

The interactive canvas should scale while preserving relative object spacing.

---

# Error Recovery

If an activity cannot be completed because of an application error:

* preserve learner progress
* display a friendly message
* allow retry
* avoid restarting the world

---

# Completion Experience

After the final reflection, display:

* World Complete illustration
* celebration animation
* inquiry summary
* unlocked World 2 preview
* return to dashboard button
* replay world button

The completion screen should reinforce progress rather than competition.

---

# UX Validation Checklist

The implementation should satisfy the following:

* Learners understand what to do without lengthy text.
* Exploration occurs before assessment.
* Hints are progressive.
* Feedback remains encouraging.
* Reflection follows every activity.
* Navigation is predictable.
* Activities are touch-friendly.
* Progress is always visible.
* World completion feels rewarding without relying on competitive scoring.

---

# References

* `requirements.md`
* `steering/ui-guidelines.md`
* `steering/pedagogy.md`
* `steering/learning-framework.md`
