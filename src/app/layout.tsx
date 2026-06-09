import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Allison Nance — UX Designer",
    template: "%s",
  },
  description:
    "I bring an implementation-minded approach to UX, connecting strategy, interface design, systems thinking, and AI-assisted coding to translate ideas into experiences.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
