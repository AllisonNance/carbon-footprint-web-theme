import type { Meta, StoryObj } from "@storybook/react";
import { PageTitleBlock } from "./PageTitleBlock";

const meta: Meta<typeof PageTitleBlock> = {
  title: "Organisms/Page title block",
  component: PageTitleBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Page-level header: single `<h1>` with an optional circular image and description. " +
          "Use as the visual title of a page; pair with `PageLayout` `hideDefaultHeader` " +
          "when replacing the template's default heading stack.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageTitleBlock>;

const profileImage = (
  <img
    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop"
    alt="Profile photo"
  />
);

export const Default: Story = {
  args: {
    heading: "Lead Product and UX Designer",
    description:
      "This is a description paragraph where I can explain the title and provide additional context about the role and responsibilities.",
    image: profileImage,
  },
};

export const Minimal: Story = {
  name: "Minimal (heading only)",
  args: {
    heading: "Lead Product and UX Designer",
  },
};
