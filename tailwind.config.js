/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#e11d48',
        accent: '#f43f5e',
        surface: '#0f0a15',
        'surface-light': '#1a1025',
        'surface-lighter': '#2a1f3a',
      },
    },
  },
  plugins: [],
};
