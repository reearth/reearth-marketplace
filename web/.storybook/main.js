const { resolve } = require("path");

const yaml = require("@rollup/plugin-yaml");
const { mergeConfig } = require("vite");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-react-i18next",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      envPrefix: "REEARTH_MARKETPLACE_",
      plugins: [yaml()],
      resolve: {
        alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
      },
    });
  },
};
