import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "128": "32rem",
        "168": "42rem",
      },
      fontFamily: {
        Roboto: ['"Roboto"', "sans-serif"],
        "Source-Serif": ['"Source Serif 4"', "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
