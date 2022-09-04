// import { Provider as Auth0Provider } from "@marketplace/auth";
import MarketplaceCore from "@marketplace/components/MarketplaceCore";
// import Root from "@marketplace/components/pages/Root";
import MyPlugins from "@marketplace/components/pages/MyPlugins";
import { Provider as GqlProvider } from "@marketplace/gql";
import { Provider as I18nProvider } from "@marketplace/i18n";

export default function LibraryExtension({
  theme,
  lang,
  accessToken,
  selectedPluginId,
  installedPlugins,
  onInstall,
  onUninstall,
  onNotificationChange,
}: {
  theme?: string;
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
  console.log(accessToken, "retrieved from reearth-web");
  console.log(lang, "retrieved from reearth-web");
  console.log(selectedPluginId, "retrieved from reearth-web");
  console.log(installedPlugins, "retrieved from reearth-web");
  console.log(theme, "retrieved from reearth-web");
  console.log(onInstall, "retrieved from reearth-web");
  console.log(onUninstall, "retrieved from reearth-web");
  console.log(onNotificationChange, "retrieved from reearth-web");
  return (
    // <Auth0Provider>
    <I18nProvider>
      <GqlProvider api="https://api.marketplace.test.reearth.dev/api">
        <MarketplaceCore customFallback={MyPlugins} />
      </GqlProvider>
    </I18nProvider>
    // </Auth0Provider>
  );
}
