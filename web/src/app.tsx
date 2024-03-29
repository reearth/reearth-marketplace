import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import { Provider as Auth0Provider } from "@marketplace/auth";
import CoreWrapper from "@marketplace/components/molecules/Common/CoreWrapper";
import Footer from "@marketplace/components/molecules/Common/Footer";
import Header from "@marketplace/components/organisms/Common/Header";
import PluginUploadPage from "@marketplace/components/pages/AddNewPlugin";
import EditPlugin from "@marketplace/components/pages/EditPlugin";
import MyPlugins from "@marketplace/components/pages/MyPlugins";
import NotFound from "@marketplace/components/pages/NotFound";
import PluginDetailPage from "@marketplace/components/pages/PluginDetail";
import RootPage from "@marketplace/components/pages/Root";
import UserPage from "@marketplace/components/pages/User";
import { Provider as GqlProvider } from "@marketplace/gql";
import { Provider as I18nProvider } from "@marketplace/i18n";
import { Provider as ThemeProvider } from "@marketplace/theme";

import { useConfig } from "./config";

const AppRoutes = () => {
  return useRoutes([
    { path: "/", element: <RootPage /> },
    { path: "/plugins/:pluginId", element: <PluginDetailPage /> },
    { path: "/mypage", element: <UserPage /> },
    { path: "/myplugins", element: <MyPlugins /> },
    { path: "/myplugins/new", element: <PluginUploadPage /> },
    { path: "/myplugins/:pluginId/update", element: <PluginUploadPage /> },
    { path: "/myplugins/:pluginId/edit", element: <EditPlugin /> },
    { path: "*", element: <NotFound /> },
  ]);
};

export default function App() {
  const config = useConfig();

  return config ? (
    <Auth0Provider>
      <GqlProvider>
        <I18nProvider>
          <ThemeProvider>
            <Router>
              <CoreWrapper header={Header} footer={Footer}>
                <AppRoutes />
              </CoreWrapper>
            </Router>
          </ThemeProvider>
        </I18nProvider>
      </GqlProvider>
    </Auth0Provider>
  ) : null;
}
