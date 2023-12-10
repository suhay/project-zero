module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*"],
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
  },
};
