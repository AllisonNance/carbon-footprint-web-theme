import type { Meta, StoryObj } from "@storybook/react";
import { Earth, Favorite, Location, Time } from "@carbon/icons-react";
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
          "Dark footer with tagline, links, and info items " +
          "on a g100 token scope.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  args: {
    tagline: (
      <>
        Designed and built with{" "}
        <Favorite size={20} aria-label="love" role="img" /> by Allison.
      </>
    ),
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Privacy", href: "#privacy" },
    ],
    infoItems: [
      { icon: <Location size={20} />, text: "Birmingham, AL area" },
      { icon: <Time size={20} />, text: "Central time zone" },
      { icon: <Earth size={20} />, text: "Eastern or Central working hours" },
    ],
  },
};
