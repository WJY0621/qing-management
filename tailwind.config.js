/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#1d8fc9",
        success: "#47C16F",
        danger: "#E62E2E",
        protein: "#2280c3",
        carbs: "#3fad4f",
        fat: "#f28c38",
        "background-light": "#f9fbfe",
        "surface-light": "#ffffff",
      },
      fontFamily: {
        display: ["Inter", "Noto Sans SC", "sans-serif"],
        sans: ["Noto Sans SC", "sans-serif"]
      },
      borderRadius: {
        'ios': '12px',
        'ios-lg': '16px',
        'ios-xl': '24px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
