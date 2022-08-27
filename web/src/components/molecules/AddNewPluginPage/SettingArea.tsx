import styled from "@emotion/styled";
import { useState } from "react";

import Button from "@/components/atoms/Button";
import Col from "@/components/atoms/Col";
import Icon from "@/components/atoms/Icon";
import Input, { TextArea } from "@/components/atoms/Input";
import Message from "@/components/atoms/Message";
import Radio, { RadioChangeEvent } from "@/components/atoms/Radio";
import Row from "@/components/atoms/Row";
import Space from "@/components/atoms/Space";
import Upload, { Dragger, UploadChangeParam } from "@/components/atoms/Upload";

export type Props = {
  pluginName: string;
  version: string;
  description: string;
};
const SettingArea: React.FC<Props> = ({ pluginName, version, description }) => {
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
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          defaultFileList={[]}
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
