import CoreWrapper from "@marketplace/components/molecules/Common/CoreWrapper";
import Footer from "@marketplace/components/molecules/Common/Footer";
import Header from "@marketplace/components/organisms/Common/Header";
import AddNewPlugin from "@marketplace/components/pages/AddNewPlugin";
import PublisherRegistration from "@marketplace/components/pages/DeveloperRegistration";
import MyPlugins from "@marketplace/components/pages/MyPlugins";
import NotFound from "@marketplace/components/pages/NotFound";
import PluginDetailPage from "@marketplace/components/pages/PluginDetail";
import RootPage from "@marketplace/components/pages/Root";
import UpdatePlugin from "@marketplace/components/pages/UpdatePlugin";
import UserPage from "@marketplace/components/pages/User";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const AppRoutes = () => {
  return useRoutes([
    { path: "/", element: <RootPage showBanner /> },
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
};

const MarketplaceCore: React.FC = () => {
  return (
    <Router>
      <CoreWrapper header={Header} footer={Footer}>
        <AppRoutes />
      </CoreWrapper>
    </Router>
  );
};

export default MarketplaceCore;
