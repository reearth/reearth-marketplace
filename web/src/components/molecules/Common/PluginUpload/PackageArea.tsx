import { useState } from "react";

import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Icon from "@marketplace/components/atoms/Icon";
import Input from "@marketplace/components/atoms/Input";
import Message from "@marketplace/components/atoms/Message";
import Radio, { RadioChangeEvent } from "@marketplace/components/atoms/Radio";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import { Dragger, RcFile, UploadProps, UploadFile } from "@marketplace/components/atoms/Upload";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

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
  const [currentRadio, changeRadio] = useState<"Upload from local" | "GitHub repository">(
    "Upload from local",
  );

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
    <Wrapper>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={onPageChange} disabled={!onPageChange}>
              {pageChangeButton}
              <Icon icon="arrowRight" />
            </Button>
          </Col>
        </Row>
        <Row justify="start">
          <Col>
            <Radio.Group onChange={handleChangeRadio} value={currentRadio}>
              <Radio.Button value="Upload from local">{t("Upload from local")}</Radio.Button>
              <Radio.Button value="GitHub repository">{t("GitHub repository")}</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        {currentRadio === "Upload from local" ? (
          <Dragger {...uploadProps} style={{ border: "1px dashed" }} defaultFileList={uploadedFile}>
            <DraggerContents>
              <Icon icon="inbox" style={{ fontSize: "48px" }} />
              <p className="ant-upload-hint">{t("Click or drag file to this area to upload")}</p>
            </DraggerContents>
          </Dragger>
        ) : (
          <>
            <Input
              placeholder="github.com/xxx/xxx"
              value={githubUrl}
              onBlur={e => onChangeGithubUrl(e.target.value)}
            />
            <p>{t("Please set your repository as public respository.")}</p>
          </>
        )}
      </Space>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  padding: 24px 32px;
`;

const DraggerContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 120px;
`;

export default PackageArea;
