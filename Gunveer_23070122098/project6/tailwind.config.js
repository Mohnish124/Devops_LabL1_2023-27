/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#cce1ff',
          300: '#a8cfff',
          400: '#7cb5ff',
          500: '#4a95ff',
          600: '#2373ff',
          700: '#0054ff',
          800: '#0046d6',
          900: '#003ea6',
        }
      }
    },
  },
  plugins: [],
}
