import { styled } from "@marketplace/theme";
import Breadcrumb from "@marketplace/components/atoms/Breadcrumb";
import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Tabs, { TabPane } from "@marketplace/components/atoms/Tabs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UploadRequestOption } from "rc-upload/lib/interface";

import PackageArea, { FileUploadType } from "./PackageArea";
import SettingArea from "./SettingArea";

export type Props = {
  pluginName: string;
  version: string;
  description: string;
  githubUrl?: string;
  uploadedFile?: FileUploadType;
  handleChangeGithubUrl: (url: string) => void;
  handleParsePlugin: (file?: FileUploadType) => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
  handleUploadImages: (image: UploadRequestOption) => void;
};

const AddNewPluginContent: React.FC<Props> = ({
  pluginName,
  version,
  description,
  githubUrl,
  uploadedFile,
  handleChangeGithubUrl,
  handleParsePlugin,
  handleClickSave,
  handleClickPublish,
  handleUploadImages,
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
              <Link to="/myplugins">Plugins List</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>New Plugin</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col>
          <Space size="middle">
            <Button
              type="default"
              size="large"
              onClick={handleClickSave}
              disabled={!uploadedFile}
            >
              Save
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleClickPublish}
              disabled={!uploadedFile}
            >
              Publish
            </Button>
          </Space>
        </Col>
      </TopRow>
      <Tabs
        defaultActiveKey={currentTab}
        tabBarStyle={{ margin: 0 }}
        activeKey={currentTab}
        onChange={handleClickDetailSetting}
      >
        <TabPane tab="Package" key="1">
          <PackageArea
            githubUrl={githubUrl}
            handleChangeGithubUrl={handleChangeGithubUrl}
            handleClickDetailSetting={handleClickDetailSetting}
            handleParsePlugin={handleParsePlugin}
          />
        </TabPane>
        <TabPane tab="Setting" key="2">
          <SettingArea
            pluginName={pluginName}
            version={version}
            description={description}
            handleUploadImages={handleUploadImages}
          />
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
