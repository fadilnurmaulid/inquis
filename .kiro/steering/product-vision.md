# INQUIS — Product Vision

**Document Type:** Steering Document  
**Version:** 1.0  
**Status:** Canonical  
**Audience:** Engineers, Designers, Educators, Evaluators, Kiro IDE

---

## 1. Purpose

This document defines the foundational product vision for INQUIS — its reason for existing, the problem it solves, the population it serves, and the principles that must govern every decision made during design, development, and evaluation. It serves as the north star for all subsequent specifications. When implementation decisions conflict, this document takes precedence.

This is not a marketing document. It is a binding architectural and pedagogical contract between the product team and every artifact produced under the `.kiro` directory.

---

## 2. Background

Indonesia is home to approximately 8 million children between the ages of 5 and 7 years old, the developmental stage commonly referred to as the transition from early childhood to early formal education — spanning Taman Kanak-Kanak (TK) through Kelas 1 Sekolah Dasar (SD). This period is globally recognized as the "Golden Age" of cognitive plasticity, during which habits of mind, dispositions toward learning, and foundational cognitive schemas are formed in ways that persist for life.

Despite this, the dominant pedagogical model in Indonesian early education continues to emphasize rote memorization, answer-reproduction, and passive reception of information. Children are taught *what* to know rather than *how* to think. Mathematics, in particular, is taught primarily through drill and repetition — producing children who can count but cannot reason, who can recite but cannot inquire.

This is not a failure of teachers. It is a structural absence of tools that make inquiry-based learning accessible, engaging, and scalable for this age group.

The global research literature on early childhood education — from Piaget's constructivist framework, to Vygotsky's zone of proximal development, to the work of the National Council of Teachers of Mathematics (NCTM), to Indonesia's own Kurikulum Merdeka — consistently supports active, inquiry-driven, and child-centered approaches. The implementation gap is not one of knowledge but of accessible infrastructure.

INQUIS is designed to close that gap.

---

## 3. Educational Objectives

INQUIS has the following primary educational objectives, ordered by developmental priority:

### 3.1 Develop Scientific Habits of Mind
Children who complete INQUIS should naturally tend toward observation before conclusion, questioning before accepting, and prediction before acting. These are not behaviors that can be memorized — they must be practiced repeatedly in engaging, low-stakes contexts.

### 3.2 Foster Mathematical Reasoning as a Thinking Tool
Mathematics is not the end goal. It is the medium. INQUIS uses patterns, classification, comparison, and prediction — mathematical concepts — as the scaffolding on which scientific reasoning is built. A child who learns to recognize a pattern is practicing inductive reasoning. A child who classifies objects is practicing the foundations of hypothesis formation.

### 3.3 Build Curiosity as a Durable Disposition
The single most important outcome of INQUIS is that a child finishes a session *more curious* than when they began. Every interaction must be designed to open a new question rather than close with a definitive answer. Wonder is the product.

### 3.4 Support Developmentally Appropriate Digital Literacy
Children aged 5–7 are digital natives in environment but not necessarily in competence. INQUIS should build productive, purposeful, and safe relationships with digital tools — modeling how technology can be used to explore, discover, and learn.

### 3.5 Cultivate Character Alongside Cognition
Inquiry learning is inherently a character-forming practice. Persisting through uncertainty, trying again after an incorrect prediction, celebrating a peer's discovery — these are character outcomes (patience, resilience, generosity) that INQUIS should reinforce through its interaction design and feedback systems.

---

## 4. Product Objectives

### 4.1 Primary Product Goal
Deliver a browser-based, responsive digital learning platform that implements inquiry-based early mathematics learning for children aged 5–7 years, operable independently by the child with minimal adult mediation after initial setup.

### 4.2 Secondary Product Goals

- Provide teachers and parents with a transparent, pedagogically grounded progress view
- Demonstrate measurable indicators of scientific thinking skill growth through embedded assessment
- Achieve sufficient technical robustness for presentation, demonstration, and evaluation in competition contexts
- Establish a foundation that can be expanded into a fully production-grade platform post-competition

