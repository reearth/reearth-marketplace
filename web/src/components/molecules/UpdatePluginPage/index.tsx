import UpdatePluginContent from "./UpdatePluginContent";

export type Props = {
  pluginName: string;
  description: string;
  version: string;
  githubUrl: string;
  handleChangeGithubUrl: (url: string) => void;
  handleParsePlugin: () => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
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
}) => {
  return (
    <>
      <UpdatePluginContent
        pluginName={pluginName}
        description={description}
        version={version}
        githubUrl={githubUrl}
        handleChangeGithubUrl={handleChangeGithubUrl}
        handleParsePlugin={handleParsePlugin}
        handleClickSave={handleClickSave}
        handleClickPublish={handleClickPublish}
      />
    </>
  );
};

export default UpdatePluginPage;
