import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "code-01", "code-02",
        "label-01", "label-02",
        "helper-text-01", "helper-text-02",
        "legal-01", "legal-02",
        "body-compact-01", "body-compact-02", "body-01", "body-02",
        "heading-compact-01", "heading-compact-02",
        "heading-01", "heading-02", "heading-03",
        "heading-04", "heading-05", "heading-06", "heading-07",
        "fluid-heading-03", "fluid-heading-04", "fluid-heading-05", "fluid-heading-06",
        "fluid-paragraph-01",
        "fluid-quotation-01", "fluid-quotation-02",
        "fluid-display-01", "fluid-display-02", "fluid-display-03", "fluid-display-04",
      ],
    },
    tone: {
      control: "inline-radio",
      options: ["primary", "secondary", "helper", "placeholder", "error", "on-color", "inverse"],
    },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    type: "body-01",
    tone: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Body01: Story = { args: { as: "p", type: "body-01" } };
export const Body02: Story = { args: { as: "p", type: "body-02" } };
export const Heading03: Story = { args: { as: "h2", type: "heading-03", children: "Heading 03" } };
export const Heading05: Story = { args: { as: "h1", type: "heading-05", children: "Heading 05" } };
export const FluidDisplay01: Story = {
  args: { as: "h1", type: "fluid-display-01", children: "Fluid display 01" },
};
export const Code01: Story = {
  args: { as: "code", type: "code-01", children: "const answer = 42;" },
};
export const HelperText: Story = {
  args: { type: "helper-text-01", tone: "helper", children: "Helper text for a field." },
};

export const AllTypeSets: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-05)" }}>
      <div>
        <p className="type-label-01" style={{ color: "var(--text-secondary)" }}>Utility</p>
        <p className="type-code-01">code-01 — inline code snippet</p>
        <p className="type-label-01">label-01 — a field label</p>
        <p className="type-helper-text-01">helper-text-01 — explanatory helper text</p>
      </div>
      <div>
        <p className="type-label-01" style={{ color: "var(--text-secondary)" }}>Body</p>
        <p className="type-body-compact-01">body-compact-01 — compact productive body.</p>
        <p className="type-body-01">body-01 — taller productive body for longer reads.</p>
        <p className="type-body-02">body-02 — expressive body.</p>
      </div>
      <div>
        <p className="type-label-01" style={{ color: "var(--text-secondary)" }}>Headings</p>
        <p className="type-heading-01">heading-01</p>
        <p className="type-heading-03">heading-03</p>
        <p className="type-heading-05">heading-05</p>
        <p className="type-heading-07">heading-07</p>
      </div>
      <div>
        <p className="type-label-01" style={{ color: "var(--text-secondary)" }}>Fluid</p>
        <p className="type-fluid-heading-04">fluid-heading-04</p>
        <p className="type-fluid-display-01">fluid-display-01</p>
      </div>
    </div>
  ),
};
