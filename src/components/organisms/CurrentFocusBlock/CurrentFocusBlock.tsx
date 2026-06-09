import {
  forwardRef,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Chat } from "@carbon/icons-react";
import styles from "./CurrentFocusBlock.module.css";

export interface CurrentFocusItem {
  id: string | number;
  /** Focus area title (Carbon `heading-03`). */
  title: string;
  /** Supporting copy (Carbon `body-01`). */
  description: string;
  /** Bulleted entries for the right column. */
  contributions: string[];
  /**
   * Heading for the right column. Defaults to `"Contributions"`.
   */
  contributionsHeading?: string;
  /** Optional leading icon — defaults to Carbon `Chat`. */
  icon?: ReactNode;
}

export interface CurrentFocusBlockProps extends HTMLAttributes<HTMLElement> {
  /** Section title. Defaults to `"Current Focus"` (same scale as BytesBlock: `heading-04`). */
  heading?: string;
  /** Static focus rows — no links. */
  items: CurrentFocusItem[];
}

/**
 * CurrentFocusBlock — a static list describing what you’re working on.
 * Uses the same section heading treatment as `BytesBlock` (`type-heading-04`),
 * then Carbon body / compact heading hierarchy for each row. Layout is
 * two columns on wider viewports (~⅔ main + ⅓ contributions) and stacks on
 * narrow screens.
 */
export const CurrentFocusBlock = forwardRef<
  HTMLElement,
  CurrentFocusBlockProps
>(function CurrentFocusBlock(
  { heading = "Current Focus", items, className, ...rest },
  ref,
) {
  const headingId = useId();
  const classes = [styles.block, className].filter(Boolean).join(" ");

  return (
    <section
      ref={ref}
      className={classes}
      aria-labelledby={headingId}
      {...rest}
    >
      <header>
        <h2 id={headingId} className={`${styles.heading} type-heading-04`}>
          {heading}
        </h2>
      </header>

      <ul className={styles.list}>
        {items.map((item) => {
          const contributionsLabel =
            item.contributionsHeading ?? "Contributions";

          return (
            <li key={item.id} className={styles.item}>
              <div className={styles.row}>
                <div className={styles.primary}>
                  <div className={styles.primaryCopy}>
                    <h3 className={`${styles.itemTitle} type-heading-03`}>
                      {item.title}
                    </h3>
                    <p className={`${styles.description} type-body-01`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                <aside
                  className={styles.sidebar}
                  aria-labelledby={`contributions-heading-${String(item.id)}`}
                >
                  <p
                    id={`contributions-heading-${String(item.id)}`}
                    className={`${styles.contributionsLabel} type-heading-compact-01`}
                  >
                    {contributionsLabel}
                  </p>
                  <ul className={`${styles.contributionsList} type-body-01`}>
                    {item.contributions.map((line, i) => (
                      <li key={i} className={styles.contributionsItem}>
                        {line}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
});
