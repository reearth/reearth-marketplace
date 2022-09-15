import Icon from "@marketplace/components/atoms/Icon";
import Spin from "antd/lib/spin";
import "antd/lib/spin/style/index.css";

export type IconSize = "sm" | "md" | "lg";

export const SizeValues = {
  sm: 24,
  md: 35,
  lg: 50,
};

const LoadingIcon: React.FC<{ size?: IconSize }> = ({ size = "sm" }) => (
  <Icon icon="loading" style={{ fontSize: SizeValues[size] }} spin />
);

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
