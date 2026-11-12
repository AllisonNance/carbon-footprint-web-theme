import { defineType, defineArrayMember } from "sanity";
import { PlayIcon, ImagesIcon } from "@sanity/icons";

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
 * - Image callouts (titled box with a background color, image and caption)
 */

/** Matches a hex color like #F4F4F4 or #FFF. */
export const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

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
        {
          name: "maxWidth",
          type: "number",
          title: "Max width (px)",
          description:
            "Optional. Caps how wide the image displays; smaller images are centered. Leave empty to fill the content column.",
          validation: (rule) => rule.integer().min(50).max(2400),
        },
      ],
    }),
    defineArrayMember({
      name: "imageCallout",
      type: "object",
      title: "Image callout",
      icon: ImagesIcon,
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
          description: "Shown in all caps in the top-left corner (e.g. Hidden tools).",
        },
        {
          name: "image",
          type: "image",
          title: "Image",
          options: { hotspot: true },
          validation: (rule) => rule.required(),
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "Describe the image for screen readers.",
              validation: (rule) => rule.required(),
            },
          ],
        },
        {
          name: "imageMaxWidth",
          type: "number",
          title: "Image max width (px)",
          description:
            "Optional. Caps how wide the image displays inside the box; smaller images are centered. Leave empty to fill the box.",
          validation: (rule) => rule.integer().min(50).max(2400),
        },
        {
          name: "caption",
          type: "text",
          rows: 2,
          title: "Caption",
          description: "Optional. Shown below the image in small text.",
        },
        {
          name: "background",
          type: "string",
          title: "Background color",
          description:
            "Hex code, e.g. #F4F4F4 (light gray) or #FFFFFF (white). Leave empty for light gray.",
          placeholder: "#F4F4F4",
          initialValue: "#F4F4F4",
          validation: (rule) =>
            rule.custom((value?: string) =>
              !value || HEX_COLOR_PATTERN.test(value.trim())
                ? true
                : "Enter a hex code like #F4F4F4 or #FFF.",
            ),
        },
      ],
      preview: {
        select: { title: "title", caption: "caption", media: "image" },
        prepare({ title, caption, media }) {
          return {
            title: title ? title.toUpperCase() : "Image callout",
            subtitle: caption || "Image callout",
            media,
          };
        },
      },
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
