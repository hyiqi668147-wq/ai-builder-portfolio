/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["ClashDisplay", "Inter", "ui-sans-serif", "system-ui"],
        serif: ["EditorialSerif", "Georgia", "serif"],
      },
      colors: {
        paper: "#e7e7e4",
        ink: "#19191b",
        muted: "#6c6c6f",
        line: "rgba(25,25,27,0.16)",
        violet: "#735CFF",
        cyan: "#6AD7FF",
      },
    },
  },
  plugins: [],
};
