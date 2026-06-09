import { defineField, defineType } from "sanity";
import { EditIcon } from "@sanity/icons";

/**
 * Byte — a short-form feed item (blog-like post).
 * Drives the Bytes page grid and the BytesBlock on the home page.
 */
export const byte = defineType({
  name: "byte",
  title: "Byte",
  type: "document",
  icon: EditIcon,
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
      name: "publishedAt",
      title: "Published date",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      description: "Rich text content with support for images and video.",
    }),
  ],
  orderings: [
    {
      title: "Published date (newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
    },
    prepare({ title, date }) {
      const d = date ? new Date(date).toLocaleDateString() : "No date";
      return { title, subtitle: d };
    },
  },
});
