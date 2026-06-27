# AI Policy

**Document Type:** Steering Document
**Version:** 1.0
**Status:** Canonical

---

# Purpose

This document defines the governance, limitations, and implementation principles for Artificial Intelligence within INQUIS.

AI is intended to **support inquiry-based learning**, not replace teachers or make educational decisions independently.

This policy complements:

* `steering/product-vision.md`
* `steering/learning-framework.md`
* `steering/pedagogy.md`
* `steering/lidm-2026.md`

---

# Scope

This policy applies to:

* AI-powered features
* Future adaptive learning systems
* Learning analytics
* Recommendation engines
* Content generation
* AI-assisted feedback

It does **not** apply to deterministic game logic or rule-based activities.

---

# Guiding Principles

## Education Before Automation

AI should improve learning experiences.

Educational objectives always take precedence over automation.

---

## Human-Centered Learning

Teachers remain responsible for educational decisions.

AI should assist, never replace, teacher judgment.

---

## Transparency

Users should understand when AI-generated recommendations or feedback are being used.

AI decisions should be explainable at an appropriate level for teachers and parents.

---

## Privacy by Design

AI systems must operate using the minimum amount of learner data necessary.

Personal information should never be collected solely to improve AI models.

---

## Safety

AI should never expose learners to:

* unsafe content
* biased recommendations
* inappropriate language
* unpredictable interactions

All AI-generated outputs should remain age-appropriate.

---

# AI Usage Policy

## Current Competition Version

The LIDM 2026 submission focuses on deterministic inquiry learning.

AI features are limited to lightweight educational assistance.

Core learning activities must remain fully functional without AI.

---

## Future Production Version

Future releases may introduce:

* adaptive difficulty
* personalized recommendations
* misconception detection
* intelligent teacher insights
* automated learning summaries

These capabilities must comply with this policy.

---

# Approved AI Use Cases

The following use cases are permitted.

| Feature                              | Status   |
| ------------------------------------ | -------- |
| Personalized activity recommendation | Approved |
| Difficulty adjustment                | Approved |
| Learning analytics                   | Approved |
| Teacher insight generation           | Approved |
| Progress summaries                   | Approved |
| Reflection summarization             | Approved |
| Curriculum alignment support         | Approved |

---

# Restricted AI Use Cases

The following require explicit review before implementation.

| Feature                             | Status          |
| ----------------------------------- | --------------- |
| Automatic grading of open responses | Review Required |
| Generated instructional content     | Review Required |
| AI-generated educational questions  | Review Required |
| Predictive learner profiling        | Review Required |

---

# Prohibited AI Use Cases

The following are not permitted.

* Replacing teacher decision-making
* Psychological profiling of children
* Emotion manipulation
* Biometric identification
* Surveillance-based monitoring
* Advertising personalization
* Commercial recommendation systems
* Autonomous educational decision making

---

# Personalization Policy

AI personalization should be based only on educational interactions.

Examples include:

* completed activities
* learning pace
* previous attempts
* demonstrated competencies

The system should not infer personal characteristics unrelated to learning.

---

# Data Usage

AI services should only access data required for educational purposes.

Examples:

* activity completion
* assessment results
* interaction history
* learning progress

AI should never require unnecessary personal information.

---

# Explainability

Teacher-facing AI recommendations should include:

* recommendation
* supporting evidence
* confidence level (optional)

Recommendations should never appear as unexplained conclusions.

---

# AI Feedback Principles

When AI-generated feedback is used, it should:

* encourage exploration
* reinforce inquiry
* avoid revealing answers immediately
* promote reflection

Feedback should remain consistent with the pedagogical principles defined in `steering/pedagogy.md`.

---

# Bias Mitigation

AI systems should avoid generating recommendations based on:

* gender
* ethnicity
* religion
* socioeconomic background
* geographic location

Educational recommendations should depend only on learning evidence.

---

# Privacy Requirements

AI features should comply with the following principles:

* minimum data collection
* secure storage
* encrypted communication
* authenticated access
* role-based permissions

Training data should never expose identifiable learner information.

---

# Human Oversight

Teachers should always retain the ability to:

* ignore recommendations
* override suggestions
* assign activities manually
* interpret learner progress independently

AI should function as a decision-support tool.

---

# Model Selection Principles

Preferred characteristics:

* reliable
* explainable
* predictable
* cost-efficient
* maintainable

Model complexity should be proportional to educational value.

---

# Reliability

If an AI service becomes unavailable:

* learning activities should continue normally
* deterministic features should remain operational
* users should not lose progress

AI should enhance the platform, not become a dependency for core functionality.

---

# Security

Any external AI service should:

* use secure HTTPS connections
* authenticate requests
* avoid storing unnecessary conversation history
* comply with applicable privacy regulations

API keys must remain server-side.

---

# Evaluation Criteria

Future AI features should be evaluated using the following criteria.

| Criterion             | Requirement                          |
| --------------------- | ------------------------------------ |
| Educational Benefit   | Demonstrable improvement to learning |
| Pedagogical Alignment | Consistent with inquiry learning     |
| Transparency          | Explainable to teachers              |
| Privacy               | Minimal data collection              |
| Reliability           | Graceful degradation without AI      |
| Safety                | Age-appropriate outputs              |

---

# Future AI Roadmap

Potential future capabilities include:

* adaptive inquiry pathways
* personalized scaffolding
* misconception detection
* intelligent teacher dashboards
* automated narrative reports
* multilingual educational assistance

Implementation should occur incrementally and remain compatible with the existing architecture.

---

# References

* `steering/product-vision.md`
* `steering/pedagogy.md`
* `steering/learning-framework.md`
* `steering/lidm-2026.md`
* `specs/foundation/architecture.md`
