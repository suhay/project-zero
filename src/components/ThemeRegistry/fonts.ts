import {
  Merriweather_Sans,
  Montserrat,
  Source_Serif_4,
} from "next/font/google";

export const headerFont = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--font-header",
  display: "swap",
  weight: "700",
});

export const subheaderFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-subheader",
  display: "swap",
  weight: "200",
});

export const baseFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-p",
  display: "swap",
});
