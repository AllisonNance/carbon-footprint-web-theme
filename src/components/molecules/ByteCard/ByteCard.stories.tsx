import type { Meta, StoryObj } from "@storybook/react";
import { ByteCard } from "./ByteCard";

const toBlock = (text: string, key: string) => ({
  _type: "block",
  _key: key,
  style: "normal",
  children: [{ _type: "span", _key: `${key}-span`, text }],
});

const meta: Meta<typeof ByteCard> = {
  title: "Molecules/Byte Card",
  component: ByteCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Single byte card for the byte feed. Includes categories, title, " +
          "date, and description. Long descriptions collapse with a " +
          "Read More / Read Less toggle.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ByteCard>;

export const Default: Story = {
  args: {
    categories: ["AI", "Design Systems"],
    date: "Jan 5, 2026",
    dateISO: "2026-01-05",
    title: "Here is a title for this byte that will show on the feed",
    body: [
      toBlock(
        "This is a description paragraph where I can explain the title lskdn slndv " +
          "slkdnv soldnv slkdnv slnv lsvdn slnc slknc lsnc lksdnc ldsn lksd kvns l,ksdc " +
          "lsnvld lskdn slndv slkdnv soldnv slkdnv slnv lsvdn slnc slknc lsnc lksdnc ldsn " +
          "lksd kvns l,ksdc lsnvld",
        "default-1",
      ),
    ],
  },
};

export const Expandable: Story = {
  args: {
    categories: ["Process", "Workshops"],
    date: "Jan 5, 2026",
    dateISO: "2026-01-05",
    title: "Here is a title for this byte that will show on the feed",
    body: [
      toBlock(
        "This is a description paragraph where I can explain the title lskdn slndv " +
          "slkdnv soldnv slkdnv slnv lsvdn slnc slknc lsnc lksdnc ldsn lksd kvns l,ksdc " +
          "lsnvld lskdn slndv slkdnv soldnv slkdnv slnv lsvdn slnc slknc lsnc lksdnc ldsn " +
          "lksd kvns l,ksdc lsnvld",
        "expandable-1",
      ),
      toBlock(
        "This is a description paragraph where I can explain the title lskdn slndv " +
          "slkdnv soldnv slkdnv slnv lsvdn slnc slknc lsnc lksdnc ldsn lksd kvns l,ksdc " +
          "lsnvld lskdn slndv slkdnv soldnv slkdnv slnv lsvdn slnc slknc lsnc lksdnc ldsn " +
          "lksd kvns l,ksdc lsnvld kjzxnc kjn cskjndc skljdn skdn slkn vlsnv slnv slndv",
        "expandable-2",
      ),
      toBlock(
        "This is a description paragraph where I can explain the title lskdn slndv " +
          "slkdnv soldnv slkdnv slnv lsvdn slnc slknc lsnc lksdnc ldsn lksd kvns l,ksdc " +
          "lsnvld lskdn slndv slkdnv soldnv slkdnv slnv lsvdn slnc slknc lsnc lksdnc ldsn " +
          "lksd kvns l,ksdc lsnvld kjzxnc kjn cskjndc skljdn skdn slkn vlsnv slnv slndv",
        "expandable-3",
      ),
    ],
  },
};

export const TextOnly: Story = {
  args: {
    categories: ["Design"],
    date: "Mar 12, 2026",
    dateISO: "2026-03-12",
    title: "A byte without a long description",
    body: [
      toBlock(
        "Sometimes a byte is just text with no accompanying media.",
        "textonly-1",
      ),
    ],
  },
};
