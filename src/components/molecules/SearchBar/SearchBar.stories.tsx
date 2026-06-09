"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar, type SearchSuggestion } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Molecules/Search Bar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Full-width search bar with typeahead suggestions. " +
          "56px tall, gradient bottom border, Carbon icons.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

const allSuggestions: SearchSuggestion[] = [
  { id: "1", text: "introduction to artificial intelligence (ai)" },
  { id: "2", text: "artificial intelligence fundamentals" },
  { id: "3", text: "what is artificial intelligence (ai)" },
  { id: "4", text: "introduction to artificial intelligence" },
  { id: "5", text: "types of artificial intelligence" },
  { id: "6", text: "artifact: story" },
  { id: "7", text: "artifact: roadmap" },
  { id: "8", text: "artificial compute" },
  { id: "9", text: "artificially intelligent agents provide new" },
  { id: "10", text: "artificial intelligence and time management" },
];

function SearchWithSuggestions() {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  const handleQueryChange = (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const filtered = allSuggestions.filter((s) =>
      s.text.toLowerCase().includes(query.toLowerCase()),
    );
    setSuggestions(filtered);
  };

  return (
    <SearchBar
      placeholder="Search"
      suggestions={suggestions}
      onQueryChange={handleQueryChange}
      onSelect={(value) => console.log("Selected:", value)}
    />
  );
}

export const Default: Story = {
  render: () => <SearchWithSuggestions />,
};
