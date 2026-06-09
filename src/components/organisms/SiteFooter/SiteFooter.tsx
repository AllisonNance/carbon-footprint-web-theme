import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./SiteFooter.module.css";

export interface SiteFooterNavItem {
  label: string;
  href: string;
}

export interface SiteFooterInfoItem {
  /** Carbon icon element. */
  icon: ReactNode;
  /** Text label next to the icon. */
  text: string;
}

export interface SiteFooterProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Supporting line. Accepts JSX for inline icons. */
  tagline: ReactNode;
  /** Two inline text links shown below the tagline. */
  links?: SiteFooterNavItem[];
  /** Info items with icons shown on the right (e.g. location, timezone). */
  infoItems?: SiteFooterInfoItem[];
}

/**
 * SiteFooter — dark Carbon-style two-tier footer: main band (name +
 * tagline + links left, info items right) and a black legal strip.
 * Scoped with `data-theme="g100"` so `--background`, `--text-*`, and
 * `--link-*` tokens resolve correctly even when the rest of the page
 * uses a light theme.
 */
export const SiteFooter = forwardRef<HTMLElement, SiteFooterProps>(
  function SiteFooter(
    {
      tagline,
      links,
      infoItems,
      className,
      ...rest
    },
    ref,
  ) {
    const classes = [styles.footer, className].filter(Boolean).join(" ");

    return (
      <footer
        ref={ref}
        className={classes}
        data-theme="g100"
        {...rest}
      >
        <div className={styles.main}>
          <div className={styles.mainInner}>
            <div className={styles.brand}>
              <p className={styles.tagline}>{tagline}</p>

              {links && links.length > 0 && (
                <div className={styles.links}>
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={styles.link}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {infoItems && infoItems.length > 0 && (
              <div className={styles.info}>
                {infoItems.map((item, i) => (
                  <div key={i} className={styles.infoItem}>
                    <span className={styles.infoIcon} aria-hidden>
                      {item.icon}
                    </span>
                    <span className={styles.infoText}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </footer>
    );
  },
);

SiteFooter.displayName = "SiteFooter";
