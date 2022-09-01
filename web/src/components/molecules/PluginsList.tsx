import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Space from "@/components/atoms/Space";
import PluginsListCard from "@/components/molecules/PluginsListCard";

export type Props = {
  loading?: boolean;
  plugins?: Plugin[];
};

export type Plugin = {
  id: string;
  name: string;
  cover: string;
};

const PluginsList: React.FC<Props> = ({ loading, plugins }) => {
  const navigate = useNavigate();
  const handlePluginsListCardClick = useCallback(
    (id: string) => {
      navigate(`/plugins/${id}`);
    },
    [navigate],
  );
  return (
    <Space size={[37.33, 24]} wrap>
      {plugins
        ? plugins.map((plugin: Plugin) => {
            return (
              <PluginsListCard
                id={plugin.id}
                key={plugin.id}
                name={plugin.name}
                loading={loading}
                cover={plugin.cover}
                onClick={() => handlePluginsListCardClick(plugin.id)}
              />
            );
          })
        : null}
    </Space>
  );
};

export default PluginsList;
