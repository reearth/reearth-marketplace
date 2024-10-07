import Button from "@marketplace/components/atoms/Button";
import Icon from "@marketplace/components/atoms/Icon";
import Radio from "@marketplace/components/atoms/Radio";
import Space from "@marketplace/components/atoms/Space";
import Breadcrumb from "@marketplace/components/molecules/Common/Breadcrumb";
import ShadowCard from "@marketplace/components/molecules/Common/ShadowCard";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { Flex } from "antd";
import { useCallback, useState } from "react";

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
    updateTab(currentTab === 1 ? 2 : 1);
  }, [currentTab]);

  const radioOptions  = [
    { label: 'Classic', value: 'Classic' },
    { label: 'Visualizer', value: 'Visualizer' },
  ];

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
          <Button icon={<Icon icon="arrowRight" />} iconPosition="end" type="primary">
            {t("Next")}
          </Button>
        </ButtonWrapper>
        <ShadowCard>
          <div>
          <Space direction="vertical" size={"large"}>
            <ContentText>Version</ContentText>
            <ContentText>Which environment your plugin is developed for ?</ContentText>
          </Space>
            <RadioWrapper>
              <Radio.Group block options={radioOptions} defaultValue="Classic" optionType="button" />
            </RadioWrapper>
          </div>
        </ShadowCard>
      </ContentWrapper>
    </Wrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

const ContentText = styled.p`
  font-size: 16px;
  line-height: 21.79px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
`;

const ContentWrapper = styled.div`
  width: 1200px;
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  width: 100%;
`

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
