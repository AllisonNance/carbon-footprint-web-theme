import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Loading } from "./Loading";

const meta: Meta<typeof Loading> = {
  title: "Atoms/Loading",
  component: Loading,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
    small: { control: "boolean" },
    withOverlay: { control: "boolean" },
    description: { control: "text" },
  },
  args: {
    active: true,
    small: false,
    withOverlay: false,
    description: "Loading",
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

/** Default — large inline spinner (overlay disabled for clarity). */
export const Default: Story = {};

/** Small 44px variant. */
export const Small: Story = { args: { small: true } };

/** Stopped — full static ring, no animation. */
export const Stopped: Story = { args: { active: false } };

/** Large + small side-by-side. */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 48,
      }}
    >
      <Loading withOverlay={false} />
      <Loading withOverlay={false} small />
    </div>
  ),
};

/**
 * Fullscreen overlay — toggle on/off from a button. The overlay fades out
 * when `active` flips to `false` so the content behind it reveals.
 */
export const WithOverlay: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p className="type-body-02" style={{ margin: 0 }}>
          Behind the overlay: regular page content you want to block while a
          slow operation runs.
        </p>
        <div>
          <button type="button" onClick={() => setActive(true)}>Start loading</button>
        </div>
        <Loading active={active} withOverlay />
        {active && (
          <button
            type="button"
            onClick={() => setActive(false)}
            style={{
              position: "fixed",
              top: 16,
              right: 16,
              zIndex: 1001,
            }}
          >
            Stop
          </button>
        )}
      </div>
    );
  },
};

/** A realistic "loading → done" lifecycle. */
export const LifecycleDemo: Story = {
  render: () => {
    const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
    const start = () => {
      setStatus("loading");
      setTimeout(() => setStatus("done"), 2500);
    };
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          gap: 16,
          minHeight: 160,
        }}
      >
        {status === "idle" && <button type="button" onClick={start}>Start</button>}
        {status === "loading" && (
          <Loading withOverlay={false} description="Saving changes…" />
        )}
        {status === "done" && (
          <div className="type-body-02">Finished.{" "}
            <button type="button" onClick={() => setStatus("idle")}>
              Reset
            </button>
          </div>
        )}
      </div>
    );
  },
};
