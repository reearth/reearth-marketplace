import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Row from "@marketplace/components/atoms/Row";
import Breadcrumb from "@marketplace/components/molecules/Common/Breadcrumb";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import SettingArea, { RcFile as RcFileType } from "../Common/PluginUpload/SettingArea";

export type RcFile = RcFileType;

export type Props = {
  currentPluginId?: string;
  pluginName: string;
  version: string;
  description: string;
  isLoading: boolean;
  isSaveDisabled: boolean;
  onPluginSave: () => void;
  handleUploadImages: (images: (RcFile | undefined)[]) => void;
};

const EditPlugin: React.FC<Props> = ({
  currentPluginId,
  pluginName,
  version,
  description,
  isLoading,
  isSaveDisabled,
  onPluginSave,
  handleUploadImages,
}) => {
  const t = useT();

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
            <Button type="default" size="large" onClick={onPluginSave} disabled={isSaveDisabled} loading={isLoading}>
              {t("Save")}
            </Button>
          </Col>
        </TopRow>
        <SettingArea
          pluginName={pluginName}
          version={version}
          description={description}
          handleUploadImages={handleUploadImages}
        />
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

export default EditPlugin;
