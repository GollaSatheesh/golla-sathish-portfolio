# Satheesh Yadav — Personal Portfolio Website

A personal portfolio website for **Satheesh Yadav**, designed for Data Scientist and Machine Learning Engineer positions.

Built with **React 18**, **Vite**, and **Custom CSS** following a modern deep navy and teal aesthetic.

---

## 🚀 Quick Start

### 1. Prerequisites
Make sure **Node.js** (v18 or higher) is installed on your system.

### 2. Run the Development Server
Open your terminal inside this folder:
```powershell
npm run dev
```
Then visit `http://localhost:3000` in your web browser.

### 3. Build for Production
To generate an optimized production bundle:
```powershell
npm run build
```
The output files will be located in the `dist/` directory, ready to deploy to Netlify, Vercel, GitHub Pages, or any static host.

### 4. Preview the Production Build
```powershell
npm run preview
```

---

## 📁 Project Structure

```
satheesh-portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/         # Modular React components with scoped CSS
│   │   ├── Navbar/         # Glassmorphism navigation + mobile drawer
│   │   ├── Hero/           # Cinematic headline, CTAs, and orbital rings
│   │   ├── About/          # Background bio and 4 highlight cards
│   │   ├── Skills/         # Categorized skills grid (Data, ML, DL/NLP)
│   │   ├── Projects/       # Genuine projects + interactive pipeline card
│   │   ├── Workflow/       # 4-stage data science methodology
│   │   ├── Resume/         # Resume download CTA with placeholder alert
│   │   ├── Contact/        # Contact cards + message submission form
│   │   └── Footer/         # Clean copyright footer
│   ├── hooks/
│   │   └── useScrollReveal.js # IntersectionObserver scroll reveal animations
│   ├── styles/
│   │   └── global.css      # Design tokens (navy, teal), reset, utilities
│   ├── App.jsx             # Main layout component
│   └── main.jsx            # Entry point
├── index.html              # HTML template with Google Fonts (Inter, JetBrains Mono)
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite config
```

---

## 🎨 Customizing Details

When you are ready to update your real details:
- **Contact & Socials**: Open [`src/components/Contact/Contact.jsx`](file:///C:/Users/siddu/.gemini/antigravity/scratch/satheesh-portfolio/src/components/Contact/Contact.jsx) to update your actual email, LinkedIn URL, and GitHub profile URL.
- **Resume PDF**: Place your resume PDF in `public/satheesh-yadav-resume.pdf`, and update the button link in [`src/components/Resume/Resume.jsx`](file:///C:/Users/siddu/.gemini/antigravity/scratch/satheesh-portfolio/src/components/Resume/Resume.jsx).
- **Projects**: Project information can be modified directly in [`src/components/Projects/Projects.jsx`](file:///C:/Users/siddu/.gemini/antigravity/scratch/satheesh-portfolio/src/components/Projects/Projects.jsx).
