# INQUIS — Learning Framework

**Document Type:** Steering Document  
**Version:** 1.0  
**Status:** Canonical  
**Audience:** Engineers, Designers, Educators, Learning Experience Designers, Kiro IDE

---

## 1. Purpose

This document defines the complete learning framework that underpins every educational decision in INQUIS. It establishes the theoretical foundations, the learning progression model, the skill taxonomy, the content structure across all four worlds, and the rules that govern how learning is sequenced, scaffolded, and assessed. This is the primary reference document for anyone making decisions about what children learn, in what order, and why.

This document does not describe how activities look or behave in the interface — those concerns belong to `steering/ui-guidelines.md` and individual world spec files. This document describes what is being learned, how learning progresses, and what evidence of learning looks like.

All activity designs across all four worlds must be traceable to the framework defined here. If an activity cannot be mapped to a skill, a learning objective, and a progression level described in this document, it should not be built.

---

## 2. Background

### 2.1 The Developmental Context: Ages 5–7

Children between the ages of 5 and 7 occupy a unique and critical developmental zone. According to Piaget's stage theory, they are transitioning from the **preoperational stage** (ages 2–7) to the **concrete operational stage** (ages 7–11). This transition is not abrupt — it is a gradual shift characterized by:

- Emerging capacity for logical reasoning about concrete objects and events
- Growing ability to classify, seriate, and understand conservation
- Developing symbolic thinking that allows representation of real-world objects through images, words, and numbers
- Strong dependence on perceptual and sensory experience as the primary mode of learning
- Limited capacity for abstract reasoning without concrete anchoring

This developmental profile has profound implications for learning design:

- **All learning must begin with concrete, tangible, and visually rich materials** — not abstractions or symbols
- **Language-heavy instruction is inappropriate** — instructions must be delivered through demonstration, animation, and audio
- **Feedback must be immediate and sensory** — children cannot defer gratification across long sequences
- **Motivation is intrinsic and activity-based** — children at this age are naturally curious and exploratory; the learning environment should harness rather than suppress this

### 2.2 The Problem with Rote-Based Early Mathematics Education

The dominant early mathematics pedagogy in Indonesian formal education relies on:

- Rote memorization of number sequences and arithmetic facts
- Drill-based practice of procedures (counting, adding, subtracting)
- Answer-focused assessment (correct/incorrect)
- Teacher-directed transmission of information

While this approach produces children who can perform certain procedural tasks, research consistently demonstrates that it fails to develop:

- **Conceptual understanding** — knowing *why* a procedure works
- **Mathematical reasoning** — the ability to justify, generalize, and extend
- **Problem-solving disposition** — willingness to tackle novel, non-routine problems
- **Scientific habits of mind** — curiosity, prediction, hypothesis formation, observation

INQUIS is designed as a structural alternative to this model, using mathematics as the medium through which scientific thinking skills are cultivated.

### 2.3 Inquiry-Based Learning as the Organizing Framework

Inquiry-based learning (IBL) is a pedagogical approach in which learners construct knowledge by actively investigating questions, problems, or scenarios. Rather than receiving information passively, learners:

1. Encounter a phenomenon or problem
2. Formulate questions about what they observe
3. Predict what might happen or what might be true
4. Investigate through hands-on or interactive exploration
5. Construct conclusions from their investigation
6. Reflect on and communicate their findings

IBL has a substantial evidence base in early childhood education. Studies by Minner, Levy, and Century (2010) found that inquiry-based science instruction produced significantly stronger conceptual understanding than didactic instruction. Across multiple meta-analyses, IBL has been associated with improved motivation, persistence, and transfer of learning.

For children aged 5–7, IBL must be structured and scaffolded rather than fully open. The model used in INQUIS is **Structured Inquiry**, in which:
- The question is provided by the platform
- The investigation method is guided
- The materials are constrained and purposeful
- The child makes genuine choices and discoveries within a safe structure

This is developmentally appropriate: full open inquiry requires metacognitive capacity that most 5–7 year olds are still developing. Structured inquiry maintains the essential features of genuine inquiry — observation, prediction, exploration, conclusion — while providing the scaffolding young children need.