### 4.3 Competition-Specific Objectives
INQUIS is submitted to **Lomba Inovasi Digital Mahasiswa (LIDM) 2026**, Division IPDP (Inovasi Pembelajaran Digital dan Pendidikan). The product must convincingly demonstrate:
- Innovation in digital learning methodology
- Measurable educational impact for Indonesian children
- Technical quality and implementation completeness
- Alignment with national education priorities (Kurikulum Merdeka, Literasi Digital)

---

## 5. User Personas

### Persona 1: Rara (Age 6, Primary Learner)
**Profile:** First-grade student in a public elementary school in Surabaya. She has access to a shared tablet at school and a smartphone at home. She enjoys drawing and storytelling. She cannot read independently yet but recognizes letters and numbers. She becomes frustrated when she feels she has done something "wrong" but is highly motivated by visible progress and praise from characters she likes.

**Goals:**
- Explore and play without fear of failure
- Feel proud of her discoveries
- Understand what she is supposed to do without reading instructions

**Pain Points:**
- Text-heavy interfaces are inaccessible to her
- Negative feedback causes shutdown and disengagement
- Sessions that are too long lose her attention

**Design Implications:**
- All instructions must be delivered via voice-over and animation
- Feedback must be universally positive — never punitive
- Sessions should be completable in 5–10 minutes

---

### Persona 2: Bu Sari (Age 34, Primary School Teacher)
**Profile:** Grade 1 teacher in a state school in East Java. She teaches a class of 28 students with mixed abilities. She uses a combination of traditional workbooks and occasional digital tools. She is enthusiastic about technology but has limited time for onboarding or tool-switching during the school day. She wants evidence of student progress she can share with parents.

**Goals:**
- Understand which students are struggling with which concepts
- Use the platform with minimal setup during class time
- Share progress reports with parents in a format they can understand

**Pain Points:**
- Tools that require extensive training before use
- Data dashboards that are too complex to interpret quickly
- Any system that increases her administrative workload

**Design Implications:**
- Teacher panel must surface insights, not raw data
- Setup must require fewer than 5 minutes per student
- Reports must be exportable and human-readable

---

### Persona 3: Pak Budi (Age 39, Parent)
**Profile:** Father of a 6-year-old in Jakarta. He works in logistics and uses a smartphone primarily. He wants his child to learn but is skeptical of screen time. He will only continue allowing access to INQUIS if he can see it is genuinely educational rather than simply entertaining.

**Goals:**
- Understand what his child is learning and why
- Feel confident the platform is safe and age-appropriate
- See visible progress over time

**Pain Points:**
- Platforms that feel like games without educational justification
- Privacy concerns about his child's data
- Dashboards that require interpretation he doesn't have context for

**Design Implications:**
- Parent view must contextualize learning in everyday language
- Privacy policy must be explicit and minimal in data collection
- Progress must be shown visually and narratively, not statistically

---

### Persona 4: LIDM Evaluator (Age 30–50, Competition Judge)
**Profile:** Academic or practitioner evaluator assessing submitted digital learning innovations. Likely has a background in education, educational technology, or ICT policy. Will spend 15–30 minutes interacting with the product and reviewing documentation.

**Goals:**
- Assess the innovation quality and educational rigor of the submission
- Verify technical implementation quality
- Evaluate alignment with competition theme and national education priorities

**Pain Points:**
- Submissions that are visually impressive but pedagogically shallow
- Technical systems that crash or behave inconsistently during demo
- Documentation that is generic rather than context-specific

**Design Implications:**
- Demo flow must be polished and guided
- Every visible feature must have a visible pedagogical rationale
- Documentation in `.kiro` must reflect professional-grade thinking

---

## 6. User Stories

### Learner Stories

**US-001**  
As Rara, I want to hear what I need to do from a friendly character voice so that I can start playing even though I cannot read yet.

**US-002**  
As Rara, I want to feel good even when I get something wrong so that I am not afraid to try again.

**US-003**  
As Rara, I want to see my progress in a way I understand (stars, characters, worlds unlocked) so that I feel proud of how far I have come.

**US-004**  
As Rara, I want activities that feel like games so that learning does not feel like work.

**US-005**  
As Rara, I want to complete an activity in one sitting at school so that I do not lose my place.

