# World 4 Requirements — Little Scientist

**Document Type:** Feature Specification
**Version:** 1.0
**Status:** Ready for Implementation

---

# Purpose

This specification defines the fourth and final learning world of INQUIS.

World 4 serves as the capstone experience where learners integrate the inquiry skills developed throughout previous worlds into a guided scientific investigation.

Rather than introducing a completely new skill, this world combines:

* Observation (World 1)
* Classification (World 2)
* Prediction (World 3)

to complete a simplified scientific inquiry cycle.

Learning progression follows:

* `steering/learning-framework.md`
* `steering/pedagogy.md`

---

# Scope

Included:

* Guided investigation
* Multi-stage inquiry activities
* Evidence collection
* Prediction validation
* Reflection
* Final world completion

Excluded:

* Open-ended laboratory simulations
* AI-generated investigations
* Multiplayer collaboration
* Teacher analytics

---

# Learning Objectives

After completing this world, learners should be able to:

* observe scientific phenomena
* classify collected evidence
* make evidence-based predictions
* compare predictions with outcomes
* communicate simple conclusions
* complete an inquiry cycle

World 4 emphasizes **Integrated Scientific Thinking**.

---

# Inquiry Focus

Primary inquiry skill:

> Conduct a Guided Inquiry

Supporting skills:

* Observe
* Compare
* Classify
* Predict
* Explain
* Conclude

Learners should experience a complete scientific investigation in an age-appropriate manner.

---

# World Narrative

The companion invites learners to become "Little Scientists."

A scientific mystery must be solved by collecting clues, organizing observations, making predictions, testing ideas, and drawing a conclusion.

The narrative should reinforce curiosity, exploration, and confidence rather than competition.

---

# Functional Requirements

## FR-W4-001 World Entry

Learners shall access World 4 after completing World 3.

The introduction shall include:

* world illustration
* narration
* investigation objective
* begin button

The introduction becomes skippable after first completion.

---

## FR-W4-002 Investigation Overview

The learner shall receive a simple investigation scenario.

Example themes include:

* Plant growth
* Floating and sinking
* Animal habitats
* Weather changes
* Light and shadow

Each investigation should be self-contained.

---

## FR-W4-003 Observation Phase

Learners shall inspect the investigation environment.

Supported interactions include:

* tapping
* inspecting
* dragging
* replaying animations

No assessment occurs during initial exploration.

---

## FR-W4-004 Evidence Collection

Learners shall collect relevant observations.

Collected evidence may include:

* pictures
* objects
* visual clues
* environmental changes

Evidence collection should remain interactive.

---

## FR-W4-005 Classification Phase

Collected evidence shall be organized into meaningful groups before prediction.

Classification mechanics should reuse components introduced in World 2.

---

## FR-W4-006 Prediction Phase

Learners shall predict the investigation outcome using collected evidence.

Prediction must occur before the experiment outcome is revealed.

---

## FR-W4-007 Outcome Observation

The system shall reveal the investigation result.

Learners compare:

* prediction
* observed outcome

The companion should explain the reasoning behind the outcome.

---

## FR-W4-008 Conclusion Phase

Learners shall complete a guided conclusion.

Example prompts:

* What did you discover?
* Was your prediction correct?
* Which clues helped you?
* What happened during the investigation?

Conclusions should reinforce scientific reasoning rather than writing ability.

---

## FR-W4-009 Guided Inquiry Support

Hints shall follow the progressive strategy defined in `steering/pedagogy.md`.

Hints should encourage investigation rather than reveal conclusions.

---

## FR-W4-010 World Completion

World completion requires:

* completion of every investigation stage
* completion of required reflections
* completion of the guided conclusion

Completion marks the end of the primary learner journey.

---

# Investigation Flow

Recommended sequence:

| Stage            | Inquiry Skill |
| ---------------- | ------------- |
| Observe          | Observation   |
| Collect Evidence | Exploration   |
| Classify         | Organization  |
| Predict          | Reasoning     |
| Observe Outcome  | Verification  |
| Conclude         | Reflection    |

Each investigation should reinforce the complete inquiry cycle.

---

# User Flow

```text
World Map

↓

World Introduction

↓

Observation

↓

Evidence Collection

↓

Classification

↓

Prediction

↓

Outcome Observation

↓

Conclusion

↓

World Complete
```

---

# Assessment Requirements

Assessment should evaluate:

* completion of inquiry stages
* evidence collection
* prediction participation
* conclusion completion
* persistence

Assessment should not depend on speed or competitive scoring.

---

# Success Metrics

The system should record:

* completed investigation stages
* evidence collected
* prediction submission
* prediction accuracy
* hint usage
* conclusion completion
* completion time

Metrics support teacher insights and learner progress tracking.

---

# Shared Components

Recommended reusable components:

| Component           | Purpose                   |
| ------------------- | ------------------------- |
| InvestigationCanvas | Investigation environment |
| EvidencePanel       | Collected observations    |
| ClassificationBoard | Organize evidence         |
| PredictionPanel     | Submit prediction         |
| OutcomeReveal       | Investigation result      |
| ConclusionCard      | Guided conclusion         |
| CompanionCharacter  | Inquiry guidance          |
| CompletionDialog    | World completion          |

Whenever possible, components should extend implementations from Worlds 1–3.

---

# Data Requirements

Each investigation session should store:

* learner identifier
* investigation identifier
* collected evidence
* classification results
* prediction
* observed outcome
* conclusion completion
* hint usage
* timestamps

All investigation data shall integrate with the shared ProgressService.

---

# Non-Functional Requirements

| Requirement              | Target      |
| ------------------------ | ----------- |
| World Load               | < 3 seconds |
| Interaction Response     | < 150 ms    |
| Investigation Transition | < 500 ms    |
| Progress Save            | < 300 ms    |

---

# Business Rules

## BR-W4-001

Learners may replay completed investigations.

---

## BR-W4-002

Every inquiry stage must be completed sequentially.

---

## BR-W4-003

Predictions shall be submitted before outcome observation.

---

## BR-W4-004

Progress shall automatically save after each completed stage.

---

## BR-W4-005

Completion of World 4 marks completion of the core INQUIS learning journey.

Future expansion worlds may extend, but not replace, this progression.

---

# Acceptance Criteria

World 4 is complete when:

* Learners can access the world after completing World 3.
* Investigation stages execute sequentially.
* Evidence collection functions correctly.
* Classification reuses previous interaction models.
* Prediction precedes outcome observation.
* Guided conclusions are completed.
* Progress is automatically persisted.
* Replay functionality is available after completion.

---

# Future Expansion

Potential future enhancements include:

* multiple investigation scenarios
* adaptive inquiry difficulty
* seasonal science investigations
* collaborative classroom investigations
* AI-assisted inquiry reflection

These enhancements should preserve the established inquiry cycle.

---

# References

* `steering/learning-framework.md`
* `steering/pedagogy.md`
* `steering/ui-guidelines.md`
* `specs/world-4-little-scientist/design.md`
* `specs/world-4-little-scientist/tasks.md`
