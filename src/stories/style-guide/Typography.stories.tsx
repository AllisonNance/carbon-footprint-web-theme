import type { Meta, StoryObj } from "@storybook/react";
import styles from "./styleGuide.module.css";

/**
 * Typography style guide — renders Carbon's type-set tokens with a live
 * sample, the utility class name, and the spec (size / line-height / weight).
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
  { name: "type-heading-compact-01", spec: "14 / 18 · 600" },
  { name: "type-heading-compact-02", spec: "16 / 22 · 600" },
  { name: "type-heading-01", spec: "14 / 20 · 600" },
  { name: "type-heading-02", spec: "16 / 24 · 600" },
  { name: "type-heading-03", spec: "20 / 28 · 400" },
  { name: "type-heading-04", spec: "28 / 36 · 400" },
  { name: "type-heading-05", spec: "32 / 40 · 400" },
  { name: "type-heading-06", spec: "42 / 50 · 300" },
  { name: "type-heading-07", spec: "54 / 64 · 300" },
];

const BODY: TypeRow[] = [
  { name: "type-body-compact-01", spec: "14 / 18 · 400" },
  { name: "type-body-compact-02", spec: "16 / 22 · 400" },
  { name: "type-body-01", spec: "14 / 20 · 400" },
  { name: "type-body-02", spec: "16 / 24 · 400" },
];

const UTILITY: TypeRow[] = [
  { name: "type-label-01", spec: "12 / 16 · 400" },
  { name: "type-label-02", spec: "14 / 18 · 400" },
  { name: "type-helper-text-01", spec: "12 / 16 · 400" },
  { name: "type-helper-text-02", spec: "14 / 18 · 400" },
  { name: "type-legal-01", spec: "12 / 16 · 400" },
  { name: "type-legal-02", spec: "14 / 18 · 400" },
  { name: "type-code-01", spec: "12 / 16 · 400 · mono" },
  { name: "type-code-02", spec: "14 / 20 · 400 · mono" },
];

const FLUID: TypeRow[] = [
  { name: "type-fluid-heading-03", spec: "20 / 28 · 400" },
  { name: "type-fluid-heading-04", spec: "28 / 36 · 400" },
  { name: "type-fluid-heading-05", spec: "42 / 50 · 300" },
  { name: "type-fluid-heading-06", spec: "42 / 50 · 600" },
  { name: "type-fluid-paragraph-01", spec: "28 / 36 · 300" },
  { name: "type-fluid-quotation-01", spec: "24 / 30 · 400 · serif" },
  { name: "type-fluid-quotation-02", spec: "42 / 50 · 300 · serif" },
  { name: "type-fluid-display-01", spec: "54 / 64 · 300" },
  { name: "type-fluid-display-02", spec: "54 / 64 · 600" },
  { name: "type-fluid-display-03", spec: "60 / 70 · 300 · tight" },
  { name: "type-fluid-display-04", spec: "92 / 102 · 300 · tight" },
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
        Carbon&rsquo;s type sets in IBM Plex Sans / Serif / Mono. Apply any
        style by adding its utility class (e.g.{" "}
        <code className="type-code-02">class=&quot;type-body-01&quot;</code>).
        Sizes use the 12px-base rem scale defined in{" "}
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
