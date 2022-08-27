import styled from "@emotion/styled";

import Button from "@/components/atoms/Button";
import Col from "@/components/atoms/Col";
import Icon from "@/components/atoms/Icon";
import Row from "@/components/atoms/Row";

import MyPluginsTable from "./MyPluginsTable";

export type Props = {};
const MyPluginsContent: React.FC<Props> = () => {
  return (
    <Wrapper>
      <TitleArea justify="space-between" align="middle">
        <Col>
          <Title>My Plugins</Title>
        </Col>
        <Col>
          <Button type="primary">
            <Icon icon="plus" />
            New Plugin
          </Button>
        </Col>
      </TitleArea>
      <MyPluginsTable />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 72px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 20px;
`;

const TitleArea = styled(Row)`
  margin-bottom: 24px;
`;

export default MyPluginsContent;
