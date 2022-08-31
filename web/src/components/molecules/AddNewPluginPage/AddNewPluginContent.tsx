import styled from "@emotion/styled";
import { useState } from "react";

import Breadcrumb from "@/components/atoms/Breadcrumb";
import Button from "@/components/atoms/Button";
import Col from "@/components/atoms/Col";
import Row from "@/components/atoms/Row";
import Space from "@/components/atoms/Space";
import Tabs, { TabPane } from "@/components/atoms/Tabs";

import PackageArea from "./PackageArea";
import SettingArea from "./SettingArea";

export type Props = {
  pluginName: string;
  version: string;
  description: string;
  handleParsePlugin: () => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
};

const AddNewPluginContent: React.FC<Props> = ({
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
            <Breadcrumb.Item>New Plugin</Breadcrumb.Item>
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

export default AddNewPluginContent;
