import { useCallback, useState } from "react";

import Breadcrumb from "@marketplace/components/molecules/Common/Breadcrumb";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { TabsType } from "@marketplace/types";

import ButtonNavigation from "./ButtonNavigation";
import PackageArea from "./PackageArea";
import SettingArea from "./SettingArea";
import VersionArea from "./VersionArea";

export type Props = {
  currentPluginId?: string;
  pluginName: string;
  description: string;
  version: string;
  githubUrl?: string;
  isLoading: boolean;
  pluginUploaded: boolean;
  onParseFromUrl: (url: string) => void;
  onParseFromFile: (file?: File) => Promise<void>;
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
  pluginUploaded,
  onParseFromUrl,
  onParseFromFile,
  onPluginSave,
  onRemove,
  onPublish,
  onImagesUpload,
}) => {
  const [currentTab, updateTab] = useState<TabsType>(TabsType.Version);
  const t = useT();

  const handleNextButtonPress = useCallback(() => {
    const tabs = [TabsType.Version, TabsType.Package, TabsType.Settings];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      updateTab(tabs[currentIndex + 1]);
    }
  }, [currentTab]);

  const handlePrevButtonPress = useCallback(() => {
    const tabs = [TabsType.Version, TabsType.Package, TabsType.Settings];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex > 0) {
      updateTab(tabs[currentIndex - 1]);
    }
  }, [currentTab]);

  return (
    <Wrapper>
      <ContentWrapper>
        <Breadcrumb
          rootLink="/myplugins"
          rootName={t("Plugins List")}
          currentName={currentPluginId ? currentPluginId : t("New Plugin")}
        />
        <TitleWrapper>
          <Title>{t("New Plugin")}</Title>
        </TitleWrapper>
        <ButtonNavigation
          currentTab={currentTab}
          handleNextButtonPress={handleNextButtonPress}
          handlePluginSave={onPluginSave}
          handlePluginPublish={onPublish}
          handlePrevButtonPress={handlePrevButtonPress}
          isLoading={isLoading}
          pluginUploaded={pluginUploaded}
        />
        {currentTab === TabsType.Version && <VersionArea />}
        {currentTab === TabsType.Package && (
          <PackageArea
            githubUrl={githubUrl}
            onChangeGithubUrl={onParseFromUrl}
            onRemove={onRemove}
            onParsePlugin={onParseFromFile}
          />
        )}
        {currentTab === TabsType.Settings && (
          <SettingArea
            pluginName={pluginName}
            version={version}
            description={description}
            handleUploadImages={onImagesUpload}
          />
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const ContentWrapper = styled.div`
  width: 1200px;
`;

const Title = styled.p`
  font-size: 28px;
  line-height: 38.14px;
  font-weight: 700;
`;

const TitleWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 1);
  padding-top: 48px;
  padding-bottom: 72px;
`;

export default PluginUpload;
