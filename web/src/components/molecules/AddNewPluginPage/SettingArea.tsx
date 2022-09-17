import Button from "@marketplace/components/atoms/Button";
import Icon from "@marketplace/components/atoms/Icon";
// import { TextArea } from "@marketplace/components/atoms/Input";
import Message from "@marketplace/components/atoms/Message";
import Space from "@marketplace/components/atoms/Space";
import Upload, { UploadProps, RcFile as RcFileType } from "@marketplace/components/atoms/Upload";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

export type FileUploadType = string | RcFile | Blob;

export type RcFile = RcFileType;

export type Props = {
  pluginName: string;
  version: string;
  description: string;
  handleUploadImages: (images: (RcFile | undefined)[]) => void;
};
const SettingArea: React.FC<Props> = ({ pluginName, version, handleUploadImages }) => {
  const t = useT();

  const uploadProps: UploadProps = {
    name: "images",
    listType: "picture",
    accept: "image/png, image/jpeg, image/jpg",
    multiple: true,
    defaultFileList: [],
    customRequest: async options => {
      options.onSuccess?.("Ok");
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done" || status === "removed") {
        handleUploadImages(info.fileList.map(f => f.originFileObj).filter(f2 => !!f2));
        Message.success(`${info.file.name} ${t("Image uploaded successfully.")}`);
      } else if (status === "error") {
        Message.error(`${info.file.name} ${t("Image upload failed.")}`);
      }
    },
  };

  return (
    <Wrapper>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Title>{t("Plugin Name")}</Title>
        <PluginInfo>{pluginName}</PluginInfo>
        <Title>{t("Version")}</Title>
        <PluginInfo>{version}</PluginInfo>

        {/* <Title>{t("Description")}</Title>
        <StyledTextArea rows={4} defaultValue={description} /> */}
        <Title>{t("Images")}</Title>
        <Upload {...uploadProps}>
          <Button icon={<Icon icon="upload" />} type="primary" ghost>
            {t("Upload Image")}
          </Button>
        </Upload>
      </Space>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  padding: 32px;
`;

const Title = styled.p`
  font-size: 16px;
  width: 100%;
`;

const PluginInfo = styled.h1`
  font-size: 16px;
  font-weight: bold;
`;

// const StyledTextArea = styled(TextArea)`
//   width: 100%;
// `;

export default SettingArea;
