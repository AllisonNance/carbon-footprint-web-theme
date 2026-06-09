import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Catalog } from "@carbon/icons-react";
import styles from "./PortfolioItemCard.module.css";

export interface PortfolioItemCardProps extends HTMLAttributes<HTMLElement> {
  /** Portfolio item type label above the media (e.g. "Project", "Case Study"). */
  portfolioItemType?: string;
  /** Portfolio item type icon. Defaults to a small catalog glyph. */
  portfolioItemTypeIcon?: ReactNode;
  /** Portfolio item title. */
  title: string;
  /** Optional href — when set, the title becomes a link with an
   *  animated underline. */
  href?: string;
  /** Featured media — required. Typically an `<img>` but any element
   *  works (illustration block, video frame, etc.). The component
   *  renders it inside a 3:4 portrait frame with `object-fit: cover`. */
  media: ReactNode;
  /** Client name. */
  client?: string;
  /** Year (e.g. "2026"). */
  year?: string;
}

/**
 * PortfolioItemCard — a single editorial card for a portfolio item.
 * Composes Carbon icons and the type-* utility classes declared in
 * src/tokens/typography.css. Pair with `PortfolioItemGrid` for the
 * 4-up gallery layout.
 */
export const PortfolioItemCard = forwardRef<
  HTMLElement,
  PortfolioItemCardProps
>(function PortfolioItemCard(
  {
    portfolioItemType = "Project",
    portfolioItemTypeIcon,
    title,
    href,
    media,
    client,
    year,
    className,
    ...rest
  },
  ref,
) {
  const classes = [styles.card, className].filter(Boolean).join(" ");

  return (
    <article ref={ref} className={classes} {...rest}>
      <div className={`${styles.eyebrow} type-label-01`}>
        <span className={styles.eyebrowIcon} aria-hidden>
          {portfolioItemTypeIcon ?? <Catalog size={16} />}
        </span>
        <span>{portfolioItemType}</span>
      </div>

      <div className={styles.media}>{media}</div>

      <h3 className={`${styles.title} type-heading-03`}>
        {href ? (
          <a href={href} className={styles.titleLink}>
            {title}
          </a>
        ) : (
          title
        )}
      </h3>

      {(year || client) && (
        <div className={styles.meta}>
          {year && <span className={styles.year}>{year}</span>}
          {year && client && <span className={styles.dot} aria-hidden>·</span>}
          {client && <span className={styles.client}>{client}</span>}
        </div>
      )}
    </article>
  );
});
