import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name — Design & Development",
  description:
    "A personal portfolio exploring thoughtful design and precise development. An automotive-inspired digital experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        {/* The portfolio already supplies its own dark palette. */}
        <meta name="darkreader-lock" />
      </head>
      <body>{children}</body>
    </html>
  );
}
