import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Message from "@marketplace/components/atoms/Message";
import type { FileUploadType } from "@marketplace/components/molecules/Common/PluginUpload/PackageArea";
import {
  useCreatePluginMutation,
  useParsePluginMutation,
  useUpdatePluginMutation,
} from "@marketplace/gql";
import { useT } from "@marketplace/i18n";

export default () => {
  const t = useT();
  const navigate = useNavigate();

  const [isLoading, toggleLoading] = useState<boolean>(false);

  const [parsePluginMutation, { data: parsedData }] = useParsePluginMutation();
  const [createPluginMutation] = useCreatePluginMutation();
  const [updatePluginMutation] = useUpdatePluginMutation();

  const handleCreatePluginMutation = useCallback(
    async (data: { file?: FileUploadType; repo?: string }) => {
      toggleLoading(true);
      await createPluginMutation({
        variables: {
          file: data.file,
          repo: data.repo,
        },
        refetchQueries: ["GetMe"],
      });
      toggleLoading(false);
    },
    [createPluginMutation],
  );

  const handleUpdatePluginMutation = useCallback(
    async (data: { id: string; images?: string[]; active?: boolean }) => {
      toggleLoading(true);
      await updatePluginMutation({
        variables: {
          pluginId: data.id,
          active: data.active,
          images: data.images,
        },
        refetchQueries: ["GetMe"],
        onCompleted: () => {
          if (data.active !== undefined) {
            if (data.active) {
              Message.success(t("Your file was successfully published!"));
            } else {
              Message.success(t("Your file was successfully unpublished!"));
            }
          } else {
            Message.success(t("Your file was successfully updated!"));
          }
          navigate("/myplugins");
        },
        onError: () => Message.error(t("Something went wrong with the update.")),
      });
      toggleLoading(false);
    },
    [t, navigate, updatePluginMutation],
  );

  const handleParsePluginMutation = useCallback(
    async (data: { file?: FileUploadType; repo?: string }) => {
      await parsePluginMutation({
        variables: {
          file: data.file && data.file,
          repo: data.repo && data.repo,
        },
      });
    },
    [parsePluginMutation],
  );

  const parsedPlugin = useMemo(
    () =>
      parsedData?.parsePlugin.plugin.__typename === "Plugin"
        ? {
            id: parsedData.parsePlugin.plugin.id,
            name: parsedData.parsePlugin.plugin.name,
            author: parsedData.parsePlugin.plugin.author,
            description: parsedData.parsePlugin.plugin.description
              ? parsedData.parsePlugin.plugin.description
              : "",
            readme: parsedData.parsePlugin.plugin.readme,
            version: parsedData.parsePlugin.plugin.latestVersion?.version
              ? parsedData.parsePlugin.plugin.latestVersion?.version
              : "",
          }
        : undefined,
    [parsedData?.parsePlugin.plugin],
  );

  return {
    parsedPlugin,
    isLoading,
    handleParsePluginMutation,
    handleCreatePluginMutation,
    handleUpdatePluginMutation,
  };
};
