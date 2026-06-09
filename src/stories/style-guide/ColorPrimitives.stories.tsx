import type { Meta, StoryObj } from "@storybook/react";
import { PaletteStrip, Swatch } from "./shared";
import styles from "./styleGuide.module.css";

/**
 * Primitive color palette — the raw scales defined in
 * `src/tokens/primitives.css`. Reference only — do not use primitives
 * directly in components; use semantic tokens from `theme.css`.
 */

const meta: Meta = {
  title: "Style Guide/Color/Primitives",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Palettes: Story = {
  render: () => (
    <article className={styles.page}>
      <h1 className={`${styles.pageTitle} type-fluid-heading-05`}>
        Color primitives
      </h1>
      <p className={`${styles.pageLede} type-body-02`}>
        Raw palette values from <code className="type-code-02">
          tokens/primitives.css
        </code>
        . Use these to extend the semantic layer — don&rsquo;t reference them
        directly in components.
      </p>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} type-heading-04`}>
            Neutrals
          </h2>
          <p className={`${styles.sectionSub} type-body-01`}>
            10 → 100 (light → dark)
          </p>
        </div>
        <div style={{ display: "grid", gap: "var(--spacing-04)" }}>
          <div className={styles.paletteRow}>
            <div className={styles.paletteLabel}>Black / White</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--spacing-03)",
              }}
            >
              <Swatch token="black" />
              <Swatch token="white" />
            </div>
          </div>
          <PaletteStrip family="gray" label="Gray" />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} type-heading-04`}>
            Taupe
          </h2>
          <p className={`${styles.sectionSub} type-body-01`}>
            05 → 100 (light → dark)
          </p>
        </div>
        <div style={{ display: "grid", gap: "var(--spacing-04)" }}>
          <PaletteStrip family="taupe" label="Taupe" steps={[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
        </div>
      </section>
    </article>
  ),
};
