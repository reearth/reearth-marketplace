import Breadcrumb from "@marketplace/components/molecules/Common/Breadcrumb";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { useCallback, useState } from "react";
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
  onParseFromUrl,
  onParseFromFile,
  onPluginSave,
  onRemove,
  onPublish,
  onImagesUpload,
}) => {
  const [currentTab, updateTab] = useState<"1" | "2" | "3">("1");
  const t = useT();

  const handleNextButtonPress = useCallback(() => {
    if (currentTab === "1") updateTab("2");
    else if (currentTab === "2") updateTab("3");
  }, [currentTab]);

  const handlePrevButtonPress = useCallback(() => {
    if (currentTab === "3") updateTab("2");
    else if (currentTab === "2") updateTab("1");
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
          handlePrevButtonPress={handlePrevButtonPress}
        />
        {currentTab === "1" && <VersionArea />}
        {currentTab === "2" && (
          <PackageArea
            githubUrl={githubUrl}
            onChangeGithubUrl={onParseFromUrl}
            onRemove={onRemove}
            onParsePlugin={onParseFromFile}
          />
        )}
        {currentTab === "3" && (
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
