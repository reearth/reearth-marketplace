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
  onParseFromUrl: ({ core, url }: { core: boolean; url: string }) => void;
  onParseFromFile: ({ core, file }: { core: boolean; file?: File }) => Promise<void>;
  onPluginSave: ({ publish, core }: { publish?: boolean; core: boolean }) => void;
  onRemove?: () => void;
  onPublish: (core: boolean) => void;
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
  const [isCorePlugin, setCorePlugin] = useState<boolean>(false);

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
          isCorePlugin={isCorePlugin}
          pluginUploaded={pluginUploaded}
        />
        {currentTab === TabsType.Version && <VersionArea setCorePlugin={setCorePlugin} />}
        {currentTab === TabsType.Package && (
          <PackageArea
            githubUrl={githubUrl}
            isCorePlugin={isCorePlugin}
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
