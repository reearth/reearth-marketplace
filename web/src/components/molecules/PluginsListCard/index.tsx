import styled from "@emotion/styled";

import Button from "@/components/atoms/Button";
import Card, { Meta } from "@/components/atoms/Card";
import Icon from "@/components/atoms/Icon";
import Row from "@/components/atoms/Row";
import Space from "@/components/atoms/Space";

export type Props = {
  loading?: boolean;
  cover?: string;
  author?: string;
  likedCount?: number;
  installedCount?: number;
  name: string;
  id: string;
  onClick?: () => void;
};
const PluginsListCard: React.FC<Props> = ({
  loading,
  cover,
  author,
  likedCount,
  installedCount,
  name,
  onClick,
}) => {
  return (
    <Card
      loading={loading}
      cover={<img alt="example" src={cover} />}
      size="small"
      bordered={false}
      onClick={onClick}
    >
      <Row justify="space-between">
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
              <LikedNum>{installedCount}</LikedNum>
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
