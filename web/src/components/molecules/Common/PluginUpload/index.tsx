import { useState } from "react";

import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Tabs, { TabPane } from "@marketplace/components/atoms/Tabs";
import Breadcrumb from "@marketplace/components/molecules/Common/Breadcrumb";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

import PackageArea, { FileUploadType } from "./PackageArea";
import SettingArea, { RcFile as RcFileType } from "./SettingArea";

export type RcFile = RcFileType;

export type Props = {
  pluginName: string;
  description: string;
  version: string;
  githubUrl?: string;
  isSaveLoading: boolean;
  isPublishLoading: boolean;
  handleChangeGithubUrl: (url: string) => void;
  handleParsePlugin: (file?: FileUploadType) => Promise<void>;
  onPluginSave: () => void;
  handleClickPublish: () => void;
  handleUploadImages: (images: (RcFile | undefined)[]) => void;
};

const PluginUpload: React.FC<Props> = ({
  pluginName,
  version,
  description,
  githubUrl,
  isSaveLoading,
  isPublishLoading,
  handleChangeGithubUrl,
  handleParsePlugin,
  onPluginSave,
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
      <ContentWrapper>
        <TopRow align="middle" justify="space-between">
          <Col>
            <Breadcrumb
              rootLink="/myplugins"
              rootName={t("Plugins List")}
              currentName={t("New Plugin")}
            />
          </Col>
          <Col>
            <Space size="middle">
              <Button
                type="default"
                size="large"
                onClick={onPluginSave}
                loading={isSaveLoading}
                disabled={currentTab !== "2"}>
                {t("Save")}
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleClickPublish}
                loading={isPublishLoading}
                disabled={currentTab !== "2"}>
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
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 1);
  padding-top: 48px;
  padding-bottom: 72px;
`;

const ContentWrapper = styled.div`
  width: 1200px;
`;

const TopRow = styled(Row)`
  padding: 0;
  margin-bottom: 32px;
`;

export default PluginUpload;
