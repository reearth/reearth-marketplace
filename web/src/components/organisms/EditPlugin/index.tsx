import { useCallback, useState } from "react";

import PluginUploadMolecule, { RcFile } from "@marketplace/components/molecules/EditPlugin";

import useHooks from "./hooks";

export type Props = {
  pluginId?: string;
};

const PluginUpload: React.FC<Props> = ({ pluginId }) => {
  const { currentPlugin, isLoading, handleUpdatePluginMutation } = useHooks({ pluginId });

  const [uploadedImages, uploadImages] = useState<any[]>();

  const handleUploadImages = useCallback((images: (RcFile | undefined)[]) => {
    uploadImages(images);
  }, []);

  const handlePluginUpdate = useCallback(async () => {
    if (currentPlugin) {
      await handleUpdatePluginMutation({
        id: currentPlugin.id,
        images: uploadedImages,
      });
    }
  }, [currentPlugin, uploadedImages, handleUpdatePluginMutation]);

  return (
    <PluginUploadMolecule
      currentPluginId={pluginId}
      pluginName={currentPlugin ? currentPlugin.name : ""}
      version={currentPlugin ? currentPlugin.latestVersion?.version ?? "" : ""}
      description={currentPlugin ? currentPlugin.description ?? "" : ""}
      isLoading={isLoading}
      isSaveDisabled={!uploadedImages}
      onPluginSave={handlePluginUpdate}
      handleUploadImages={handleUploadImages}
    />
  );
};

export default PluginUpload;
