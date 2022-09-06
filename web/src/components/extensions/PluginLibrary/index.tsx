// import { Provider as Auth0Provider } from "@marketplace/auth";
import CoreWrapper from "@marketplace/components/molecules/Common/CoreWrapper";
import PluginDetailPage from "@marketplace/components/pages/PluginDetail";
import RootPage from "@marketplace/components/pages/Root";
import UserPage from "@marketplace/components/pages/User";
import { Provider as GqlProvider } from "@marketplace/gql";
import { Provider as I18nProvider } from "@marketplace/i18n";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "@marketplace/index.css";

// const AppRoutes = ({ selectedPluginId }: { selectedPluginId?: string }) => {
//   return useRoutes([
//     { path: "/", element: <RootPage /> },
//     { path: "/plugins/:pluginId", element: <PluginDetailPage /> },
//     { path: "/:userId", element: <UserPage /> },
//     {
//       path: "*",
//       element: selectedPluginId ? (
//         <PluginDetailPage selectedPluginId={selectedPluginId} />
//       ) : (
//         <RootPage />
//       ),
//     },
//   ]);
// };

export default function LibraryExtension({
  theme,
  // lang,
  selectedPluginId,
  // installedPlugins,
  // onInstall,
  // onUninstall,
  // onNotificationChange,
  accessToken,
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
  console.log(!!accessToken, "retrieved from reearth-web");
  // console.log(lang, "retrieved from reearth-web");
  // console.log(selectedPluginId, "retrieved from reearth-web");
  // console.log(installedPlugins, "retrieved from reearth-web");
  // console.log(onInstall, "retrieved from reearth-web");
  // console.log(onUninstall, "retrieved from reearth-web");
  // console.log(onNotificationChange, "retrieved from reearth-web");

  return (
    // <Auth0Provider>
    <I18nProvider>
      <GqlProvider accessToken={accessToken} api="https://api.marketplace.test.reearth.dev/api">
        <Router initialEntries={selectedPluginId ? [`/plugins/${selectedPluginId}`] : ["/"]}>
          <CoreWrapper className={theme}>
            <Routes>
              <Route path="/" element={<RootPage showBanner />} />
              <Route path="/plugins/:pluginId" element={<PluginDetailPage />} />
              <Route path="/:userId" element={<UserPage />} />
            </Routes>
          </CoreWrapper>
        </Router>
      </GqlProvider>
    </I18nProvider>
    // </Auth0Provider>
  );
}
