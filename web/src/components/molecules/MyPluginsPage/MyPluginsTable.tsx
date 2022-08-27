import styled from "@emotion/styled";
import type { ColumnsType } from "antd/es/table";

import Col from "@/components/atoms/Col";
import Icon from "@/components/atoms/Icon";
import Row from "@/components/atoms/Row";
import Table from "@/components/atoms/Table";

export type Props = {
  key: string;
  name: string;
  status: boolean;
  version: string;
  publishTime: string;
};

const MyPluginsTable: React.FC<Props> = () => {
  const columns: ColumnsType<Props> = [
    {
      title: "Plugin Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <BoldTitle>{text}</BoldTitle>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status ? (
          <Row justify="space-between" style={{ maxWidth: "90px" }}>
            <Col>
              <Icon icon="checkFilled" />
            </Col>

            <Col>Published</Col>
          </Row>
        ) : (
          <>Not Published</>
        ),
    },
  ];
  const data: Props[] = [
    {
      key: "1",
      name: "Location Tracker",
      status: true,
      version: "v0.4.0",
      publishTime: "2011.11.11",
    },
    {
      key: "2",
      name: "Location Tracker",
      status: false,
      version: "v0.4.0",
      publishTime: "2011.11.11",
    },
    {
      key: "3",
      name: "Location Tracker",
      status: true,
      version: "v0.4.0",
      publishTime: "2011.11.11",
    },
  ];
  return (
    <Wrapper>
      <Table columns={columns} dataSource={data} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const BoldTitle = styled.p`
  font-weight: bold;
  margin: 0;
`;

export default MyPluginsTable;
