import type { FileUploadType } from "@marketplace/components/molecules/Common/PluginEditing/PackageArea";
import UpdatePluginPage from "@marketplace/components/molecules/UpdatePluginPage";
import useHooks from "@marketplace/components/organisms/Common/PluginEditing/hooks";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { useState } from "react";

export type Props = {
  pluginId?: string;
};

const UpdatePlugin: React.FC<Props> = ({ pluginId }) => {
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
      : githubUrl
      ? await handleCreatePluginMutation({
          file: undefined,
          repo: githubUrl,
        })
      : null;
    uploadImages.length > 0 &&
      (await handleUpdatePluginMutation({
        id: parsedPlugin ? parsedPlugin.id : pluginId || "",
        images: uploadedImages,
      }));
  };
  const handleClickPublish = () => {
    handleUpdatePluginMutation({
      id: parsedPlugin ? parsedPlugin.id : pluginId || "",
      active: true,
      images: uploadedImages,
    });
  };
  // When Github Url Input
  const handleChangeGithubUrl = (url: string) => {
    changeGithubUrl(url);
    handleParsePluginMutation({
      file: undefined,
      repo: url,
    });
  };
  // When Zip File Uploaded
  const handleParsePlugin = (file?: FileUploadType) => {
    uploadZip(file);
    handleParsePluginMutation({
      file: file,
      repo: undefined,
    });
  };
  return (
    <UpdatePluginPage
      pluginName={parsedPlugin ? parsedPlugin.name : ""}
      description={parsedPlugin ? parsedPlugin.description : ""}
      version={parsedPlugin ? parsedPlugin.version : ""}
      githubUrl={githubUrl}
      handleChangeGithubUrl={handleChangeGithubUrl}
      handleParsePlugin={handleParsePlugin}
      handleClickSave={handleClickSave}
      handleClickPublish={handleClickPublish}
      handleUploadImages={handleUploadImages}
    />
  );
};

export default UpdatePlugin;