### Teacher Stories

**US-006**  
As Bu Sari, I want to see which students have completed which activities so that I can track participation.

**US-007**  
As Bu Sari, I want to understand which scientific thinking skills each activity targets so that I can connect INQUIS to my lesson plans.

**US-008**  
As Bu Sari, I want to generate a progress summary per student so that I can share it with parents at report time.

**US-009**  
As Bu Sari, I want to assign specific worlds or activities to specific groups so that I can differentiate instruction.

### Parent Stories

**US-010**  
As Pak Budi, I want to see what my child did in INQUIS today and what they learned so that I feel the screen time was worthwhile.

**US-011**  
As Pak Budi, I want to know that my child's personal data is protected so that I trust the platform.

### Evaluator Stories

**US-012**  
As an LIDM evaluator, I want to quickly understand the educational innovation of INQUIS so that I can assess its novelty and impact.

**US-013**  
As an LIDM evaluator, I want to see a working, responsive, polished product so that I can evaluate its technical quality.

---

## 7. Functional Requirements

### FR-001: Child-Operated Interface
The primary interface must be fully operable by a child aged 5–7 with no reading ability required. All navigational affordances must use icons, animation, color, and audio.

### FR-002: Four Learning Worlds
The platform must contain exactly four learning worlds in the following order: (1) Pattern Explorer, (2) Sorting Explorer, (3) Prediction Explorer, (4) Little Scientist. Each world must contain a minimum of three activities.

### FR-003: Audio-First Instructions
Every activity must include professionally recorded or high-quality synthesized voice-over narration in Bahasa Indonesia guiding the child through the task.

### FR-004: Embedded Assessment
Every activity must generate learning evidence that is stored per-child and accessible to teachers without interrupting the child's experience.

### FR-005: Teacher Panel
A separate authenticated interface must exist for teachers to view class rosters, individual student progress, and activity completion data.

### FR-006: Parent View
A simplified authenticated interface must exist for parents to view their child's progress narrative.

### FR-007: Responsive Design
The platform must function correctly on tablet (768px+) and desktop (1024px+) screen sizes. Mobile (375px) support is desirable but secondary.

### FR-008: Onboarding Flow
New children must be guided through a character-led onboarding sequence that introduces the platform before any learning activity begins.

### FR-009: Progress Persistence
All progress must persist across sessions. A child returning to the platform must resume from where they left off.

### FR-010: Offline Graceful Degradation
If the network connection is lost during a session, the child must receive a friendly message and the session state must be preserved for resumption.

---

## 8. Non-Functional Requirements

### NFR-001: Performance
Initial page load must complete in under 3 seconds on a 4G mobile connection. Activity transitions must complete in under 500ms.

### NFR-002: Reliability
The platform must maintain 99.5% uptime during evaluation and demonstration periods.

### NFR-003: Security
Authentication must use Supabase Auth with Row Level Security (RLS) policies enforced at the database layer. No child data may be accessible without authentication.

### NFR-004: Accessibility
The platform must meet WCAG 2.1 Level AA for all non-child-facing interfaces (teacher panel, parent view). Child-facing interfaces must meet functional accessibility targets appropriate for the age group, including sufficient color contrast and touch target sizes (minimum 44×44px).

### NFR-005: Scalability
The architecture must support up to 10,000 concurrent learners without requiring architectural changes, through appropriate use of Vercel edge functions and PostgreSQL connection pooling.

### NFR-006: Maintainability
All code must be written in TypeScript with strict type checking enabled. Test coverage must meet minimums defined in `coding-standards.md`.

---

## 9. UX Principles

These principles are binding for all design decisions in INQUIS.

### P1: Delight First, Information Second
For child interfaces, every interaction should feel magical before it feels informative. Animation, sound, and color carry meaning before text ever does.

### P2: Never Punish, Always Encourage
No red X marks. No "Wrong!" messages. No score subtraction. Incorrect responses receive warm redirects: "Hmm, let's look again together!" followed by scaffolded guidance.

### P3: Visible Progress at All Times
A child should always be able to see how far they have come. Progress indicators must be visual, persistent, and meaningful.

