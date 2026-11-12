import { forwardRef, type HTMLAttributes } from "react";
import { ArrowLeft } from "@carbon/icons-react";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Label for the parent link (e.g. "Work"). */
  parentLabel: string;
  /** Where the parent link goes (e.g. "/"). */
  parentHref: string;
  /** Current page label (e.g. the client name), shown after the separator. */
  current: string;
}

/**
 * Breadcrumb — "← Parent / Current" trail shown above a detail page.
 * The parent is a link back; the current page is plain text.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    { parentLabel, parentHref, current, className, ...rest },
    ref,
  ) {
    const classes = [styles.root, className].filter(Boolean).join(" ");

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={classes} {...rest}>
        <ol className={styles.list}>
          <li className={styles.item}>
            <a href={parentHref} className={styles.parent}>
              <ArrowLeft size={16} className={styles.arrow} aria-hidden />
              <span>{parentLabel}</span>
            </a>
          </li>
          <li className={styles.item}>
            <span className={styles.separator} aria-hidden>
              /
            </span>
            <span className={styles.current} aria-current="page">
              {current}
            </span>
          </li>
        </ol>
      </nav>
    );
  },
);
