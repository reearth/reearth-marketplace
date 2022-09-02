import CoreWrapper from "@marketplace/components/molecules/Common/CoreWrapper";
import AddNewPlugin from "@marketplace/components/pages/AddNewPlugin";
import PublisherRegistration from "@marketplace/components/pages/DeveloperRegistration";
import MyPlugins from "@marketplace/components/pages/MyPlugins";
import NotFound from "@marketplace/components/pages/NotFound";
import PluginDetailPage from "@marketplace/components/pages/PluginDetail";
import RootPage from "@marketplace/components/pages/Root";
import UpdatePlugin from "@marketplace/components/pages/UpdatePlugin";
import UserPage from "@marketplace/components/pages/User";
import { ComponentType } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

export type Props = {
  header?: ComponentType;
  footer?: ComponentType;
};

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

const MarketplaceCore: React.FC<Props> = ({ header, footer }) => {
  return (
    <Router>
      <CoreWrapper header={header} footer={footer}>
        <AppRoutes />
      </CoreWrapper>
    </Router>
  );
};

export default MarketplaceCore;
