import Button from "@marketplace/components/atoms/Button";
import Icon from "@marketplace/components/atoms/Icon";
import Breadcrumb from "@marketplace/components/molecules/Common/Breadcrumb";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { useCallback, useState } from "react";
import PackageArea from "./PackageArea";
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
  const t = useT();
  const [currentTab, updateTab] = useState<1 | 2>(1);

  const handlePageChange = useCallback(() => {
    console.log("pressed");
    updateTab(currentTab === 1 ? 2 : 1);
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
        <ButtonWrapper>
          <Button icon={<Icon icon="arrowRight" />} iconPosition="end" type="primary" onClick={handlePageChange}>
            {t("Next")}
          </Button>
        </ButtonWrapper>
        {currentTab === 1 && <VersionArea />}
        {currentTab === 2 && (
          <PackageArea
            githubUrl={githubUrl}
            pageChangeButton={t("Details Setting")}
            onChangeGithubUrl={onParseFromUrl}
            onPageChange={pluginName !== "" ? handlePageChange : undefined}
            onRemove={onRemove}
            onParsePlugin={onParseFromFile}
          />
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

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
