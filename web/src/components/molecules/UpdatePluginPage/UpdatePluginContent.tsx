import { UploadRequestOption } from "rc-upload/lib/interface";
import { useState } from "react";

import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Tabs, { TabPane } from "@marketplace/components/atoms/Tabs";
import Breadcrumb from "@marketplace/components/molecules/Common/Breadcrumb";
import PackageArea, {
  FileUploadType,
} from "@marketplace/components/molecules/Common/PluginEditing/PackageArea";
import SettingArea from "@marketplace/components/molecules/Common/PluginEditing/SettingArea";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

// TODO: merge with Add New Plugin
export type Props = {
  pluginName: string;
  version: string;
  description: string;
  githubUrl?: string;
  handleChangeGithubUrl: (url: string) => void;
  handleParsePlugin: (file?: FileUploadType) => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
  handleUploadImages: (image: UploadRequestOption) => void;
};
const UpdatePluginContent: React.FC<Props> = ({
  pluginName,
  version,
  description,
  githubUrl,
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
          <Breadcrumb
            rootLink="/myplugins"
            rootName={t("Plugins List")}
            currentName={t("Update Plugin")}
          />
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

export default UpdatePluginContent;
