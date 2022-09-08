import { Provider as GqlProvider } from "@marketplace/gql";
import { Provider as I18nProvider } from "@marketplace/i18n";
import { Provider as ThemeProvider } from "@marketplace/theme";

import "@marketplace/index.css";

export default function SharedProviders({
  theme,
  // lang,
  accessToken,
  children,
}: {
  theme?: "dark" | "light";
  lang?: string;
  accessToken?: string;
  children?: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <GqlProvider
        accessToken={accessToken}
        api={import.meta.env.REEARTH_MARKETPLACE_API || "/api"}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </GqlProvider>
    </I18nProvider>
  );
}
