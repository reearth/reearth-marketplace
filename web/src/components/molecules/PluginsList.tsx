import PluginsListCard from "@/components/molecules/PluginsListCard";
import Space from "@/components/atoms/Space";

export type Props = {
  loading?: boolean;
};
const PluginsList: React.FC<Props> = ({ loading }) => {
  return (
    <Space size={[37.33, 24]} wrap>
      <PluginsListCard
        title=""
        loading={loading}
        cover="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
      <PluginsListCard
        title=""
        loading={loading}
        cover="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
      <PluginsListCard
        title=""
        loading={loading}
        cover="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
      <PluginsListCard
        title=""
        loading={loading}
        cover="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
      <PluginsListCard
        title=""
        loading={loading}
        cover="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    </Space>
  );
};

export default PluginsList;
