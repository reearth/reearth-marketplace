import { ConfigProvider } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

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
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

export type Props = {
  plugins?: Plugin[];
  onPublish: (id: string, active: boolean) => Promise<void>;
  onPageChange: (page: number) => void;
  totalCount: number;
  page: number;
  pageSize: number;
};

const MyPluginsTable: React.FC<Props> = ({
  plugins,
  onPublish,
  onPageChange,
  totalCount,
  page,
  pageSize,
}) => {
  const t = useT();
  const navigate = useNavigate();

  const columns: ColumnsType<Plugin> = [
    {
      title: t("Plugin Name"),
      dataIndex: "name",
      key: "name",
      render: text => <BoldTitle>{text}</BoldTitle>,
    },
    {
      title: t("State"),
      dataIndex: "active",
      key: "active",
      render: (active, plugin) => (
        <Row justify="start">
          <Space size="large">
            <Col>
              <Switch
                defaultChecked={active}
                checked={active}
                onClick={() => onPublish(plugin.id, !active)}
              />
            </Col>
            <Col>{active ? t("Published") : t("Not Published")}</Col>
          </Space>
        </Row>
      ),
    },
    {
      title: t("Version"),
      dataIndex: "version",
      key: "version",
    },
    {
      title: t("Publish time"),
      dataIndex: "updateAt",
      key: "updateAt",
      render: (date: Date) => {
        date = new Date(date);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
      },
    },
    {
      title: t("Action"),
      key: "action",
      dataIndex: "id",
      render: id => {
        return (
          <Row justify="space-around" style={{ maxWidth: "200px" }}>
            <Col>
              <Popover content="Edit this plugin info">
                <Button
                  type="link"
                  size="middle"
                  icon={<Icon icon="edit" />}
                  onClick={() => navigate(`/myplugins/${id}/edit`)}
                />
              </Popover>
            </Col>
            <Col>
              <Popover content={t("Update this plugin")}>
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

  const pluginDataSource = useMemo(
    () =>
      plugins?.map(plugin => {
        return {
          key: plugin.id,
          ...plugin,
        };
      }),
    [plugins],
  );

  const renderEmpty = () => {
    return (
      <RenderEmptyWrapper>
        <RenderEmptyText>
          {t("Click the ” New Plugin ” button to upload your first Plugin")}
        </RenderEmptyText>
      </RenderEmptyWrapper>
    );
  };

  return (
    <Wrapper>
      <ConfigProvider renderEmpty={renderEmpty}>
        <Table
          columns={columns}
          dataSource={pluginDataSource}
          loading={!plugins && { indicator: <Loading size="md" height={200} /> }}
          pagination={
            {
              current: page,
              total: totalCount,
              pageSize: pageSize,
              onChange: onPageChange,
            } as TablePaginationConfig
          }
        />
      </ConfigProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  .ant-table-thead > tr > th {
    background: #f0f0f0;
  }
`;

const BoldTitle = styled.p`
  font-weight: bold;
`;

const UpdateIcon = styled(Icon)`
  transform: rotate(0.75turn);
`;

const RenderEmptyWrapper = styled.div`
  height: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RenderEmptyText = styled.p`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
`;

export default MyPluginsTable;
