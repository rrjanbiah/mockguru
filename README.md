# 🧠 MockGuru

**MockGuru** is a sleek, mobile-friendly mock test web app built with **Next.js (Pages Router)** and **Tailwind CSS**. It helps students prepare for competitive exams like **BITSAT, JEE, NEET, SNUCEE, SNUSAT, SRMJEE, UPSC, VITEEE, STEP+**, and more by letting them upload or paste MCQs in CSV or markdown format, and take configurable tests with instant or end-of-test feedback.

---

## ✨ Features

- 📝 Paste MCQs in CSV or markdown format
- 🎛️ Customizable test settings (pagination, timer, answer visibility)
- 📄 Question formats: single or multiple correct answers
- ⏱️ Countdown timer with sticky header
- 📊 Result summary with explanations
- 🖨️ Print-friendly final result view
- 📂 Static SEO pages for each exam with syllabus and cheat sheets
- 🧩 Strong TypeScript typing and clean architecture

---

## 🧪 Sample CSV Format

```csv
exam,section,subject,question,option_a,option_b,option_c,option_d,correct_option,explanation
JEE,Physics,Mechanics,What is Newton's second law?,Force = mass x acceleration,Force = mass / acceleration,Velocity = mass x acceleration,Force = acceleration / mass,A,It's the fundamental principle of dynamics.
```

Supports multiple correct options like `A,C`.
