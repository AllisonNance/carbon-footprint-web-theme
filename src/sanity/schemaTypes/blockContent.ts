import { defineType, defineArrayMember } from "sanity";
import {
  PlayIcon,
  ImagesIcon,
  ThListIcon,
  ThLargeIcon,
  DashboardIcon,
  UlistIcon,
  ImageIcon,
  ListIcon,
  DocumentTextIcon,
} from "@sanity/icons";

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
 * - Text callouts (titled box with a description and formatted text: bold, italic, lists)
 * - Image callouts (titled box with a background color, image and caption)
 * - Tables (two columns with headers, a background color and caption)
 * - Icon grids (titled box of labeled SVG icons, a background color and caption)
 * - Image grids (titled box of labeled images, 3 across, a background color and caption)
 * - Image lists (image rows with a label and description, intro text and caption)
 * - Icon lists (icon rows with a label and description, intro text and caption)
 * - Stat grids (titled box of labeled stats, a background color and caption)
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
      name: "textCallout",
      type: "object",
      title: "Text callout",
      icon: DocumentTextIcon,
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
          description: "Shown in all caps in the top-left corner.",
        },
        {
          name: "description",
          type: "text",
          rows: 2,
          title: "Description",
          description: "Optional. Shown under the title, above the text.",
        },
        {
          name: "body",
          type: "array",
          title: "Text",
          description: "Supports bold, italic, bulleted and numbered lists.",
          validation: (rule) => rule.min(1),
          of: [
            {
              type: "block",
              styles: [{ title: "Normal", value: "normal" }],
              lists: [
                { title: "Bullet", value: "bullet" },
                { title: "Numbered", value: "number" },
              ],
              marks: {
                decorators: [
                  { title: "Bold", value: "strong" },
                  { title: "Italic", value: "em" },
                ],
                annotations: [],
              },
            },
          ],
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
        select: { title: "title", description: "description" },
        prepare({ title, description }) {
          return {
            title: title ? title.toUpperCase() : "Text callout",
            subtitle: description ? `Text callout · ${description}` : "Text callout",
          };
        },
      },
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
          name: "large",
          type: "boolean",
          title: "Large (800px)",
          description:
            "Widens the box to 800px on portfolio pages, past the 600px body column, on screens wide enough to fit it. Narrower screens keep the normal width.",
          initialValue: false,
        },
        {
          name: "caption",
          type: "text",
          rows: 2,
          title: "Caption",
          description: "Optional. Shown below the image in small text.",
        },
        {
          name: "checklist",
          type: "array",
          title: "Checklist",
          description: "Optional. Each item gets a check mark and sits below the caption.",
          of: [{ type: "string" }],
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
      name: "iconCallout",
      type: "object",
      title: "Icon grid",
      icon: ThLargeIcon,
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
          description: "Shown in all caps in the top-left corner (e.g. Stakeholder goals).",
        },
        {
          name: "items",
          type: "array",
          title: "Icon boxes",
          description: "Shown 4 across on desktop and 2 across on mobile.",
          validation: (rule) => rule.min(1),
          of: [
            {
              type: "object",
              name: "iconItem",
              title: "Icon box",
              fields: [
                {
                  name: "icon",
                  type: "image",
                  title: "Icon (SVG)",
                  description: "Upload an SVG. It displays at 24px tall in its own colors.",
                  options: { accept: "image/svg+xml" },
                  validation: (rule) => rule.required(),
                },
                {
                  name: "label",
                  type: "string",
                  title: "Label",
                  validation: (rule) => rule.required(),
                },
              ],
              preview: {
                select: { title: "label", media: "icon" },
              },
            },
          ],
        },
        {
          name: "caption",
          type: "text",
          rows: 2,
          title: "Caption",
          description: "Optional. Shown below the icon boxes in small text.",
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
        select: { title: "title", items: "items" },
        prepare({ title, items }) {
          const count = Array.isArray(items) ? items.length : 0;
          return {
            title: title ? title.toUpperCase() : "Icon grid",
            subtitle: `Icon grid · ${count} box${count === 1 ? "" : "es"}`,
          };
        },
      },
    }),
    defineArrayMember({
      name: "imageGridCallout",
      type: "object",
      title: "Image grid",
      icon: ImageIcon,
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
          description: "Shown in all caps in the top-left corner.",
        },
        {
          name: "items",
          type: "array",
          title: "Image boxes",
          description:
            "Shown up to 3 across on desktop and 2 across on mobile. Fewer boxes stretch to fill the row.",
          validation: (rule) => rule.min(1),
          of: [
            {
              type: "object",
              name: "imageGridItem",
              title: "Image box",
              fields: [
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
                  name: "label",
                  type: "string",
                  title: "Label",
                  description: "Optional. Shown below the image.",
                },
              ],
              preview: {
                select: { title: "label", subtitle: "image.alt", media: "image" },
                prepare({ title, subtitle, media }) {
                  return { title: title || subtitle || "Image box", media };
                },
              },
            },
          ],
        },
        {
          name: "caption",
          type: "text",
          rows: 2,
          title: "Caption",
          description: "Optional. Shown below the image boxes in small text.",
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
        select: { title: "title", items: "items" },
        prepare({ title, items }) {
          const count = Array.isArray(items) ? items.length : 0;
          return {
            title: title ? title.toUpperCase() : "Image grid",
            subtitle: `Image grid · ${count} box${count === 1 ? "" : "es"}`,
          };
        },
      },
    }),
    defineArrayMember({
      name: "imageListCallout",
      type: "object",
      title: "Image list",
      icon: ListIcon,
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
          description: "Shown in all caps in the top-left corner.",
        },
        {
          name: "intro",
          type: "text",
          rows: 2,
          title: "Intro text",
          description: "Optional. Shown under the title, above the rows.",
        },
        {
          name: "items",
          type: "array",
          title: "Rows",
          description:
            "Each row has the image on the left and its label and description on the right. On mobile the image sits above the text.",
          validation: (rule) => rule.min(1),
          of: [
            {
              type: "object",
              name: "imageListItem",
              title: "Row",
              fields: [
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
                  name: "label",
                  type: "string",
                  title: "Label",
                  description: "Optional. Shown in bold beside the image.",
                },
                {
                  name: "description",
                  type: "text",
                  rows: 2,
                  title: "Description",
                  description: "Optional. Shown under the label.",
                },
              ],
              preview: {
                select: { title: "label", subtitle: "description", media: "image" },
                prepare({ title, subtitle, media }) {
                  return title
                    ? { title, subtitle, media }
                    : { title: subtitle || "Row", media };
                },
              },
            },
          ],
        },
        {
          name: "imageMaxWidth",
          type: "number",
          title: "Image max width (px)",
          description:
            "Optional. Images are shown no wider than this. Leave empty for 200px on desktop and full width on mobile.",
          validation: (rule) => rule.integer().min(40).max(800),
        },
        {
          name: "caption",
          type: "text",
          rows: 2,
          title: "Caption",
          description: "Optional. Shown below the rows in small text.",
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
        select: { title: "title", items: "items" },
        prepare({ title, items }) {
          const count = Array.isArray(items) ? items.length : 0;
          return {
            title: title ? title.toUpperCase() : "Image list",
            subtitle: `Image list · ${count} row${count === 1 ? "" : "s"}`,
          };
        },
      },
    }),
    defineArrayMember({
      name: "iconListCallout",
      type: "object",
      title: "Icon list",
      icon: UlistIcon,
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
          description: "Shown in all caps in the top-left corner (e.g. Competing priorities).",
        },
        {
          name: "intro",
          type: "text",
          rows: 2,
          title: "Intro text",
          description: "Optional. Shown under the title, above the rows.",
        },
        {
          name: "items",
          type: "array",
          title: "Rows",
          description: "Each row has the icon on the left and its label and description on the right.",
          validation: (rule) => rule.min(1),
          of: [
            {
              type: "object",
              name: "iconListItem",
              title: "Row",
              fields: [
                {
                  name: "icon",
                  type: "image",
                  title: "Icon (SVG)",
                  description: "Upload an SVG. It displays at 24px tall in its own colors.",
                  options: { accept: "image/svg+xml" },
                  validation: (rule) => rule.required(),
                },
                {
                  name: "label",
                  type: "string",
                  title: "Label",
                  description: "Optional. Shown in bold beside the icon.",
                },
                {
                  name: "description",
                  type: "text",
                  rows: 2,
                  title: "Description",
                  description: "Optional. Shown under the label.",
                },
              ],
              preview: {
                select: { title: "label", subtitle: "description", media: "icon" },
                prepare({ title, subtitle, media }) {
                  return title
                    ? { title, subtitle, media }
                    : { title: subtitle || "Row", media };
                },
              },
            },
          ],
        },
        {
          name: "caption",
          type: "text",
          rows: 2,
          title: "Caption",
          description: "Optional. Shown below the rows in small text.",
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
        select: { title: "title", items: "items" },
        prepare({ title, items }) {
          const count = Array.isArray(items) ? items.length : 0;
          return {
            title: title ? title.toUpperCase() : "Icon list",
            subtitle: `Icon list · ${count} row${count === 1 ? "" : "s"}`,
          };
        },
      },
    }),
    defineArrayMember({
      name: "statCallout",
      type: "object",
      title: "Stat grid",
      icon: DashboardIcon,
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
          description: "Shown in all caps in the top-left corner (e.g. Tool usage).",
        },
        {
          name: "items",
          type: "array",
          title: "Stat boxes",
          description: "Shown 4 across on desktop and 2 across on mobile.",
          validation: (rule) => rule.min(1),
          of: [
            {
              type: "object",
              name: "statItem",
              title: "Stat box",
              fields: [
                {
                  name: "stat",
                  type: "string",
                  title: "Stat",
                  description: "The number, written how it should appear (e.g. 1,505 or 2.3).",
                  validation: (rule) => rule.required(),
                },
                {
                  name: "suffix",
                  type: "string",
                  title: "Suffix",
                  description: "Optional. Shown smaller right after the stat (e.g. %).",
                },
                {
                  name: "label",
                  type: "string",
                  title: "Label",
                  validation: (rule) => rule.required(),
                },
              ],
              preview: {
                select: { stat: "stat", suffix: "suffix", label: "label" },
                prepare({ stat, suffix, label }) {
                  return {
                    title: `${stat ?? ""}${suffix ?? ""}` || "Stat",
                    subtitle: label,
                  };
                },
              },
            },
          ],
        },
        {
          name: "caption",
          type: "text",
          rows: 2,
          title: "Caption",
          description: "Optional. Shown below the stat boxes in small text.",
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
        select: { title: "title", items: "items" },
        prepare({ title, items }) {
          const count = Array.isArray(items) ? items.length : 0;
          return {
            title: title ? title.toUpperCase() : "Stat grid",
            subtitle: `Stat grid · ${count} stat${count === 1 ? "" : "s"}`,
          };
        },
      },
    }),
    defineArrayMember({
      name: "tableCallout",
      type: "object",
      title: "Table",
      icon: ThListIcon,
      fields: [
        {
          name: "column1Header",
          type: "string",
          title: "Column 1 header",
          description: "Narrow left column. Shown in all caps (e.g. Research theme).",
        },
        {
          name: "column2Header",
          type: "string",
          title: "Column 2 header",
          description: "Wide right column. Shown in all caps (e.g. UX direction).",
        },
        {
          name: "rows",
          type: "array",
          title: "Rows",
          validation: (rule) => rule.min(1),
          of: [
            {
              type: "object",
              name: "tableRow",
              title: "Row",
              fields: [
                {
                  name: "label",
                  type: "text",
                  rows: 2,
                  title: "Column 1",
                  description: "Press Enter to force a line break.",
                },
                {
                  name: "value",
                  type: "text",
                  rows: 2,
                  title: "Column 2",
                },
              ],
              preview: {
                select: { title: "label", subtitle: "value" },
              },
            },
          ],
        },
        {
          name: "caption",
          type: "text",
          rows: 2,
          title: "Caption",
          description: "Optional. Shown below the table in small text.",
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
        select: {
          column1: "column1Header",
          column2: "column2Header",
          rows: "rows",
        },
        prepare({ column1, column2, rows }) {
          const headers = [column1, column2].filter(Boolean).join(" | ");
          const count = Array.isArray(rows) ? rows.length : 0;
          return {
            title: headers ? headers.toUpperCase() : "Table",
            subtitle: `Table · ${count} row${count === 1 ? "" : "s"}`,
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
