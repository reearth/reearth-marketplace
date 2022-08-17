import {
  BrowserRouter as Router,
  useRoutes,
  type RouteObject,
} from "react-router-dom";

import RootPage from "@/components/pages/Root";
import PluginDetailPage from "@/components/pages/PluginDetail";
import UserPage from "@/components/pages/User";
import PublisherRegistration from "@/components/pages/DeveloperRegistration";
import MyPlugins from "@/components/pages/MyPlugins";
import MyPluginSetting from "@/components/pages/MyPluginSetting";
import AddNewPlugin from "@/components/pages/AddNewPlugin";
import UpdatePlugin from "@/components/pages/UpdatePlugin";
import NotFound from "./components/pages/NotFound";

import { Provider as Auth0Provider } from "@/auth";
import { Provider as GqlProvider } from "@/gql";
import { Provider as I18nProvider } from "@/i18n";

import "antd/dist/antd.css";

const routes: RouteObject[] = [
  { path: "/", element: <RootPage /> },
  { path: "/plugins/:pluginId", element: <PluginDetailPage /> },
  { path: "/:userId", element: <UserPage /> },
  {
    path: "/:userId/publisher-registration",
    element: <PublisherRegistration />,
  },
  { path: "/:userId/myplugins", element: <MyPlugins /> },
  { path: "/myplugins/:pluginId", element: <MyPluginSetting /> },
  { path: "/myplugins/new", element: <AddNewPlugin /> },
  { path: "/myplugins/:pluginId/update", element: <UpdatePlugin /> },
  { path: "*", element: <NotFound /> },
];

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
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

export default App;
