"use client";

import { Location, Time } from "@carbon/icons-react";
import { SiteFooter, type SiteFooterNavItem, type SiteFooterInfoItem } from "./SiteFooter";
import styles from "./SiteFooter.module.css";

/** "Designed" -> "DeSiGnEd": alternates letter case, skipping non-letters,
 *  continuing across words like an early-2000s AIM away message. */
function altCase(text: string, startUpper = true): string {
  let upper = startUpper;
  return text.replace(/[a-z]/gi, (ch) => {
    const out = upper ? ch.toUpperCase() : ch.toLowerCase();
    upper = !upper;
    return out;
  });
}

export interface SiteFooterDefaultProps {
  /** Footer links from Sanity. Falls back to defaults. */
  links?: SiteFooterNavItem[];
  /** Location text. */
  location?: string;
  /** Timezone text. */
  timezone?: string;
}

export function SiteFooterDefault({
  links,
  location,
  timezone,
}: SiteFooterDefaultProps) {
  const footerLinks = links ?? [{ label: "Privacy", href: "/privacy" }];

  const infoItems: SiteFooterInfoItem[] = [];
  if (location) {
    infoItems.push({ icon: <Location size={20} />, text: location });
  }
  if (timezone) {
    infoItems.push({ icon: <Time size={20} />, text: timezone });
  }

  // Fallback if nothing from Sanity
  if (infoItems.length === 0) {
    infoItems.push(
      { icon: <Location size={20} />, text: "Birmingham, AL area" },
      { icon: <Time size={20} />, text: "Central time zone" },
    );
  }

  return (
    <SiteFooter
      tagline={
        <>
          {/* Screen readers get the plain sentence; the AIM-style
              version is visual only. */}
          <span className={styles.srOnly}>
            Designed and built with love by Allison.
          </span>
          <span className={styles.credit} aria-hidden="true">
            {altCase("Designed and built with")}{" "}
            <span className={styles.heart}>&lt;3</span> {altCase("by Allison.")}
          </span>
        </>
      }
      badge={
        <img
          className={styles.badge}
          src="/images/badges/best-viewed-on.png"
          alt="Best Viewed on Desktop"
          width={88}
          height={31}
        />
      }
      links={footerLinks}
      afterLinks={
        <span className={styles.cheat}>
          <svg
            className={styles.gamepad}
            viewBox="0 0 40 24"
            width={23}
            height={14}
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="currentColor"
              d="M12 3C7.0625 3 3 7.0625 3 12C3 17 7.0625 21 12 21H28C33 21 37 17 37 12C37 7.0625 33 3 28 3H12ZM0 12C0 5.375 5.375 0 12 0H28C34.625 0 40 5.375 40 12C40 18.625 34.625 24 28 24H12C5.375 24 0 18.625 0 12ZM14.5 8.5V10.5H16.5C17.3125 10.5 18 11.1875 18 12C18 12.8125 17.3125 13.5 16.5 13.5H14.5V15.5C14.5 16.3125 13.8125 17 13 17C12.1875 17 11.5 16.3125 11.5 15.5V13.5H9.5C8.6875 13.5 8 12.8125 8 12C8 11.1875 8.6875 10.5 9.5 10.5H11.5V8.5C11.5 7.6875 12.1875 7 13 7C13.8125 7 14.5 7.6875 14.5 8.5ZM25 13C26.125 13 27 13.875 27 15C27 16.125 26.125 17 25 17C23.875 17 23 16.125 23 15C23 13.875 23.875 13 25 13ZM27 9C27 7.875 27.875 7 29 7C30.125 7 31 7.875 31 9C31 10.125 30.125 11 29 11C27.875 11 27 10.125 27 9Z"
            />
          </svg>
          {/* Screen readers get the words; the arrows are visual only. */}
          <span className={styles.srOnly}>
            Konami code: up, up, down, down, left, right, left, right, B, A
          </span>
          <span aria-hidden="true">↑ ↑ ↓ ↓ ← → ← → B A</span>
        </span>
      }
      infoItems={infoItems}
    />
  );
}
