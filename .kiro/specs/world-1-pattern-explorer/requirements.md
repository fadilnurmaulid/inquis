# World 1 Requirements — Pattern Explorer

**Document Type:** Feature Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This specification defines the first learning world of INQUIS.

World 1 introduces learners to the fundamental scientific skill of **observation through pattern recognition**. It serves as the entry point into the inquiry journey and establishes interaction patterns reused throughout later worlds.

Learning progression follows the principles defined in:

* `steering/learning-framework.md`
* `steering/pedagogy.md`

---

# Scope

Included:

* World introduction
* Pattern exploration
* Observation activities
* Guided inquiry
* Reflection
* World completion

Excluded:

* Classification activities
* Prediction activities
* Scientific experimentation
* Teacher analytics

---

# Learning Objectives

After completing this world, learners should be able to:

* observe carefully
* identify visual patterns
* compare similarities
* compare differences
* recognize repeated structures
* explain simple observations

This world emphasizes **Observation** within the Scientific Thinking progression.

---

# Inquiry Focus

Primary inquiry skill:

> Observe

Supporting skills:

* Compare
* Describe
* Identify

The system should encourage learners to explain *what they notice* before asking *why it happens*.

---

# World Narrative

The learner enters a new environment where many objects appear similar but follow hidden patterns.

The companion character encourages exploration rather than giving direct answers.

Narrative elements should remain lightweight and should never interrupt gameplay for extended periods.

---

# Functional Requirements

## FR-W1-001 World Entry

The learner shall enter World 1 from the World Map.

The introduction should include:

* world title
* illustration
* short narration
* learning objective

The introduction should be skippable after the first visit.

---

## FR-W1-002 Exploration Area

The learner shall freely interact with objects before receiving any assessment.

Interactions may include:

* tapping
* dragging
* selecting
* inspecting

Exploration should not be scored.

---

## FR-W1-003 Observation Activities

The world shall include multiple observation challenges.

Example activity types:

* Find the matching object
* Identify repeated colors
* Complete a visual sequence
* Spot the different object

Activity implementation should remain modular.

---

## FR-W1-004 Guided Inquiry

The companion character should provide progressively revealed hints.

Hints shall follow the strategy defined in `steering/pedagogy.md`.

Hints should never immediately reveal the correct answer.

---

## FR-W1-005 Feedback

Correct responses should provide:

* visual confirmation
* positive narration
* brief scientific reinforcement

Incorrect responses should encourage another observation attempt rather than indicate failure.

---

## FR-W1-006 Reflection

After completing each activity, learners should answer a short reflective prompt.

Examples include:

* What pattern did you notice?
* Which objects looked alike?
* How did you decide?

Reflection responses are intended to reinforce observation rather than assess writing ability.

---

## FR-W1-007 World Completion

World completion requires:

* completion of all mandatory activities
* completion of required reflection prompts

Completion shall unlock World 2.

---

# Activity Progression

Recommended activity order:

| Stage | Focus                       |
| ----- | --------------------------- |
| 1     | Simple visual observation   |
| 2     | Matching patterns           |
| 3     | Comparing differences       |
| 4     | Completing sequences        |
| 5     | Mixed observation challenge |
| 6     | Reflection                  |

Difficulty should increase gradually.

---

# User Flow

```text
World Map

↓

World Introduction

↓

Free Exploration

↓

Observation Activity

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

* observation accuracy
* completion
* persistence

Assessment should not rely on:

* completion speed
* memorization
* competitive scoring

---

# Success Metrics

The world should record:

* activities completed
* hint usage
* retry count
* reflection completion
* completion time

These metrics support teacher insights and future learning analytics.

---

# Shared Components

Recommended reusable components:

| Component          | Purpose                   |
| ------------------ | ------------------------- |
| WorldIntroduction  | Entry experience          |
| ActivityCanvas     | Interactive learning area |
| CompanionCharacter | Inquiry guidance          |
| HintPanel          | Progressive hints         |
| FeedbackDialog     | Response feedback         |
| ReflectionCard     | Reflection prompts        |
| CompletionDialog   | World completion          |

---

# Data Requirements

Each activity session should store:

* learner identifier
* activity identifier
* attempt count
* completion status
* hints used
* reflection completion
* timestamps

Responses should be linked to the learner's progress history.

---

# Non-Functional Requirements

| Requirement          | Target      |
| -------------------- | ----------- |
| World Load           | < 3 seconds |
| Activity Transition  | < 500 ms    |
| Interaction Response | < 150 ms    |
| Save Progress        | < 300 ms    |

---

# Business Rules

## BR-W1-001

Learners may replay any completed activity.

---

## BR-W1-002

Reflection prompts are required for world completion.

---

## BR-W1-003

Hints do not reduce completion status or learner progress.

---

## BR-W1-004

Progress shall be saved automatically after each completed activity.

---

## BR-W1-005

Learners may leave the world at any time.

Upon returning, the latest incomplete activity shall resume automatically.

---

# Acceptance Criteria

World 1 is complete when:

* Learners can enter the world from the dashboard.
* Activities support free exploration before assessment.
* Pattern-recognition challenges function correctly.
* Progressive hints operate as specified.
* Reflection prompts appear after activities.
* Progress is automatically saved.
* Completing the world unlocks World 2.
* Replay functionality is available for completed activities.

---

# Future Expansion

Possible future enhancements include:

* procedurally generated pattern activities
* adaptive observation difficulty
* additional pattern categories
* narrated accessibility mode
* seasonal activity packs

These enhancements should integrate without modifying the existing inquiry flow.

---

# References

* `steering/learning-framework.md`
* `steering/pedagogy.md`
* `steering/ui-guidelines.md`
* `specs/world-1-pattern-explorer/design.md`
* `specs/world-1-pattern-explorer/tasks.md`
