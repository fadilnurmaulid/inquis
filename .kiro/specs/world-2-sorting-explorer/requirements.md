# World 2 Requirements — Sorting Explorer

**Document Type:** Feature Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This specification defines the second learning world of INQUIS.

World 2 develops learners' ability to **classify and organize objects based on observable characteristics**. Building upon the observation skills acquired in World 1, learners begin identifying relationships between objects by grouping them according to shared attributes.

Learning progression follows the framework defined in:

* `steering/learning-framework.md`
* `steering/pedagogy.md`

---

# Scope

Included:

* Object classification
* Sorting activities
* Attribute comparison
* Guided inquiry
* Reflection
* World completion

Excluded:

* Prediction activities
* Experimental investigations
* Scientific simulations
* Teacher analytics

---

# Learning Objectives

After completing this world, learners should be able to:

* classify objects
* compare attributes
* identify similarities
* identify differences
* organize objects into groups
* explain classification choices

This world emphasizes **Classification** within the Scientific Thinking progression.

---

# Inquiry Focus

Primary inquiry skill:

> Classify

Supporting skills:

* Observe
* Compare
* Organize
* Explain

Learners should focus on identifying **why objects belong together** rather than simply placing them correctly.

---

# World Narrative

The companion discovers a collection of mixed objects that need to be organized before a scientific investigation can continue.

Learners help organize the objects by discovering meaningful grouping rules through observation and experimentation.

Narrative elements should remain concise and support the inquiry experience.

---

# Functional Requirements

## FR-W2-001 World Entry

Learners shall access World 2 after completing World 1.

The introduction shall include:

* world illustration
* narration
* learning objective
* begin button

The introduction becomes skippable after the first completion.

---

## FR-W2-002 Exploration

Learners shall freely inspect all available objects before classification begins.

Supported interactions:

* tap
* drag
* inspect
* rotate (optional)

No scoring shall occur during exploration.

---

## FR-W2-003 Sorting Activities

The world shall provide multiple sorting challenges.

Example activity types:

* Sort by color
* Sort by shape
* Sort by size
* Sort by texture (illustrated)
* Multiple-attribute sorting

Activity implementations should remain modular.

---

## FR-W2-004 Dynamic Classification

Activities may define different sorting rules.

The current rule shall always be communicated through:

* narration
* visual cues
* companion guidance

---

## FR-W2-005 Validation

Classification shall be validated after learner interaction.

Correct groups should receive:

* visual confirmation
* narration
* scientific reinforcement

Incorrect groupings should encourage further observation.

---

## FR-W2-006 Inquiry Guidance

Hints shall follow the progressive strategy defined in `steering/pedagogy.md`.

Hints should direct attention toward relevant object characteristics rather than identifying correct placements.

---

## FR-W2-007 Reflection

Each activity shall conclude with a reflection prompt.

Example prompts include:

* Why did these objects belong together?
* What characteristic did you use?
* Could they be grouped another way?

Reflection should reinforce reasoning rather than memorization.

---

## FR-W2-008 World Completion

World completion requires:

* completion of all mandatory activities
* completion of required reflections

Successful completion unlocks World 3.

---

# Activity Progression

Recommended activity sequence:

| Stage | Focus                    |
| ----- | ------------------------ |
| 1     | Single-attribute sorting |
| 2     | Color grouping           |
| 3     | Shape grouping           |
| 4     | Size comparison          |
| 5     | Mixed classification     |
| 6     | Reflection               |

Difficulty should increase through additional attributes rather than increased speed.

---

# User Flow

```text
World Map

↓

World Introduction

↓

Free Exploration

↓

Sorting Activity

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

Assessment should evaluate:

* classification accuracy
* reasoning consistency
* reflection completion
* persistence

Assessment should not reward completion speed.

---

# Success Metrics

The system should record:

* completed activities
* classification accuracy
* hint usage
* retry count
* reflection completion
* completion time

These metrics support progress monitoring and future learning analytics.

---

# Shared Components

Recommended reusable components:

| Component          | Purpose                   |
| ------------------ | ------------------------- |
| SortingCanvas      | Interactive sorting area  |
| CategoryContainer  | Sorting destination       |
| SortableObject     | Draggable learning object |
| CompanionCharacter | Inquiry guidance          |
| HintPanel          | Progressive hints         |
| ReflectionCard     | Reflection prompts        |
| CompletionDialog   | World completion          |

Whenever practical, components should extend those introduced in World 1.

---

# Data Requirements

Each activity session should store:

* learner identifier
* activity identifier
* sorting rule
* attempts
* hint usage
* completion status
* reflection completion
* timestamps

Activity data should integrate with the shared ProgressService.

---

# Non-Functional Requirements

| Requirement         | Target      |
| ------------------- | ----------- |
| World Load          | < 3 seconds |
| Drag Response       | < 100 ms    |
| Activity Transition | < 500 ms    |
| Progress Save       | < 300 ms    |

---

# Business Rules

## BR-W2-001

Completed activities remain replayable.

---

## BR-W2-002

Sorting rules shall remain deterministic.

Randomization may change object positions but not learning objectives.

---

## BR-W2-003

Hints shall never reduce learner progress.

---

## BR-W2-004

Progress shall automatically save after each completed activity.

---

## BR-W2-005

World 3 remains locked until World 2 is completed.

---

# Acceptance Criteria

World 2 is complete when:

* Learners can access the world after completing World 1.
* Exploration precedes classification.
* Sorting activities function correctly.
* Progressive hints operate as specified.
* Reflection follows every activity.
* Progress is automatically persisted.
* Completing the world unlocks World 3.
* Completed activities remain replayable.

---

# Future Expansion

Possible future enhancements include:

* multi-stage classification
* adaptive sorting difficulty
* additional object collections
* collaborative classroom activities
* AI-assisted misconception detection

These additions should extend the world without changing the established inquiry workflow.

---

# References

* `steering/learning-framework.md`
* `steering/pedagogy.md`
* `steering/ui-guidelines.md`
* `specs/world-2-sorting-explorer/design.md`
* `specs/world-2-sorting-explorer/tasks.md`
