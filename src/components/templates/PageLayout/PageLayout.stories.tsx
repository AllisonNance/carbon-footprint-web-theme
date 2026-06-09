import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@components/atoms/Text";
import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  SkipToContent,
} from "@components/organisms/UIShell";
import { UserAvatar } from "@carbon/icons-react";
import { PageLayout } from "./PageLayout";

const meta: Meta<typeof PageLayout> = {
  title: "Templates/PageLayout",
  component: PageLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  args: {
    title: "Dashboard",
    description: "An overview of your account and recent activity.",
    header: (
      <Header aria-label="Allison Nance">
        <SkipToContent />
        <HeaderName
          href="#"
          logo={
            <img
              src="/logo-allison-nance.png"
              alt="Allison Nance, Product & UX Designer"
            />
          }
        />
        <HeaderNavigation aria-label="Primary">
          <HeaderMenuItem href="#" isActive>
            Home
          </HeaderMenuItem>
          <HeaderMenuItem href="#">Reports</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Account">
            <UserAvatar size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    ),
    children: <Text>Put your page content here.</Text>,
  },
};
