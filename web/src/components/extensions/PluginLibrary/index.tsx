import CoreWrapper from "@marketplace/components/molecules/Common/CoreWrapper";
import PluginDetailPage from "@marketplace/components/pages/PluginDetail";
import RootPage from "@marketplace/components/pages/Root";
import UserPage from "@marketplace/components/pages/User";
import { useT } from "@marketplace/i18n";
import { useCallback } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

import SharedProviders from "../sharedProviders";

import "@marketplace/index.css";

export default function LibraryExtension({
  theme,
  lang,
  accessToken,
  selectedPluginId,
  onInstall,
  onNotificationChange,
}: {
  theme?: "dark" | "light";
  lang?: string;
  accessToken?: string;
  selectedPluginId?: string;
  onInstall?: (pluginId: string) => void;
  onNotificationChange?: (
    type: "error" | "warning" | "info" | "success",
    text: string,
    heading?: string,
  ) => void;
}) {
  const t = useT();

  const handleInstall = useCallback(
    (id: string) => {
      onInstall?.(id);
      onNotificationChange?.("success", t("You successfully updated your plugin"), t("Success"));
    },
    [t, onInstall, onNotificationChange],
  );

  return (
    <SharedProviders accessToken={accessToken} lang={lang} theme={theme}>
      <Router initialEntries={selectedPluginId ? [`/plugins/${selectedPluginId}`] : ["/"]}>
        <CoreWrapper>
          <Routes>
            <Route path="/" element={<RootPage />} />
            <Route
              path="/plugins/:pluginId"
              element={
                <PluginDetailPage
                  selectedPluginId={selectedPluginId}
                  accessToken={accessToken}
                  onInstall={handleInstall}
                />
              }
            />
            <Route path="/:userId" element={<UserPage />} />
          </Routes>
        </CoreWrapper>
      </Router>
    </SharedProviders>
  );
}
