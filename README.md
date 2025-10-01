# Kuest - Interactive Quiz & Form Builder

A modern, dark-mode quiz and form builder application built with Next.js, React, and Tailwind CSS.

## Features

- 🎨 **Beautiful Dark UI** - Modern glassmorphism design with 3D animations
- 📝 **Form Builder** - Create forms with multiple question types
- 🧠 **Questionnaire Mode** - Build quizzes with auto-scoring
- 🎯 **Customizable Themes** - 6 beautiful themes to choose from
- 📊 **Analytics** - View responses with charts and CSV export
- ⚡ **Real-time Scoring** - Automatic preliminary scoring for quizzes
- 🎨 **3D Animations** - Apple-like animations and floating 3D elements

## Question Types

- **Text Input** - Short text responses
- **Paragraph** - Long text responses  
- **Multiple Choice** - Single or multiple correct answers
- **Checkbox** - Multiple selections
- **Rating Scale** - Star ratings (1-10)

## Questionnaire Features

- **Passing Mark** - Set custom passing percentages (e.g., 70%)
- **Auto-scoring** - Automatic preliminary scoring
- **Pass/Fail Status** - Clear visual indicators
- **Teacher Review** - Final grading by teachers

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Three Fiber** - 3D elements
- **Recharts** - Data visualization
- **Local Storage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kuest-app.git
cd kuest-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect it's a Next.js app and deploy it
5. Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up/login
3. Click "New site from Git" and connect your GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `.next`
6. Deploy!

### Option 3: GitHub Pages (Static Export)

For GitHub Pages, you'll need to use static export:

1. Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

2. Build the app:
```bash
npm run build
```

3. The static files will be in the `out` directory
4. Push the `out` directory to a `gh-pages` branch
5. Enable GitHub Pages in repository settings

## Usage

### Creating Forms

1. Click "Create New Kuest" on the dashboard
2. Add a title and description
3. Choose between Standard Form or Questionnaire Mode
4. Add questions with different types
5. For questionnaires, set correct answers and passing marks
6. Save your form

### Taking Quizzes

1. Share the form link with users
2. Users fill out the form
3. For questionnaires, users see preliminary scores
4. Teachers can review and adjust final scores

### Viewing Responses

1. Go to the dashboard
2. Click "View Responses" on any form
3. See analytics, charts, and export data as CSV

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub.# kuest-app
# kuest-app
# kuest-app
# kuest-app
