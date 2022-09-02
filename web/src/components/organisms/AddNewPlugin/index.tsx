import AddNewPluginPage from "@marketplace/components/molecules/AddNewPluginPage";
import type { FileUploadType } from "@marketplace/components/molecules/AddNewPluginPage/PackageArea";

import useHooks from "./hooks";

export type Props = {};
const AddNewPlugin: React.FC<Props> = () => {
  const { handleParsePluginMutation, handleCreatePluginMutation } = useHooks();
  const handleClickSave = () => {
    handleCreatePluginMutation({
      file: undefined,
      repo: "http",
      publisher: "1",
    });
  };
  const handleClickPublish = () => {
    handleCreatePluginMutation({
      file: undefined,
      repo: "http",
      publisher: "1",
    });
  };
  const handleParsePlugin = (file?: FileUploadType) => {
    console.log(file);
    handleParsePluginMutation({
      file: file,
      repo: "",
    });
  };
  return (
    <AddNewPluginPage
      pluginName=""
      version=""
      description=""
      handleParsePlugin={handleParsePlugin}
      handleClickSave={handleClickSave}
      handleClickPublish={handleClickPublish}
    />
  );
};

export default AddNewPlugin;
