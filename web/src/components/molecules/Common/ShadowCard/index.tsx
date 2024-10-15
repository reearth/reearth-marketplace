import Card from "@marketplace/components/atoms/Card";
import { styled } from "@marketplace/theme";

export type Props = {
  children: React.ReactElement;
};

const ShadowCard: React.FC<Props> = ({ children }) => {
  return <CustomCard>{children}</CustomCard>;
};

const CustomCard = styled(Card)`
  background-color: transparent;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export default ShadowCard;
