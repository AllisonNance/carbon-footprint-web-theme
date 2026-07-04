import type { Metadata } from "next";
import type { ReactNode } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { layoutAssetsQuery } from "@/sanity/lib/queries";
import "@styles/globals.css";

interface LayoutAssets {
  favicon?: { asset?: { _ref: string; url: string } };
  brandFont?: {
    regularUrl?: string;
    regularItalicUrl?: string;
    semiboldUrl?: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const settings: LayoutAssets | null = await client.fetch(layoutAssetsQuery);
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

function buildBrandFontCss(brandFont?: LayoutAssets["brandFont"]): string {
  if (!brandFont) return "";

  const faces: string[] = [];

  if (brandFont.regularUrl) {
    faces.push(`@font-face {
      font-family: "Tiempos Text";
      src: url("${brandFont.regularUrl}") format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }`);
  }

  if (brandFont.regularItalicUrl) {
    faces.push(`@font-face {
      font-family: "Tiempos Text";
      src: url("${brandFont.regularItalicUrl}") format("woff2");
      font-weight: 400;
      font-style: italic;
      font-display: swap;
    }`);
  }

  if (brandFont.semiboldUrl) {
    faces.push(`@font-face {
      font-family: "Tiempos Text";
      src: url("${brandFont.semiboldUrl}") format("woff2");
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }`);
  }

  return faces.join("\n");
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings: LayoutAssets | null = await client.fetch(layoutAssetsQuery);
  const brandFontCss = buildBrandFontCss(settings?.brandFont);

  return (
    <html lang="en">
      <head>
        {brandFontCss ? (
          <style dangerouslySetInnerHTML={{ __html: brandFontCss }} />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
