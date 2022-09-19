import { CSSProperties } from "react";

import Icons from "./icons";

export type Icons = keyof typeof Icons;

type Props = {
  className?: string;
  icon?: string;
  // TODO: styleの型
  style?: CSSProperties;
  twoToneColor?: string;
  spin?: boolean;
};
const Icon: React.FC<Props> = ({ className, icon, style, twoToneColor, spin }) => {
  if (!icon) return null;
  const IconComponent = Icons[icon as Icons];
  if (!IconComponent) return null;

  return (
    <IconComponent className={className} style={style} twoToneColor={twoToneColor} spin={spin} />
  );
};

export default Icon;
