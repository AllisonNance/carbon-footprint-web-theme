import {
  forwardRef,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./PageTitleBlock.module.css";

export interface PageTitleBlockProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Page title — rendered as the only `<h1>`. Accepts JSX for inline formatting. */
  heading: ReactNode;
  /** Optional inline keyword labels shown between heading and description. */
  tags?: string[];
  /** Optional description shown below the heading. */
  description?: string;
  /** Optional image rendered to the left of the heading area.
   *  Displayed as a circle (e.g. profile photo). */
  image?: ReactNode;
}

/**
 * PageTitleBlock — horizontal page chrome: dominant `<h1>` on the left and a
 * primary button with trailing arrow on the right. Light-surface spacing
 * aligned with Carbon product page headers.
 */
export const PageTitleBlock = forwardRef<HTMLElement, PageTitleBlockProps>(
  function PageTitleBlock(
    {
      heading,
      tags,
      description,
      image,
      className,
      ...rest
    },
    ref,
  ) {
    const headingId = useId();
    const classes = [styles.root, className].filter(Boolean).join(" ");

    return (
      <header
        ref={ref}
        className={classes}
        aria-labelledby={headingId}
        {...rest}
      >
        <div className={styles.inner}>
          {image && <div className={styles.image}>{image}</div>}
          <h1 id={headingId} className={styles.heading}>
            {heading}
          </h1>
          {description && (
            <p className={`${styles.description} type-body-01`}>
              {description}
            </p>
          )}
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag, i) => (
                <span key={i} className={styles.tagWrap}>
                  {i > 0 && <span className={styles.tagDot} aria-hidden>·</span>}
                  <span className={styles.tag}>{tag}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
    );
  },
);

PageTitleBlock.displayName = "PageTitleBlock";
