import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Cristiano Ronaldo | CR7 Legacy",
    template: "%s | CR7 Legacy",
  },
  description:
    "Discover the inspiring journey of Cristiano Ronaldo, from his beginnings in Madeira to becoming a global football icon, role model, philanthropist, and symbol of discipline, sacrifice, and ambition.",
  keywords: [
    "Cristiano Ronaldo",
    "CR7",
    "Cristiano Ronaldo biography",
    "Cristiano Ronaldo story",
    "Cristiano Ronaldo legacy",
    "Cristiano Ronaldo achievements",
    "Cristiano Ronaldo role model",
    "Cristiano Ronaldo inspiration",
    "Madeira",
    "Sporting CP",
    "Manchester United",
    "Portugal football",
    "football legend",
    "global football icon",
    "youth inspiration",
    "discipline and hard work",
  ],
  authors: [{ name: "CR7 Legacy" }],
  creator: "CR7 Legacy",
  publisher: "CR7 Legacy",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}