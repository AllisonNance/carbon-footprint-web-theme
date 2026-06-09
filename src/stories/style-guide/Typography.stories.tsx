import type { Meta, StoryObj } from "@storybook/react";
import styles from "./styleGuide.module.css";

/**
 * Typography style guide — renders type-set tokens with a live sample,
 * the utility class name, and the spec (size / line-height / weight).
 *
 * The spec column is hand-curated to mirror `src/tokens/typography.css`.
 * If you add or change a style there, update it here.
 */

type TypeRow = {
  /** Utility class name, e.g. `type-body-01`. */
  name: string;
  /** Pretty spec summary. */
  spec: string;
  /** Optional sample override; falls back to name. */
  sample?: string;
};

const HEADINGS: TypeRow[] = [
  { name: "type-heading-compact-01", spec: "16 / 20 · 600" },
  { name: "type-heading-03", spec: "22 / 30 · 400" },
  { name: "type-heading-04", spec: "30 / 38 · 400" },
];

const BODY: TypeRow[] = [
  { name: "type-body-compact-01", spec: "16 / 20 · 400" },
  { name: "type-body-compact-02", spec: "18 / 24 · 400" },
  { name: "type-body-01", spec: "16 / 22 · 400" },
  { name: "type-body-02", spec: "18 / 26 · 400" },
];

const UTILITY: TypeRow[] = [
  { name: "type-label-01", spec: "14 / 18 · 400 · mono" },
  { name: "type-code-02", spec: "16 / 22 · 400 · mono" },
];

const FLUID: TypeRow[] = [
  { name: "type-fluid-heading-05", spec: "44 / 52 · 300" },
];

function TypeSection({ title, rows }: { title: string; rows: TypeRow[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={`${styles.sectionTitle} type-heading-04`}>{title}</h2>
        <p className={`${styles.sectionSub} type-body-01`}>
          size / line-height · weight
        </p>
      </div>
      {rows.map((row) => (
        <div key={row.name} className={styles.typeRow}>
          <div className={styles.typeMeta}>
            <span className={styles.typeMetaName}>.{row.name}</span>
            <span className={styles.typeMetaSpec}>{row.spec}</span>
          </div>
          <div className={`${styles.typeSample} ${row.name}`}>
            {row.sample ?? "The quick brown fox jumps over the lazy dog"}
          </div>
        </div>
      ))}
    </section>
  );
}

const meta: Meta = {
  title: "Style Guide/Typography",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

/** Everything at once — handy for scanning. */
export const Overview: Story = {
  render: () => (
    <article className={styles.page}>
      <h1 className={`${styles.pageTitle} type-fluid-heading-05`}>
        Typography
      </h1>
      <p className={`${styles.pageLede} type-body-02`}>
        Type sets in Inter / IBM Plex Mono / Tiempos Text.
        Apply any style by adding its utility class (e.g.{" "}
        <code className="type-code-02">class=&quot;type-body-01&quot;</code>).
        Sizes use the rem scale defined in{" "}
        <code className="type-code-02">tokens/typography.css</code>.
      </p>
      <TypeSection title="Headings" rows={HEADINGS} />
      <TypeSection title="Body" rows={BODY} />
      <TypeSection title="Utility" rows={UTILITY} />
      <TypeSection title="Fluid" rows={FLUID} />
    </article>
  ),
};

export const Headings: Story = {
  render: () => (
    <article className={styles.page}>
      <TypeSection title="Headings" rows={HEADINGS} />
    </article>
  ),
};

export const Body: Story = {
  render: () => (
    <article className={styles.page}>
      <TypeSection title="Body" rows={BODY} />
    </article>
  ),
};

export const Utility: Story = {
  render: () => (
    <article className={styles.page}>
      <TypeSection title="Utility" rows={UTILITY} />
    </article>
  ),
};

export const Fluid: Story = {
  render: () => (
    <article className={styles.page}>
      <TypeSection title="Fluid" rows={FLUID} />
    </article>
  ),
};
