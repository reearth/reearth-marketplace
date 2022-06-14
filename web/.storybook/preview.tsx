import { type ComponentType } from "react";

import { i18n, Provider as I18nProvider } from "../src/i18n";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  i18n,
  locale: "en",
  locales: {
    en: "English",
    ja: "日本語",
  },
};

export const decorators = [
  (Story: ComponentType<any>) => (
    <I18nProvider>
      <Story />
    </I18nProvider>
  ),
];
