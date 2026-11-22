import type { Meta, StoryObj } from "@storybook/react";
import { AwayMessage, AWAY_MESSAGES } from "./AwayMessage";

const meta: Meta<typeof AwayMessage> = {
  title: "Molecules/Away Message",
  component: AwayMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Early-2000s AIM-style away message shown under the home page " +
          "title. Picks a random message and idle time on each page load.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AwayMessage>;

/** Random on each load, as on the site. */
export const Random: Story = {};

/** Every message, for checking the symbol colors. */
export const AllMessages: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {AWAY_MESSAGES.map((_, i) => (
        <AwayMessage key={i} index={i} idleMinutes={3 + i * 4} />
      ))}
    </div>
  ),
};
