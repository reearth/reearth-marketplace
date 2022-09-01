import styled from "@emotion/styled";
import { useState } from "react";

import Button from "@/components/atoms/Button";
import Col from "@/components/atoms/Col";
import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import Message from "@/components/atoms/Message";
import Radio, { RadioChangeEvent } from "@/components/atoms/Radio";
import Row from "@/components/atoms/Row";
import Space from "@/components/atoms/Space";
import Upload, { Dragger, UploadChangeParam, RcFile } from "@/components/atoms/Upload";

export type FileUploadType = string | RcFile | Blob;
export type Props = {
  handleClickDetailSetting: () => void;
  handleParsePlugin: (file?: FileUploadType, repo?: string) => void;
};
const PackageArea: React.FC<Props> = ({ handleClickDetailSetting, handleParsePlugin }) => {
  const [currentRadio, changeRadio] = useState<"Upload from local" | "GitHub repository">(
    "Upload from local",
  );
  const [uploadedFileName, uploadZip] = useState<string>("");

  const handleChangeRadio = (e: RadioChangeEvent) => {
    changeRadio(e.target.value);
  };
  const handleUploadZip = (info: UploadChangeParam) => {
    uploadZip(info.file.name);
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
              <Radio.Button value="Upload from local">Upload from local</Radio.Button>
              <Radio.Button value="GitHub repository">GitHub repository</Radio.Button>
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
              disabled={!!uploadedFileName}
              multiple={false}
              beforeUpload={file => {
                console.log(file);
                const isZip = file.type === "application/zip";
                if (!isZip) {
                  Message.error(`${file.name} is not a zip file`);
                }
                return isZip || Upload.LIST_IGNORE;
              }}
              customRequest={info => handleParsePlugin(info.file)}
              onChange={info => {
                const { status } = info.file;
                if (status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (status === "done") {
                  Message.success(`${info.file.name} file uploaded successfully.`);
                  handleUploadZip(info);
                } else if (status === "error") {
                  Message.error(`${info.file.name} file upload failed.`);
                }
              }}
              onDrop={e => {
                console.log("Dropped files", e.dataTransfer.files);
              }}>
              <p className="ant-upload-drag-icon">
                <Icon icon="inbox" />
              </p>
              <p className="ant-upload-hint">Click or drag file to this area to upload</p>
            </Dragger>
          </UploadArea>
        ) : (
          <>
            <Input placeholder="github.com/xxx/xxx"></Input>
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
