import { defineField, defineType } from "sanity";
import { CaseIcon, BlockContentIcon, ImageIcon, PlayIcon } from "@sanity/icons";

/**
 * Portfolio Item — a case study or project page.
 * Drives the PortfolioItemCard grid on the home page and
 * individual work detail pages.
 */
export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portfolioItemType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Case Study", value: "case-study" },
          { title: "Overview", value: "overview" },
        ],
      },
      initialValue: "case-study",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "Your role on this project (e.g. Lead Product Designer).",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      description: "Client or company name.",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: 'e.g. "2026"',
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image (detail page)",
      type: "image",
      options: { hotspot: true },
      description: "Hero image shown on the portfolio item detail page.",
      validation: (rule) => rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: "cardMedia",
      title: "Card media (home page)",
      type: "array",
      description: "Image or video shown on the home page portfolio card.",
      validation: (rule) => rule.max(1),
      of: [
        {
          type: "image",
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (rule) => rule.required(),
            },
          ],
        },
        {
          type: "object",
          name: "cardVideo",
          title: "Video",
          icon: PlayIcon,
          fields: [
            {
              name: "videoFile",
              title: "Video file",
              type: "file",
              options: { accept: "video/*" },
              validation: (rule) => rule.required(),
            },
            {
              name: "alt",
              title: "Alt text",
              type: "string",
            },
            {
              name: "autoplay",
              title: "Autoplay",
              type: "boolean",
              description: "Automatically play the video (muted).",
              initialValue: true,
            },
            {
              name: "loop",
              title: "Loop",
              type: "boolean",
              description: "Loop the video continuously.",
              initialValue: true,
            },
          ],
          preview: {
            select: { alt: "alt" },
            prepare({ alt }) {
              return { title: alt || "Video" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description: "Keyword chips shown on the card.",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary for previews and SEO.",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description: "Each section becomes a navigable anchor in the side nav.",
      of: [
        {
          type: "object",
          name: "pageSection",
          icon: BlockContentIcon,
          fields: [
            {
              name: "navLabel",
              title: "Nav label",
              type: "string",
              description: "Short label shown in the side navigation (e.g. Overview, Process).",
              validation: (rule) => rule.required(),
            },
            {
              name: "body",
              title: "Body",
              type: "blockContent",
            },
          ],
          preview: {
            select: { title: "navLabel" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first on the home page.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      client: "client",
      year: "year",
      media: "featuredImage",
    },
    prepare({ title, client, year, media }) {
      const parts = [client, year].filter(Boolean).join(" · ");
      return { title, subtitle: parts, media };
    },
  },
});
