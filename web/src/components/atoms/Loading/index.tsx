import Spin from "antd/lib/spin";

import LoadingIcon, { IconSize } from "@marketplace/components/atoms/LoadingIcon";
import "antd/lib/spin/style/index.css";

export type Props = {
  height?: number;
  width?: number;
  size?: IconSize;
};

const App: React.FC<Props> = ({ height, width, size }) => (
  <div
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

export default App;
