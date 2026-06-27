# World 3 Design Specification — Prediction Explorer

**Document Type:** UX & Interaction Design Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This document defines the interaction design and user experience for **World 3: Prediction Explorer**.

It translates prediction-based learning requirements into structured interaction flows while maintaining consistency with previous worlds.

This document should be read alongside:

* `requirements.md`
* `steering/ui-guidelines.md`
* `steering/pedagogy.md`

---

# Learning Experience Overview

World 3 introduces learners to predictive reasoning.

Learners observe a situation, analyze available clues, make a prediction, and then observe the outcome.

The core learning loop is:

```text id="z9p2xa"
Observe
    ↓
Analyze
    ↓
Predict
    ↓
Reveal
    ↓
Reflect
```

The emphasis is on reasoning before outcome exposure.

---

# Screen Flow

```text id="w8k3lc"
World Map
      │
      ▼
World Introduction
      │
      ▼
Scene Exploration
      │
      ▼
Prediction Selection
      │
      ▼
Outcome Reveal
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

Learners must always submit a prediction before the outcome is revealed.

---

# Information Architecture

```text id="m1q7zd"
World 3

├── Introduction
│
├── Activities
│     ├── Simple Prediction
│     ├── Cause-Effect Prediction
│     ├── Pattern Prediction
│     ├── Multi-Clue Prediction
│     └── Final Challenge
│
├── Reflection
│
└── Completion
```

Each activity builds upon increasing evidence complexity.

---

# Activity Layout

```text id="h4t9qx"
-------------------------------------------------

Progress Indicator

-------------------------------------------------

Scene / Context Area

-------------------------------------------------

Clue Panel

-------------------------------------------------

Prediction Options

-------------------------------------------------

Companion Character

-------------------------------------------------

Submit Prediction

-------------------------------------------------
```

Prediction must be submitted before reveal is enabled.

---

# Introduction Screen

## Components

* World illustration
* Narrative setup
* Learning objective
* Begin button
* Skip button (after first completion)

Narration should create anticipation without revealing outcomes.

---

# Scene Exploration

Purpose:

Allow learners to observe environmental clues before predicting outcomes.

Supported interactions:

* tap objects
* inspect details
* replay animation
* zoom (optional)

No scoring occurs during exploration.

---

# Clue System

Clues should be presented in structured layers:

| Layer            | Description         |
| ---------------- | ------------------- |
| Visual clues     | Observable objects  |
| Behavioral clues | Motion or changes   |
| Context clues    | Environmental hints |

Clues should be progressively revealed if hints are requested.

---

# Prediction System

Learners must:

* select one prediction option
* confirm submission

Prediction formats:

* image selection
* multiple choice
* object selection

Once submitted, prediction becomes locked.

---

# Outcome Reveal

After submission:

* animate outcome
* compare prediction vs result
* provide explanation
* reinforce learning principle

Correctness is secondary to reasoning.

---

# Companion Character

Responsibilities:

* guide attention to clues
* encourage reasoning
* support prediction thinking
* explain outcomes after reveal

The companion should never confirm correctness before reveal.

---

# Hint Interaction

Hints follow progressive structure:

```text id="xq3p8d"
Hint 1 (general clue)

↓

Hint 2 (focused clue)

↓

Hint 3 (near solution context)

↓

Final guidance
```

Hints should increase specificity gradually.

---

# Feedback Design

## Correct Prediction

* positive animation
* reinforcement message
* explanation of reasoning validity

---

## Incorrect Prediction

* supportive feedback
* explanation of actual outcome
* emphasis on learning process

Avoid failure framing.

---

# Reflection Screen

Reflection should focus on reasoning:

Example prompts:

* What made you choose that prediction?
* Which clue influenced you most?
* What would you change next time?

Formats:

* multiple choice
* image selection
* short structured responses

---

# Progress Indicator

Display:

* completed activities
* current activity
* remaining activities

Example:

```text id="p7w2lm"
●────●────●────○────○
```

---

# Accessibility

Requirements:

* narration support
* large interactive targets
* predictable UI states
* clear prediction lock indicator
* high contrast mode support

Reading should not be required for completion.

---

# Audio Design

Audio types:

| Type          | Purpose                  |
| ------------- | ------------------------ |
| Narration     | Instruction              |
| Clue Audio    | Environmental cues       |
| Outcome Sound | Reveal feedback          |
| Celebration   | Completion reinforcement |

Audio should remain optional for all non-critical information.

---

# Animation Guidelines

Animations should emphasize:

* transition from prediction → reveal
* outcome changes
* companion reactions

Animations should remain under 1 second for most interactions.

---

# Responsive Behavior

Supported devices:

| Device  | Support |
| ------- | ------- |
| Tablet  | Primary |
| Laptop  | Full    |
| Desktop | Full    |

Scene scaling should preserve clarity of clues.

---

# Error Recovery

If failure occurs:

* preserve prediction state if possible
* allow retry of current activity
* avoid restarting world session
* display non-disruptive message

---

# Completion Experience

After final activity:

* World completion animation
* prediction skill summary
* unlocked World 4 preview
* replay option
* return to dashboard

Focus should be on learning progression, not scoring.

---

# UX Validation Checklist

* Prediction always required before reveal
* Clues are clearly distinguishable
* Hint system is progressive
* Outcome reveal is visually clear
* Reflection follows every activity
* Navigation remains predictable
* Interaction is touch-friendly
* No competitive scoring is displayed

---

# References

* `requirements.md`
* `steering/ui-guidelines.md`
* `steering/pedagogy.md`
* `steering/learning-framework.md`
