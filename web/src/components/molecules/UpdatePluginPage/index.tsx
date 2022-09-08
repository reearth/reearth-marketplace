import { styled } from "@marketplace/theme";
import UpdatePluginContent from "./UpdatePluginContent";
import { FileUploadType } from "@marketplace/components/molecules/AddNewPluginPage/PackageArea";
import { UploadRequestOption } from "rc-upload/lib/interface";

export type Props = {
  pluginName: string;
  description: string;
  version: string;
  githubUrl?: string;
  handleChangeGithubUrl: (url: string) => void;
  handleParsePlugin: (file?: FileUploadType) => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
  handleUploadImages: (image: UploadRequestOption) => void;
};
const UpdatePluginPage: React.FC<Props> = ({
  pluginName,
  description,
  version,
  githubUrl,
  handleChangeGithubUrl,
  handleParsePlugin,
  handleClickSave,
  handleClickPublish,
  handleUploadImages,
}) => {
  return (
    <Wrapper>
      <UpdatePluginContent
        pluginName={pluginName}
        description={description}
        version={version}
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

export default UpdatePluginPage;
