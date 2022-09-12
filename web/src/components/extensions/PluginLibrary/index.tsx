import CoreWrapper from "@marketplace/components/molecules/Common/CoreWrapper";
import PluginDetailPage from "@marketplace/components/pages/PluginDetail";
import RootPage from "@marketplace/components/pages/Root";
import { useT } from "@marketplace/i18n";
import { useCallback, useLayoutEffect, useState } from "react";

import SharedProviders from "../sharedProviders";

import "@marketplace/index.css";

export default function LibraryExtension({
  theme,
  lang,
  accessToken,
  installedPlugins,
  onInstall,
  onNotificationChange,
}: {
  theme?: "dark" | "light";
  lang?: string;
  accessToken?: string;
  installedPlugins?: {
    id: string;
    version: string;
  }[];
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

  const [pluginId, setPluginId] = useState<string>();
  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search);
    const pluginId = params.get("pluginId");
    if (pluginId) {
      setPluginId(pluginId);
    }
  }, []);

  const handlePluginSelect = useCallback((pluginId: string) => {
    setPluginId(pluginId);
  }, []);

  const handleBack = useCallback(() => {
    setPluginId("");
  }, []);

  return (
    <SharedProviders accessToken={accessToken} lang={lang} theme={theme}>
      <CoreWrapper>
        {pluginId && (
          <PluginDetailPage
            selectedPluginId={pluginId}
            accessToken={accessToken}
            installedPlugins={installedPlugins}
            onInstall={handleInstall}
            onBack={handleBack}
          />
        )}
        {!pluginId && <RootPage onPluginSelect={handlePluginSelect} />}
      </CoreWrapper>
    </SharedProviders>
  );
}
