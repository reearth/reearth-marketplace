import Button from "@marketplace/components/atoms/Button";
import Icon from "@marketplace/components/atoms/Icon";
import { TextArea } from "@marketplace/components/atoms/Input";
import Space from "@marketplace/components/atoms/Space";
import Upload from "@marketplace/components/atoms/Upload";
import { styled } from "@marketplace/theme";
import { UploadRequestOption } from "rc-upload/lib/interface";

export type Props = {
  pluginName: string;
  version: string;
  description: string;
  handleUploadImages: (image: UploadRequestOption) => void;
};
const SettingArea: React.FC<Props> = ({
  pluginName,
  version,
  description,
  handleUploadImages,
}) => {
  return (
    <Wrapper>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Title>Plugin Name</Title>
        <PluginInfo>{pluginName}</PluginInfo>
        <Title>Version</Title>
        <PluginInfo>{version}</PluginInfo>

        <Title>Description</Title>
        <StyledTextArea rows={4} defaultValue={description} />
        <Title>Images</Title>
        <Upload
          listType="picture"
          accept="image/png, image/jpeg, image/jpg"
          customRequest={(image) => {
            handleUploadImages(image);
          }}
          defaultFileList={[]}
          multiple
        >
          <Button icon={<Icon icon="upload" />} type="primary" ghost>
            Upload Image
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

const StyledTextArea = styled(TextArea)`
  width: 100%;
`;

export default SettingArea;
