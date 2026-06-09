import { forwardRef, useId, type HTMLAttributes } from "react";
import { Link } from "@components/atoms/Link";
import styles from "./BytesBlock.module.css";

export interface ByteItem {
  id: string | number;
  /** Category label above the title. */
  category: string;
  /** Byte title shown next to the thumbnail. Wraps freely. */
  byteTitle: string;
  /** Destination for the title + thumbnail links. */
  href: string;
}

export interface BytesBlockProps extends HTMLAttributes<HTMLElement> {
  /** Section heading. Defaults to "Bytes". */
  heading?: string;
  /** Items to render. Sliced to `maxItems`. */
  items: ByteItem[];
  /** Footer link label. Defaults to "More Bytes". */
  moreLabel?: string;
  /** Footer link destination. Defaults to "/feed". */
  moreHref?: string;
  /** Maximum items to render. Defaults to 5. */
  maxItems?: number;
}

/**
 * BytesBlock — a compact, vertically-stacked list of recent feed items
 * intended for sidebar / column placement on a homepage. Each row is a
 * 1:1 thumbnail next to a category eyebrow, a clickable title, and a
 * plain-text date line (semantic `<time>` with ISO `datetime`).
 * The block itself doesn't constrain its own width — wrap it in a
 * 1/4-column container (or whatever placement you want) to control sizing.
 */
export const BytesBlock = forwardRef<HTMLElement, BytesBlockProps>(
  function BytesBlock(
    {
      heading = "Bytes",
      items,
      moreLabel = "More Bytes",
      moreHref = "/feed",
      maxItems = 5,
      className,
      ...rest
    },
    ref,
  ) {
    const headingId = useId();
    const visible = items.slice(0, maxItems);
    const classes = [styles.block, className].filter(Boolean).join(" ");

    return (
      <section
        ref={ref}
        className={classes}
        aria-labelledby={headingId}
        {...rest}
      >
        <h2 id={headingId} className={`${styles.heading} type-heading-04`}>
          {heading}
        </h2>

        <ul className={styles.list}>
          {visible.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.body}>
                <p className={`${styles.category} type-label-01`}>
                  {item.category}
                </p>

                <h3 className={`${styles.title} type-body-compact-02`}>
                  <a href={item.href} className={styles.titleLink}>
                    {item.byteTitle}
                  </a>
                </h3>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <Link href={moreHref} size="md" className={styles.footerLink}>
            {moreLabel}
          </Link>
        </div>
      </section>
    );
  },
);
