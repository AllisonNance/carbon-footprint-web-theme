import type { Metadata } from "next";
import type { ReactNode } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { faviconQuery } from "@/sanity/lib/queries";
import "@styles/globals.css";

interface FaviconSettings {
  favicon?: { asset?: { _ref: string; url: string } };
}

export async function generateMetadata(): Promise<Metadata> {
  const settings: FaviconSettings | null = await client.fetch(faviconQuery);
  const favicon = settings?.favicon;
  const icon = favicon
    ? urlFor(favicon).width(64).height(64).url()
    : undefined;

  return {
    title: {
      default: "Allison Nance — UX Designer",
      template: "%s",
    },
    description:
      "I bring an implementation-minded approach to UX, connecting strategy, interface design, systems thinking, and AI-assisted coding to translate ideas into experiences.",
    icons: icon ? { icon } : undefined,
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
