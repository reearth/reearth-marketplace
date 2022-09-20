import { useCallback, useState } from "react";

import Message from "@marketplace/components/atoms/Message";
import PluginUploadMolecule, {
  RcFile,
} from "@marketplace/components/molecules/Common/PluginUpload";
import type { FileUploadType } from "@marketplace/components/molecules/Common/PluginUpload/PackageArea";
import { useT } from "@marketplace/i18n";

import useHooks from "./hooks";

export type Props = {
  pluginId?: string;
};

const PluginUpload: React.FC<Props> = ({ pluginId }) => {
  const t = useT();

  const {
    parsedPlugin,
    isLoading,
    handleClearParsedPlugin,
    handleParsePluginMutation,
    handleCreatePluginMutation,
    handleUpdatePluginMutation,
  } = useHooks({ pluginId });

  const [githubUrl, changeGithubUrl] = useState<string | undefined>(undefined);
  const [uploadedFile, uploadZip] = useState<FileUploadType>();
  // TODO: use Antd's file upload after backend ready
  const [uploadedImages, uploadImages] = useState<any[]>([]);

  const handleUploadImages = useCallback((images: (RcFile | undefined)[]) => {
    uploadImages(images);
  }, []);

  const handlePluginCreation = useCallback(async () => {
    if (uploadedFile) {
      await handleCreatePluginMutation({
        file: uploadedFile,
        repo: undefined,
      });
    } else if (githubUrl) {
      await handleCreatePluginMutation({
        file: undefined,
        repo: githubUrl,
      });
    }
    if (parsedPlugin && uploadImages.length > 0) {
      await handleUpdatePluginMutation({
        id: parsedPlugin.id,
        images: uploadedImages,
      });
    }
  }, [
    githubUrl,
    parsedPlugin,
    uploadedFile,
    uploadedImages,
    handleCreatePluginMutation,
    handleUpdatePluginMutation,
  ]);

  const handlePluginUpdate = useCallback(async () => {
    if (parsedPlugin) {
      await handleUpdatePluginMutation({
        id: parsedPlugin.id,
        images: uploadedImages,
      });
    }
  }, [parsedPlugin, uploadedImages, handleUpdatePluginMutation]);

  const handleClickPublish = useCallback(async () => {
    if (parsedPlugin) {
      if (!pluginId) {
        await handlePluginCreation();
      }
      await handleUpdatePluginMutation({
        id: parsedPlugin.id,
        images: uploadedImages,
        active: true,
      });
    }
  }, [pluginId, uploadedImages, parsedPlugin, handlePluginCreation, handleUpdatePluginMutation]);

  // When Github Url Input
  const handleChangeGithubUrl = useCallback(
    async (url: string) => {
      changeGithubUrl(url);
      await handleParsePluginMutation({
        file: undefined,
        repo: url,
      }).catch(
        Message.error(t("Something might be wrong with your URL. Please check and try again.")),
      );
    },
    [t, handleParsePluginMutation],
  );

  // When Zip File Uploaded
  const handleParsePlugin = useCallback(
    async (file?: FileUploadType) => {
      uploadZip(file);
      await handleParsePluginMutation({
        file: file,
        repo: undefined,
      });
    },
    [handleParsePluginMutation],
  );

  const handlePluginSave = useCallback(async () => {
    if (!pluginId) {
      await handlePluginCreation();
    } else {
      await handlePluginUpdate();
    }
  }, [pluginId, handlePluginCreation, handlePluginUpdate]);

  return (
    <PluginUploadMolecule
      currentPluginId={pluginId}
      pluginName={parsedPlugin ? parsedPlugin.name : ""}
      version={parsedPlugin ? parsedPlugin.version : ""}
      description={parsedPlugin ? parsedPlugin.description : ""}
      uploadedImages={uploadedImages}
      githubUrl={githubUrl}
      isLoading={isLoading}
      handleChangeGithubUrl={handleChangeGithubUrl}
      onParsePlugin={handleParsePlugin}
      onRemove={handleClearParsedPlugin}
      onPluginSave={handlePluginSave}
      handleClickPublish={handleClickPublish}
      handleUploadImages={handleUploadImages}
    />
  );
};

export default PluginUpload;
