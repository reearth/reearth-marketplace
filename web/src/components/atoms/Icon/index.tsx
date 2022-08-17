import React from "react";

import Icons from "./icons";

export type Icons = keyof typeof Icons;

type Props = {
  icon?: string;
};
const Icon: React.FC<Props> = ({ icon }) => {
  if (!icon) return null;
  return React.createElement(Icons[icon as Icons]);
};

export default Icon;
