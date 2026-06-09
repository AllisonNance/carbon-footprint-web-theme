import type { Meta, StoryObj } from "@storybook/react";
import styles from "./styleGuide.module.css";

/**
 * Style Guide landing page. Intentionally content-only — no props or controls.
 */

const meta: Meta = {
  title: "Style Guide/Overview",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <article className={styles.page}>
      <h1 className={`${styles.pageTitle} type-fluid-heading-05`}>
        Style Guide
      </h1>
      <p className={`${styles.pageLede} type-body-02`}>
        A living reference for the design tokens that power every component
        in this library.
      </p>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} type-heading-04`}>
            What&rsquo;s in here
          </h2>
        </div>
        <ul className="type-body-02">
          <li>
            <strong>Typography</strong> — every type style, with its
            utility class, size, line-height, and weight.
          </li>
          <li>
            <strong>Color / Semantic tokens</strong> — theme-reactive swatches
            grouped by role (background, layer, text, button, tag, etc.).
            Use these in components.
          </li>
          <li>
            <strong>Color / Primitives</strong> — the raw palette (gray +
            taupe) that semantic tokens are built on. Reference only — do
            not use directly in components.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} type-heading-04`}>
            How tokens are organized
          </h2>
        </div>
        <p className="type-body-02" style={{ maxWidth: "48rem" }}>
          Primitives live in{" "}
          <code className="type-code-02">src/tokens/primitives.css</code> and
          expose the gray and taupe palettes. Semantic tokens live in{" "}
          <code className="type-code-02">src/tokens/theme.css</code> and map
          those primitives to intent (e.g. <code>--text-primary</code>,{" "}
          <code>--layer-01</code>, <code>--button-primary</code>) for each
          theme. Components reference semantic tokens only, so swapping themes
          is a one-attribute change.
        </p>
      </section>
    </article>
  ),
};
