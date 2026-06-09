"use client";

import { forwardRef, type HTMLAttributes } from "react";
import styles from "./SectionNav.module.css";

export interface SectionNavItem {
  /** Visible label for the link. */
  label: string;
  /** Target element id (without `#`). */
  target: string;
}

export interface SectionNavProps extends HTMLAttributes<HTMLElement> {
  /** Ordered list of section links. */
  items: SectionNavItem[];
  /** Currently active section target id. */
  activeTarget: string;
  /** Pixels from the top for sticky positioning. Defaults to 48. */
  stickyOffset?: number;
  /** Callback when a nav link is clicked. */
  onNavigate?: (target: string) => void;
}

/**
 * SectionNav — vertical table-of-contents sidebar following Carbon's
 * "jump to section" pattern. Shows a vertical list with a left-border
 * active indicator on desktop, and a compact horizontal strip on mobile.
 */
export const SectionNav = forwardRef<HTMLElement, SectionNavProps>(
  function SectionNav(
    { items, activeTarget, stickyOffset = 48, onNavigate, className, ...rest },
    ref,
  ) {
    const classes = [styles.root, className].filter(Boolean).join(" ");

    const handleClick = (e: React.MouseEvent, target: string) => {
      e.preventDefault();
      onNavigate?.(target);
    };

    return (
      <>
        {/* Mobile: horizontal strip */}
        <div className={styles.mobileBar}>
          {items.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              className={[
                styles.mobileLink,
                activeTarget === item.target ? styles.mobileLinkActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={(e) => handleClick(e, item.target)}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop: vertical sidebar */}
        <nav
          ref={ref}
          className={classes}
          aria-label="Table of contents"
          style={
            { "--section-nav-offset": `${stickyOffset}px` } as React.CSSProperties
          }
          {...rest}
        >
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.target} className={styles.item}>
                <a
                  href={`#${item.target}`}
                  className={[
                    styles.link,
                    activeTarget === item.target ? styles.linkActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={(e) => handleClick(e, item.target)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </>
    );
  },
);
