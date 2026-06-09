import type { StructureResolver } from "sanity/structure";

/**
 * Custom studio structure — organises content into logical groups
 * and surfaces the Site Settings singleton at the top.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Site Settings — singleton
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings"),
        ),

      S.divider(),

      // Content types
      S.documentTypeListItem("portfolioItem").title("Portfolio Items"),
      S.documentTypeListItem("byte").title("Bytes"),
      S.documentTypeListItem("currentFocus").title("Current Focus"),
      S.documentTypeListItem("category").title("Categories"),
    ]);
