import Button from "@marketplace/components/atoms/Button";
import Card, { Meta } from "@marketplace/components/atoms/Card";
import Icon from "@marketplace/components/atoms/Icon";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import { styled } from "@marketplace/theme";

export type Props = {
  loading?: boolean;
  cover?: string;
  author: string;
  likedCount: number;
  downloadCount: number;
  name: string;
  id: string;
  onClick?: () => void;
};
const PluginsListCard: React.FC<Props> = ({
  loading,
  cover,
  author,
  likedCount,
  downloadCount,
  name,
  onClick,
}) => {
  return (
    <StyledCard
      loading={loading}
      cover={<img alt="example" src={cover} width="100%" />}
      size="small"
      bordered={false}
      onClick={onClick}
      bodyStyle={{ padding: "4px 0" }}>
      <Row justify="space-between" align="top">
        <AuthorName>{author}</AuthorName>
        <Space size="small">
          <Row justify="start">
            <Button type="text" size="small" onClick={onClick}>
              <Icon icon="heart" />
              <LikedNum>{likedCount}</LikedNum>
            </Button>
          </Row>
          <Row justify="start">
            <Space size="small">
              <Icon icon="arrowDown" />
              <LikedNum>{downloadCount}</LikedNum>
            </Space>
          </Row>
        </Space>
      </Row>
      <StyledMeta title={name} />
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.main.background};
  color: ${({ theme }) => theme.main.text};
  max-width: 240px;
  cursor: pointer;
`;

const AuthorName = styled.p`
  color: ${({ theme }) => theme.main.text};
`;

const LikedNum = styled.span`
  color: ${({ theme }) => theme.main.text};
`;

const StyledMeta = styled(Meta)`
  * {
    color: ${({ theme }) => theme.main.text};
  }
`;

export default PluginsListCard;
