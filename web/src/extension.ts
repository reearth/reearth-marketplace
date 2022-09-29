import PluginInstalledList from "@marketplace/components/pages/extensions/PluginInstalledList";
import PluginLibrary from "@marketplace/components/pages/extensions/PluginLibrary";

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
