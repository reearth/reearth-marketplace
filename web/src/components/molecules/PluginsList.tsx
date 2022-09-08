import Space from "@marketplace/components/atoms/Space";
import PluginsListCard from "@marketplace/components/molecules/PluginsListCard";

export type Props = {
  loading?: boolean;
  plugins?: Plugin[];
  onPluginSelect?: (pluginId: string) => void;
};

export type Plugin = {
  id: string;
  name: string;
  cover: string;
  author: string;
  like: number;
  downloads: number;
  version?: string;
};

const PluginsList: React.FC<Props> = ({ loading, plugins, onPluginSelect }) => {
  return (
    <Space size={[37.33, 24]} wrap>
      {plugins
        ? plugins.map((plugin: Plugin) => {
            return (
              <PluginsListCard
                id={plugin.id}
                key={plugin.id}
                name={plugin.name}
                author={plugin.author}
                loading={loading}
                cover={plugin.cover}
                likedCount={plugin.like}
                downloadCount={plugin.downloads}
                onClick={() => onPluginSelect?.(plugin.id)}
              />
            );
          })
        : null}
    </Space>
  );
};

export default PluginsList;
