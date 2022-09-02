import styled from "@emotion/styled";
import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Icon from "@marketplace/components/atoms/Icon";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Switch from "@marketplace/components/atoms/Switch";
import Table from "@marketplace/components/atoms/Table";
import type { ColumnsType } from "antd/es/table";

import { DataType } from ".";

export type Props = {
  data: DataType[];
};

const MyPluginsTable: React.FC<Props> = ({ data }) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Plugin Name",
      dataIndex: "name",
      key: "name",
      render: text => <BoldTitle>{text}</BoldTitle>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: status => (
        <Row justify="start">
          <Space size="large">
            <Col>
              <Switch defaultChecked={status} />
            </Col>
            <Col>{status ? "Published" : "Not Published"}</Col>
          </Space>
        </Row>
      ),
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Publish Date",
      dataIndex: "publishDate",
      key: "publishDate",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Row justify="space-around" style={{ maxWidth: "200px" }}>
          <Col>
            <Button type="link" size="middle" icon={<Icon icon="edit" />} />
          </Col>
          <Col>
            <Button type="link" size="middle" icon={<Icon icon="rocket" />} />
          </Col>
          <Col>
            <Button type="link" size="middle" icon={<Icon icon="setting" />} />
          </Col>
        </Row>
      ),
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
`;

export default MyPluginsTable;
