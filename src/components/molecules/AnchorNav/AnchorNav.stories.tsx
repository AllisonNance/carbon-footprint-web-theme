import type { Meta, StoryObj } from "@storybook/react";
import { AnchorNav } from "./AnchorNav";

const meta: Meta<typeof AnchorNav> = {
  title: "Molecules/Anchor Nav",
  component: AnchorNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Horizontal sticky navigation bar with anchor links and scroll-spy. " +
          "Active section highlights with a blue bottom border. Chevron buttons " +
          "appear when items overflow. Matches IBM's Table of Contents pattern.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnchorNav>;

const sectionStyle: React.CSSProperties = {
  padding: "4rem 2rem",
  minHeight: "60vh",
  borderBottom: "1px solid #e0e0e0",
};

export const Default: Story = {
  args: {
    items: [
      { label: "Overview", target: "overview" },
      { label: "Features", target: "features" },
      { label: "Benefits", target: "benefits" },
      { label: "Pricing", target: "pricing" },
      { label: "Resources", target: "resources" },
    ],
    stickyOffset: 0,
  },
  render: (args) => (
    <div>
      <AnchorNav {...args} />
      <div id="overview" style={sectionStyle}>
        <h2>Overview</h2>
        <p>Overview content goes here.</p>
      </div>
      <div id="features" style={sectionStyle}>
        <h2>Features</h2>
        <p>Features content goes here.</p>
      </div>
      <div id="benefits" style={sectionStyle}>
        <h2>Benefits</h2>
        <p>Benefits content goes here.</p>
      </div>
      <div id="pricing" style={sectionStyle}>
        <h2>Pricing</h2>
        <p>Pricing content goes here.</p>
      </div>
      <div id="resources" style={sectionStyle}>
        <h2>Resources</h2>
        <p>Resources content goes here.</p>
      </div>
    </div>
  ),
};
