import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PluginDetailOrg from "@marketplace/components/organisms/PluginDetail";

export type Props = {};

const PluginDetail: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const { pluginId } = useParams();
  return <PluginDetailOrg pluginId={pluginId} onBack={handleBack} />;
};

export default PluginDetail;
