import UpdatePluginContent from "./UpdatePluginContent";

export type Props = {
  pluginName: string;
  description: string;
  version: string;
  handleParsePlugin: () => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
};
const UpdatePluginPage: React.FC<Props> = ({
  pluginName,
  description,
  version,
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
        handleParsePlugin={handleParsePlugin}
        handleClickSave={handleClickSave}
        handleClickPublish={handleClickPublish}
      />
    </>
  );
};

export default UpdatePluginPage;
