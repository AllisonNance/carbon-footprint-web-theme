import { defineField, defineType } from "sanity";
import { CogIcon, LinkIcon } from "@sanity/icons";

/**
 * Site Settings — singleton document for global site configuration.
 * Brand name, tagline, social links, footer content, etc.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      description: "Shown in the header and footer.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short tagline shown in the footer.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Contact email shown in the header.",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "mainNavigation",
      title: "Main navigation",
      type: "array",
      description: "Links shown in the header menu.",
      of: [
        {
          type: "object",
          icon: LinkIcon,
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "href",
              title: "URL",
              type: "string",
              description: "Internal path (e.g. /bytes) or external URL.",
              validation: (rule) => rule.required(),
            },
            {
              name: "external",
              title: "External link",
              type: "boolean",
              description: "Opens in a new tab with an arrow icon.",
              initialValue: false,
            },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      description: "Text links shown in the footer below the tagline.",
      of: [
        {
          type: "object",
          icon: LinkIcon,
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "href",
              title: "URL",
              type: "string",
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright text",
      type: "string",
      description: "Legal line in the footer strip.",
    }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      type: "image",
      options: { hotspot: true },
      description: "Circular photo shown in the page title block.",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
    }),
    defineField({
      name: "pageHeading",
      title: "Page heading",
      type: "string",
      description: "Home page h1 (e.g. role title).",
    }),
    defineField({
      name: "pageDescription",
      title: "Page description",
      type: "text",
      rows: 3,
      description: "Description paragraph below the heading.",
    }),
    defineField({
      name: "featuredWork",
      title: "Featured work",
      type: "array",
      description: "Portfolio items shown on the home page, in the order you set here.",
      of: [{ type: "reference", to: [{ type: "portfolioItem" }] }],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Footer info item (e.g. Birmingham, AL area).",
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      type: "string",
      description: "Footer info item (e.g. Central time zone).",
    }),
    defineField({
      name: "workingHours",
      title: "Working hours",
      type: "string",
      description: "Footer info item (e.g. Eastern or Central working hours).",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
