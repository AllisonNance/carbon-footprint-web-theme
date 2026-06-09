import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          "Style Guide",
          ["Overview", "Typography", "Color"],
          "Atoms",
          "Molecules",
          "Organisms",
          "Templates",
          "*",
        ],
      },
    },
  },
};

export default preview;
