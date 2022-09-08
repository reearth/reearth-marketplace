import { styled } from "@marketplace/theme";
import { UploadRequestOption } from "rc-upload/lib/interface";

import AddNewPluginContent from "./AddNewPluginContent";
import { FileUploadType } from "./PackageArea";

export type Props = {
  pluginName: string;
  description: string;
  version: string;
  githubUrl?: string;
  uploadedFile?: FileUploadType;
  handleChangeGithubUrl: (url: string) => void;
  handleParsePlugin: (file?: FileUploadType) => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
  handleUploadImages: (image: UploadRequestOption) => void;
};
const AddNewPluginPage: React.FC<Props> = ({
  pluginName,
  description,
  version,
  githubUrl,
  uploadedFile,
  handleChangeGithubUrl,
  handleParsePlugin,
  handleClickSave,
  handleClickPublish,
  handleUploadImages,
}) => {
  return (
    <Wrapper>
      <AddNewPluginContent
        pluginName={pluginName}
        description={description}
        version={version}
        uploadedFile={uploadedFile}
        githubUrl={githubUrl}
        handleChangeGithubUrl={handleChangeGithubUrl}
        handleParsePlugin={handleParsePlugin}
        handleClickSave={handleClickSave}
        handleClickPublish={handleClickPublish}
        handleUploadImages={handleUploadImages}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  background: rgba(250, 250, 250, 1);
`;

export default AddNewPluginPage;
