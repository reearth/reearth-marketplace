import ConfigProvider, {
  theme as ProviderTheme,
} from "@marketplace/components/atoms/ConfigProvider";
import { useConfig } from "@marketplace/config";
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
  const config = useConfig();

  return config?.marketplaceApi && accessToken ? (
    <ConfigProvider
      theme={{
        algorithm: theme === "dark" ? ProviderTheme.darkAlgorithm : ProviderTheme.defaultAlgorithm,
      }}>
      <I18nProvider>
        <GqlProvider accessToken={accessToken}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </GqlProvider>
      </I18nProvider>
    </ConfigProvider>
  ) : null;
}
