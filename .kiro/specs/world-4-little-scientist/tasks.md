# World 4 Implementation Tasks — Little Scientist

**Document Type:** Implementation Task List
**Version:** 1.0
**Status:** Ready for Development

---

# Purpose

This document defines the implementation tasks for **World 4: Little Scientist**.

World 4 is the capstone module of INQUIS, integrating observation, classification, prediction, and conclusion into a single guided scientific investigation. The implementation should maximize reuse of components developed in previous worlds.

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

## Task W4-001

Create World 4 route.

### Checklist

* Create `/play/world-4`
* Register world metadata
* Connect World Map progression
* Verify unlock requirements

**Priority:** Critical

---

## Task W4-002

Implement World Introduction screen.

### Components

* World illustration
* Narration
* Investigation overview
* Begin Investigation button
* Skip button

### Acceptance Criteria

Learners can enter World 4 after completing World 3.

---

# Milestone 2 — Investigation Setup

## Task W4-003

Develop Investigation Briefing.

### Features

* Display investigation objective
* Introduce companion guidance
* Present available tools
* Initialize investigation state

The briefing should clearly communicate the investigation goal without revealing outcomes.

---

## Task W4-004

Implement Investigation Progress Tracker.

Display:

* Current investigation stage
* Completed stages
* Remaining stages

Progress should persist throughout the investigation.

---

# Milestone 3 — Observation Phase

## Task W4-005

Develop Observation Scene.

### Features

* Interactive environment
* Object inspection
* Animation replay
* Optional zoom

Observation must occur before evidence collection.

---

## Task W4-006

Implement Evidence Collection.

Learners should collect observable evidence through interaction.

Supported evidence:

* Objects
* Images
* Environmental clues
* Animated events

Collected evidence should populate the Evidence Panel automatically.

---

# Milestone 4 — Classification Phase

## Task W4-007

Implement Classification Board.

Reuse components from World 2.

Requirements:

* Drag-and-drop grouping
* Category validation
* Visual feedback
* Retry support

---

## Task W4-008

Validate Classification Results.

The system should:

* Verify grouping accuracy
* Provide supportive feedback
* Allow corrections before continuing

Classification should reinforce reasoning rather than correctness alone.

---

# Milestone 5 — Prediction Phase

## Task W4-009

Develop Prediction Panel.

Support:

* Image selection
* Multiple-choice predictions
* Confirmation dialog

Prediction submission should lock the current selection.

---

## Task W4-010

Implement Outcome Reveal.

Display:

* Investigation animation
* Actual outcome
* Prediction comparison
* Scientific explanation

Outcome explanations should reference collected evidence whenever possible.

---

# Milestone 6 — Conclusion Phase

## Task W4-011

Develop Guided Conclusion component.

Support:

* Multiple-choice prompts
* Guided sentence completion
* Image-based reflection

The conclusion should summarize the learner's investigation journey.

---

## Task W4-012

Persist investigation results.

Store:

* collected evidence
* classification results
* prediction
* outcome
* conclusion completion
* timestamps

All data should integrate with the shared ProgressService.

---

# Milestone 7 — Inquiry Support

## Task W4-013

Implement Progressive Hint System.

Requirements:

* Stage-specific hints
* Progressive disclosure
* Optional usage

Hints should encourage investigation rather than revealing answers.

---

## Task W4-014

Implement Companion Character behaviors.

Responsibilities:

* Introduce investigation stages
* Provide inquiry guidance
* Encourage persistence
* Celebrate discoveries
* Summarize investigation findings

The companion should remain present throughout the investigation.

---

# Milestone 8 — Progress Management

## Task W4-015

Implement automatic progress persistence.

Persist:

* completed stages
* collected evidence
* classification progress
* prediction state
* conclusion completion

Progress should save after every completed investigation stage.

---

## Task W4-016

Implement resume functionality.

Requirements:

* Restore investigation stage
* Restore collected evidence
* Restore classification state
* Restore prediction state (if applicable)

Learners should continue exactly where they left off.

---

# Milestone 9 — World Completion

## Task W4-017

Implement completion workflow.

Display:

* completion illustration
* celebration animation
* inquiry journey summary
* replay investigation
* return to dashboard

Future versions may include a printable completion certificate.

---

## Task W4-018

Mark Core Journey Completion.

Requirements:

* Validate all investigation stages
* Validate guided conclusion
* Update learner progression
* Unlock completion status on the dashboard

Completion should indicate successful completion of the core INQUIS learning experience.

---

# Milestone 10 — Accessibility & Audio

## Task W4-019

Implement narration controls.

Support:

* Play
* Pause
* Replay
* Volume adjustment

Narration should synchronize with investigation stages.

---

## Task W4-020

Implement accessibility improvements.

Include:

* High-contrast mode
* Large touch targets
* Keyboard navigation (desktop)
* Consistent focus indicators
* Screen-reader friendly controls (future enhancement)

---

# Milestone 11 — Performance Optimization

## Task W4-021

Optimize investigation rendering.

Strategies:

* Lazy-load illustrations
* Cache reusable assets
* Optimize animation playback
* Reduce unnecessary re-renders

---

## Task W4-022

Preload future assets.

Preload:

* Investigation animations
* Narration audio
* Illustrations
* Completion assets

Preloading should remain non-blocking.

---

# Milestone 12 — Testing

## Task W4-023

Create component tests.

Components:

* InvestigationCanvas
* EvidencePanel
* ClassificationBoard
* PredictionPanel
* OutcomeReveal
* ConclusionCard

---

## Task W4-024

Create integration tests.

Verify:

* World entry
* Evidence collection
* Classification workflow
* Prediction submission
* Outcome reveal
* Guided conclusion
* Resume functionality
* World completion

---

## Task W4-025

Validate performance.

Performance targets:

* World load < 3 seconds
* Interaction response < 150 ms
* Investigation transition < 500 ms
* Progress save < 300 ms

Verify compliance with the requirements specification.

---

# Completion Criteria

World 4 is complete when:

* Learners can enter after completing World 3.
* Observation precedes evidence collection.
* Classification reuses established interaction patterns.
* Prediction is required before outcome reveal.
* Guided conclusions are completed.
* Progress persists automatically.
* Resume functionality restores investigation state.
* World completion marks the end of the core learner journey.
* All component and integration tests pass.

---

# Deliverables

The completed World 4 module shall provide:

* Guided scientific investigation
* Evidence collection workflow
* Classification and prediction integration
* Outcome reveal system
* Guided conclusion workflow
* Companion-guided inquiry
* Progressive hint system
* Automatic progress persistence
* Core journey completion experience

---

# Final Module

World 4 completes the primary implementation of INQUIS.

The remaining project documentation is:

> `specs/deployment/deployment.md`

This document defines deployment architecture, infrastructure, environments, CI/CD, monitoring, security, and operational requirements for production deployment.

---

# References

* `requirements.md`
* `design.md`
* `steering/pedagogy.md`
* `steering/learning-framework.md`
* `steering/ui-guidelines.md`
