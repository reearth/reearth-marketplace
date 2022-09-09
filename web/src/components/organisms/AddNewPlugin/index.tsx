import AddNewPluginPage from "@marketplace/components/molecules/AddNewPluginPage";
import type { FileUploadType } from "@marketplace/components/molecules/AddNewPluginPage/PackageArea";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { useState } from "react";
import useHooks from "./hooks";
import Message from "@marketplace/components/atoms/Message";

export type Props = {};
const AddNewPlugin: React.FC<Props> = () => {
  const {
    parsedPlugin,
    handleParsePluginMutation,
    handleCreatePluginMutation,
    handleUpdatePluginMutation,
  } = useHooks();

  const [githubUrl, changeGithubUrl] = useState<string | undefined>(undefined);
  const [uploadedFile, uploadZip] = useState<FileUploadType>();
  // TODO: use Antd's file upload after backend ready
  const [uploadedImages, uploadImages] = useState<any[]>([]);
  const handleUploadImages = (image: UploadRequestOption) => {
    uploadImages([...uploadedImages, image.file]);
  };
  const handleClickSave = async () => {
    uploadedFile
      ? await handleCreatePluginMutation({
          file: uploadedFile,
          repo: undefined,
        })
      : await handleCreatePluginMutation({
          file: undefined,
          repo: githubUrl,
        });
    uploadImages.length > 0 &&
      parsedPlugin &&
      (await handleUpdatePluginMutation({
        id: parsedPlugin.id,
        images: uploadedImages,
        active: false,
      }).catch(Message.error("Something went wrong on saving ")));
  };
  const handleClickPublish = async () => {
    await handleUpdatePluginMutation({
      id: parsedPlugin ? parsedPlugin.id : "",
      images: uploadedImages,
      active: true,
    }).catch(Message.error("Something went wrong on your publishment "));
  };
  // When Github Url Input
  const handleChangeGithubUrl = async (url: string) => {
    changeGithubUrl(url);
    await handleParsePluginMutation({
      file: undefined,
      repo: url,
    }).catch(Message.error("Something went wrong on your URL "));
  };
  // When Zip File Uploaded
  const handleParsePlugin = (file?: FileUploadType) => {
    uploadZip(file);
    handleParsePluginMutation({
      file: file,
      repo: undefined,
    }).catch(Message.error("Something went wrong on your file "));
  };

  return (
    <AddNewPluginPage
      pluginName={parsedPlugin ? parsedPlugin.name : ""}
      version={parsedPlugin ? parsedPlugin.version : ""}
      description={parsedPlugin ? parsedPlugin.description : ""}
      githubUrl={githubUrl}
      handleChangeGithubUrl={handleChangeGithubUrl}
      handleParsePlugin={handleParsePlugin}
      handleClickSave={handleClickSave}
      handleClickPublish={handleClickPublish}
      handleUploadImages={handleUploadImages}
    />
  );
};

export default AddNewPlugin;
