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
    handleRemove,
    handleParseFromUrl,
    handleParseFromFile,
    handlePluginSave,
    handlePublish,
    handleUploadImages,
  } = useHooks({ pluginId });

  return (
    <PluginUploadMolecule
      currentPluginId={pluginId}
      pluginName={parsedPlugin?.name ?? ""}
      version={parsedPlugin?.version ?? ""}
      description={parsedPlugin?.description ?? ""}
      githubUrl={githubUrl}
      isLoading={isLoading}
      pluginUploaded={!!parsedPlugin}
      onParseFromUrl={handleParseFromUrl}
      onParseFromFile={handleParseFromFile}
      onPublish={handlePublish}
      onPluginSave={handlePluginSave}
      onRemove={handleRemove}
      onImagesUpload={handleUploadImages}
    />
  );
};

export default PluginUpload;
