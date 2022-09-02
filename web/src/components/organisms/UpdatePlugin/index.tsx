import type { FileUploadType } from "@marketplace/components/molecules/AddNewPluginPage/PackageArea";
import UpdatePluginPage from "@marketplace/components/molecules/UpdatePluginPage";
import React from "react";

import useHooks from "./hooks";

export type Props = {
  isLoggedIn: boolean;
};
const UpdatePlugin: React.FC<Props> = ({ isLoggedIn }) => {
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
  const pluginName = "";
  const description = "";
  const version = "";
  return (
    <UpdatePluginPage
      isLoggedIn={isLoggedIn}
      pluginName={pluginName}
      description={description}
      version={version}
      handleParsePlugin={handleParsePlugin}
      handleClickSave={handleClickSave}
      handleClickPublish={handleClickPublish}
    />
  );
};

export default UpdatePlugin;
