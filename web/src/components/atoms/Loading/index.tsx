import { Spin } from "antd";

import LoadingIcon, { IconSize } from "@marketplace/components/atoms/LoadingIcon";

export type Props = {
  className?: string;
  height?: number;
  width?: number;
  size?: IconSize;
};

const Loading: React.FC<Props> = ({ className, height, width, size }) => (
  <div
    className={className}
    style={{
      height: height + "px" ?? "100%",
      width: width + "px" ?? "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "transparent",
    }}>
    <Spin indicator={<LoadingIcon size={size} />} />
  </div>
);

export default Loading;