### 2.4 Mathematical Inquiry as a Specific Form of Inquiry

Mathematical inquiry applies the inquiry process to mathematical phenomena: patterns, relationships, classifications, measurements, and data. In mathematical inquiry:

- Children encounter a mathematical situation (a set of objects, a sequence, a grouping)
- They observe properties and relationships
- They form predictions about what comes next or what is true
- They test their predictions through interaction
- They generalize from specific examples to broader patterns

The mathematical content in INQUIS is not arbitrary. Pattern recognition, classification, and prediction were selected because:

1. They are developmentally accessible to 5–7 year olds
2. They are foundational to scientific reasoning (all scientific observation involves pattern recognition and classification)
3. They are explicitly included in Kurikulum Merdeka's Fase Fondasi and Fase A learning objectives
4. They can be represented concretely, representationally, and abstractly — following the CRA framework

---

## 3. Educational Objectives

### 3.1 Primary Educational Objectives

**EO-001: Develop the Inquiry Disposition**  
Children who complete INQUIS should habitually approach new situations with curiosity — observing before concluding, questioning before accepting, predicting before acting. This disposition is the primary outcome.

**EO-002: Build Scientific Thinking Skills**  
Children should demonstrate measurable growth in five specific scientific thinking skills: observation, questioning, prediction, exploration, and conclusion-drawing. These skills are the building blocks of scientific literacy.

**EO-003: Develop Mathematical Reasoning**  
Children should be able to identify patterns, classify objects by multiple attributes, predict outcomes in sequences, and explain simple cause-and-effect relationships using mathematical representations.

**EO-004: Cultivate Learning Persistence**  
Children should develop the habit of persisting through uncertainty. Activities are designed so that incorrect responses lead to exploration, not failure — building resilience and growth mindset.

**EO-005: Build Positive Mathematical Identity**  
Children should finish INQUIS feeling capable and competent in mathematical contexts. Early negative experiences with mathematics have documented long-term effects on mathematical identity and achievement.

### 3.2 Secondary Educational Objectives

**EO-006:** Children should develop basic digital literacy — purposeful, goal-directed use of a digital interface to accomplish a learning task.

**EO-007:** Children should experience the satisfaction of discovery — the intrinsic reward of figuring something out independently.

**EO-008:** Children should develop basic vocabulary for scientific and mathematical talk: "pattern," "same," "different," "predict," "because," "I notice," "I wonder."

---

## 4. The Scientific Thinking Skill Taxonomy

INQUIS organizes all learning around five scientific thinking skills. These skills form a developmental progression and are represented visually in the product as the child's "Thinking Journey."

### Skill 1: Observe (Mengamati)

**Definition:** The ability to notice and describe the properties of objects, phenomena, and events using multiple senses (primarily visual in the digital context).

**Developmental Indicators:**
- Names properties of objects (color, shape, size, quantity)
- Notices what is the same and what is different
- Can describe what they see without being prompted to interpret
- Notices change over time or across a sequence

**Mathematical Expression:** Noticing attributes in a set of objects; recognizing that a sequence has a structure; identifying the repeating unit in a pattern.

**In INQUIS:** World 1 (Pattern Explorer) and World 2 (Sorting Explorer) are the primary sites of observation skill development.

---

### Skill 2: Question (Bertanya)

**Definition:** The ability to generate questions about observed phenomena — to be curious in a directed way, asking "why," "what if," and "what comes next."

**Developmental Indicators:**
- Spontaneously asks "why" or "what if" during exploration
- Can identify what they don't know about a situation
- Can generate a testable prediction in response to a question prompt
- Distinguishes between a question they can investigate and one they cannot

**Mathematical Expression:** Asking what comes next in a sequence; wondering whether a sorting rule applies to new objects; noticing an anomaly and asking why it doesn't fit.

**In INQUIS:** Questioning is embedded as a transitional skill across all worlds. Character companions pose questions to model scientific questioning, then invite children to form their own. It is not a standalone world but a throughline.

---

### Skill 3: Predict (Memprediksi)

