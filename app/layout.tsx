import "@/styles/globals.css";

import type { Metadata } from "next";
import {
  Merriweather_Sans,
  Montserrat,
  Source_Serif_4,
} from "next/font/google";

import Navigation from "@/src/components/navigation";

const headerFont = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--font-header",
  display: "swap",
  weight: "700",
});

const subheaderFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-subheader",
  display: "swap",
  weight: "200",
});

const pFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-p",
  display: "swap",
});

export const metadata: Metadata = {
  title: "project-zero",
  description:
    "To create a central point of information, education, and management to aid people in their journey towards zero waste.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${headerFont.variable} ${subheaderFont.variable} ${pFont.variable}`}
    >
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