### P4: One Task at a Time
The interface must never present a child with more than one decision to make simultaneously. Each screen has one primary affordance.

### P5: Audio is Primary
Text is secondary or absent entirely in child-facing views. Audio carries the narrative, instruction, and feedback.

### P6: Consistent Character Companions
Each world has a character companion who guides, encourages, and celebrates. Characters must be consistent, named, and narratively coherent.

---

## 10. Information Architecture

```
INQUIS
├── Public Routes
│   ├── / (Landing / Role Selection)
│   ├── /login (Shared Login)
│   └── /onboarding (Child Onboarding Flow)
│
├── Child Routes (/play)
│   ├── /play/home (World Map)
│   ├── /play/world/[worldId] (World Entry)
│   └── /play/activity/[activityId] (Activity Engine)
│
├── Teacher Routes (/teacher)
│   ├── /teacher/dashboard
│   ├── /teacher/students
│   ├── /teacher/students/[studentId]
│   └── /teacher/reports
│
├── Parent Routes (/parent)
│   ├── /parent/dashboard
│   └── /parent/child/[childId]
│
└── Admin Routes (/admin) [Future]
    ├── /admin/content
    └── /admin/analytics
```

---

## 11. Component Breakdown

The following high-level component families are anticipated:

| Family | Description |
|---|---|
| `<WorldMap>` | Visual overview of the four learning worlds and progress state |
| `<ActivityEngine>` | Core wrapper for rendering any activity type |
| `<AudioPlayer>` | Global audio management system for narration and effects |
| `<FeedbackOverlay>` | Encouraging feedback display triggered by activity events |
| `<ProgressTracker>` | Visual progress display (stars, badges, path completion) |
| `<CompanionCharacter>` | Animated character wrapper used across all worlds |
| `<TeacherDashboard>` | Root layout for teacher-facing interfaces |
| `<ParentView>` | Root layout for parent-facing interfaces |
| `<OnboardingFlow>` | Guided multi-step introduction sequence |

---

## 12. Business Rules

**BR-001:** Worlds must be unlocked sequentially. World 2 cannot be accessed until World 1 is completed.

**BR-002:** Within a world, activities are presented in a fixed sequence. An activity cannot be skipped.

**BR-003:** A child may replay any previously completed activity without restriction.

**BR-004:** Teacher accounts are associated with a school code. Students are associated with a teacher account.

**BR-005:** Parent accounts are linked to a specific child account by the teacher during onboarding.

**BR-006:** No advertising, in-app purchases, or external links may appear in any child-facing view.

**BR-007:** All progress data is owned by the institution (school/teacher) and the child's parent, not by INQUIS as a platform.

---

## 13. Learning Rules

**LR-001:** Every activity must explicitly target at least one scientific thinking skill from the taxonomy: Observe, Question, Predict, Explore, Conclude.

**LR-002:** No activity may have a single correct answer that is presented before the child has had opportunity to predict or explore.

**LR-003:** Incorrect responses must be met with scaffolded guidance, not direct answer revelation.

**LR-004:** Every activity must end with a brief, child-accessible reflection moment ("What did you discover?").

**LR-005:** The sequence of activities within each world must follow a progression from Concrete → Representational → Abstract (CRA framework).

---

## 14. Success Metrics

| Metric | Target | Measurement Method |
|---|---|---|
| Activity Completion Rate | ≥ 80% of started activities completed | Database: session completion events |
| Session Return Rate | ≥ 60% of children return within 7 days | Database: session timestamps |
| Scientific Thinking Score Growth | Measurable improvement from World 1 to World 4 | Embedded assessment rubric |
| Teacher Dashboard Adoption | ≥ 70% of registered teachers log in within first week | Analytics: teacher session events |
| LIDM Evaluator Satisfaction | Judges' feedback rated "innovative" or "highly innovative" | Competition scoring rubric |
| Load Time | < 3 seconds on 4G | Lighthouse performance score ≥ 85 |

---

## 15. Acceptance Criteria

**AC-001:** A child aged 5–7 with no prior INQUIS experience can complete the onboarding flow and begin their first activity within 5 minutes without adult assistance.

**AC-002:** All four worlds contain playable, complete activities with audio narration.

