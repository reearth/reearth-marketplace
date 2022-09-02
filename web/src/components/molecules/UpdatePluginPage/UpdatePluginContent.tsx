import styled from "@emotion/styled";
import Breadcrumb from "@marketplace/components/atoms/Breadcrumb";
import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Tabs, { TabPane } from "@marketplace/components/atoms/Tabs";
import PackageArea, {
  FileUploadType,
} from "@marketplace/components/molecules/AddNewPluginPage/PackageArea";
import SettingArea from "@marketplace/components/molecules/AddNewPluginPage/SettingArea";
import { useState } from "react";

// TODO: merge with Add New Plugin
export type Props = {
  pluginName: string;
  version: string;
  description: string;
  handleParsePlugin: (file?: FileUploadType) => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
};
const UpdatePluginContent: React.FC<Props> = ({
  pluginName,
  version,
  description,
  handleParsePlugin,
  handleClickSave,
  handleClickPublish,
}) => {
  const [currentTab, updateTab] = useState<"1" | "2">("1");
  const handleClickDetailSetting = () => {
    updateTab(currentTab === "1" ? "2" : "1");
  };
  return (
    <Wrapper>
      <TopRow align="middle" justify="space-between">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/myplugins">Plugins List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Update Plugin</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col>
          <Space size="middle">
            <Button type="default" size="large" onClick={handleClickSave}>
              Save
            </Button>
            <Button type="primary" size="large" onClick={handleClickPublish}>
              Publish
            </Button>
          </Space>
        </Col>
      </TopRow>
      <Tabs
        defaultActiveKey={currentTab}
        tabBarStyle={{ margin: 0 }}
        activeKey={currentTab}
        onChange={handleClickDetailSetting}>
        <TabPane tab="Package" key="1">
          <PackageArea
            handleClickDetailSetting={handleClickDetailSetting}
            handleParsePlugin={handleParsePlugin}
          />
        </TabPane>
        <TabPane tab="Setting" key="2">
          <SettingArea pluginName={pluginName} version={version} description={description} />
        </TabPane>
      </Tabs>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 72px;
`;

const TopRow = styled(Row)`
  padding: 0;
  margin-bottom: 32px;
`;

export default UpdatePluginContent;