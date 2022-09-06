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
    <Card
      loading={loading}
      cover={<img alt="example" src={cover} width="100%" />}
      size="small"
      bordered={false}
      onClick={onClick}
      style={{ maxWidth: "240px", cursor: "pointer" }}
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
      <Meta title={name} />
    </Card>
  );
};

const AuthorName = styled.p``;
const LikedNum = styled.span``;

export default PluginsListCard;
