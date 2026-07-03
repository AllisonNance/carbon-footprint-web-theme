import type { Meta, StoryObj } from "@storybook/react";
import { SparklesIcon } from "@components/atoms/SparklesIcon";
import { NoticeCard } from "./NoticeCard";

const meta: Meta<typeof NoticeCard> = {
  title: "Molecules/Notice Card",
  component: NoticeCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Lightest-taupe callout for supplementary context next to the " +
          "hero heading, e.g. a portfolio-update notice.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NoticeCard>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <NoticeCard
        icon={<SparklesIcon size={28} />}
        heading="My portfolio is getting an update!"
        description="I'm currently refreshing my case studies to better reflect the way I think, design, collaborate, and build. Until they're ready, here's a snapshot of my work and contributions."
      />
    </div>
  ),
};
