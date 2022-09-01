import styled from "@emotion/styled";
import type { ColumnsType } from "antd/es/table";

import Button from "@/components/atoms/Button";
import Col from "@/components/atoms/Col";
import Icon from "@/components/atoms/Icon";
import Row from "@/components/atoms/Row";
import Space from "@/components/atoms/Space";
import Switch from "@/components/atoms/Switch";
import Table from "@/components/atoms/Table";

import { DataType } from "./MyPluginsContent";

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
