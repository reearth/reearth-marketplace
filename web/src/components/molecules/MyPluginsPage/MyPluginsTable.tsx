import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Icon from "@marketplace/components/atoms/Icon";
import Loading from "@marketplace/components/atoms/Loading";
import Popover from "@marketplace/components/atoms/Popover";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Switch from "@marketplace/components/atoms/Switch";
import Table from "@marketplace/components/atoms/Table";
import type { Plugin } from "@marketplace/components/organisms/MyPlugins";
import { styled } from "@marketplace/theme";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

export type Props = {
  data?: Plugin[];
  handlePublishClick: (id: string, active: boolean) => void;
};

const MyPluginsTable: React.FC<Props> = ({ data, handlePublishClick }) => {
  const navigate = useNavigate();
  const columns: ColumnsType<Plugin> = [
    {
      title: "Plugin Name",
      dataIndex: "name",
      key: "name",
      render: text => <BoldTitle>{text}</BoldTitle>,
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active, plugin) => (
        <Row justify="start">
          <Space size="large">
            <Col>
              <Switch
                defaultChecked={active}
                checked={active}
                onClick={() => handlePublishClick(plugin.id, active)}
              />
            </Col>
            <Col>{active ? "Published" : "Not Published"}</Col>
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
      title: "Updated Date",
      dataIndex: "updateAt",
      key: "updateAt",
      render: (date: Date) => {
        date = new Date(date);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: id => {
        return (
          <Row justify="space-around" style={{ maxWidth: "200px" }}>
            {/* <Col>
              <Popover content="Edit this plugin info">
                <Button
                  type="link"
                  size="middle"
                  icon={<Icon icon="edit" />}
                  onClick={() => navigate(`/myplugins/${id}/update`)}
                />
              </Popover>
            </Col> */}
            <Col>
              <Popover content="Update this plugin">
                <Button
                  type="link"
                  size="middle"
                  icon={<UpdateIcon icon="arrowRightDouble" />}
                  onClick={() => navigate(`/myplugins/${id}/update`)}
                />
              </Popover>
            </Col>
            {/* <Col>
              <Popover content="setting">
                <Button type="link" size="middle" icon={<Icon icon="setting" />} />
              </Popover>
            </Col> */}
          </Row>
        );
      },
    },
  ];
  return (
    <Wrapper>
      <Table
        columns={columns}
        dataSource={data}
        loading={!data && { indicator: <Loading size="md" height={200} /> }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const BoldTitle = styled.p`
  font-weight: bold;
`;

const UpdateIcon = styled(Icon)`
  transform: rotate(0.75turn);
`;

export default MyPluginsTable;
