import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./NoticeCard.module.css";

export interface NoticeCardProps extends HTMLAttributes<HTMLElement> {
  /** Icon shown above the heading (e.g. an animated glyph). */
  icon?: ReactNode;
  /** Notice heading. */
  heading: string;
  /** Supporting body copy. */
  description: string;
}

/**
 * NoticeCard — lightest-taupe callout for supplementary context (e.g. a
 * "portfolio is getting an update" notice next to the hero heading).
 */
export const NoticeCard = forwardRef<HTMLElement, NoticeCardProps>(
  function NoticeCard(
    { icon, heading, description, className, ...rest },
    ref,
  ) {
    const classes = [styles.root, className].filter(Boolean).join(" ");

    return (
      <aside ref={ref} className={classes} {...rest}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <p className={`${styles.heading} type-body-01`}>
          <strong>{heading}</strong>
        </p>
        <p className={`${styles.description} type-body-01`}>{description}</p>
      </aside>
    );
  },
);
