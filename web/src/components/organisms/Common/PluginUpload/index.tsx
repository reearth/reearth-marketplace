import PluginUploadMolecule from "@marketplace/components/molecules/Common/PluginUpload";

import useHooks from "./hooks";

export type Props = {
  pluginId?: string;
};

const PluginUpload: React.FC<Props> = ({ pluginId }) => {
  const {
    parsedPlugin,
    isLoading,
    githubUrl,
    handleClearParsedPlugin,
    handleChangeGithubUrl,
    handleParsePlugin,
    handlePluginSave,
    handleClickPublish,
    handleUploadImages,
  } = useHooks({ pluginId });

  return (
    <PluginUploadMolecule
      currentPluginId={pluginId}
      pluginName={parsedPlugin ? parsedPlugin.name : ""}
      version={parsedPlugin ? parsedPlugin.version : ""}
      description={parsedPlugin ? parsedPlugin.description : ""}
      githubUrl={githubUrl}
      isLoading={isLoading}
      onChangeGithubUrl={handleChangeGithubUrl}
      onParsePlugin={handleParsePlugin}
      onRemove={handleClearParsedPlugin}
      onPluginSave={handlePluginSave}
      onPublish={handleClickPublish}
      onImagesUpload={handleUploadImages}
    />
  );
};

export default PluginUpload;
