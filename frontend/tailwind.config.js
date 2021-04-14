module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.ts",
    "./components/**/*.ts",
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
