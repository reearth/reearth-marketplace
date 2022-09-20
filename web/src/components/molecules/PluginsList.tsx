import Space from "@marketplace/components/atoms/Space";
import PluginsListCard from "@marketplace/components/molecules/PluginsListCard";

export type Props = {
  plugins?: Plugin[];
  loading?: boolean;
  onPluginSelect?: (pluginId: string) => void;
};

export type Plugin = {
  id: string;
  name: string;
  cover: string;
  publisher: string;
  like: number;
  liked?: boolean;
  downloads: number;
  version?: string;
};

const PluginsList: React.FC<Props> = ({ plugins, loading, onPluginSelect }) => {
  return (
    <Space size={[30, 18]} wrap>
      {plugins
        ? plugins.map((plugin: Plugin) => {
            return (
              <PluginsListCard
                key={plugin.id}
                name={plugin.name}
                publisher={plugin.publisher}
                cover={plugin.cover}
                likedCount={plugin.like}
                personallyLiked={plugin.liked}
                downloadCount={plugin.downloads}
                loading={loading}
                onClick={() => onPluginSelect?.(plugin.id)}
              />
            );
          })
        : null}
    </Space>
  );
};

export default PluginsList;
