import type { Meta, StoryObj } from "@storybook/react";
import { SparklesIcon } from "./SparklesIcon";

const meta: Meta<typeof SparklesIcon> = {
  title: "Atoms/SparklesIcon",
  component: SparklesIcon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Animated sparkle glyph that loops continuously from mount " +
          "(respects `prefers-reduced-motion`). Color defaults to a " +
          "medium taupe.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SparklesIcon>;

export const Default: Story = {
  args: {
    size: 32,
  },
};