**Definition:** The ability to make a reasoned forecast about what will happen or what is true, based on prior observation. A prediction is distinguished from a guess by the presence of reasoning — "I think X will happen because Y."

**Developmental Indicators:**
- Makes a forecast before seeing the outcome
- Can articulate a simple reason for their prediction
- Revisits and revises predictions based on new evidence
- Understands that predictions can be wrong without that being a failure

**Mathematical Expression:** Predicting the next element in a pattern; predicting which group an object belongs to based on a sorting rule; predicting the outcome of a simple experiment.

**In INQUIS:** World 3 (Prediction Explorer) is the primary site of prediction skill development. Prediction is also scaffolded in Worlds 1 and 2 through "what comes next?" prompts.

---

### Skill 4: Explore (Menjelajahi/Menyelidiki)

**Definition:** The ability to actively investigate a question by trying things out, observing results, and modifying approach based on what is learned. Exploration is the action phase of inquiry.

**Developmental Indicators:**
- Tries multiple approaches when the first does not work
- Notices and describes what happened as a result of an action
- Can distinguish between "I tried" and "I know" — understanding that investigation is needed
- Engages persistently with a task without adult redirection

**Mathematical Expression:** Sorting objects multiple ways; trying different pattern extensions and comparing results; manipulating variables in a simple prediction scenario.

**In INQUIS:** Exploration is the primary mode of all activity design. Every activity is structured as an exploratory episode rather than a problem with a single solution path.

---

### Skill 5: Conclude (Menyimpulkan)

**Definition:** The ability to synthesize observations and exploration results into a simple generalization or conclusion — to say "I found out that..." based on evidence.

**Developmental Indicators:**
- Can state what they found out after an activity
- Connects their conclusion to specific observations ("I know because...")
- Understands that conclusions can change with new evidence
- Can represent a conclusion through drawing, gesture, or simple language

**Mathematical Expression:** Stating the rule that governs a pattern; explaining why an object belongs to a group; summarizing the result of a prediction test.

**In INQUIS:** World 4 (Little Scientist) is the primary site of conclusion-drawing, where children synthesize skills from all previous worlds into an integrated inquiry episode.

---

## 5. The Learning Progression Model

INQUIS uses a three-dimensional learning progression model. Every activity is positioned within this model, and the progression across worlds should move children from lower-left (concrete, single-skill, low complexity) to upper-right (abstract, integrated, high complexity).

### Dimension 1: Representation Level (CRA Framework)

| Level | Description | Example |
|---|---|---|
| Concrete | Real-world objects, physical manipulation simulated digitally | Drag actual illustrated fruits into groups |
| Representational | Pictures, diagrams, symbols | Sort picture cards by shape |
| Abstract | Symbols, rules, generalizations | Identify the algebraic rule governing a number pattern |

All worlds begin at the Concrete level. World 4 includes activities at the Representational and early Abstract levels.

### Dimension 2: Scientific Thinking Skill Level

| Level | Description |
|---|---|
| Emerging | Child notices a phenomenon with scaffolding; cannot yet articulate |
| Developing | Child can observe and name with minimal prompting |
| Consolidating | Child predicts and explores with occasional scaffolding |
| Applying | Child integrates multiple skills in an independent inquiry episode |

### Dimension 3: Cognitive Complexity

Based on a simplified adaptation of Bloom's Taxonomy for early childhood:

| Level | Cognitive Demand | Indicator |
|---|---|---|
| 1 — Remember | Recognize and recall | "Which one is the same?" |
| 2 — Understand | Describe and explain | "What is the pattern doing?" |
| 3 — Apply | Use in a new situation | "Put this new object in the right group" |
| 4 — Analyze | Compare and reason | "Why does this one not belong?" |

Activities in Worlds 1–2 span Levels 1–2. Worlds 3–4 span Levels 2–4.

---

## 6. World Structure and Learning Sequence

### World 1: Pattern Explorer

**Core Concept:** Pattern recognition and sequence prediction  
**Scientific Thinking Skills:** Observe (primary), Predict (secondary)  
**CRA Level:** Concrete → Representational  
**Cognitive Complexity:** Levels 1–2  
**Kurikulum Merdeka Alignment:** Fase Fondasi — Mengenal pola sederhana  

