# World 4 Design Specification — Little Scientist

**Document Type:** UX & Interaction Design Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This document defines the interaction design, screen flow, and user experience for **World 4: Little Scientist**.

World 4 is the capstone learning experience of INQUIS. It integrates all inquiry skills developed in previous worlds into one guided scientific investigation.

This document complements:

* `requirements.md`
* `steering/ui-guidelines.md`
* `steering/pedagogy.md`

---

# Learning Experience Overview

Unlike previous worlds that focus on a single inquiry skill, World 4 combines the complete inquiry cycle into one continuous experience.

The learner should feel like a real young scientist solving a scientific mystery.

The learning sequence is:

```text
Observe
    ↓
Collect Evidence
    ↓
Classify
    ↓
Predict
    ↓
Observe Outcome
    ↓
Conclude
```

Each phase naturally transitions into the next without interrupting learner engagement.

---

# Screen Flow

```text
World Map
      │
      ▼
World Introduction
      │
      ▼
Investigation Briefing
      │
      ▼
Observation Scene
      │
      ▼
Evidence Collection
      │
      ▼
Classification Board
      │
      ▼
Prediction
      │
      ▼
Outcome Reveal
      │
      ▼
Conclusion
      │
      ▼
World Completion
```

The learner should always understand which investigation stage they are currently completing.

---

# Information Architecture

```text
World 4

├── Introduction
│
├── Investigation
│     ├── Observation
│     ├── Evidence Collection
│     ├── Classification
│     ├── Prediction
│     ├── Outcome
│     └── Conclusion
│
└── Completion
```

The investigation should behave as one continuous experience rather than separate mini-games.

---

# Investigation Layout

```text
-------------------------------------------------

Progress Indicator

-------------------------------------------------

Investigation Area

-------------------------------------------------

Evidence Panel

-------------------------------------------------

Companion Character

-------------------------------------------------

Current Objective

-------------------------------------------------

Hint              Continue

-------------------------------------------------
```

The Investigation Area should occupy approximately 65–70% of the available interface.

---

# Introduction Screen

## Components

* World illustration
* World title
* Investigation overview
* Narration
* Begin Investigation button
* Skip button (after first completion)

The introduction should establish curiosity without explaining the investigation outcome.

---

# Investigation Briefing

The learner should receive:

* investigation goal
* available tools
* companion introduction
* expected learning outcome

The briefing should remain concise and accessible for early learners.

---

# Observation Scene

Purpose:

Allow learners to freely inspect the environment before collecting evidence.

Supported interactions:

* tap
* inspect
* drag
* replay animations
* zoom (optional)

No assessment occurs during this phase.

---

# Evidence Collection

Learners interact with the environment to collect meaningful observations.

Collected evidence should appear immediately inside the Evidence Panel.

Examples include:

* plants
* animals
* weather clues
* floating objects
* light sources

Evidence should remain visible throughout the investigation.

---

# Classification Board

Collected evidence is organized into groups.

Interaction methods:

* drag-and-drop
* tap to assign
* reorder

The Classification Board should reuse interaction patterns introduced in World 2.

---

# Prediction Phase

Learners review collected evidence before making a prediction.

Prediction methods include:

* image selection
* multiple choice
* object selection

Prediction submission locks the current answer until the outcome is revealed.

---

# Outcome Reveal

After prediction submission:

* play outcome animation
* compare prediction with actual result
* provide age-appropriate scientific explanation

Outcome explanations should focus on observable evidence rather than abstract theory.

---

# Conclusion Screen

Learners complete a guided conclusion using structured prompts.

Example prompts:

* What did you discover?
* Which clues helped you?
* What happened during the investigation?
* Would you predict differently next time?

Preferred interaction formats:

* multiple choice
* image selection
* guided sentence completion

---

# Companion Character

Responsibilities include:

* introducing investigation stages
* providing encouragement
* offering progressive hints
* summarizing scientific discoveries
* celebrating completion

The companion should encourage curiosity without providing direct solutions.

---

# Hint Interaction

Hints should become progressively more specific.

```text
Hint 1

↓

Hint 2

↓

Hint 3

↓

Final Guidance
```

Hints should emphasize investigation rather than revealing conclusions.

---

# Progress Indicator

Display investigation stages visually.

Example:

```text
●────●────●────●────○────○
```

Completed stages should remain clearly distinguishable.

---

# Accessibility

The investigation should support:

* narration replay
* large touch targets
* high-contrast visuals
* predictable interaction patterns
* consistent button placement

Reading should not be required to complete the investigation.

---

# Audio Design

Audio categories:

| Type        | Purpose                |
| ----------- | ---------------------- |
| Narration   | Investigation guidance |
| Interaction | Object feedback        |
| Discovery   | Evidence collection    |
| Outcome     | Experiment reveal      |
| Celebration | World completion       |

Narration and background audio should be independently configurable.

---

# Animation Guidelines

Animations should reinforce:

* evidence collection
* object movement
* investigation transitions
* outcome reveal
* world completion

Animations should generally remain under one second, except for the final completion sequence.

---

# Responsive Behavior

Supported devices:

| Device  | Support |
| ------- | ------- |
| Tablet  | Primary |
| Laptop  | Full    |
| Desktop | Full    |

Investigation layouts should preserve adequate interaction space across all supported devices.

---

# Error Recovery

If an unexpected error occurs:

* preserve investigation progress
* preserve collected evidence
* restore the latest completed stage
* allow retry without restarting the investigation

---

# Completion Experience

After the guided conclusion:

Display:

* World Complete illustration
* celebration animation
* inquiry journey summary
* completion certificate (future)
* replay investigation
* return to dashboard

Completion should celebrate curiosity, persistence, and scientific thinking rather than achievement rankings.

---

# UX Validation Checklist

The implementation should satisfy the following:

* Investigation stages follow a logical sequence.
* Observation precedes evidence collection.
* Classification reuses familiar interactions.
* Prediction occurs before the outcome reveal.
* Reflection concludes the investigation.
* Progress remains visible throughout.
* Companion guidance supports inquiry without revealing answers.
* Navigation is consistent with previous worlds.
* The experience feels like one continuous scientific investigation.

---

# References

* `requirements.md`
* `steering/ui-guidelines.md`
* `steering/pedagogy.md`
* `steering/learning-framework.md`
