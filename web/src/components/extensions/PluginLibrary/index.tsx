// import { Provider as Auth0Provider } from "@marketplace/auth";
import CoreWrapper from "@marketplace/components/molecules/Common/CoreWrapper";
import PluginDetailPage from "@marketplace/components/pages/PluginDetail";
import RootPage from "@marketplace/components/pages/Root";
import UserPage from "@marketplace/components/pages/User";
import { Provider as GqlProvider } from "@marketplace/gql";
import { Provider as I18nProvider } from "@marketplace/i18n";
import { Provider as ThemeProvider } from "@marketplace/theme";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

import "@marketplace/index.css";

export default function LibraryExtension({
  theme,
  // lang,
  selectedPluginId,
  // installedPlugins,
  onInstall,
  // onUninstall,
  // onNotificationChange,
  accessToken,
}: {
  theme?: "dark" | "light";
  lang?: string;
  accessToken?: string;
  selectedPluginId?: string;
  installedPlugins?: {
    id: string;
    version: string;
  }[];
  onInstall?: (pluginId: string) => void;
  onUninstall?: (pluginId: string) => void;
  onNotificationChange?: (
    type: "error" | "warning" | "info" | "success",
    text: string,
    heading?: string,
  ) => void;
}) {
  console.log(!!accessToken, "retrieved from reearth-web");

  return (
    // <Auth0Provider>
    <I18nProvider>
      <GqlProvider accessToken={accessToken} api="https://api.marketplace.test.reearth.dev/api">
        <ThemeProvider theme={theme}>
          <Router initialEntries={selectedPluginId ? [`/plugins/${selectedPluginId}`] : ["/"]}>
            <CoreWrapper>
              <Routes>
                <Route path="/" element={<RootPage showBanner />} />
                <Route
                  path="/plugins/:pluginId"
                  element={
                    <PluginDetailPage
                      selectedPluginId={selectedPluginId}
                      accessToken={accessToken}
                      onInstall={onInstall}
                    />
                  }
                />
                <Route path="/:userId" element={<UserPage />} />
                {/* <Route path="/:userId" element={<UserPage accessToken={accessToken} />} /> */}
              </Routes>
            </CoreWrapper>
          </Router>
        </ThemeProvider>
      </GqlProvider>
    </I18nProvider>
    // </Auth0Provider>
  );
}
