import React from "react";

import Icons from "./icons";

export type Icons = keyof typeof Icons;

type Props = {
  icon?: string;
  // TODO: styleの型
  style?: any;
};
const Icon: React.FC<Props> = ({ icon, style }) => {
  if (!icon) return null;
  return React.createElement(Icons[icon as Icons], { style: style });
};

export default Icon;
