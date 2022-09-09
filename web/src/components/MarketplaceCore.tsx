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
import { Provider as ThemeProvider } from "@marketplace/theme";
import { useCallback } from "react";
import { BrowserRouter as Router, useNavigate, useRoutes } from "react-router-dom";

const AppRoutes = () => {
  const navigate = useNavigate();
  const handlePluginSelect = useCallback(
    (id: string) => {
      navigate(`/plugins/${id}`);
    },
    [navigate],
  );

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return useRoutes([
    { path: "/", element: <RootPage showBanner onPluginSelect={handlePluginSelect} /> },
    { path: "/plugins/:pluginId", element: <PluginDetailPage onBack={handleBack} /> },
    // TODO: Since we don't have api for calling others' plugins, put "mypage" instead of userid
    { path: "/mypage", element: <UserPage onPluginSelect={handlePluginSelect} /> },
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
    <ThemeProvider>
      <Router>
        <CoreWrapper header={Header} footer={Footer}>
          <AppRoutes />
        </CoreWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default MarketplaceCore;
