import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { PortfolioItemCard, PortfolioItemGrid } from "@components/molecules/PortfolioItemCard";
import { NoticeCard } from "@components/molecules/NoticeCard";
import { SparklesIcon } from "@components/atoms/SparklesIcon";
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
  client?: string;
  year?: string;
  isPlaceholder?: boolean;
  contributionTags?: string[];
  hoverLabel?: string;
  cardMedia?: CardMedia[];
  cardMediaMobile?: CardMedia[];
  categories?: string[];
  excerpt?: string;
}

interface SiteSettings {
  pageHeading?: string;
  pageDescription?: string;
  profileImage?: {
    asset?: { _ref: string; url: string };
    alt?: string;
  };
  featuredWork?: FeaturedWorkItem[];
}

function buildCardMediaElement(media: CardMedia | undefined): React.ReactNode {
  if (media?._type === "image") {
    const src = urlFor(media).width(2000).quality(80).auto("format").url();
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
  const [settings, { header, footer }]: [
    SiteSettings | null,
    Awaited<ReturnType<typeof getSiteChrome>>,
  ] = await Promise.all([
    client.fetch(siteSettingsQuery),
    getSiteChrome(),
  ]);

  const featuredWork = settings?.featuredWork ?? [];

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
              <br /> a <em>product designer</em> and <em>systems</em>{" "}
              <em>thinker</em>.
            </>
          }
          tags={["Systems", "Strategy", "Scale"]}
          description="I connect strategy, interface design, and product structure to clarify workflows and create scalable experiences."
          image={
            settings?.profileImage?.asset ? (
              <img
                src={urlFor(settings.profileImage)
                  .width(128)
                  .height(128)
                  .quality(80)
                  .auto("format")
                  .url()}
                alt={settings.profileImage.alt || ""}
              />
            ) : undefined
          }
        />

        <NoticeCard
          className={styles.heroNotice}
          icon={<SparklesIcon size={28} />}
          heading="My portfolio is getting an update!"
          description="I'm currently refreshing my case studies to better reflect the way I think, design, collaborate, and build. Until they're ready, here's a snapshot of my work and contributions."
        />
      </div>

      {featuredWork.length > 0 && (
        <PortfolioItemGrid aria-label="Selected work">
          {featuredWork.map((item) => {
            const mediaElement = buildCardMediaElement(item.cardMedia?.[0]);
            const mobileMediaElement = buildCardMediaElement(
              item.cardMediaMobile?.[0],
            );

            return (
              <PortfolioItemCard
                key={item._id}
                title={item.title}
                href={item.isPlaceholder ? undefined : `/work/${item.slug}`}
                media={mediaElement}
                mobileMedia={mobileMediaElement}
                year={item.year}
                client={item.client}
                description={item.isPlaceholder ? item.excerpt : undefined}
                hoverLabel={item.hoverLabel}
              />
            );
          })}
        </PortfolioItemGrid>
      )}
    </PageLayout>
  );
}
