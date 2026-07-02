import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { byteBySlugQuery, byteSlugsQuery } from "@/sanity/lib/queries";
import { getSiteChrome } from "@/lib/getSiteChrome";
import { PageLayout } from "@components/templates/PageLayout";
import { ByteDetail } from "./ByteDetail";

interface SanityByte {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  categories?: string[];
  body?: any[];
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(byteSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const byte: SanityByte | null = await client.fetch(byteBySlugQuery, { slug });
  if (!byte) return { title: "Byte not found" };
  return {
    title: `${byte.title} — Bytes — Allison Nance`,
    description: `A byte: ${byte.title}`,
  };
}

export default async function BytePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [byte, { header, footer }]: [
    SanityByte | null,
    Awaited<ReturnType<typeof getSiteChrome>>,
  ] = await Promise.all([
    client.fetch(byteBySlugQuery, { slug }),
    getSiteChrome(),
  ]);

  if (!byte) notFound();

  return (
    <PageLayout hideDefaultHeader header={header} footer={footer}>
      <ByteDetail byte={byte} />
    </PageLayout>
  );
}
