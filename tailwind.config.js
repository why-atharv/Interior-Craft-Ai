/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#84A98C', // Sage Green
          light: '#A3BFA9',
          dark: '#6B8E72',
        },
        secondary: {
          DEFAULT: '#EDE0D4', // Warm Beige
          light: '#F5EBE1',
          dark: '#D9C8B8',
        },
        accent: {
          DEFAULT: '#D4A373', // Terracotta
          light: '#E2B890',
          dark: '#B88B5E',
        },
        surface: {
          DEFAULT: '#FAF7F2', // Soft Cream
          dark: '#F0EBE1',
        },
        dark: {
          DEFAULT: '#2F3E46', // Charcoal
          light: '#43555F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
