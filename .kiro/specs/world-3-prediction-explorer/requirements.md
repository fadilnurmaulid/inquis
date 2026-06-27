# World 3 Requirements — Prediction Explorer

**Document Type:** Feature Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This specification defines the third learning world of INQUIS.

World 3 develops learners' ability to **make predictions based on observations, patterns, and prior experiences**. Building upon observation (World 1) and classification (World 2), learners begin forming simple hypotheses before observing outcomes.

Learning progression follows:

* `steering/learning-framework.md`
* `steering/pedagogy.md`

---

# Scope

Included:

* Prediction activities
* Cause-and-effect exploration
* Hypothesis formation
* Guided inquiry
* Reflection
* World completion

Excluded:

* Open scientific experiments
* Teacher analytics
* AI-generated activities

---

# Learning Objectives

After completing this world, learners should be able to:

* make simple predictions
* identify possible outcomes
* explain prediction reasoning
* compare predictions with actual results
* revise predictions after new observations

This world emphasizes **Prediction** within the Scientific Thinking progression.

---

# Inquiry Focus

Primary inquiry skill:

> Predict

Supporting skills:

* Observe
* Compare
* Infer
* Explain

Learners should understand that predictions are **evidence-based guesses**, not random choices.

---

# World Narrative

The companion invites learners to investigate situations where something is about to happen.

Before revealing the outcome, learners are encouraged to observe clues, think carefully, and predict what will happen next.

Narrative elements should reinforce curiosity without revealing answers.

---

# Functional Requirements

## FR-W3-001 World Entry

Learners shall access World 3 after completing World 2.

The introduction shall include:

* world illustration
* narration
* learning objective
* begin button

The introduction becomes skippable after the first completion.

---

## FR-W3-002 Exploration

Learners shall freely inspect scenes before making predictions.

Supported interactions:

* tap
* inspect
* zoom (optional)
* replay animation

Exploration shall not evaluate learner responses.

---

## FR-W3-003 Prediction Activities

The world shall include multiple prediction challenges.

Example activities:

* What happens next?
* Which object will move?
* Which plant will grow?
* Which path reaches the destination?
* Weather prediction from visual clues

Activities should remain modular and reusable.

---

## FR-W3-004 Prediction Submission

Learners shall submit one prediction before the outcome is revealed.

Predictions may be selected through:

* image choice
* object selection
* multiple choice

---

## FR-W3-005 Outcome Reveal

After prediction submission:

* reveal the actual outcome
* compare prediction with result
* provide scientific explanation

Incorrect predictions should be treated as learning opportunities.

---

## FR-W3-006 Inquiry Guidance

Hints shall follow the progressive strategy defined in `steering/pedagogy.md`.

Hints should encourage learners to inspect available evidence rather than identify the correct prediction.

---

## FR-W3-007 Reflection

Each activity shall conclude with a reflection prompt.

Example prompts:

* Why did you choose that prediction?
* Which clue helped you?
* Would you predict differently now?

Reflection should emphasize reasoning over correctness.

---

## FR-W3-008 World Completion

World completion requires:

* completion of all mandatory activities
* completion of required reflections

Successful completion unlocks World 4.

---

# Activity Progression

Recommended activity sequence:

| Stage | Focus                      |
| ----- | -------------------------- |
| 1     | Simple prediction          |
| 2     | Cause-and-effect           |
| 3     | Pattern-based prediction   |
| 4     | Multiple evidence clues    |
| 5     | Mixed prediction challenge |
| 6     | Reflection                 |

Difficulty should increase through richer evidence rather than more complicated controls.

---

# User Flow

```text
World Map

↓

World Introduction

↓

Scene Exploration

↓

Prediction

↓

Outcome Reveal

↓

Feedback

↓

Reflection

↓

Next Activity

↓

World Complete
```

---

# Assessment Requirements

Assessment should emphasize:

* evidence-based reasoning
* prediction completion
* reflection quality
* persistence

Assessment shall not depend on speed.

---

# Success Metrics

The system should record:

* completed activities
* prediction accuracy
* hint usage
* retry count
* reflection completion
* completion time

These metrics support teacher insights without introducing competitive scoring.

---

# Shared Components

Recommended reusable components:

| Component          | Purpose            |
| ------------------ | ------------------ |
| PredictionCanvas   | Interactive scene  |
| PredictionCard     | Prediction choices |
| OutcomeReveal      | Reveal animation   |
| CompanionCharacter | Inquiry guidance   |
| HintPanel          | Progressive hints  |
| ReflectionCard     | Reflection prompts |
| CompletionDialog   | World completion   |

Components should reuse interaction patterns introduced in previous worlds where appropriate.

---

# Data Requirements

Each activity session should store:

* learner identifier
* activity identifier
* selected prediction
* actual outcome
* prediction correctness
* hint usage
* reflection completion
* timestamps

Data shall integrate with the shared ProgressService.

---

# Non-Functional Requirements

| Requirement          | Target      |
| -------------------- | ----------- |
| World Load           | < 3 seconds |
| Interaction Response | < 150 ms    |
| Outcome Reveal       | < 500 ms    |
| Progress Save        | < 300 ms    |

---

# Business Rules

## BR-W3-001

Learners may replay completed prediction activities.

---

## BR-W3-002

Predictions must be submitted before outcomes are revealed.

---

## BR-W3-003

Incorrect predictions shall never reduce learner progress.

---

## BR-W3-004

Progress shall automatically save after every completed activity.

---

## BR-W3-005

World 4 remains locked until World 3 is completed.

---

# Acceptance Criteria

World 3 is complete when:

* Learners access the world after completing World 2.
* Exploration precedes prediction.
* Prediction activities function correctly.
* Outcomes are revealed only after prediction submission.
* Reflection follows every activity.
* Progress is automatically persisted.
* Completing the world unlocks World 4.
* Replay functionality is available.

---

# Future Expansion

Future enhancements may include:

* branching prediction scenarios
* adaptive evidence difficulty
* animated environmental simulations
* collaborative prediction activities
* AI-generated inquiry scenarios

These enhancements should preserve the existing inquiry structure.

---

# References

* `steering/learning-framework.md`
* `steering/pedagogy.md`
* `steering/ui-guidelines.md`
* `specs/world-3-prediction-explorer/design.md`
* `specs/world-3-prediction-explorer/tasks.md`
