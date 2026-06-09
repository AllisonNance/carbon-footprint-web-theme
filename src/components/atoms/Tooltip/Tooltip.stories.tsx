import type { Meta, StoryObj } from "@storybook/react";
import { Information } from "@carbon/icons-react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carbon Tooltip — a standalone wrapper that anchors a short label to any trigger. Uses JS-driven enter/leave delays (100ms default) and links trigger ↔ tooltip via `aria-describedby`.",
      },
    },
  },
  argTypes: {
    align: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "right",
      ],
    },
    enterDelayMs: { control: { type: "number", min: 0, max: 2000, step: 50 } },
    leaveDelayMs: { control: { type: "number", min: 0, max: 2000, step: 50 } },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "A tooltip describing the trigger",
    align: "top",
    enterDelayMs: 100,
    leaveDelayMs: 100,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/** Wraps a regular Button. */
export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <button type="button">Hover or focus me</button>
    </Tooltip>
  ),
};

/** Wrapping an information icon — the classic "?" / "i" help affordance. */
export const InformationIcon: Story = {
  args: { label: "Your session will end after 15 minutes of inactivity." },
  render: (args) => (
    <Tooltip {...args}>
      <button
        type="button"
        aria-label="More information"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1.25rem",
          height: "1.25rem",
          padding: 0,
          background: "transparent",
          border: 0,
          color: "var(--icon-primary)",
          cursor: "pointer",
        }}
      >
        <Information />
      </button>
    </Tooltip>
  ),
};

/** Rich tooltip content — keeps tooltip readable with multi-line copy. */
export const RichContent: Story = {
  args: {
    label: (
      <>
        <strong>Keyboard shortcut</strong>
        <br />
        Cmd + S to save your work
      </>
    ),
  },
  render: (args) => (
    <Tooltip {...args}>
      <button type="button">Save</button>
    </Tooltip>
  ),
};

/** Slow enter delay (500ms) — useful for dense UIs. */
export const SlowReveal: Story = {
  args: { enterDelayMs: 500, leaveDelayMs: 0, label: "Shown after 500ms" },
  render: (args) => (
    <Tooltip {...args}>
      <button type="button">Hover me</button>
    </Tooltip>
  ),
};

/** Disabled tooltip — trigger still works, tooltip never appears. */
export const Disabled: Story = {
  args: { disabled: true, label: "You won't see me" },
  render: (args) => (
    <Tooltip {...args}>
      <button type="button">No tooltip here</button>
    </Tooltip>
  ),
};

/** All eight alignments in one frame. */
export const AllAlignments: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, auto)",
        gap: "var(--spacing-09)",
        padding: "var(--spacing-09)",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      {(
        [
          "top",
          "top-start",
          "top-end",
          "right",
          "bottom",
          "bottom-start",
          "bottom-end",
          "left",
        ] as const
      ).map((align) => (
        <Tooltip key={align} label={align} align={align} defaultOpen>
          <button type="button">{align}</button>
        </Tooltip>
      ))}
    </div>
  ),
};
