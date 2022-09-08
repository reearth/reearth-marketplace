import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Icon from "@marketplace/components/atoms/Icon";
import Input from "@marketplace/components/atoms/Input";
import Message from "@marketplace/components/atoms/Message";
import Radio, { RadioChangeEvent } from "@marketplace/components/atoms/Radio";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Upload, { Dragger, RcFile } from "@marketplace/components/atoms/Upload";
import { styled } from "@marketplace/theme";
import { useState } from "react";

export type FileUploadType = string | RcFile | Blob;
export type Props = {
  githubUrl?: string;
  handleClickDetailSetting: () => void;
  handleParsePlugin: (file?: FileUploadType, repo?: string) => void;
  handleChangeGithubUrl: (url: string) => void;
};
const PackageArea: React.FC<Props> = ({
  githubUrl,
  handleClickDetailSetting,
  handleParsePlugin,
  handleChangeGithubUrl,
}) => {
  const [currentRadio, changeRadio] = useState<
    "Upload from local" | "GitHub repository"
  >("Upload from local");
  const handleChangeRadio = (e: RadioChangeEvent) => {
    changeRadio(e.target.value);
  };
  return (
    <Wrapper>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={handleClickDetailSetting}>
              Details Setting
              <Icon icon="arrowRight" />
            </Button>
          </Col>
        </Row>
        <Row justify="start">
          <Col>
            <Radio.Group onChange={handleChangeRadio} value={currentRadio}>
              <Radio.Button value="Upload from local">
                Upload from local
              </Radio.Button>
              <Radio.Button value="GitHub repository">
                GitHub repository
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        {currentRadio === "Upload from local" ? (
          //   TODO: itemRenderのみを表示させて、DragDropエリアを消す方法を探す
          <UploadArea>
            <Dragger
              name="plugin"
              accept=".zip"
              maxCount={1}
              multiple={false}
              beforeUpload={(file) => {
                console.log(file);
                const isZip = file.type === "application/zip";
                if (!isZip) {
                  Message.error(`${file.name} is not a zip file`);
                }
                return isZip || Upload.LIST_IGNORE;
              }}
              customRequest={(info) => handleParsePlugin(info.file)}
              onChange={(info) => {
                const { status } = info.file;
                if (status === "uploading") {
                  console.log(`${info.file.name} file uploading.`);
                }
                if (status === "done") {
                  Message.success(
                    `${info.file.name} file uploaded successfully.`
                  );
                } else if (status === "error") {
                  Message.error(`${info.file.name} file upload failed.`);
                }
              }}
              onDrop={(e) => {
                console.log("Dropped files", e.dataTransfer.files);
              }}
            >
              <p className="ant-upload-drag-icon">
                <Icon icon="inbox" />
              </p>
              <p className="ant-upload-hint">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </UploadArea>
        ) : (
          <>
            <Input
              placeholder="github.com/xxx/xxx"
              value={githubUrl}
              onChange={(e) => {
                handleChangeGithubUrl(e.target.value);
              }}
            />
            <p>Please set your repository as public respository.</p>
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

const UploadArea = styled.div`
  border: 2px dashed rgba(0, 0, 0, 0.25);
  padding: 37.5px 24px;
`;

export default PackageArea;