**Learning Sequence:**

| Activity | Learning Focus | Skill | CRA |
|---|---|---|---|
| 1.1 — What Comes Next? | Identify AB and ABC repeating patterns | Observe | Concrete |
| 1.2 — Fix the Pattern | Identify and repair a broken pattern | Observe + Explore | Concrete |
| 1.3 — Make Your Own | Create a repeating pattern | Explore + Predict | Representational |
| 1.4 — Number Patterns | Recognize growing numerical sequences | Observe + Predict | Representational |
| 1.5 — Pattern Detective | Identify the hidden rule in a complex pattern | Observe + Conclude | Representational |

**World 1 Completion Criteria:** Child demonstrates ability to identify the repeating unit in a pattern and correctly predict the next two elements in a sequence not previously seen.

---

### World 2: Sorting Explorer

**Core Concept:** Classification and attribute-based reasoning  
**Scientific Thinking Skills:** Observe (primary), Question (secondary), Explore (secondary)  
**CRA Level:** Concrete → Representational  
**Cognitive Complexity:** Levels 1–3  
**Kurikulum Merdeka Alignment:** Fase Fondasi — Mengelompokkan benda berdasarkan atribut  

**Learning Sequence:**

| Activity | Learning Focus | Skill | CRA |
|---|---|---|---|
| 2.1 — Sort by Color | Single-attribute classification | Observe | Concrete |
| 2.2 — Sort by Shape | Single-attribute classification (different attribute) | Observe | Concrete |
| 2.3 — Sort Your Way | Child-directed classification by chosen attribute | Explore | Concrete |
| 2.4 — Two Rules | Dual-attribute classification (Venn-style) | Observe + Analyze | Representational |
| 2.5 — The Odd One Out | Identify non-member and explain why | Observe + Conclude | Representational |

**World 2 Completion Criteria:** Child can sort a set of objects by two attributes simultaneously and correctly identify and explain which object does not belong to a defined group.

---

### World 3: Prediction Explorer

**Core Concept:** Cause-and-effect reasoning and prediction  
**Scientific Thinking Skills:** Predict (primary), Question (primary), Explore (secondary)  
**CRA Level:** Representational → Abstract  
**Cognitive Complexity:** Levels 2–4  
**Kurikulum Merdeka Alignment:** Fase A — Memahami hubungan sebab-akibat sederhana  

**Learning Sequence:**

| Activity | Learning Focus | Skill | CRA |
|---|---|---|---|
| 3.1 — What Will Happen? | Simple cause-effect scenarios | Predict | Representational |
| 3.2 — Before and After | Sequence prediction | Predict + Observe | Representational |
| 3.3 — The Experiment | Structured mini-experiment with prediction | Predict + Explore | Representational |
| 3.4 — Was I Right? | Compare prediction to outcome; revise | Predict + Conclude | Representational |
| 3.5 — What Would Change? | Variable identification: "What if?" | Question + Predict | Abstract |

**World 3 Completion Criteria:** Child can state a prediction with a reason before seeing the outcome, and compare their prediction to the actual result with a simple explanation of what they found.

---

### World 4: Little Scientist

**Core Concept:** Integrated scientific inquiry  
**Scientific Thinking Skills:** All five skills integrated  
**CRA Level:** Representational → Abstract  
**Cognitive Complexity:** Levels 3–4  
**Kurikulum Merdeka Alignment:** Fase A — Bernalar kritis; Proyek penguatan Profil Pelajar Pancasila  

**Learning Sequence:**

| Activity | Learning Focus | Skill Integration | CRA |
|---|---|---|---|
| 4.1 — My Science Journal | Record observations in a structured digital journal | Observe + Question | Representational |
| 4.2 — Design Your Test | Choose materials and method for a mini-investigation | Question + Predict + Explore | Representational |
| 4.3 — Investigate! | Carry out the child-designed investigation | Explore | Representational |
| 4.4 — What Did I Find? | Synthesize and record conclusions | Conclude | Abstract |
| 4.5 — Share My Discovery | Present findings to a simulated peer/character | Conclude + Communicate | Abstract |

