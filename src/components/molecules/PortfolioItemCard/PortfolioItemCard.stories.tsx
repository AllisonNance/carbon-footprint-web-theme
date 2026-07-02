import type { Meta, StoryObj } from "@storybook/react";
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
          "The image renders inside a 3:4 portrait frame with " +
          "`object-fit: cover`.\n\nPair with `PortfolioItemGrid` for the " +
          "gallery layout: on desktop, `columns={4}` uses two rows of two " +
          "cards (⅔+⅓, then ⅓+⅔). Rules between cards use a 1px " +
          "grid-gap over a tinted container.",
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
  },
};

/* ---------- The 4-up grid (matches the reference) ---------- */

export const GridOfFour: Story = {
  name: "Grid · 2 rows (⅔–⅓ + ⅓–⅔)",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "With `columns={4}`, desktop lays out four cards as two rows: " +
          "first row is two-thirds + one-third width; second row mirrors " +
          "that (one-third + two-thirds). Tablet uses a 2×2 equal grid; " +
          "mobile stacks a single column.",
      },
    },
  },
  render: () => (
    <PortfolioItemGrid columns={4}>
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
    portfolioItemType: "Project",
    title: "A future case study, not yet published",
    media: <img src={img2} alt="" />,
    client: "Acme Corp",
    year: "2026",
    contributionTags: [
      "UX Strategy",
      "User Flows",
      "Wireframes",
      "UI Design",
      "Ecommerce UX",
      "Design System Alignment",
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "No `href` is passed, so the title renders as plain text " +
          "instead of a link. `contributionTags` render as non-interactive " +
          "taupe chips below the media, showing what was contributed " +
          "while the full case study isn't live yet.",
      },
    },
  },
};

/* ---------- 3-up variant ---------- */

export const GridOfThree: Story = {
  name: "Grid · 3 across",
  parameters: { layout: "padded" },
  render: () => (
    <PortfolioItemGrid columns={3}>
      <PortfolioItemCard
        title="First story title that wraps onto multiple lines"
        href="#"
        media={<img src={img1} alt="" />}
        client="Client One"
        year="2026"
      />
      <PortfolioItemCard
        title="Second story title"
        href="#"
        media={<img src={img2} alt="" />}
        client="Client Two"
        year="2026"
      />
      <PortfolioItemCard
        title="Third story title"
        href="#"
        media={<img src={img3} alt="" />}
        client="Client Three"
        year="2026"
      />
    </PortfolioItemGrid>
  ),
};
