import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  siteSettingsQuery,
  recentBytesQuery,
  currentFocusQuery,
} from "@/sanity/lib/queries";
import { PortfolioItemCard, PortfolioItemGrid } from "@components/molecules/PortfolioItemCard";
import {
  BytesBlock,
  type ByteItem,
} from "@components/organisms/BytesBlock";
import { CurrentFocusBlock } from "@components/organisms/CurrentFocusBlock";
import { PageTitleBlock } from "@components/organisms/PageTitleBlock";
import { getSiteChrome } from "@/lib/getSiteChrome";
import { PageLayout } from "@components/templates/PageLayout";
import styles from "./page.module.css";

interface CardMediaImage {
  _type: "image";
  asset: { _ref: string; url: string };
  alt?: string;
}

interface CardMediaVideo {
  _type: "cardVideo";
  videoUrl: string;
  alt?: string;
  autoplay?: boolean;
  loop?: boolean;
}

type CardMedia = CardMediaImage | CardMediaVideo;

interface FeaturedWorkItem {
  _id: string;
  title: string;
  slug: string;
  portfolioItemType?: string;
  client?: string;
  year?: string;
  isPlaceholder?: boolean;
  contributionTags?: string[];
  cardMedia?: CardMedia[];
  categories?: string[];
  excerpt?: string;
}

interface SiteSettings {
  pageHeading?: string;
  pageDescription?: string;
  featuredWork?: FeaturedWorkItem[];
}

interface RecentByte {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category?: string;
}

interface FocusItem {
  _id: string;
  title: string;
  description: string;
  contributions?: string[];
  contributionsHeading?: string;
}

/** Revalidate every 60 seconds so Sanity edits appear quickly. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Allison Nance — UX Designer",
  description:
    "I bring an implementation-minded approach to UX, connecting strategy, interface design, systems thinking, and AI-assisted coding to translate ideas into experiences.",
};

export default async function HomePage() {
  const [settings, recentBytes, focusItems, { header, footer }]: [
    SiteSettings | null,
    RecentByte[],
    FocusItem[],
    Awaited<ReturnType<typeof getSiteChrome>>,
  ] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(recentBytesQuery),
    client.fetch(currentFocusQuery),
    getSiteChrome(),
  ]);

  const featuredWork = settings?.featuredWork ?? [];

  const byteItems: ByteItem[] = recentBytes.map((b) => ({
    id: b._id,
    category: b.category ?? "",
    byteTitle: b.title,
    href: `/bytes/${b.slug}`,
  }));

  const focusBlockItems = focusItems.map((f) => ({
    id: f._id,
    title: f.title,
    description: f.description,
    contributions: f.contributions ?? [],
    contributionsHeading: f.contributionsHeading,
  }));

  const gridColumns = featuredWork.length <= 3 ? 3 : 4;

  return (
    <PageLayout
      hideDefaultHeader
      header={header}
      footer={footer}
    >
      <PageTitleBlock
        heading={
          <>
            I&apos;m Allison,
            <br /> a UX designer who <em>builds.</em>
          </>
        }
        tags={["Systems", "Strategy", "AI Code"]}
        description="I bring an implementation-minded approach to UX, connecting strategy, interface design, systems thinking, and AI-assisted coding to translate ideas into experiences."
      />

      {featuredWork.length > 0 && (
        <PortfolioItemGrid
          columns={gridColumns as 3 | 4}
          aria-label="Selected work"
        >
          {featuredWork.map((item) => {
            const media = item.cardMedia?.[0];
            let mediaElement: React.ReactNode = undefined;

            if (media?._type === "image") {
              const src = urlFor(media)
                .width(800)
                .quality(80)
                .auto("format")
                .url();
              mediaElement = (
                <img src={src} alt={media.alt || ""} />
              );
            } else if (media?._type === "cardVideo" && media.videoUrl) {
              mediaElement = (
                <video
                  src={media.videoUrl}
                  autoPlay={media.autoplay ?? true}
                  loop={media.loop ?? true}
                  muted
                  playsInline
                  aria-label={media.alt || undefined}
                />
              );
            }

            const typeLabel =
              item.portfolioItemType === "case-study"
                ? "Case Study"
                : item.portfolioItemType === "overview"
                  ? "Overview"
                  : undefined;

            return (
              <PortfolioItemCard
                key={item._id}
                title={item.title}
                href={item.isPlaceholder ? undefined : `/work/${item.slug}`}
                portfolioItemType={typeLabel}
                media={mediaElement}
                year={item.year}
                client={item.client}
                contributionTags={
                  item.isPlaceholder ? item.contributionTags : undefined
                }
              />
            );
          })}
        </PortfolioItemGrid>
      )}

      <div className={styles.focusRow}>
        {byteItems.length > 0 && (
          <div className={styles.focusColBytes}>
            <BytesBlock items={byteItems} maxItems={4} moreHref="/bytes" />
          </div>
        )}
        {focusBlockItems.length > 0 && (
          <div className={styles.focusColCurrent}>
            <CurrentFocusBlock items={focusBlockItems} />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
