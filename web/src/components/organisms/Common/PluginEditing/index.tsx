import { useCallback, useState } from "react";

import Message from "@marketplace/components/atoms/Message";
import AddNewPluginPage, { RcFile } from "@marketplace/components/molecules/Common/PluginEditing";
import type { FileUploadType } from "@marketplace/components/molecules/Common/PluginEditing/PackageArea";
import { useT } from "@marketplace/i18n";

import useHooks from "./hooks";

export type Props = {
  newPlugin?: boolean;
};
const AddNewPlugin: React.FC<Props> = ({ newPlugin }) => {
  const t = useT();
  const {
    parsedPlugin,
    handleParsePluginMutation,
    handleCreatePluginMutation,
    handleUpdatePluginMutation,
  } = useHooks();

  const [isSaveLoading, toggleLoadingSave] = useState<boolean>(false);
  const [isPublishLoading, toggleLoadingPublish] = useState<boolean>(false);
  const [githubUrl, changeGithubUrl] = useState<string | undefined>(undefined);
  const [uploadedFile, uploadZip] = useState<FileUploadType>();
  // TODO: use Antd's file upload after backend ready
  const [uploadedImages, uploadImages] = useState<any[]>([]);

  const handleUploadImages = (images: (RcFile | undefined)[]) => {
    uploadImages(images);
  };

  const handlePluginCreation = useCallback(async () => {
    toggleLoadingSave(true);
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
    toggleLoadingSave(false);
  }, [
    githubUrl,
    parsedPlugin,
    uploadedFile,
    uploadedImages,
    handleCreatePluginMutation,
    handleUpdatePluginMutation,
  ]);

  const handlePluginUpdate = useCallback(async () => {
    toggleLoadingSave(true);
    if (parsedPlugin) {
      await handleUpdatePluginMutation({
        id: parsedPlugin.id,
        images: uploadedImages,
      });
    }
    toggleLoadingSave(false);
  }, [parsedPlugin, uploadedImages, handleUpdatePluginMutation]);

  const handleClickPublish = async () => {
    toggleLoadingSave(true);
    toggleLoadingPublish(true);
    if (newPlugin) {
      await handlePluginCreation();
    }
    if (parsedPlugin) {
      await handleUpdatePluginMutation({
        id: parsedPlugin.id,
        active: true,
      });
    }
    toggleLoadingSave(false);
    toggleLoadingPublish(false);
  };

  // When Github Url Input
  const handleChangeGithubUrl = async (url: string) => {
    changeGithubUrl(url);
    await handleParsePluginMutation({
      file: undefined,
      repo: url,
    }).catch(
      Message.error(t("Something might be wrong with your URL. Please check and try again.")),
    );
  };

  // When Zip File Uploaded
  const handleParsePlugin = async (file?: FileUploadType) => {
    uploadZip(file);
    await handleParsePluginMutation({
      file: file,
      repo: undefined,
    });
  };

  return (
    <AddNewPluginPage
      pluginName={parsedPlugin ? parsedPlugin.name : ""}
      version={parsedPlugin ? parsedPlugin.version : ""}
      description={parsedPlugin ? parsedPlugin.description : ""}
      githubUrl={githubUrl}
      isSaveLoading={isSaveLoading}
      isPublishLoading={isPublishLoading}
      handleChangeGithubUrl={handleChangeGithubUrl}
      handleParsePlugin={handleParsePlugin}
      onPluginSave={newPlugin ? handlePluginCreation : handlePluginUpdate}
      handleClickPublish={handleClickPublish}
      handleUploadImages={handleUploadImages}
    />
  );
};

export default AddNewPlugin;
