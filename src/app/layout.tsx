import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { FONT_FAMILY, THEME } from "@/data/portfolio-data";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "froxtq site",
  description: "Terminal style portfolio built with Next.js"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={jetbrains.className}
        style={
          {
            "--terminal-font": FONT_FAMILY,
            "--bg": THEME.bg,
            "--text": THEME.text,
            "--muted": THEME.muted,
            "--accent": THEME.accent,
            "--accent-2": THEME.accentSecondary,
            "--border": THEME.border
          } as CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
