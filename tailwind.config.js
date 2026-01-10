/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      // Добавляем Nunito Sans как основной шрифт
      fontFamily: {
        sans: ['"Nunito Sans"', "sans-serif"],
      },
      // Цвета из твоего макета
      colors: {
        dark: {
          primary: "#273142",
        },
      },
    },
  },
  plugins: [],
};
