import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Launch, Favorite } from "@carbon/icons-react";
import { Tile } from "./Tile";
import { ClickableTile } from "./ClickableTile";
import { SelectableTile } from "./SelectableTile";
import {
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "./ExpandableTile";

const meta: Meta<typeof Tile> = {
  title: "Atoms/Tile",
  component: Tile,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Tile>;

/* -------------------- Base Tile -------------------- */

export const Default: Story = {
  render: () => (
    <Tile style={{ maxWidth: 320 }}>
      <h4 style={{ margin: 0, marginBlockEnd: 8 }}>Default tile</h4>
      <p style={{ margin: 0 }}>
        Static container with the Layer-01 background, used to visually
        group content.
      </p>
    </Tile>
  ),
};

/* -------------------- ClickableTile ---------------- */

export const Clickable: Story = {
  render: () => (
    <ClickableTile href="#" style={{ maxWidth: 320 }}>
      <h4 style={{ margin: 0, marginBlockEnd: 8 }}>Clickable tile</h4>
      <p style={{ margin: 0, marginBlockEnd: 24 }}>
        Renders as an anchor with a trailing arrow. Hover and press to
        see the state transitions.
      </p>
    </ClickableTile>
  ),
};

export const ClickableWithCustomIcon: Story = {
  render: () => (
    <ClickableTile
      href="https://carbondesignsystem.com"
      target="_blank"
      renderIcon={Launch}
      style={{ maxWidth: 320 }}
    >
      <h4 style={{ margin: 0, marginBlockEnd: 8 }}>External link</h4>
      <p style={{ margin: 0, marginBlockEnd: 24 }}>
        Override the trailing icon with any `@carbon/icons-react`
        component via `renderIcon`.
      </p>
    </ClickableTile>
  ),
};

export const ClickableDisabled: Story = {
  render: () => (
    <ClickableTile href="#" disabled style={{ maxWidth: 320 }}>
      <h4 style={{ margin: 0, marginBlockEnd: 8 }}>Disabled tile</h4>
      <p style={{ margin: 0, marginBlockEnd: 24 }}>
        Navigation is stripped and the tile dims — still exposed to
        screen readers with `aria-disabled`.
      </p>
    </ClickableTile>
  ),
};

/* -------------------- SelectableTile --------------- */

export const Selectable: Story = {
  render: () => (
    <SelectableTile style={{ maxWidth: 320 }} title="Option A">
      <h4 style={{ margin: 0, marginBlockEnd: 8 }}>Selectable tile</h4>
      <p style={{ margin: 0 }}>
        Acts like a checkbox. Click or press Space / Enter to toggle.
      </p>
    </SelectableTile>
  ),
};

export const SelectableControlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    const options = ["Basic", "Standard", "Enterprise"] as const;
    return (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {options.map((option) => (
          <SelectableTile
            key={option}
            selected={selected === option}
            onChange={(_, next) => setSelected(next ? option : null)}
            style={{ maxWidth: 240 }}
          >
            <h4 style={{ margin: 0, marginBlockEnd: 4 }}>{option}</h4>
            <p style={{ margin: 0 }}>Tier description for {option}.</p>
          </SelectableTile>
        ))}
      </div>
    );
  },
};

export const SelectableDisabled: Story = {
  render: () => (
    <SelectableTile disabled style={{ maxWidth: 320 }}>
      <h4 style={{ margin: 0, marginBlockEnd: 8 }}>Disabled selectable</h4>
      <p style={{ margin: 0 }}>This tile can't be toggled.</p>
    </SelectableTile>
  ),
};

/* -------------------- ExpandableTile --------------- */

export const Expandable: Story = {
  render: () => (
    <ExpandableTile
      tileCollapsedLabel="View more"
      tileExpandedLabel="View less"
      style={{ maxWidth: 480 }}
    >
      <TileAboveTheFoldContent>
        <h4 style={{ margin: 0, marginBlockEnd: 8 }}>Expandable tile</h4>
        <p style={{ margin: 0 }}>
          Click the chevron to reveal the hidden content below.
        </p>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <p style={{ margin: 0, marginBlockEnd: 8 }}>
          This region only becomes visible when the tile is expanded.
          The collapsed height is measured automatically from the first
          child so the animation lands on a sensible target.
        </p>
        <ul style={{ marginBlockStart: 0 }}>
          <li>Backed by a ResizeObserver for live content updates</li>
          <li>aria-expanded / aria-controls wired to the chevron</li>
          <li>Supports controlled + uncontrolled usage</li>
        </ul>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  ),
};

export const ExpandableControlled: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{ alignSelf: "flex-start" }}
        >
          Toggle from outside ({expanded ? "open" : "closed"})
        </button>
        <ExpandableTile
          expanded={expanded}
          onChange={setExpanded}
          tileCollapsedLabel="View more"
          tileExpandedLabel="View less"
          style={{ maxWidth: 480 }}
        >
          <TileAboveTheFoldContent>
            <h4 style={{ margin: 0 }}>Controlled expandable tile</h4>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <p>Secondary controls are driving this tile&apos;s state.</p>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      </div>
    );
  },
};

/* -------------------- Grid demo -------------------- */

export const Grid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
      }}
    >
      <Tile>
        <Favorite aria-hidden />
        <h4 style={{ margin: "8px 0" }}>Static</h4>
        <p style={{ margin: 0 }}>Read-only content shell.</p>
      </Tile>
      <ClickableTile href="#">
        <h4 style={{ margin: 0, marginBlockEnd: 8 }}>Clickable</h4>
        <p style={{ margin: 0, marginBlockEnd: 24 }}>Navigate somewhere.</p>
      </ClickableTile>
      <SelectableTile>
        <h4 style={{ margin: 0, marginBlockEnd: 8 }}>Selectable</h4>
        <p style={{ margin: 0 }}>Toggle to select.</p>
      </SelectableTile>
      <ExpandableTile
        tileCollapsedLabel="More"
        tileExpandedLabel="Less"
      >
        <TileAboveTheFoldContent>
          <h4 style={{ margin: 0 }}>Expandable</h4>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <p style={{ margin: 0 }}>Reveals details on demand.</p>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    </div>
  ),
};
