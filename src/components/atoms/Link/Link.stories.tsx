import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Launch, Download } from "@carbon/icons-react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Carbon Link — a styled anchor with three sizes, inline/standalone treatments, optional trailing icon, visited styles, and proper disabled semantics (no href, role=\"link\", aria-disabled). Polymorphic via the `as` prop.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    inline: { control: "boolean" },
    visited: { control: "boolean" },
    disabled: { control: "boolean" },
    href: { control: "text" },
  },
  args: {
    href: "https://carbondesignsystem.com/",
    size: "md",
    inline: false,
    visited: false,
    disabled: false,
    children: "Learn more about Carbon",
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const WithTrailingIcon: Story = {
  args: {
    children: "Open documentation",
    renderIcon: ArrowRight,
  },
};

export const ExternalLink: Story = {
  args: {
    children: "Carbon on GitHub",
    href: "https://github.com/carbon-design-system/carbon",
    target: "_blank",
    renderIcon: Launch,
  },
};

export const Download_: Story = {
  name: "Download",
  args: {
    children: "Download the style guide",
    href: "/carbon-guide.pdf",
    renderIcon: Download,
  },
};

export const Visited: Story = {
  args: {
    visited: true,
    children: "Link that shows visited styling once clicked",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled link",
  },
};

/** Inline — sits in the flow of body copy with an underline. */
export const Inline: Story = {
  render: (args) => (
    <p
      style={{
        maxWidth: "40rem",
        color: "var(--text-primary)",
        fontSize: "var(--font-size-md)",
        lineHeight: 1.5,
      }}
    >
      Carbon is IBM&rsquo;s open-source design system. Read more on the{" "}
      <Link {...args} inline>
        official documentation site
      </Link>{" "}
      or browse the component source on GitHub.
    </p>
  ),
};

/** All three sizes stacked for visual comparison. */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-05)" }}>
      <Link href="#" size="sm" renderIcon={ArrowRight}>
        Small link
      </Link>
      <Link href="#" size="md" renderIcon={ArrowRight}>
        Medium link (default)
      </Link>
      <Link href="#" size="lg" renderIcon={ArrowRight}>
        Large link
      </Link>
    </div>
  ),
};

/** Polymorphic `as` — render Link as a `<button>` for JS-driven navigation. */
export const AsButton: Story = {
  render: () => (
    <Link
      as="button"
      type="button"
      onClick={() => alert("Link rendered as a button")}
      renderIcon={ArrowRight}
    >
      Rendered as a &lt;button&gt;
    </Link>
  ),
};
