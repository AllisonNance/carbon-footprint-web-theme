"use client";

import { ArrowUpRight, Email, LogoLinkedin } from "@carbon/icons-react";
import { Header } from "@components/organisms/UIShell/Header";
import { HeaderContainer } from "@components/organisms/UIShell/HeaderContainer";
import { HeaderGlobalAction } from "@components/organisms/UIShell/HeaderGlobalAction";
import { HeaderGlobalBar } from "@components/organisms/UIShell/HeaderGlobalBar";
import { HeaderMenuButton } from "@components/organisms/UIShell/HeaderMenuButton";
import { HeaderMenuItem } from "@components/organisms/UIShell/HeaderMenuItem";
import { HeaderName } from "@components/organisms/UIShell/HeaderName";
import { HeaderNavigation } from "@components/organisms/UIShell/HeaderNavigation";
import { SideNav } from "@components/organisms/UIShell/SideNav";
import { SideNavItems } from "@components/organisms/UIShell/SideNavItems";
import { SideNavLink } from "@components/organisms/UIShell/SideNavLink";
import { SkipToContent } from "@components/organisms/UIShell/SkipToContent";
import styles from "./SiteHeader.module.css";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteHeaderProps {
  /** Brand name shown in the header. */
  brandName?: string;
  /** Primary nav links. */
  navItems?: NavItem[];
  /** Contact email. */
  email?: string;
  /** LinkedIn profile URL. */
  linkedinUrl?: string;
}

export function SiteHeader({
  brandName = "Allison Nance",
  navItems,
  email,
  linkedinUrl,
}: SiteHeaderProps) {
  const links: NavItem[] = navItems ?? [
    { label: "Work", href: "#" },
    { label: "Bytes", href: "/bytes" },
    { label: "GitHub", href: "#", external: true },
  ];

  const contactEmail = email ?? "allison@availta.com";

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="Site">
            <SkipToContent />
            <HeaderMenuButton
              aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
              isActive={isSideNavExpanded}
              isCollapsible
              onClick={onClickSideNavExpand}
            />
            <HeaderName href="/" prefix="">
              {brandName}
            </HeaderName>
            <HeaderNavigation aria-label="Primary">
              {links.map((item) => (
                <HeaderMenuItem
                  key={item.href + item.label}
                  href={item.href}
                  renderIcon={
                    item.external ? <ArrowUpRight size={16} /> : undefined
                  }
                >
                  {item.label}
                </HeaderMenuItem>
              ))}
            </HeaderNavigation>
            <HeaderGlobalBar>
              <a
                href={`mailto:${contactEmail}`}
                className={styles.emailLink}
              >
                <Email size={20} />
                <span className={`${styles.emailLabel} gradient-underline`}>
                  {contactEmail}
                </span>
              </a>
              {linkedinUrl && (
                <HeaderGlobalAction
                  aria-label="LinkedIn"
                  onClick={() => window.open(linkedinUrl, "_blank")}
                >
                  <LogoLinkedin size={20} />
                </HeaderGlobalAction>
              )}
            </HeaderGlobalBar>
          </Header>
          <SideNav
            expanded={isSideNavExpanded}
            onOverlayClick={onClickSideNavExpand}
          >
            <SideNavItems>
              {links.map((item) => (
                <SideNavLink key={item.href + item.label} href={item.href}>
                  {item.label}
                </SideNavLink>
              ))}
            </SideNavItems>
          </SideNav>
        </>
      )}
    />
  );
}
