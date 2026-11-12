import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { portfolioItemBySlugQuery } from "@/sanity/lib/queries";
import { ProseBlock } from "@components/atoms/ProseBlock";
import { PortableText } from "@components/atoms/PortableText";
import { Breadcrumb } from "@components/molecules/Breadcrumb";
import { PortfolioItemHero } from "@components/organisms/PortfolioItemHero/PortfolioItemHero";
import { getSiteChrome } from "@/lib/getSiteChrome";
import { hasPortfolioAccess } from "@/lib/portfolioAccess";
import { PageLayout } from "@components/templates/PageLayout";
import { WorkSections } from "./WorkSections";
import { PasswordGate } from "./PasswordGate";
import styles from "./page.module.css";

interface PortfolioItemData {
  _id: string;
  title: string;
  slug: string;
  portfolioItemType?: string;
  role?: string;
  client?: string;
  year?: string;
  isPasswordProtected?: boolean;
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

/**
 * Render per request: protected items depend on the visitor's access
 * cookie, so these pages must never be served from a shared static cache.
 */
export const dynamic = "force-dynamic";

/** Every portfolio item stays out of search results — current and future,
 *  protected or not, and including the "Not Found" case. */
const NO_INDEX: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

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

  if (!item) return { title: "Not Found", robots: NO_INDEX };

  return {
    title: `${item.title} — Allison Nance`,
    // Don't leak a protected case study's summary into page metadata.
    description: item.isPasswordProtected
      ? undefined
      : item.excerpt || undefined,
    robots: NO_INDEX,
  };
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

  const locked =
    Boolean(item.isPasswordProtected) && !(await hasPortfolioAccess());

  const heroImage = item.featuredImage
    ? urlFor(item.featuredImage).width(2400).quality(80).auto("format").url()
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

  const breadcrumb = (
    <Breadcrumb
      parentLabel="Work"
      parentHref="/"
      current={item.client || item.title}
    />
  );

  const hero = (
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
  );

  if (locked) {
    // Only the title and breadcrumb render; the image, project info and
    // sections never reach the page until the password is entered.
    return (
      <PageLayout hideDefaultHeader header={header} footer={footer}>
        <div className={styles.sectionLayout}>
          <div className={styles.crumbSlot}>{breadcrumb}</div>
          <div className={styles.heroSlot}>
            <PortfolioItemHero heading={item.title} />
            <PasswordGate slug={item.slug} />
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      hideDefaultHeader
      header={header}
      footer={footer}
    >
      {sections.length > 0 ? (
        <WorkSections breadcrumb={breadcrumb} hero={hero} sections={sections}>
          {sections.map((section) => (
            <section key={section.key} id={section.target}>
              {section.navLabel && (
                <p className={styles.sectionLabel}>{section.navLabel}</p>
              )}
              <ProseBlock maxWidth="none">
                {section.body && <PortableText value={section.body} />}
              </ProseBlock>
            </section>
          ))}
        </WorkSections>
      ) : (
        <div className={styles.sectionLayout}>
          <div className={styles.crumbSlot}>{breadcrumb}</div>
          <div className={styles.heroSlot}>{hero}</div>
        </div>
      )}
    </PageLayout>
  );
}
