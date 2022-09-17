import Breadcrumb from "@marketplace/components/atoms/Breadcrumb";
import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Tabs, { TabPane } from "@marketplace/components/atoms/Tabs";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { useState } from "react";
import { Link } from "react-router-dom";

import PackageArea, { FileUploadType } from "./PackageArea";
import SettingArea, { RcFile as RcFileType } from "./SettingArea";

export type RcFile = RcFileType;

export type Props = {
  pluginName: string;
  version: string;
  description: string;
  githubUrl?: string;
  isSaveLoading: boolean;
  isPublishLoading: boolean;
  handleChangeGithubUrl: (url: string) => void;
  handleParsePlugin: (file?: FileUploadType) => Promise<void>;
  handleClickSave: () => void;
  handleClickPublish: () => void;
  handleUploadImages: (images: (RcFile | undefined)[]) => void;
};

const AddNewPluginContent: React.FC<Props> = ({
  pluginName,
  version,
  description,
  githubUrl,
  isSaveLoading,
  isPublishLoading,
  handleChangeGithubUrl,
  handleParsePlugin,
  handleClickSave,
  handleClickPublish,
  handleUploadImages,
}) => {
  const t = useT();
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
              <Link to="/myplugins">{t("Plugins List")}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t("New Plugin")}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col>
          <Space size="middle">
            <Button type="default" size="large" onClick={handleClickSave} loading={isSaveLoading}>
              {t("Save")}
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleClickPublish}
              loading={isPublishLoading}>
              {t("Save & Publish")}
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
