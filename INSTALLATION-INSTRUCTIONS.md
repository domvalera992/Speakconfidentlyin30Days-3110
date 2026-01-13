# 💻 Local Development Setup

If you want to run the app on your computer before deploying:

## Prerequisites

Install these first:
- **Node.js** (version 18 or higher): https://nodejs.org
- **npm** (comes with Node.js)

## Setup Steps

### 1. Extract Files
Unzip `language-learning-app-complete.zip` to a folder on your computer

### 2. Open Terminal/Command Prompt
Navigate to the project folder:
```bash
cd /path/to/language-learning-app
```

### 3. Install Dependencies
```bash
npm install
```
This downloads all required packages (takes 1-2 minutes)

### 4. Run Development Server
```bash
npm run dev
```

### 5. Open in Browser
Go to: http://localhost:5173

**You should see your app running locally!**

---

## Build for Production

To create optimized files for deployment:

```bash
npm run build
```

This creates a `dist` folder with production-ready files.

---

## Troubleshooting

**"npm: command not found"**
→ Install Node.js from https://nodejs.org

**Port already in use**
→ The app will suggest an alternative port automatically

**Build errors**
```bash
# Clear everything and start fresh
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

---

## File Structure

```
language-learning-app/
├── src/web/                      # Frontend code
│   ├── components/               # UI components
│   │   ├── onboarding/          # 6 onboarding screens
│   │   ├── dashboard/           # Main dashboard
│   │   ├── lesson/              # Lesson pages
│   │   ├── audio/               # Audio practice
│   │   ├── workbook/            # Exercises
│   │   ├── progress/            # XP, badges, levels
│   │   ├── payment/             # Payment screens
│   │   └── settings/            # Settings
│   ├── hooks/                   # Custom React hooks
│   ├── data/                    # Audio phrases data
│   └── pages/                   # Main app routes
├── public/                       # Static assets
├── package.json                  # Dependencies
├── vite.config.ts               # Build config
└── DEPLOYMENT-GUIDE.md          # How to go live
```

---

## Making Changes

### Change App Title
Edit `index.html` → Update `<title>` tag

### Change Colors
Edit `src/web/styles.css` → Modify color variables

### Add/Edit Phrases
Edit `src/web/data/audioPhrases.ts`

### Change Pricing
Search for `$34.99` across files and update

---

## Ready to Deploy?

See `DEPLOYMENT-GUIDE.md` for full instructions on deploying to:
- Vercel (recommended)
- Netlify
- Your own hosting

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

Good luck! 🚀
