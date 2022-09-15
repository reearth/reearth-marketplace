import Message from "@marketplace/components/atoms/Message";
import type { FileUploadType } from "@marketplace/components/molecules/AddNewPluginPage/PackageArea";
import {
  useCreatePluginMutation,
  useParsePluginMutation,
  useUpdatePluginMutation,
} from "@marketplace/gql";
import { useT } from "@marketplace/i18n";
import { useCallback, useMemo } from "react";

export default () => {
  const t = useT();
  const [parsePluginMutation, { data: parsedData }] = useParsePluginMutation();
  const [createPluginMutation] = useCreatePluginMutation();
  const [updatePluginMutation] = useUpdatePluginMutation();
  const handleCreatePluginMutation = useCallback(
    async (data: { file?: FileUploadType; repo?: string }) => {
      await createPluginMutation({
        variables: {
          file: data.file,
          repo: data.repo,
        },
        onCompleted: () => Message.success(t("Your file was successfully saved!")),
        onError: () => Message.error(t("Something went wrong during the save.")),
      });
    },
    [createPluginMutation],
  );

  const handleParsePluginMutation = useCallback(
    async (data: { file?: FileUploadType; repo?: string }) => {
      await parsePluginMutation({
        variables: {
          file: data.file && data.file,
          repo: data.repo && data.repo,
        },
        onCompleted: () => Message.success(t("Your file was successfully loaded!")),
        onError: () => Message.error(t("Something is wrong with the file you tried to upload.")),
      });
    },
    [parsePluginMutation],
  );

  const handleUpdatePluginMutation = useCallback(
    async (data: { id: string; images?: string[]; active?: boolean }) => {
      await updatePluginMutation({
        variables: {
          pluginId: data.id,
          active: data.active,
          images: data.images,
        },
        onCompleted: () => Message.success(t("Your file was successfully updated!")),
        onError: () => Message.error(t("Something went wrong with the update.")),
      });
    },
    [updatePluginMutation],
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
    handleParsePluginMutation,
    handleCreatePluginMutation,
    handleUpdatePluginMutation,
  };
};
