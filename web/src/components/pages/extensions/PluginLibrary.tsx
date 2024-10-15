import { useCallback, useLayoutEffect, useState } from "react";

import CoreWrapper from "@marketplace/components/molecules/Common/CoreWrapper";
import PluginDetailOrg from "@marketplace/components/organisms/PluginDetail";
import Top from "@marketplace/components/organisms/Top";
import { useT } from "@marketplace/i18n";
import { App } from "@marketplace/types";

import SharedProviders from "./sharedProviders";

import "@marketplace/index.css";

type Props = {
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
  app: App;
};

export default function LibraryExtension({
  theme,
  lang,
  accessToken,
  installedPlugins,
  onInstall,
  onNotificationChange,
  app,
}: Props) {
  const t = useT();

  const handleInstall = useCallback(
    (id: string) => {
      onInstall?.(id);
      onNotificationChange?.("success", t("Your plugin was successfully updated!"), t("Success"));
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
          <PluginDetailOrg
            pluginId={pluginId}
            accessToken={accessToken}
            installedPlugins={installedPlugins}
            onPluginInstall={handleInstall}
            onBack={handleBack}
          />
        )}
        {!pluginId && (
          <Top accessToken={accessToken} onPluginSelect={handlePluginSelect} app={app} />
        )}
      </CoreWrapper>
    </SharedProviders>
  );
}
