# World 2 Implementation Tasks — Sorting Explorer

**Document Type:** Implementation Task List
**Version:** 1.0
**Status:** Ready for Development

---

# Purpose

This document defines the implementation tasks for **World 2: Sorting Explorer**.

World 2 expands the inquiry experience established in World 1 by introducing object classification through interactive sorting activities.

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

## Task W2-001

Create World 2 route.

### Checklist

* Create `/play/world-2`
* Register world metadata
* Connect World Map progression
* Verify unlock requirements

**Priority:** Critical

---

## Task W2-002

Implement World Introduction screen.

### Components

* World illustration
* Narration
* Learning objective
* Begin button
* Skip button

### Acceptance Criteria

Learners can enter World 2 after completing World 1.

---

# Milestone 2 — Exploration

## Task W2-003

Create Exploration Scene.

### Features

* Inspect all objects
* Drag interactions
* Tap interactions
* Optional object rotation

Exploration should occur without scoring.

---

## Task W2-004

Implement Companion Character behaviors.

Responsibilities:

* Introduce sorting activities
* Encourage observation
* Deliver hints
* Reinforce inquiry thinking

The companion should remain visible throughout the learning session.

---

# Milestone 3 — Sorting Activities

## Task W2-005

Develop Color Sorting activity.

Requirements:

* Draggable objects
* Color-based containers
* Automatic validation
* Retry support

---

## Task W2-006

Develop Shape Sorting activity.

Support:

* Multiple shapes
* Correct placement detection
* Animated feedback

---

## Task W2-007

Develop Size Comparison activity.

Learners classify objects based on relative size.

Sorting logic should remain configurable.

---

## Task W2-008

Develop Mixed Classification activity.

Combine multiple observable attributes within one activity.

The activity should reinforce reasoning without excessive complexity.

---

# Milestone 4 — Drag-and-Drop System

## Task W2-009

Implement reusable drag-and-drop engine.

Features:

* Smooth dragging
* Drop validation
* Return animation
* Mobile touch support

The engine should be reusable by future learning worlds.

---

## Task W2-010

Develop Category Container component.

Each container should provide:

* Drop zone
* Visual highlight
* Placement animation
* Completion indicator

---

# Milestone 5 — Inquiry Support

## Task W2-011

Implement Progressive Hint System.

Requirements:

* Sequential hints
* Optional usage
* Reset after each activity

Hints should direct learners toward observable attributes rather than correct answers.

---

## Task W2-012

Implement Feedback System.

Correct responses:

* Celebration animation
* Positive narration
* Inquiry reinforcement

Incorrect responses:

* Encouragement
* Retry guidance
* Object reset animation

---

# Milestone 6 — Reflection

## Task W2-013

Develop Reflection component.

Support:

* Multiple-choice prompts
* Image selection
* Narrated questions

Reflection should follow every completed activity.

---

## Task W2-014

Persist reflection data.

Store:

* completion status
* timestamp
* activity reference

Reflection history should integrate with learner progress.

---

# Milestone 7 — Progress Management

## Task W2-015

Implement automatic progress persistence.

Save:

* completed activities
* attempts
* hint usage
* reflection completion
* world progress

Progress should save after every successful activity.

---

## Task W2-016

Implement resume functionality.

Requirements:

* Restore incomplete activity
* Restore sorting state
* Restore learner progress

---

# Milestone 8 — World Completion

## Task W2-017

Implement completion sequence.

Display:

* celebration illustration
* classification summary
* World 3 preview
* replay button
* dashboard button

---

## Task W2-018

Unlock World 3.

Requirements:

* Validate required activities
* Validate required reflections
* Update ProgressService

Unlock logic should remain centralized.

---

# Milestone 9 — Accessibility & Audio

## Task W2-019

Implement narration controls.

Support:

* Play
* Pause
* Replay
* Volume adjustment

Narration should remain synchronized with instructions.

---

## Task W2-020

Implement accessibility improvements.

Include:

* High-contrast compatibility
* Large touch targets
* Keyboard navigation (desktop)
* Predictable drag interactions

---

# Milestone 10 — Performance Optimization

## Task W2-021

Optimize sorting interactions.

Strategies:

* Minimize re-renders
* Cache object assets
* Optimize drag calculations
* Lazy-load illustrations

---

## Task W2-022

Preload future assets.

Preload:

* Next activity
* Narration audio
* Illustrations

Preloading should not delay interaction readiness.

---

# Milestone 11 — Testing

## Task W2-023

Create component tests.

Components:

* SortingCanvas
* SortableObject
* CategoryContainer
* HintPanel
* ReflectionCard

---

## Task W2-024

Create integration tests.

Verify:

* World entry
* Sorting interactions
* Validation logic
* Hint progression
* Reflection workflow
* Resume functionality
* World completion

---

## Task W2-025

Validate performance.

Performance targets:

* World load < 3 seconds
* Drag response < 100 ms
* Activity transition < 500 ms
* Progress save < 300 ms

Verify compliance with the requirements specification.

---

# Completion Criteria

World 2 is complete when:

* Learners can enter after completing World 1.
* Exploration precedes assessment.
* All sorting activities function correctly.
* Drag-and-drop interactions are responsive.
* Progressive hints operate correctly.
* Reflection follows every activity.
* Progress persists automatically.
* Resume restores learner state.
* Completing the world unlocks World 3.
* All component and integration tests pass.

---

# Deliverables

The completed World 2 module shall provide:

* Interactive sorting environment
* Reusable drag-and-drop engine
* Classification activities
* Companion-guided inquiry
* Progressive hint system
* Reflection workflow
* Automatic progress persistence
* World completion sequence
* Unlock progression for World 3

---

# Next Module

After completing World 2, development proceeds to:

> `specs/world-3-prediction-explorer/requirements.md`

World 3 introduces prediction and hypothesis formation, expanding learners' scientific thinking from observation and classification toward anticipating outcomes based on evidence.

---

# References

* `requirements.md`
* `design.md`
* `steering/pedagogy.md`
* `steering/learning-framework.md`
* `steering/ui-guidelines.md`
