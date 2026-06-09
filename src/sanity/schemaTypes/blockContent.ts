import { defineType, defineArrayMember } from "sanity";
import { PlayIcon } from "@sanity/icons";

/**
 * Rich text (Portable Text) schema used by Bytes descriptions and
 * portfolio item case study bodies. Supports:
 * - Basic formatting (bold, italic, underline, strikethrough, code)
 * - Links
 * - Headings (h2, h3, h4)
 * - Block quotes
 * - Lists (bullet + numbered)
 * - Inline images with alt text and optional caption
 * - Embedded video (URL-based: YouTube, Vimeo, etc.)
 */
export const blockContent = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strikethrough", value: "strike-through" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Describe the image for screen readers.",
          validation: (rule) => rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Optional visible caption below the image.",
        },
      ],
    }),
    defineArrayMember({
      name: "video",
      type: "object",
      title: "Video",
      icon: PlayIcon,
      fields: [
        {
          name: "url",
          type: "url",
          title: "Video URL",
          description: "YouTube, Vimeo, or other embed-compatible URL.",
          validation: (rule) => rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
      preview: {
        select: { url: "url", caption: "caption" },
        prepare({ url, caption }) {
          return {
            title: caption || "Video",
            subtitle: url,
          };
        },
      },
    }),
  ],
});
