import PluginAccordion from "@marketplace/components/molecules/PluginInstalledList/Accordion";

import SharedProviders from "./sharedProviders";

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
    title?: string;
    author?: string;
    icon?: string;
    readme?: string;
  }[];
  onInstall?: (pluginId: string | undefined, oldPluginId: string) => void;
  onUninstall?: (pluginId: string) => void;
}) {
  return (
    <SharedProviders accessToken={accessToken} lang={lang} theme={theme}>
      <PluginAccordion plugins={installedPlugins} onInstall={onInstall} onUninstall={onUninstall} />
    </SharedProviders>
  );
}
