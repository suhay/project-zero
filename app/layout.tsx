import "@/styles/globals.css";

import type { Metadata } from "next";

import Navigation from "@/src/components/navigation";
import Context from "@/src/context/context";
import ThemeRegistry from "@/src/components/ThemeRegistry/ThemeRegistry";
import {
  baseFont,
  headerFont,
  subheaderFont,
} from "@/src/components/ThemeRegistry/fonts";
import { Footer } from "@/src/components/Footer";

export const metadata: Metadata = {
  title: "ZeroIn",
  description:
    "To create a central point of information, education, and management to aid people in their journey towards zero waste.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${headerFont.variable} ${subheaderFont.variable} ${baseFont.variable}`}
    >
      <body>
        <ThemeRegistry>
          <Context>
            <Navigation />
            <main className="min-h-[calc(100vh-398px-24px)]">{children}</main>
            <Footer />
          </Context>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
