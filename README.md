# RaxLearn Learner Platform

A modern, interactive learning platform built with Next.js 16, React 19, and TypeScript.

## Features

- 🎯 Multiple learning paths (Web Frontend, Backend, Mobile, Data Science, DevOps, etc.)
- 🚀 Project-based learning with real-world applications
- 🤖 AI-powered contextual assistance
- 🌍 Multi-language support (English, Swahili, French)
- 📊 Progress tracking and analytics
- 🎨 Modern UI with Tailwind CSS and Radix UI
- 🌙 Dark mode support

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Radix UI
- **Language:** TypeScript
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **AI:** Vercel AI SDK

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/davytheprogrammer/raxlearn-learner.git
cd raxlearn-learner

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Variables

Create a `.env` file with:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## Deployment

### Netlify

This project is configured for Netlify deployment:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or connect your GitHub repository to Netlify for automatic deployments.

## Project Structure

```
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/             # Utilities and data
├── hooks/           # Custom React hooks
├── public/          # Static assets
└── styles/          # Global styles
```

## License

MIT

## Author

Built with ❤️ by the RaxLearn team
