/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raw: {
          dark: '#111111',
          black: '#0a0a0a',
          card: '#181818',
          border: '#2a2a2a',
          gold: '#c5a880',
          goldLight: '#dec9a8',
          goldDark: '#a08358',
          cream: '#f5efe6',
          sand: '#e8dcc4',
          gray: '#888888',
          lightGray: '#f8f8f8',
          textMuted: '#9e9e9e',
        }
      },
      fontFamily: {
        serif: ['"DM Sans"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        'luxury-gold': '0 10px 30px -10px rgba(197, 168, 128, 0.3)',
      }
    },
  },
  plugins: [],
}
