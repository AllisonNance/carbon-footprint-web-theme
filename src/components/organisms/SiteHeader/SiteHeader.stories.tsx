import type { Meta, StoryObj } from "@storybook/react";
import { SiteHeader } from "./SiteHeader";

/**
 * The site-wide header — built on the Carbon UI Shell primitives
 * (`Header`, `HeaderName`, `HeaderNavigation`, etc.).
 *
 * Includes:
 * - **Brand name** — links to home with a gradient underline on hover.
 * - **Navigation** — Work, Bytes, and GitHub (with external-link icon).
 * - **Global actions** — email link and LinkedIn icon.
 * - **Mobile side-nav** — hamburger toggle with slide-out drawer.
 *
 * The header inherits the page theme by default. The footer and header
 * can scope themselves to `data-theme="g100"` for a dark chrome look.
 */
const meta: Meta<typeof SiteHeader> = {
  title: "Organisms/Site Header",
  component: SiteHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {};
