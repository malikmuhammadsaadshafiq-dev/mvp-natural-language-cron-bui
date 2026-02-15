<div align="center">

# Natural Language Cron Builder

**Convert plain English scheduling descriptions like 'every Monday at 2pm' into valid cron expressions**

![Next.js](https://img.shields.io/badge/Next.js-333?style=flat-square) ![OpenAI GPT-4 API](https://img.shields.io/badge/OpenAI%20GPT--4%20API-333?style=flat-square) ![node-cron parser](https://img.shields.io/badge/node--cron%20parser-333?style=flat-square)
![AI Powered](https://img.shields.io/badge/AI-Powered-blueviolet?style=flat-square)
![Type](https://img.shields.io/badge/Type-SaaS%20Platform-blue?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-13%2F14-brightgreen?style=flat-square)

</div>

---

## Problem

Cron syntax is cryptic and error-prone; developers waste time looking up reference sheets for simple schedules

## Who Is This For?

Developers, DevOps engineers, system administrators


## Inspiration

Built based on trending product categories and market analysis of high-demand utility tools.


## Features

- **Natural language input parser that understands complex recurrence patterns**
- **Plain English explanation generator for existing cron expressions**

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js | Core dependency |
| OpenAI GPT-4 API | Core dependency |
| node-cron parser | Core dependency |
| Kimi K2.5 (NVIDIA) | AI/LLM integration |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/malikmuhammadsaadshafiq-dev/mvp-natural-language-cron-bui.git
cd mvp-natural-language-cron-bui
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Core Workflows

**1. Natural language input parser that understands complex recurrence patterns**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**2. Plain English explanation generator for existing cron expressions**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

### AI Features

This app uses **Kimi K2.5** via NVIDIA API for intelligent processing.

To use AI features, add your NVIDIA API key:
```bash
# Create .env.local file
echo "NVIDIA_API_KEY=nvapi-your-key" > .env.local
```

Get a free API key at [build.nvidia.com](https://build.nvidia.com)


## Quality Assurance

| Test | Status |
|------|--------|
| Has state management | ✅ Pass |
| Has form/input handling | ✅ Pass |
| Has click handlers (2+) | ✅ Pass |
| Has demo data | ⚠️ Needs attention |
| Has loading states | ✅ Pass |
| Has user feedback | ✅ Pass |
| No placeholder text | ✅ Pass |
| Has CRUD operations | ✅ Pass |
| Has empty states | ✅ Pass |
| Has responsive layout | ✅ Pass |
| Has search/filter | ✅ Pass |
| Has tab navigation | ✅ Pass |
| Has data persistence | ✅ Pass |
| No dead links | ✅ Pass |

**Overall Score: 13/14**

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   └── components/       # Reusable UI components
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS config
└── tsconfig.json         # TypeScript config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — use freely for personal and commercial projects.

---

<div align="center">

**Built autonomously by [NeuraFinity MVP Factory](https://github.com/malikmuhammadsaadshafiq-dev/NeuraFinity)** — an AI-powered system that discovers real user needs and ships working software.

</div>
