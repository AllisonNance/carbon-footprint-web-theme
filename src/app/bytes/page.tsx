import { Suspense } from "react";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { bytesQuery, categoriesQuery } from "@/sanity/lib/queries";
import { getSiteChrome } from "@/lib/getSiteChrome";
import { PageLayout } from "@components/templates/PageLayout";
import { BytesFeed } from "./BytesFeed";

interface SanityByte {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  categories?: string[];
  body?: any[];
}

interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
  count: number;
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Bytes — Allison Nance",
  description:
    "A brief piece of insight, observation, or practical learning.",
};

export default async function BytesPage() {
  const [bytes, categories, { header, footer }]: [
    SanityByte[],
    SanityCategory[],
    Awaited<ReturnType<typeof getSiteChrome>>,
  ] = await Promise.all([
    client.fetch(bytesQuery),
    client.fetch(categoriesQuery),
    getSiteChrome(),
  ]);

  return (
    <PageLayout hideDefaultHeader header={header} footer={footer}>
      <Suspense fallback={null}>
        <BytesFeed bytes={bytes} categories={categories} />
      </Suspense>
    </PageLayout>
  );
}