**World 4 Completion Criteria:** Child completes an end-to-end structured inquiry episode — from initial observation through a designed investigation to a recorded conclusion — with meaningful engagement at each stage demonstrated through interaction data.

---

## 7. Scaffolding Design Principles

Scaffolding in INQUIS follows Vygotsky's Zone of Proximal Development (ZPD) framework. Every activity is designed to be:

- **Too hard to complete without engagement** — trivially easy tasks produce no learning
- **Achievable with appropriate support** — impossible tasks produce frustration and disengagement
- **Faded as competence grows** — scaffolding that persists beyond need undermines independence

### 7.1 Scaffolding Mechanisms

**Audio Narration (Level 1 — Always present)**  
Character companion voice-over explains the task, models the thinking, and provides encouragement. Always active.

**Visual Cueing (Level 1 — Always present)**  
Animations, highlights, and gesture cues indicate what to look at or interact with.

**Hint System (Level 2 — On request or after inactivity)**  
After 15 seconds of inactivity, the character companion offers a hint. Children can also tap the companion to request a hint at any time. Hints are graduated:
- Hint 1: Redirects attention ("Look at the colors")
- Hint 2: Models partial thinking ("I notice these two are both round...")
- Hint 3: Guides toward the answer without giving it ("Which one of these is also round?")

**Explicit Modeling (Level 3 — After second incorrect response)**  
The character companion demonstrates the correct thinking process for one example, then presents a fresh example for the child to try independently.

**Answer Reveal (Level 4 — After third incorrect response on same item)**  
The answer is gently revealed with a warm explanation. The child is immediately presented with a similar item to try with the benefit of the modeled example.

### 7.2 Scaffolding Data Collection

Every scaffolding event is logged in the assessment database:
- Which scaffold level was triggered
- At which point in the activity
- Whether the child subsequently succeeded without further scaffolding

This data is used to compute the **Independence Index** for each child, which measures how much scaffolding was required to achieve each activity outcome. A child who completes activities at Scaffold Level 0–1 is demonstrating stronger independent thinking than one who requires Level 3–4 scaffolding, even if both complete the activity.

---

## 8. The Reflection Moment

Every activity ends with a mandatory 30–60 second reflection moment. This is not optional and must not be skippable. It serves both pedagogical and assessment purposes.

The reflection moment presents the child with one of the following prompts (rotated and appropriate to the activity):

- "What did you notice?" (Character shows three illustrated options the child can tap)
- "What surprised you?" (Child taps an emoji response)
- "What did you figure out?" (Child selects or draws)
- "What would you like to try next time?" (Open-ended prompt with illustrated options)

Reflection responses are stored in the assessment database and used to generate the "Discovery Journal" visible in the parent view.

The pedagogical rationale for mandatory reflection is grounded in metacognitive learning theory (Flavell, 1979; Brown, 1987): brief structured reflection after an activity significantly improves retention and transfer compared to moving directly to the next activity.

---

## 9. Skill Progression Mapping

The following table shows the primary skill targeted in each activity across all worlds, enabling assessment of growth over time.

| World | Activity | Observe | Question | Predict | Explore | Conclude |
|---|---|---|---|---|---|---|
| W1 | 1.1 | ●● | ○ | ● | ○ | ○ |
| W1 | 1.2 | ●● | ○ | ○ | ● | ○ |
| W1 | 1.3 | ● | ○ | ● | ●● | ○ |
| W1 | 1.4 | ●● | ○ | ● | ○ | ○ |
| W1 | 1.5 | ●● | ○ | ○ | ● | ● |
| W2 | 2.1 | ●● | ○ | ○ | ● | ○ |
| W2 | 2.2 | ●● | ○ | ○ | ● | ○ |
| W2 | 2.3 | ● | ● | ○ | ●● | ○ |
| W2 | 2.4 | ●● | ● | ○ | ● | ○ |
| W2 | 2.5 | ●● | ● | ○ | ○ | ●● |
| W3 | 3.1 | ● | ○ | ●● | ● | ○ |
| W3 | 3.2 | ●● | ○ | ●● | ○ | ● |
| W3 | 3.3 | ● | ● | ●● | ●● | ○ |
| W3 | 3.4 | ○ | ● | ● | ○ | ●● |
| W3 | 3.5 | ● | ●● | ●● | ● | ○ |
| W4 | 4.1 | ●● | ●● | ○ | ○ | ○ |
| W4 | 4.2 | ● | ●● | ●● | ● | ○ |
| W4 | 4.3 | ● | ○ | ● | ●● | ● |
| W4 | 4.4 | ○ | ○ | ● | ● | ●● |
| W4 | 4.5 | ○ | ● | ○ | ○ | ●● |

