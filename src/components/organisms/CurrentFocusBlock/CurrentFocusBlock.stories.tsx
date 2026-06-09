import type { Meta, StoryObj } from "@storybook/react";
import { CurrentFocusBlock } from "./CurrentFocusBlock";

const meta: Meta<typeof CurrentFocusBlock> = {
  title: "Organisms/Current Focus Block",
  component: CurrentFocusBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Static block listing current focus areas: section title uses the " +
          "same `type-heading-04` treatment as BytesBlock; each row uses " +
          "Carbon heading / body hierarchy, a small leading icon, primary " +
          "copy on the left (~⅔), and a contributions list on the right (~⅓). " +
          "Nothing is linked — suitable for hard-coded or CMS plain text.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CurrentFocusBlock>;

const ipsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus " +
  "imperdiet, nulla eu varius pharetra, nisi purus hendrerit orci, nec " +
  "vulputate justo elit ac elit. Vestibulum ante ipsum primis in faucibus " +
  "orci luctus et ultrices posuere cubilia curae.";

export const Default: Story = {
  render: () => (
    <CurrentFocusBlock
      items={[
        {
          id: "ai-ds",
          title: "AI Enabled Design Systems",
          description: ipsum,
          contributions: [
            "List item 1",
            "List item 2",
            "List item 3",
            "List item 4",
            "List item 5",
          ],
        },
        {
          id: "another",
          title: "Another focus area",
          description:
            "Supporting body copy for a second row. Shorter paragraph to " +
            "show how the layout behaves with different content lengths.",
          contributionsHeading: "Contributions",
          contributions: ["Mentorship", "Documentation", "Research"],
        },
      ]}
    />
  ),
};

export const SingleRow: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Portfolio and case studies",
        description:
          "Publishing work in progress and finished case studies using " +
          "Carbon patterns and this design system.",
        contributions: ["Writing", "Photography", "Prototyping"],
      },
    ],
  },
};
