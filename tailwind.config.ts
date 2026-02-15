import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-fira-code)', 'monospace'],
      },
      colors: {
        'terminal-bg': '#0d1117',
        'terminal-card': '#161b22',
        'terminal-border': '#30363d',
        'terminal-text': '#c9d1d9',
        'terminal-muted': '#8b949e',
        'terminal-accent': '#3fb950',
        'terminal-button': '#238636',
        'terminal-button-hover': '#2ea043',
      },
    },
  },
  plugins: [],
};
export default config;