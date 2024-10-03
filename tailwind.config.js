/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'custom': '6px',
      },
      colors: {
        'custom': '#E2E8F0',
        info: '#9ca3af',
      },
    },
  },
  plugins: [],
}