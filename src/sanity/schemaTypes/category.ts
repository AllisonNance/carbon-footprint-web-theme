import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

/**
 * Category — reusable tag for Bytes and Portfolio Items.
 * Maps to the CategoryList sidebar on the Bytes page and the
 * keyword chips on PortfolioItemCard.
 */
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional short description of this category.",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
