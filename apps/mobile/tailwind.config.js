/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#0F172A",
        tertiary: "#F59E0B",
        neutral: "#64748B",
        blueButtonBackground: "#DAE2FD",
        blueButton: "#3525CD",
        yellowBtnBg: "#FEF3C7",
        yellowBtn: "#D97706",
      },
    },
  },
  plugins: [],
};
