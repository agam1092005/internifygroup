# 🚀 InternifyGroup

**A Gamified Learning Platform for Software Development**

Welcome to InternifyGroup! This platform is built to make learning software development interactive, competitive, and highly rewarding. Instead of just reading tutorials, users can master tech stacks, earn XP, unlock badges, and climb the global leaderboard.

---

## 🛠 Tech Stack

Built with a modern and scalable tech stack:

- **Frontend**: [Next.js (App Router)](https://nextjs.org) & React
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) for micro-animations
- **Backend & Auth**: [Firebase](https://firebase.google.com/) (Firestore & Firebase Authentication)
- **Deployment**: [Vercel](https://vercel.com/)

---

## ✨ Key Features

- **🏆 Gamified Experience**: Learn by doing. Complete course milestones to earn XP and level up.
- **🥇 Global Leaderboard**: See how you rank against other developers. 
- **🎖 Badges & Achievements**: Unlock custom badges (like *First Login*, *3-Day Streak*, *React Beginner*) on your personalized profile.
- **📚 Interactive Courses**: Browse and enroll in curated Software Development courses ranging from Frontend Mastery to Backend Architecture.
- **🔐 Secure Authentication**: Fast and reliable user registration and login powered by Firebase Auth.
- **🎨 Minimalist Premium Design**: A beautiful, modern, dark-themed UI that focuses on typography and micro-interactions for a WOW effect.

---

## 👥 The Team

Our platform is brought to life by the following contributions:

- **Aashika Jain** – Feature thinking & MVP Definition
- **Abhishek Joy** – Wireframes & Workflow Diagram
- **Agampreet Singh** – Frontend & Firebase Integration

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/agam1092005/internifygroup.git
cd internifygroup
```

### 2. Install Dependencies
*Note: We use `--legacy-peer-deps` to resolve strict ESLint dependency conflicts.*
```bash
npm install --legacy-peer-deps
```

### 3. Setup Firebase Configuration
Create a `.env.local` file in the root directory and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result!