**AC-003:** Progress data is correctly persisted and retrievable after the browser is closed and reopened.

**AC-004:** A teacher can log in, view their student roster, and identify which activities a specific student has completed within 3 minutes.

**AC-005:** The platform is fully functional on a tablet device at 768px viewport width.

**AC-006:** No child-facing screen contains text as the primary means of conveying instructions or feedback.

**AC-007:** The platform passes a Lighthouse accessibility audit with a score ≥ 85 on teacher and parent views.

---

## 16. Edge Cases

**EC-001: Child abandons mid-activity**  
System must save partial progress at defined checkpoints. On return, the child is presented with the option to resume or restart the activity with a friendly character prompt.

**EC-002: Multiple children share one device**  
The world map screen must always show a "Switch Child" affordance that returns to the login/selection screen without losing progress for any child.

**EC-003: Teacher creates account before students exist**  
The teacher dashboard must gracefully handle an empty student roster with a clear call-to-action for adding students.

**EC-004: Audio fails to load**  
If audio assets fail to load, all instructions must be visually accessible through animated character gesture sequences and on-screen icon cues.

**EC-005: Child completes all four worlds**  
A celebration sequence must play, and a "mastery certificate" must be generated. The child should be presented with a replay option or a future-expansion placeholder ("More adventures coming soon!").

**EC-006: Activity data fails to save**  
A silent retry mechanism (up to 3 attempts) must be implemented. If saving fails after retries, the data should be queued in localStorage and synced on next connection.

---

## 17. Future Expansion

- **World 5+:** Additional learning worlds targeting measurement, data collection, and basic experimentation design
- **Multi-language support:** English and regional Indonesian languages (Javanese, Sundanese)
- **AI Scaffolding:** Adaptive difficulty adjustment based on learning trajectory data
- **Offline Mode:** Full PWA capability with service workers for low-connectivity environments
- **Classroom Mode:** Real-time teacher visibility into active student sessions
- **Print Companion:** Printable activity sheets that bridge digital and physical inquiry
- **Peer Learning:** Collaborative activities where two children explore together

---

## 18. Dependencies

| Dependency | Document |
|---|---|
| Technology choices | `steering/tech-stack.md` |
| Pedagogical model | `steering/pedagogy.md` |
| Learning framework | `steering/learning-framework.md` |
| Mathematical inquiry approach | `steering/mathematical-inquiry.md` |
| Engagement mechanics | `steering/engagement.md` |
| UI design system | `steering/ui-guidelines.md` |
| Accessibility requirements | `steering/accessibility.md` |
| Assessment approach | `steering/assessment-framework.md` |
| LIDM competition requirements | `steering/lidm-2026.md` |

---

## 19. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Audio assets not completed before deadline | High | High | Prioritize voice-over production in sprint planning; use TTS as fallback |
| Child engagement lower than expected | Medium | High | Conduct user testing with children early in development |
| Competition evaluators unfamiliar with inquiry learning | Medium | Medium | Provide in-platform explanation of pedagogical rationale visible to evaluators |
| Performance issues on low-end tablets | Medium | High | Test on mid-range Android tablet from Sprint 1; optimize asset delivery |
| Supabase Auth complexity for child accounts | Low | Medium | Abstract auth behind server actions; design child login as PIN-based |
| Scope creep from feature additions | High | Medium | Lock feature scope after Sprint 2; all additions require explicit approval against this document |

---

## 20. References

This document is the root steering document. All other documents in `.kiro/steering/` and `.kiro/specs/` reference and extend this document. It should be read before all others.

**External References:**
- Piaget, J. (1952). *The Origins of Intelligence in Children.* Norton.
- Vygotsky, L. S. (1978). *Mind in Society.* Harvard University Press.
- National Council of Teachers of Mathematics. (2000). *Principles and Standards for School Mathematics.*
- Kemendikbudristek. (2022). *Kurikulum Merdeka: Panduan Pembelajaran dan Asesmen.*
- UNICEF. (2017). *The State of the World's Children: Children in a Digital World.*
- Ministry of Education and Culture of Indonesia. (2021). *Profil Pelajar Pancasila.*