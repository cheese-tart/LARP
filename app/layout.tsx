import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roboto = localFont({
  src: "./fonts/roboto-latin.woff2",
  weight: "100 900",
  display: "swap",
});

const dinClock = localFont({
  src: "./fonts/din1451-mittelschrift-bold.ttf",
  weight: "700",
  display: "swap",
  variable: "--font-clock",
});

export const metadata: Metadata = {
  title: "Your Name — Design & Development",
  description:
    "A personal portfolio exploring thoughtful design and precise development. An automotive-inspired digital experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.className} ${dinClock.variable}`}>
      <head>
        {/* The portfolio already supplies its own dark palette. */}
        <meta name="darkreader-lock" />
      </head>
      <body>{children}</body>
    </html>
  );
}
