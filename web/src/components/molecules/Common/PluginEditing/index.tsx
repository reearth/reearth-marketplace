import { styled } from "@marketplace/theme";

import AddNewPluginContent, { RcFile as RcFileType } from "./AddNewPluginContent";
import { FileUploadType } from "./PackageArea";

export type RcFile = RcFileType;

export type Props = {
  pluginName: string;
  description: string;
  version: string;
  githubUrl?: string;
  isSaveLoading: boolean;
  isPublishLoading: boolean;
  handleChangeGithubUrl: (url: string) => void;
  handleParsePlugin: (file?: FileUploadType) => Promise<void>;
  onPluginSave: () => void;
  handleClickPublish: () => void;
  handleUploadImages: (images: (RcFile | undefined)[]) => void;
};
const AddNewPluginPage: React.FC<Props> = ({
  pluginName,
  description,
  version,
  githubUrl,
  isSaveLoading,
  isPublishLoading,
  handleChangeGithubUrl,
  handleParsePlugin,
  onPluginSave,
  handleClickPublish,
  handleUploadImages,
}) => {
  return (
    <Wrapper>
      <AddNewPluginContent
        pluginName={pluginName}
        description={description}
        version={version}
        githubUrl={githubUrl}
        isSaveLoading={isSaveLoading}
        isPublishLoading={isPublishLoading}
        handleChangeGithubUrl={handleChangeGithubUrl}
        handleParsePlugin={handleParsePlugin}
        onPluginSave={onPluginSave}
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
