import Test from "./Test";

export type Extension = {
  type: "plugin";
  id: string;
  component: React.FC<any>;
};

export default [
  {
    type: "plugin",
    id: "marketplace",
    component: Test,
  },
] as Extension[];
