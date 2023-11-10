import "@/styles/globals.css";

import type { Metadata } from "next";
import Navigation from "./components/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "project-zero",
  description:
    "To create a central point of information, education, and management to aid people in their journey towards zero waste.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Source+Serif+4:opsz,wght@8..60,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
