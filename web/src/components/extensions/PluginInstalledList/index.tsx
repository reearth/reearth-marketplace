import SharedProviders from "../sharedProviders";

import List from "./Accordion";

export default function PluginInstalledList({
  theme,
  lang,
  installedPlugins,
  accessToken,
  onInstall,
  onUninstall,
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
  onUninstall?: (pluginId: string) => void;
  onNotificationChange?: (
    type: "error" | "warning" | "info" | "success",
    text: string,
    heading?: string,
  ) => void;
}) {
  return (
    <SharedProviders accessToken={accessToken} lang={lang} theme={theme}>
      <List
        plugins={installedPlugins}
        onInstall={onInstall}
        onUninstall={onUninstall}
        onNotificationChange={onNotificationChange}
      />
    </SharedProviders>
  );
}
