import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  portfolioItemBySlugQuery,
  portfolioItemSlugsQuery,
} from "@/sanity/lib/queries";
import { ProseBlock } from "@components/atoms/ProseBlock";
import { PortableText } from "@components/atoms/PortableText";
import { PortfolioItemHero } from "@components/organisms/PortfolioItemHero/PortfolioItemHero";
import { getSiteChrome } from "@/lib/getSiteChrome";
import { PageLayout } from "@components/templates/PageLayout";
import { WorkSections } from "./WorkSections";
import styles from "./page.module.css";

interface PortfolioItemData {
  _id: string;
  title: string;
  slug: string;
  portfolioItemType?: string;
  role?: string;
  client?: string;
  year?: string;
  featuredImage?: {
    asset: { _ref: string; url: string };
    alt: string;
  };
  categories?: string[];
  excerpt?: string;
  sections?: {
    _key: string;
    navLabel: string;
    body: any[];
  }[];
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item: PortfolioItemData | null = await client.fetch(
    portfolioItemBySlugQuery,
    { slug },
  );

  if (!item) return { title: "Not Found" };

  return {
    title: `${item.title} — Allison Nance`,
    description: item.excerpt || undefined,
  };
}

/** Pre-generate pages for all portfolio items. */
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(
    portfolioItemSlugsQuery,
  );
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [item, { header, footer }]: [
    PortfolioItemData | null,
    Awaited<ReturnType<typeof getSiteChrome>>,
  ] = await Promise.all([
    client.fetch(portfolioItemBySlugQuery, { slug }),
    getSiteChrome(),
  ]);

  if (!item) notFound();

  const heroImage = item.featuredImage
    ? urlFor(item.featuredImage).width(1200).quality(80).auto("format").url()
    : undefined;

  const tiles = [
    item.role ? { label: "Role", value: item.role } : null,
    item.portfolioItemType
      ? {
          label: "Type",
          value: item.portfolioItemType === "case-study"
            ? "Case Study"
            : "Overview",
        }
      : null,
    item.client ? { label: "Client", value: item.client } : null,
    item.year ? { label: "Year", value: item.year } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const sections = (item.sections ?? []).map((s) => ({
    key: s._key,
    navLabel: s.navLabel,
    target: s._key,
    body: s.body,
  }));

  return (
    <PageLayout
      hideDefaultHeader
      flush
      header={header}
      footer={footer}
    >
      <PortfolioItemHero
        heading={item.title}
        description={item.excerpt}
        tiles={tiles}
        media={
          heroImage ? (
            <img src={heroImage} alt={item.featuredImage?.alt || ""} />
          ) : undefined
        }
      />

      {sections.length > 0 && (
        <WorkSections sections={sections}>
          {sections.map((section) => (
            <section key={section.key} id={section.target}>
              <ProseBlock>
                {section.body && <PortableText value={section.body} />}
              </ProseBlock>
            </section>
          ))}
        </WorkSections>
      )}
    </PageLayout>
  );
}
