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
        header: ['"Merriweather Sans"', "sans-serif"],
        subHeader: ['"Montserrat"', "sans-serif"],
        p: ['"Source Serif 4"', "serif"],
      },
      colors: {
        blue: "#7EBCE6",
        red: "#D16666",
        highlight: "#E9FFDB",
        green: "#7BA05B",
        dark: "#192F2C",
        black: "#1c1b1a",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
      },
    },
  },
  plugins: [],
};
export default config;
