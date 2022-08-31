import TestInstalled from "./TestInstalled";
import TestLibrary from "./TestLibrary";

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
    component: TestLibrary,
  },
  {
    type: "plugin-installed",
    id: "marketplace-installed",
    component: TestInstalled,
  },
] as Extension[];