**Legend:** ●● = Primary skill target | ● = Secondary skill target | ○ = Not targeted

---

## 10. Assessment Integration

Assessment in INQUIS is fully embedded — it is invisible to the child and automatic. There are no tests, quizzes, or score screens visible to the child. All assessment data is collected through interaction events.

Assessment is described in full in `steering/assessment-framework.md`. The learning framework's responsibility is to define:

1. **What is being assessed:** The five scientific thinking skills above
2. **When it is assessed:** During every activity, at every interaction
3. **What evidence counts:** Response accuracy, scaffold level required, time-to-response, reflection responses
4. **How growth is measured:** Comparison of Independence Index and skill engagement scores across activities, within worlds, and across worlds

---

## 11. Business Rules

**BR-LF-001:** All activities must be mapped to the skill progression table above before development begins. An unmapped activity will not be built.

**BR-LF-002:** No world may be entered until the preceding world's completion criteria are met.

**BR-LF-003:** Within a world, activities must be completed in sequence. Activity N+1 is locked until Activity N is completed.

**BR-LF-004:** Activity completion is defined as: reaching the reflection moment (not as achieving a specific score or correct-response rate).

**BR-LF-005:** A child may replay any completed activity. Replay data is stored separately from first-attempt data and does not overwrite the original assessment record.

**BR-LF-006:** The reflection moment may not be skipped. If a child exits before completing the reflection, the activity is marked as "in progress" rather than complete.

**BR-LF-007:** Scaffold Level 4 (answer reveal) must always be followed by a fresh parallel item before the activity is marked complete. Seeing the answer and receiving credit is not acceptable.

---

## 12. Learning Rules

**LR-LF-001:** Every activity must begin with an observation phase — children see the phenomenon before being asked to do anything.

**LR-LF-002:** Every activity must contain a prediction or exploration phase — children must make an active choice or prediction before seeing a result.

**LR-LF-003:** Every activity must end with the reflection moment described in Section 8.

**LR-LF-004:** No activity may present a child with more than three objects to compare simultaneously in the Concrete CRA level. Cognitive load at this age is limited.

**LR-LF-005:** Mathematical vocabulary introduced in each world must be used consistently in all subsequent worlds. Vocabulary introduced in World 1 (pattern, next, same) is reinforced in Worlds 2, 3, and 4.

**LR-LF-006:** Character companions must model scientific language in their narration: "I notice...", "I wonder...", "I predict...", "I found out..."

---

## 13. Success Metrics

| Metric | Target | Measurement |
|---|---|---|
| Skill Growth Rate | ≥ 70% of children show measurable growth from W1 to W4 | Assessment score comparison |
| Activity Completion Rate | ≥ 80% of started activities reach the reflection moment | Session event logs |
| Scaffold Independence Rate | ≥ 50% of activities completed at Scaffold Level 0–1 | Scaffold event logs |
| Reflection Engagement Rate | ≥ 90% of completed activities include a reflection response | Reflection event logs |
| World Progression Rate | ≥ 60% of children who complete World 1 continue to World 2 | Progress database |

---

## 14. Acceptance Criteria

**AC-LF-001:** Every activity in every world can be mapped to at least one primary skill in the scientific thinking taxonomy.

**AC-LF-002:** The CRA progression within each world moves from Concrete to at least Representational.

**AC-LF-003:** The reflection moment is present at the end of every activity and cannot be bypassed by navigation.

**AC-LF-004:** World unlock logic correctly prevents access to World N+1 until World N completion criteria are met.

