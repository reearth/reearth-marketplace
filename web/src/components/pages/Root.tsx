import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Top from "@marketplace/components/organisms/Top";

export type Props = {};

const Root: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handlePluginSelect = useCallback(
    (id: string) => {
      navigate(`/plugins/${id}`);
    },
    [navigate],
  );

  return <Top onPluginSelect={handlePluginSelect} />;
};

export default Root;
