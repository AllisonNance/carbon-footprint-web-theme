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

export const Default: Story = {
  args: {
    heading: (
      <>
        I&apos;m Allison,
        <br /> a UX designer who <em>builds.</em>
      </>
    ),
    tags: ["Systems", "Strategy", "AI Code"],
    description:
      "I bring an implementation-minded approach to UX, connecting strategy, interface design, systems thinking, and AI-assisted coding to translate ideas into experiences.",
  },
};

export const Minimal: Story = {
  name: "Minimal (heading only)",
  args: {
    heading: "Product and UX Designer",
  },
};
