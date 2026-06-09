"use client";

import { Earth, Favorite, Location, Time } from "@carbon/icons-react";
import { SiteFooter, type SiteFooterNavItem, type SiteFooterInfoItem } from "./SiteFooter";

export interface SiteFooterDefaultProps {
  /** Footer links from Sanity. Falls back to defaults. */
  links?: SiteFooterNavItem[];
  /** Location text. */
  location?: string;
  /** Timezone text. */
  timezone?: string;
  /** Working hours text. */
  workingHours?: string;
}

export function SiteFooterDefault({
  links,
  location,
  timezone,
  workingHours,
}: SiteFooterDefaultProps) {
  const footerLinks = links ?? [
    { label: "Contact", href: "#contact" },
    { label: "Privacy", href: "#privacy" },
  ];

  const infoItems: SiteFooterInfoItem[] = [];
  if (location) {
    infoItems.push({ icon: <Location size={20} />, text: location });
  }
  if (timezone) {
    infoItems.push({ icon: <Time size={20} />, text: timezone });
  }
  if (workingHours) {
    infoItems.push({ icon: <Earth size={20} />, text: workingHours });
  }

  // Fallback if nothing from Sanity
  if (infoItems.length === 0) {
    infoItems.push(
      { icon: <Location size={20} />, text: "Birmingham, AL area" },
      { icon: <Time size={20} />, text: "Central time zone" },
      { icon: <Earth size={20} />, text: "Eastern or Central working hours" },
    );
  }

  return (
    <SiteFooter
      tagline={
        <>
          Designed and built with{" "}
          <Favorite size={20} aria-label="love" role="img" /> by Allison.
        </>
      }
      links={footerLinks}
      infoItems={infoItems}
    />
  );
}
