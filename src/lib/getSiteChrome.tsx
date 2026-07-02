import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { SiteHeader, type NavItem } from "@components/organisms/SiteHeader/SiteHeader";
import { SiteFooterDefault } from "@components/organisms/SiteFooter/SiteFooterDefault";

interface SiteSettings {
  brandName?: string;
  email?: string;
  linkedinUrl?: string;
  mainNavigation?: {
    _key: string;
    label: string;
    href: string;
    external?: boolean;
  }[];
  footerLinks?: {
    _key: string;
    label: string;
    href: string;
  }[];
  location?: string;
  timezone?: string;
}

/**
 * Fetches site settings from Sanity and returns pre-configured
 * header + footer React elements. Call from any server component.
 */
export async function getSiteChrome() {
  const settings: SiteSettings | null = await client.fetch(siteSettingsQuery);

  const navItems: NavItem[] | undefined = settings?.mainNavigation?.map(
    (n) => ({
      label: n.label,
      href: n.href,
      external: n.external,
    }),
  );

  const footerLinks = settings?.footerLinks?.map((l) => ({
    label: l.label,
    href: l.href,
  }));

  const header = (
    <SiteHeader
      brandName={settings?.brandName}
      navItems={navItems}
      email={settings?.email}
      linkedinUrl={settings?.linkedinUrl}
    />
  );

  const footer = (
    <SiteFooterDefault
      links={footerLinks}
      location={settings?.location}
      timezone={settings?.timezone}
    />
  );

  return { header, footer };
}
