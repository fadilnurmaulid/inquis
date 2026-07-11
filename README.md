# INQUIS

> **Inquiry-Based Interactive Scientific Learning Platform for Early Childhood Education**

<p align="center">

A modern inquiry-based digital learning platform designed to cultivate **Scientific Thinking** and **Environmental Awareness** in children aged **5–7 years** through interactive exploration of nature, playful learning, and evidence-based pedagogy.

Built for **Lomba Inovasi Digital Mahasiswa (LIDM) 2026**.

</p>

---

## Overview

INQUIS is an educational web application that introduces children to the fundamentals of scientific thinking and environmental care using an Inquiry Learning approach.

Instead of emphasizing memorization, INQUIS encourages children to:

- Observe
- Ask questions
- Predict outcomes
- Explore solutions
- Draw conclusions

through engaging mathematical patterns and everyday phenomena.

The platform also provides parents and teachers with learning analytics to monitor children's cognitive development and inquiry skills.

---

## Educational Objectives

INQUIS aims to help children develop:

- Scientific Thinking
- Observation Skills
- Pattern Recognition
- Logical Reasoning
- Prediction Skills
- Problem Solving
- Curiosity
- Environmental Awareness

---

## Learning Framework

The learning model follows the Inquiry Learning Cycle:

```text
Observe
      ↓
Question
      ↓
Predict
      ↓
Explore
      ↓
Conclude
```

This framework is integrated into every learning activity throughout the platform.

---

## Learning Worlds

### 🌱 World 1 — Pattern Explorer

Recognize patterns and make predictions.

Children learn to identify mathematical relationships through playful activities.

---

### 🍎 World 2 — Sorting Explorer

Develop classification and logical reasoning skills.

Children group objects based on observable characteristics.

---

### 🌤 World 3 — Prediction Explorer

Understand simple cause-and-effect relationships.

Children make predictions based on everyday scenarios.

---

### 🔬 World 4 — Little Scientist

Integrate previous skills into complete scientific inquiry activities.

Children solve contextual problems using observation, reasoning, and evidence.

---

## Features

### Child Experience

- Inquiry-based learning activities
- Progressive learning worlds
- Interactive gameplay
- Achievement system
- Progress tracking
- Child-friendly interface
- Animated feedback

### Parent Dashboard

- Learning progress
- Achievement overview
- Recommended activities
- Child development summary

### Teacher Dashboard

- Classroom overview
- Student analytics
- Progress monitoring
- Learning insights

---

## Technology Stack

### Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend

- Supabase
- Prisma ORM
- PostgreSQL

### Authentication

- Supabase Auth

### Deployment

- Vercel

---

## Architecture

```text
app/
components/
lib/
prisma/
public/
.kiro/
```

The project follows a modular architecture with clear separation between:

- UI Components
- Business Logic
- Database Access
- Authentication
- Learning Services

---

## Project Structure

```text
INQUIS
├── app/
├── components/
├── lib/
├── prisma/
├── public/
├── .kiro/
├── package.json
└── README.md
```

---

## Local Development

Clone the repository.

```bash
git clone <repository-url>
```

Install dependencies.

```bash
npm install
```

Configure environment variables.

```bash
cp .env.example .env.local
```

Run Prisma.

```bash
npx prisma generate
npx prisma db push
```

Start the development server.

```bash
npm run dev
```

---

## Environment Variables

Example:

```env
DATABASE_URL=
DIRECT_URL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
```

---

## Demo

The application includes demonstration accounts for evaluation purposes.

Demo users allow reviewers to experience the platform without creating new accounts.

---

## Educational Principles

INQUIS is designed around several educational principles:

- Inquiry Learning
- Scientific Thinking
- Mathematical Inquiry
- Active Learning
- Play-Based Learning
- Environmental Awareness
- Child-Centered Learning

---

## Development Status

Current status:

- Foundation completed
- Authentication completed
- Dashboard completed
- Learning worlds implemented
- Parent dashboard implemented
- Teacher dashboard implemented
- Responsive layout completed
- Production deployment completed

---

## Roadmap

Future improvements may include:

- Adaptive learning
- AI-assisted learning recommendations
- Classroom management enhancements
- Additional learning worlds
- Gamification improvements
- Offline support

---

## Contributing

This repository is currently maintained as part of the LIDM 2026 project.

Contributions, discussions, and educational feedback are welcome.

---

## License

This project is intended for educational and research purposes.

Please refer to the project license for usage details.

---

## Authors

Developed by the **INQUIS Team** for **Lomba Inovasi Digital Mahasiswa (LIDM) 2026**.

---

## Acknowledgements

Special thanks to:

- Direktorat Pembelajaran dan Kemahasiswaan
- Lomba Inovasi Digital Mahasiswa (LIDM)
- Next.js
- Supabase
- Prisma
- Vercel

---

<p align="center">

Made with ❤️ to inspire young scientists through inquiry-based learning.

</p>