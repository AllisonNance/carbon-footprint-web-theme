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
          alt="Best viewed on a computer"
          width={88}
          height={31}
        />
      }
      links={footerLinks}
      infoItems={infoItems}
    />
  );
}
