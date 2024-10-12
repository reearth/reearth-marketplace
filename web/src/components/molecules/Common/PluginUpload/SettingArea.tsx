import Button from "@marketplace/components/atoms/Button";
import Icon from "@marketplace/components/atoms/Icon";
import Message from "@marketplace/components/atoms/Message";
import Space from "@marketplace/components/atoms/Space";
import Upload, { RcFile as RcFileType, UploadProps } from "@marketplace/components/atoms/Upload";
import ShadowCard from "@marketplace/components/molecules/Common/ShadowCard";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

export type FileUploadType = string | RcFile | Blob;

export type RcFile = RcFileType;

export type Props = {
  pluginName: string;
  version: string;
  description: string;
  handleUploadImages: (images: RcFile[]) => void;
};
const SettingArea: React.FC<Props> = ({ description, pluginName, version, handleUploadImages }) => {
  const t = useT();

  const uploadProps: UploadProps = {
    name: "images",
    listType: "picture",
    accept: "image/png,image/jpeg,image/jpg,image/webp",
    multiple: true,
    customRequest: async options => {
      options.onSuccess?.("Ok");
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done" || status === "removed") {
        handleUploadImages(
          info.fileList.map(f => f.originFileObj).filter((f): f is RcFileType => !!f),
        );
        Message.success(`${info.file.name} ${t("Image uploaded successfully.")}`);
      } else if (status === "error") {
        Message.error(`${info.file.name} ${t("Image upload failed.")}`);
      }
    },
  };

  return (
    <ShadowCard>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Title>{t("Plugin Name")}</Title>
        <PluginInfo>{pluginName}</PluginInfo>
        <Title>{t("Version")}</Title>
        <PluginInfo>{version}</PluginInfo>
        {description && (
          <>
            <Title>{t("Description")}</Title>
            <StyledDiv>
              <p>{description}</p>
            </StyledDiv>
          </>
        )}
        <Title>{t("Images")}</Title>
        <Upload {...uploadProps}>
          <Button icon={<Icon icon="upload" />} type="primary" ghost>
            {t("Upload Image")}
          </Button>
        </Upload>
      </Space>
    </ShadowCard>
  );
};

const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 21.79px;
  width: 100%;
`;

const PluginInfo = styled.h1`
  font-size: 16px;
  font-weight: 700;
  line-height: 21.79px;
`;

const StyledDiv = styled.div`
  min-height: 100px;
  border-width: 1px;
  border-style: solid;
  padding: 6px 8px; 8px; 8px;
  border-color: rgba(0, 0, 0, 0.25);
`;

export default SettingArea;
