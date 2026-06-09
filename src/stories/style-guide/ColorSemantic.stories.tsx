import type { Meta, StoryObj } from "@storybook/react";
import { Swatch } from "./shared";
import styles from "./styleGuide.module.css";

/**
 * Semantic color tokens — the theme-reactive variables in
 * `src/tokens/theme.css`. All swatches re-read on theme change so switching
 * the Storybook theme toolbar (top right) shows White / G10 / G100 values.
 */

/** Token groups, mirroring the layout of `theme.css`. */
const GROUPS: Array<{ title: string; tokens: string[] }> = [
  {
    title: "Background",
    tokens: [
      "background",
      "background-hover",
      "background-active",
      "background-selected",
      "background-inverse",
    ],
  },
  {
    title: "Layer",
    tokens: [
      "layer-01",
      "layer-02",
      "layer-hover-01",
      "layer-active-01",
      "layer-selected-01",
      "layer-selected-hover-01",
    ],
  },
  {
    title: "Field",
    tokens: ["field-01"],
  },
  {
    title: "Border",
    tokens: [
      "border-subtle-00",
      "border-subtle-01",
    ],
  },
  {
    title: "Text",
    tokens: [
      "text-primary",
      "text-secondary",
      "text-placeholder",
      "text-helper",
      "text-error",
      "text-inverse",
      "text-on-color",
      "text-disabled",
    ],
  },
  {
    title: "Link",
    tokens: [
      "link-primary",
      "link-primary-hover",
      "link-visited",
    ],
  },
  {
    title: "Icon",
    tokens: [
      "icon-primary",
      "icon-secondary",
      "icon-on-color-disabled",
      "icon-disabled",
    ],
  },
  {
    title: "Focus",
    tokens: ["focus", "focus-inset"],
  },
  {
    title: "Tag — taupe",
    tokens: [
      "tag-background-taupe",
      "tag-color-taupe",
    ],
  },
  {
    title: "Miscellaneous",
    tokens: [
      "interactive",
      "overlay",
    ],
  },
];

function Group({ title, tokens }: { title: string; tokens: string[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={`${styles.sectionTitle} type-heading-04`}>{title}</h2>
        <p className={`${styles.sectionSub} type-body-01`}>
          {tokens.length} token{tokens.length === 1 ? "" : "s"}
        </p>
      </div>
      <div className={styles.swatchGrid}>
        {tokens.map((t) => (
          <Swatch key={t} token={t} />
        ))}
      </div>
    </section>
  );
}

const meta: Meta = {
  title: "Style Guide/Color/Semantic tokens",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const All: Story = {
  render: () => (
    <article className={styles.page}>
      <h1 className={`${styles.pageTitle} type-fluid-heading-05`}>
        Semantic color tokens
      </h1>
      <p className={`${styles.pageLede} type-body-02`}>
        Theme-reactive variables mapped from the gray and taupe palettes.
        Components reference these — never primitives directly. Switch the
        theme toolbar to see values update live.
      </p>
      {GROUPS.map((g) => (
        <Group key={g.title} title={g.title} tokens={g.tokens} />
      ))}
    </article>
  ),
};
