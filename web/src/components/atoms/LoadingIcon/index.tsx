import Icon from "@marketplace/components/atoms/Icon";

export type IconSize = "sm" | "md" | "lg";

export const SizeValues = {
  sm: 24,
  md: 35,
  lg: 50,
};

const LoadingIcon: React.FC<{ size?: IconSize }> = ({ size = "sm" }) => (
  <Icon icon="loading" style={{ fontSize: SizeValues[size] }} spin />
);

export default LoadingIcon;
