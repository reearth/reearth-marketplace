import Message from "@marketplace/components/atoms/Message";
import AddNewPluginPage from "@marketplace/components/molecules/AddNewPluginPage";
import type { FileUploadType } from "@marketplace/components/molecules/AddNewPluginPage/PackageArea";
import { useT } from "@marketplace/i18n";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { useState } from "react";

import useHooks from "./hooks";

export type Props = {};
const AddNewPlugin: React.FC<Props> = () => {
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

  const handleUploadImages = (image: UploadRequestOption) => {
    uploadImages([...uploadedImages, image.file]);
  };

  const handleClickSave = async () => {
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
        // active: false,
      });
    }
    toggleLoadingSave(false);
  };

  const handleClickPublish = async () => {
    toggleLoadingPublish(true);
    await handleUpdatePluginMutation({
      id: parsedPlugin?.id ?? "",
      // images: uploadedImages,
      active: true,
    });
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
      handleClickSave={handleClickSave}
      handleClickPublish={handleClickPublish}
      handleUploadImages={handleUploadImages}
    />
  );
};

export default AddNewPlugin;
