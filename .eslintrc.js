module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
};
