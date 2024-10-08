import Col from "@marketplace/components/atoms/Col";
import Icon from "@marketplace/components/atoms/Icon";
import Input from "@marketplace/components/atoms/Input";
import Message from "@marketplace/components/atoms/Message";
import Radio, { RadioChangeEvent } from "@marketplace/components/atoms/Radio";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import { Dragger, RcFile, UploadFile, UploadProps } from "@marketplace/components/atoms/Upload";
import ShadowCard from "@marketplace/components/molecules/Common/ShadowCard";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { useState } from "react";

export type FileUploadType = string | RcFile | Blob;

export type Props = {
  githubUrl?: string;
  pageChangeButton?: string;
  onPageChange?: () => void;
  onRemove?: () => void;
  onParsePlugin: (file?: File) => Promise<void>;
  onChangeGithubUrl: (url: string) => void;
};

const PackageArea: React.FC<Props> = ({
  githubUrl,
  pageChangeButton,
  onPageChange,
  onRemove,
  onParsePlugin,
  onChangeGithubUrl,
}) => {
  const t = useT();

  const [uploadedFile, uploadFile] = useState<UploadFile[]>();
  const [currentRadio, changeRadio] = useState<"Upload from local" | "GitHub">("Upload from local");

  const handleChangeRadio = (e: RadioChangeEvent) => {
    changeRadio(e.target.value);
  };

  const uploadProps: UploadProps = {
    name: "pluginZip",
    multiple: false,
    accept: ".zip",
    maxCount: 1,
    customRequest: async ({ onSuccess, onError, file }) => {
      if (typeof file === "string" || !("uid" in file)) return;
      try {
        uploadFile([file]);
        await onParsePlugin(file);
        onSuccess?.("Ok");
      } catch (err: any) {
        onError?.(new Error(err));
      }
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        Message.success(`${info.file.name} ${t("File uploaded successfully.")}`);
      } else if (status === "error") {
        Message.error(`${info.file.name} ${t("File upload failed.")}`);
      }
    },
    onRemove() {
      uploadFile(undefined);
      onRemove?.();
    },
  };

  return (
    <ShadowCard>
      <div>
        <Space direction="vertical" size={"large"}>
          <ContentText>Package</ContentText>
          <TopRow justify="start">
            <Col>
              <Radio.Group onChange={handleChangeRadio} value={currentRadio}>
                <Radio.Button value="Upload from local">{t("Upload from local")}</Radio.Button>
                <Radio.Button value="GitHub">{t("GitHub")}</Radio.Button>
              </Radio.Group>
            </Col>
          </TopRow>
        </Space>
        <InputWrapper>
          {currentRadio === "Upload from local" ? (
            <Dragger {...uploadProps} style={{ border: "1px dashed" }} defaultFileList={uploadedFile}>
              <DraggerContents>
                <IconWrapper>
                  <Icon icon="inbox" style={{ fontSize: "36px" }} />
                </IconWrapper>
                <p className="ant-upload-hint">{t("Click or drag file to this area to upload")}</p>
              </DraggerContents>
            </Dragger>
          ) : (
            <>
              <Input
                placeholder="github.com/xxx/xxx"
                value={githubUrl}
                onBlur={(e) => onChangeGithubUrl(e.target.value)}
              />
              <InputFooter>{t("Please set your repository as public respository.")}</InputFooter>
            </>
          )}
        </InputWrapper>
      </div>
    </ShadowCard>
  );
};

const ContentText = styled.p`
  font-size: 16px;
  line-height: 21.79px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
`;

const IconWrapper = styled.div`
  margin-bottom: 24px;
`;

const InputWrapper = styled.div`
  height: 168px;
`;

const TopRow = styled(Row)`
  margin-bottom: 24px;
`;

const InputFooter = styled.p`
  margin-top: 16px;
  padding-left: 4px;
`;

const DraggerContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120px;
  padding: 8px 24px;
`;

export default PackageArea;
