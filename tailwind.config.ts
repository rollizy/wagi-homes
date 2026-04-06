import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ochre: {
          50:  '#fdf8ef',
          100: '#f8edcf',
          200: '#f0d99a',
          300: '#e6c065',
          400: '#daa93c',
          500: '#C9A870',   // primary gold — matches logo lines
          600: '#b08a45',
          700: '#8c6b32',
          800: '#6b5028',
          900: '#4a3618',
        },
        // Dark tones kept for the panorama viewer UI only
        navy: {
          900: '#0c0c17',
          800: '#12121E',
          700: '#1a1a2e',
          600: '#222236',
          500: '#2c2c45',
          400: '#3a3a58',
        },
        // Light palette — used for all reading surfaces
        sand: {
          50:  '#fdfaf5',   // page background — warm white
          100: '#f7f1e6',   // card background
          200: '#ede3d0',   // subtle dividers
          300: '#dfd0b4',   // borders
          400: '#c9b48a',   // muted text
        },
        stone: '#3d3427',   // primary dark text on light backgrounds
        cream: '#f5f0e8',   // light text on dark backgrounds (panorama UI)
      },
    },
  },
  plugins: [],
}

export default config
