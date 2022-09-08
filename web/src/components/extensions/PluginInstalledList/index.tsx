import SharedProviders from "../sharedProviders";

import List from "./Accordion";

export default function PluginInstalledList({
  theme,
  lang,
  installedPlugins,
  accessToken,
  onInstall,
  onUninstall,
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
}) {
  return (
    <SharedProviders accessToken={accessToken} lang={lang} theme={theme}>
      <List plugins={installedPlugins} onInstall={onInstall} onUninstall={onUninstall} />
    </SharedProviders>
  );
}
