import type { Meta, StoryObj } from "@storybook/react";
import { SiteFooter } from "./SiteFooter";

const meta: Meta<typeof SiteFooter> = {
  title: "Organisms/Site footer",
  component: SiteFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Dark Carbon-style footer with tagline, links, and info items " +
          "on a g100 token scope.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  args: {
    tagline: "Designed and built with love by Allison.",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Privacy", href: "#privacy" },
    ],
  },
};
