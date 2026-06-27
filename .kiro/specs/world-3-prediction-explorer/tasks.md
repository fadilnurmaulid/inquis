# World 3 Implementation Tasks — Prediction Explorer

**Document Type:** Implementation Task List
**Version:** 1.0
**Status:** Ready for Development

---

# Purpose

This document defines the implementation tasks for **World 3: Prediction Explorer**.

World 3 expands the inquiry journey by introducing evidence-based prediction and simple hypothesis formation. The implementation should reuse the interaction patterns established in Worlds 1 and 2 wherever possible.

---

# Dependencies

Required documents:

* `requirements.md`
* `design.md`
* `steering/pedagogy.md`
* `steering/ui-guidelines.md`
* `steering/learning-framework.md`

---

# Milestone 1 — World Setup

## Task W3-001

Create World 3 route.

### Checklist

* Create `/play/world-3`
* Register world metadata
* Connect World Map progression
* Verify unlock requirements

**Priority:** Critical

---

## Task W3-002

Implement World Introduction screen.

### Components

* World illustration
* Narration
* Learning objective
* Begin button
* Skip button

### Acceptance Criteria

Learners can access World 3 after completing World 2.

---

# Milestone 2 — Scene Exploration

## Task W3-003

Develop Exploration Scene.

### Features

* Interactive scene
* Object inspection
* Tap interactions
* Replay environmental animation

Exploration must occur before prediction.

---

## Task W3-004

Implement Companion Character guidance.

Responsibilities:

* Introduce activities
* Encourage evidence gathering
* Deliver hints
* Reinforce inquiry thinking

The companion should avoid confirming predictions before the reveal phase.

---

# Milestone 3 — Prediction Activities

## Task W3-005

Develop Simple Prediction activity.

Requirements:

* Display scenario
* Present prediction choices
* Validate selection
* Reveal outcome

---

## Task W3-006

Develop Cause-and-Effect Prediction activity.

Learners observe a situation and predict its consequence.

Examples:

* Falling object
* Plant growth
* Water movement

---

## Task W3-007

Develop Pattern-Based Prediction activity.

Learners predict the continuation of an observed pattern.

Activity should reuse pattern components from World 1 where practical.

---

## Task W3-008

Develop Multi-Clue Prediction activity.

Requirements:

* Multiple observable clues
* Several possible outcomes
* Single prediction submission

The activity should emphasize reasoning over guessing.

---

# Milestone 4 — Prediction System

## Task W3-009

Implement Prediction Selection component.

Features:

* Image selection
* Multiple-choice support
* Selection confirmation
* Locked submission state

Prediction cannot be modified after confirmation.

---

## Task W3-010

Implement Outcome Reveal component.

Display:

* Reveal animation
* Actual outcome
* Comparison with learner prediction
* Scientific explanation

Outcome presentation should remain encouraging regardless of prediction accuracy.

---

# Milestone 5 — Inquiry Support

## Task W3-011

Implement Progressive Hint System.

Requirements:

* Layered hints
* Optional usage
* Reset between activities

Hints should encourage closer observation of available evidence.

---

## Task W3-012

Implement Feedback System.

Correct predictions:

* Celebration animation
* Positive narration
* Reinforcement explanation

Incorrect predictions:

* Supportive narration
* Explanation of observed outcome
* Encouragement to reflect

No penalty should be applied.

---

# Milestone 6 — Reflection

## Task W3-013

Develop Reflection component.

Support:

* Multiple-choice responses
* Image-based prompts
* Narrated questions

Reflection should emphasize prediction reasoning.

---

## Task W3-014

Persist reflection data.

Store:

* completion status
* timestamp
* associated activity

Reflection history should integrate with learner progress.

---

# Milestone 7 — Progress Management

## Task W3-015

Implement automatic progress persistence.

Persist:

* completed activities
* prediction selections
* outcome comparisons
* hint usage
* reflection completion

Progress should save after each completed activity.

---

## Task W3-016

Implement resume functionality.

Requirements:

* Restore incomplete activity
* Restore exploration state
* Restore prediction state (if not yet revealed)

Completed activities should never be replayed automatically.

---

# Milestone 8 — World Completion

## Task W3-017

Implement completion workflow.

Display:

* completion illustration
* celebration animation
* prediction skill summary
* World 4 preview
* replay button
* return to dashboard

---

## Task W3-018

Unlock World 4.

Requirements:

* Validate mandatory activities
* Validate reflection completion
* Update ProgressService

Unlock logic shall remain centralized within the progression service.

---

# Milestone 9 — Accessibility & Audio

## Task W3-019

Implement narration controls.

Support:

* Play
* Pause
* Replay
* Volume adjustment

Narration should synchronize with exploration, prediction, and outcome phases.

---

## Task W3-020

Implement accessibility improvements.

Include:

* High-contrast support
* Large touch targets
* Keyboard navigation (desktop)
* Clear focus indicators
* Prediction confirmation accessibility

---

# Milestone 10 — Performance Optimization

## Task W3-021

Optimize scene rendering.

Strategies:

* Lazy-load illustrations
* Cache reusable assets
* Optimize animations
* Reduce unnecessary re-renders

---

## Task W3-022

Preload future assets.

Preload:

* Next activity
* Narration audio
* Outcome animations
* Illustrations

Preloading should remain non-blocking.

---

# Milestone 11 — Testing

## Task W3-023

Create component tests.

Components:

* PredictionCanvas
* PredictionCard
* OutcomeReveal
* HintPanel
* ReflectionCard

---

## Task W3-024

Create integration tests.

Verify:

* World entry
* Prediction submission
* Outcome reveal
* Hint progression
* Reflection workflow
* Resume functionality
* World completion

---

## Task W3-025

Validate performance.

Performance targets:

* World load < 3 seconds
* Interaction response < 150 ms
* Outcome reveal < 500 ms
* Progress save < 300 ms

Validate compliance with the requirements specification.

---

# Completion Criteria

World 3 is complete when:

* Learners can enter after completing World 2.
* Exploration precedes prediction.
* Prediction submission is required before reveal.
* Outcome reveal functions correctly.
* Reflection follows every activity.
* Progress persists automatically.
* Resume restores learner state.
* Completing the world unlocks World 4.
* All component and integration tests pass.

---

# Deliverables

The completed World 3 module shall provide:

* Interactive prediction environment
* Evidence-based prediction activities
* Outcome reveal system
* Companion-guided inquiry
* Progressive hint system
* Reflection workflow
* Automatic progress persistence
* World completion sequence
* Unlock progression for World 4

---

# Next Module

After completing World 3, development proceeds to:

> `specs/world-4-little-scientist/requirements.md`

World 4 serves as the capstone inquiry experience, allowing learners to integrate observation, classification, and prediction skills into a guided scientific investigation.

---

# References

* `requirements.md`
* `design.md`
* `steering/pedagogy.md`
* `steering/learning-framework.md`
* `steering/ui-guidelines.md`
