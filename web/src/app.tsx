import { Provider as Auth0Provider } from "@marketplace/auth";
import AddNewPlugin from "@marketplace/components/pages/AddNewPlugin";
import PublisherRegistration from "@marketplace/components/pages/DeveloperRegistration";
import MyPlugins from "@marketplace/components/pages/MyPlugins";
import NotFound from "@marketplace/components/pages/NotFound";
import PluginDetailPage from "@marketplace/components/pages/PluginDetail";
import RootPage from "@marketplace/components/pages/Root";
import UpdatePlugin from "@marketplace/components/pages/UpdatePlugin";
import UserPage from "@marketplace/components/pages/User";
import { Provider as GqlProvider } from "@marketplace/gql";
import { Provider as I18nProvider } from "@marketplace/i18n";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

function AppRoutes() {
  return useRoutes([
    { path: "/", element: <RootPage /> },
    { path: "/plugins/:pluginId", element: <PluginDetailPage /> },
    { path: "/:userId", element: <UserPage /> },
    {
      path: "/:userId/publisher-registration",
      element: <PublisherRegistration />,
    },
    { path: "/myplugins", element: <MyPlugins /> },
    { path: "/myplugins/new", element: <AddNewPlugin /> },
    { path: "/myplugins/:pluginId/update", element: <UpdatePlugin /> },
    { path: "*", element: <NotFound /> },
  ]);
}

export default function App() {
  return (
    <Auth0Provider>
      <I18nProvider>
        <GqlProvider>
          <Router>
            <AppRoutes />
          </Router>
        </GqlProvider>
      </I18nProvider>
    </Auth0Provider>
  );
}
