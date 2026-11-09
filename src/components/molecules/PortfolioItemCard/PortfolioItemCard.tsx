"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type Ref,
} from "react";
import { Tag } from "@components/atoms/Tag";
import styles from "./PortfolioItemCard.module.css";

export interface PortfolioItemCardProps extends HTMLAttributes<HTMLElement> {
  /** Portfolio item title. */
  title: string;
  /** Optional href — when set, the whole card becomes a link. */
  href?: string;
  /** Featured media — required. Typically an `<img>` but any element
   *  works (illustration block, video frame, etc.). The component
   *  renders it inside a 16:10 frame with `object-fit: cover`. */
  media: ReactNode;
  /** Optional alternate media shown only on mobile (below 42rem),
   *  replacing `media`. Falls back to `media` when omitted. */
  mobileMedia?: ReactNode;
  /** Client name. */
  client?: string;
  /** Year (e.g. "2026"). */
  year?: string;
  /** Short summary shown below the title (e.g. for a placeholder card
   *  without a live case study yet). */
  description?: string;
  /** Non-interactive taupe chips shown below the title (e.g. project
   *  contributions for a placeholder card without a live case study yet). */
  contributionTags?: string[];
  /** Short message that follows the cursor while hovering this card
   *  (e.g. "View case study", or "Coming Soon" for a card without a
   *  link yet). Shown whenever set, regardless of `href`, on pointing
   *  devices that support hover (desktop mouse). Set in Sanity. */
  hoverLabel?: string;
}

/**
 * PortfolioItemCard — a single editorial card for a portfolio item.
 * Composes Carbon icons and the type-* utility classes declared in
 * src/tokens/typography.css. Pair with `PortfolioItemGrid` for the
 * single-column list layout.
 */
export const PortfolioItemCard = forwardRef<
  HTMLElement,
  PortfolioItemCardProps
>(function PortfolioItemCard(
  {
    title,
    href,
    media,
    mobileMedia,
    client,
    year,
    description,
    contributionTags,
    hoverLabel,
    className,
    ...rest
  },
  ref,
) {
  const [canHover, setCanHover] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  useEffect(() => {
    setCanHover(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, []);

  const showCursorLabel = Boolean(hoverLabel && canHover);

  const trackCursor = (event: ReactMouseEvent<HTMLElement>) => {
    setCursorPos({ x: event.clientX, y: event.clientY });
  };

  const hideCursor = () => setCursorPos(null);

  const classes = [
    styles.card,
    showCursorLabel && styles.cursorTarget,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <div className={styles.media}>
        {mobileMedia ? (
          <>
            <div className={styles.mediaDesktop}>{media}</div>
            <div className={styles.mediaMobile}>{mobileMedia}</div>
          </>
        ) : (
          media
        )}
      </div>

      <h3 className={`${styles.title} type-heading-03`}>
        {href ? <span className={styles.titleLink}>{title}</span> : title}
      </h3>

      {description && (
        <p className={`${styles.description} type-body-01`}>{description}</p>
      )}

      {contributionTags && contributionTags.length > 0 && (
        <div className={styles.tags}>
          {contributionTags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      {(year || client) && (
        <div className={styles.meta}>
          {year && <span className={styles.year}>{year}</span>}
          {year && client && (
            <span className={styles.dot} aria-hidden>
              ·
            </span>
          )}
          {client && <span className={styles.client}>{client}</span>}
        </div>
      )}

      {showCursorLabel && cursorPos && (
        <span
          className={styles.cursorLabel}
          style={{ left: cursorPos.x, top: cursorPos.y }}
          aria-hidden
        >
          <span className={styles.cursorDot} />
          <span className={`${styles.cursorText} type-label-01`}>
            {hoverLabel}
          </span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        onMouseEnter={showCursorLabel ? trackCursor : undefined}
        onMouseMove={showCursorLabel ? trackCursor : undefined}
        onMouseLeave={showCursorLabel ? hideCursor : undefined}
        {...(rest as HTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <article
      ref={ref}
      className={classes}
      onMouseEnter={showCursorLabel ? trackCursor : undefined}
      onMouseMove={showCursorLabel ? trackCursor : undefined}
      onMouseLeave={showCursorLabel ? hideCursor : undefined}
      {...rest}
    >
      {content}
    </article>
  );
});
