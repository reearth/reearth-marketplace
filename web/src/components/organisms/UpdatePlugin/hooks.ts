import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import Message from "@marketplace/components/atoms/Message";
import type { FileUploadType } from "@marketplace/components/molecules/Common/PluginUpload/PackageArea";
import { useUpdatePluginVersionMutation, usePluginQuery } from "@marketplace/gql";
import { useT } from "@marketplace/i18n";

import pluginHooks from "../Common/PluginUpload/hooks";

export type FileUpload = FileUploadType;

export default ({ pluginId }: { pluginId?: string }) => {
  const t = useT();
  const navigate = useNavigate();

  const [isLoading, toggleLoading] = useState<boolean>(false);
  const [uploadedFile, uploadZip] = useState<FileUploadType>();
  const [githubUrl, changeGithubUrl] = useState<string | undefined>(undefined);

  const {
    parsedPlugin,
    handleClearParsedPlugin,
    handleCreatePluginMutation,
    handleParsePluginMutation,
  } = pluginHooks({
    pluginId,
  });

  const { data } = usePluginQuery({
    variables: {
      id: pluginId ?? "",
    },
    skip: !pluginId,
  });

  const isActive = data?.node?.__typename === "Plugin" && data.node.active;

  const [updatePluginVersionMutation] = useUpdatePluginVersionMutation();

  const handleVersionUpdate = useCallback(
    async (data: { id: string; version: string; description?: string }) => {
      toggleLoading(true);
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
      await updatePluginVersionMutation({
        variables: {
          pluginId: data.id,
          version: data.version,
          description: data.description,
          active: isActive,
        },
        refetchQueries: ["GetMe"],
        onCompleted: () => {
          Message.success(t("Your plugin's version was successfully updated!"));
          navigate("/myplugins");
        },
        onError: () => Message.error(t("Something went wrong with the update. Please try again.")),
      });
      toggleLoading(false);
    },
    [
      uploadedFile,
      githubUrl,
      isActive,
      t,
      navigate,
      handleCreatePluginMutation,
      updatePluginVersionMutation,
    ],
  );

  return {
    parsedPlugin,
    isLoading,
    githubUrl,
    uploadZip,
    changeGithubUrl,
    handleVersionUpdate,
    handleClearParsedPlugin,
    handleParsePluginMutation,
  };
};
