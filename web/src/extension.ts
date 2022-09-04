import PluginInstalledList from "@marketplace/components/extensions/PluginInstalledList";
import PluginLibrary from "@marketplace/components/extensions/PluginLibrary";
import "antd/dist/antd.css";

export type ExtensionType = "plugin-library" | "plugin-installed";

export type Extension<T extends ExtensionType = ExtensionType> = {
  type: T;
  id: string;
  component: React.FC<any>;
};

export default [
  {
    type: "plugin-library",
    id: "marketplace-library",
    component: PluginLibrary,
  },
  {
    type: "plugin-installed",
    id: "marketplace-installed",
    component: PluginInstalledList,
  },
] as Extension[];
