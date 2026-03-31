import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#ffa159',
        cream: '#fff5e3',
        blue: '#7cbefa',
        purple: '#E8C4DC',
        white: '#ffffff',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        meow: ['var(--font-meow)', 'cursive'],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '40px',
      },
    },
  },
  plugins: [],
};

export default config;