**AC-LF-005:** Scaffold events are correctly logged with activity ID, scaffold level, and timestamp for every activity.

**AC-LF-006:** The skill progression mapping table is reflected in the assessment database schema — each activity record includes columns for each of the five skills.

---

## 15. Edge Cases

**EC-LF-001: Child gets stuck in Scaffold Level 4 repeatedly**  
If a child triggers Level 4 scaffolding in more than 3 consecutive activities within a world, the teacher panel displays a flag: "This child may need additional support with [skill name]." No action is taken in the child interface — only the teacher is alerted.

**EC-LF-002: Child skips reflection by closing the browser**  
The activity is marked "in progress." On return, the child is presented with the reflection before being allowed to proceed. A brief character prompt explains: "Before we go on, let's finish thinking about what we found!"

**EC-LF-003: Child completes World 4 before completing all activities in earlier worlds**  
This is architecturally prevented by the sequential unlock rules. However, if data inconsistency is detected (e.g., due to a data migration error), the system flags the inconsistency in the admin panel rather than allowing access.

**EC-LF-004: New activity is added to a world a child has already completed**  
The child's world is shown as "completed" with a new "bonus activity" available. Bonus activities do not affect world completion status but are included in assessment data.

---

## 16. Future Expansion

- **Skill 6 — Communicate (Mengomunikasikan):** A sixth scientific thinking skill targeting the ability to share and represent findings. Currently partially addressed in World 4, Activity 4.5, but could become a standalone world.
- **Cross-World Connections:** Future activity types that draw on skills from multiple worlds simultaneously
- **Adaptive Sequencing:** AI-powered activity sequencing that selects the next activity based on assessed skill level rather than a fixed sequence
- **Teacher-Authored Activities:** A content creation tool allowing teachers to design new activities within the INQUIS learning framework

---

## 17. Dependencies

| Dependency | Document |
|---|---|
| Product vision and personas | `steering/product-vision.md` |
| Pedagogical theory detail | `steering/pedagogy.md` |
| Mathematical inquiry specifics | `steering/mathematical-inquiry.md` |
| Assessment implementation | `steering/assessment-framework.md` |
| World 1 activity design | `specs/world-1-pattern-explorer/` |
| World 2 activity design | `specs/world-2-sorting-explorer/` |
| World 3 activity design | `specs/world-3-prediction-explorer/` |
| World 4 activity design | `specs/world-4-little-scientist/` |

---

## 18. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Activities are too cognitively demanding for target age | Medium | High | Conduct usability testing with 5–7 year olds before full development; use CRA framework rigorously |
| Reflection moment is perceived as boring by children | High | Medium | Design reflection as a game mechanic (tap to reveal what the character found, compare to your own) |
| Skill progression mapping becomes outdated as activities evolve | Medium | Medium | Maintain the skill mapping table as a living document; require update whenever an activity is changed |
| Sequential unlock model frustrates fast learners | Low | Medium | Allow replay of any completed world/activity; add bonus activities for children who complete all four worlds |
| Scaffold logging creates performance overhead | Low | Medium | Use event queue with batch writes rather than synchronous database calls |

---

## 19. References

- Piaget, J. (1952). *The Origins of Intelligence in Children.* Norton.
- Vygotsky, L. S. (1978). *Mind in Society.* Harvard University Press.
- Brunner, J. S. (1960). *The Process of Education.* Harvard University Press.
- Minner, D. D., Levy, A. J., & Century, J. (2010). Inquiry-based science instruction: What is it and does it matter? *Journal of Research in Science Teaching, 47*(4), 474–496.
- Flavell, J. H. (1979). Metacognition and cognitive monitoring. *American Psychologist, 34*(10), 906–911.
- National Research Council. (2000). *Inquiry and the National Science Education Standards.* National Academy Press.
- Kemendikbudristek. (2022). *Capaian Pembelajaran Fase Fondasi dan Fase A.* BSKAP.
- `steering/product-vision.md` — Product vision and user personas
- `steering/pedagogy.md` — Pedagogical theory and principles
- `steering/assessment-framework.md` — Assessment implementation details