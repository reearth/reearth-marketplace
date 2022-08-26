import PluginDetailOrg from "@/components/organisms/PluginDetail";

export type Props = {
  isLoggedIn: boolean;
};
const PluginDetail: React.FC<Props> = ({ isLoggedIn }) => {
  return <PluginDetailOrg isLoggedIn={isLoggedIn} />;
};

export default PluginDetail;
