import type { Meta, StoryObj } from "@storybook/react";
import { TrafficCone } from "@carbon/icons-react";
import { PortfolioItemCard } from "./PortfolioItemCard";
import { PortfolioItemGrid } from "./PortfolioItemGrid";

const meta: Meta<typeof PortfolioItemCard> = {
  title: "Molecules/Portfolio Item Card",
  component: PortfolioItemCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Editorial card for a single portfolio item, composed from " +
          "existing atoms (type-* utility classes, Carbon icons). " +
          "The image renders inside a 16:10 frame with " +
          "`object-fit: cover`.\n\nPair with `PortfolioItemGrid` for the " +
          "single-column list layout, capped at a 1200px max-width.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PortfolioItemCard>;

/* ---------- Sample images (Unsplash, portrait-oriented) ---------- */

const img1 =
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80&auto=format&fit=crop";
const img2 =
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600&q=80&auto=format&fit=crop";
const img3 =
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80&auto=format&fit=crop";
const img4 =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop";

/* ---------- A single card ---------- */

export const Default: Story = {
  args: {
    portfolioItemType: "Project",
    title: "Cleveland Clinic and IBM debut new quantum workflow for simulating molecules",
    href: "#",
    media: <img src={img1} alt="Quantum molecule visualization" />,
    client: "Cleveland Clinic",
    year: "2026",
    hoverLabel: "View case study",
  },
  parameters: {
    docs: {
      description: {
        story:
          "With `href` and `hoverLabel` both set, the whole card becomes " +
          "a link and a small message follows the cursor on hover " +
          "(desktop mouse only) — the message is authored per item in " +
          "Sanity.",
      },
    },
  },
};

/* ---------- Optional mobile media override ---------- */

export const MobileMediaOverride: Story = {
  args: {
    portfolioItemType: "Project",
    title: "Cleveland Clinic and IBM debut new quantum workflow for simulating molecules",
    href: "#",
    media: <img src={img1} alt="Desktop crop" />,
    mobileMedia: <img src={img3} alt="Mobile crop" />,
    client: "Cleveland Clinic",
    year: "2026",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `mobileMedia` is set, it replaces `media` below the 42rem " +
          "breakpoint (e.g. a tighter crop for small screens). Resize the " +
          "viewport to see the swap.",
      },
    },
  },
};

/* ---------- The single-column list (matches the reference) ---------- */

export const List: Story = {
  name: "List · single column",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "`PortfolioItemGrid` stacks cards in a single column at every " +
          "breakpoint, capped at a 1200px max-width and centered on the " +
          "page.",
      },
    },
  },
  render: () => (
    <PortfolioItemGrid>
      <PortfolioItemCard
        portfolioItemType="Project"
        title="Cleveland Clinic and IBM debut new quantum workflow for simulating molecules"
        href="#"
        media={<img src={img1} alt="Quantum molecule visualization" />}
        client="Cleveland Clinic"
        year="2026"
      />
      <PortfolioItemCard
        portfolioItemType="Case Study"
        title="Turning turbulence into transcripts"
        href="#"
        media={<img src={img2} alt="Translating turbulence" />}
        client="Acme Corp"
        year="2026"
      />
      <PortfolioItemCard
        portfolioItemType="Project"
        title="Like the information in a dream: a quantum computing milestone"
        href="#"
        media={<img src={img3} alt="Portrait" />}
        client="Research Lab"
        year="2026"
      />
      <PortfolioItemCard
        portfolioItemType="Case Study"
        title="Doubling down on open-access quantum computing"
        href="#"
        media={<img src={img4} alt="Open Plan project" />}
        client="Open Plan"
        year="2026"
      />
    </PortfolioItemGrid>
  ),
};

/* ---------- Placeholder card (no case study yet) ---------- */

export const Placeholder: Story = {
  args: {
    portfolioItemType: "Coming Soon",
    portfolioItemTypeIcon: <TrafficCone size={16} />,
    title: "A future case study, not yet published",
    media: <img src={img2} alt="" />,
    client: "Acme Corp",
    year: "2026",
    description:
      "A short summary of this project will live here until the full " +
      "case study is ready to publish.",
    hoverLabel: "Coming Soon",
  },
  parameters: {
    docs: {
      description: {
        story:
          "No `href` is passed, so the title renders as plain text " +
          "instead of a link. `description` shows a short summary below " +
          "the title while the full case study isn't live yet. " +
          "`hoverLabel` still works without a link — hover the card to " +
          "see \"Coming Soon\" follow the cursor.",
      },
    },
  },
};
