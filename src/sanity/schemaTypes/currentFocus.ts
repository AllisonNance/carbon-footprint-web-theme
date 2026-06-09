import { defineField, defineType } from "sanity";
import { PinIcon } from "@sanity/icons";

/**
 * Current Focus — a focus area shown on the home page.
 * Each item has a title, description, and a list of contributions.
 */
export const currentFocus = defineType({
  name: "currentFocus",
  title: "Current Focus",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contributions",
      title: "Contributions",
      type: "array",
      of: [{ type: "string" }],
      description: "Bulleted list of contributions for this focus area.",
    }),
    defineField({
      name: "contributionsHeading",
      title: "Contributions heading",
      type: "string",
      description: 'Defaults to "Contributions" if left blank.',
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
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
    select: { title: "title" },
  },
});
