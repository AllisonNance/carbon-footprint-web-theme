import type { Metadata } from "next";
import { TrafficCone } from "@carbon/icons-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  siteSettingsQuery,
  recentBytesQuery,
  currentFocusQuery,
} from "@/sanity/lib/queries";
import { PortfolioItemCard, PortfolioItemGrid } from "@components/molecules/PortfolioItemCard";
import { NoticeCard } from "@components/molecules/NoticeCard";
import { SparklesIcon } from "@components/atoms/SparklesIcon";
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
  cardMediaMobile?: CardMedia[];
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

function buildCardMediaElement(media: CardMedia | undefined): React.ReactNode {
  if (media?._type === "image") {
    const src = urlFor(media).width(800).quality(80).auto("format").url();
    return <img src={src} alt={media.alt || ""} />;
  }

  if (media?._type === "cardVideo" && media.videoUrl) {
    return (
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

  return undefined;
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
      <div className={styles.heroRow}>
        <PageTitleBlock
          heading={
            <>
              I&apos;m Allison,
              <br /> a UX designer and <em>systems</em> thinker.
            </>
          }
          tags={["Systems", "Strategy", "Scale"]}
          description="I connect strategy, interface design, and product structure to clarify workflows, reduce friction, and create scalable experiences that help people make confident decisions."
        />

        <NoticeCard
          className={styles.heroNotice}
          icon={<SparklesIcon size={28} />}
          heading="My portfolio is getting an update!"
          description="I'm currently refreshing my case studies to better reflect the way I think, design, collaborate, and build. Until they're ready, here's a snapshot of my work and contributions."
        />
      </div>

      {featuredWork.length > 0 && (
        <PortfolioItemGrid
          columns={gridColumns as 3 | 4}
          aria-label="Selected work"
        >
          {featuredWork.map((item) => {
            const mediaElement = buildCardMediaElement(item.cardMedia?.[0]);
            const mobileMediaElement = buildCardMediaElement(
              item.cardMediaMobile?.[0],
            );

            const typeLabel =
              item.portfolioItemType === "case-study"
                ? "Case Study"
                : item.portfolioItemType === "overview"
                  ? "Overview"
                  : item.portfolioItemType === "coming-soon"
                    ? "Coming Soon"
                    : undefined;

            return (
              <PortfolioItemCard
                key={item._id}
                title={item.title}
                href={item.isPlaceholder ? undefined : `/work/${item.slug}`}
                portfolioItemType={typeLabel}
                portfolioItemTypeIcon={
                  item.portfolioItemType === "coming-soon" ? (
                    <TrafficCone size={16} />
                  ) : undefined
                }
                media={mediaElement}
                mobileMedia={mobileMediaElement}
                year={item.year}
                client={item.client}
                description={item.isPlaceholder ? item.excerpt : undefined}
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
