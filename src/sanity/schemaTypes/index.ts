import { type SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { byte } from "./byte";
import { category } from "./category";
import { currentFocus } from "./currentFocus";
import { portfolioItem } from "./portfolioItem";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    byte,
    category,
    currentFocus,
    portfolioItem,
    siteSettings,
  ],
};
