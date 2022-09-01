import styled from "@emotion/styled";

import Button from "@/components/atoms/Button";
import Col from "@/components/atoms/Col";
import Icon from "@/components/atoms/Icon";
import Row from "@/components/atoms/Row";

import MyPluginsTable from "./MyPluginsTable";

export type Props = {};

export type DataType = {
  key: string;
  name: string;
  status: boolean;
  version: string;
  publishDate: string;
};
const data: DataType[] = [
  {
    key: "1",
    name: "Location Tracker",
    status: true,
    version: "v0.4.0",
    publishDate: "2011.11.11",
  },
  {
    key: "2",
    name: "Location Tracker",
    status: false,
    version: "v0.4.0",
    publishDate: "2011.11.11",
  },
  {
    key: "3",
    name: "Location Tracker",
    status: true,
    version: "v0.4.0",
    publishDate: "2011.11.11",
  },
];
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
      <MyPluginsTable data={data} />
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
