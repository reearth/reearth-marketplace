import { useCallback, useState } from "react";

import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Breadcrumb from "@marketplace/components/molecules/Common/Breadcrumb";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

import PackageArea from "./PackageArea";
import SettingArea from "./SettingArea";

export type Props = {
  currentPluginId?: string;
  pluginName: string;
  description: string;
  version: string;
  githubUrl?: string;
  isLoading: boolean;
  onChangeGithubUrl: (url: string) => void;
  onParsePlugin: (file?: File) => Promise<void>;
  onPluginSave: () => void;
  onRemove?: () => void;
  onPublish: () => void;
  onImagesUpload: (images: File[]) => void;
};

const PluginUpload: React.FC<Props> = ({
  currentPluginId,
  pluginName,
  version,
  description,
  githubUrl,
  isLoading,
  onChangeGithubUrl,
  onParsePlugin,
  onPluginSave,
  onRemove,
  onPublish,
  onImagesUpload,
}) => {
  const t = useT();
  const [currentTab, updateTab] = useState<1 | 2>(1);

  const handlePageChange = useCallback(() => {
    updateTab(currentTab === 1 ? 2 : 1);
  }, [currentTab]);

  return (
    <Wrapper>
      <ContentWrapper>
        <TopRow align="middle" justify="space-between">
          <Col>
            <Breadcrumb
              rootLink="/myplugins"
              rootName={t("Plugins List")}
              currentName={currentPluginId ? currentPluginId : t("New Plugin")}
            />
          </Col>
          <Col>
            <Space size="middle">
              <Button
                type="default"
                size="large"
                onClick={onPluginSave}
                loading={isLoading}
                disabled={currentTab !== 2}>
                {t("Save")}
              </Button>
              {!currentPluginId && (
                <Button
                  type="primary"
                  size="large"
                  onClick={onPublish}
                  loading={isLoading}
                  disabled={currentTab !== 2}>
                  {t("Save & Publish")}
                </Button>
              )}
            </Space>
          </Col>
        </TopRow>
        {currentTab === 1 && (
          <PackageArea
            githubUrl={githubUrl}
            pageChangeButton={t("Details Setting")}
            onChangeGithubUrl={onChangeGithubUrl}
            onPageChange={pluginName !== "" ? handlePageChange : undefined}
            onRemove={onRemove}
            onParsePlugin={onParsePlugin}
          />
        )}
        {currentTab === 2 && (
          <SettingArea
            pluginName={pluginName}
            version={version}
            description={description}
            onBack={handlePageChange}
            handleUploadImages={onImagesUpload}
          />
        )}
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
