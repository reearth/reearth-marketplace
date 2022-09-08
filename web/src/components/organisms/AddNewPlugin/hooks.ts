import type { FileUploadType } from "@marketplace/components/molecules/AddNewPluginPage/PackageArea";
import {
  useCreatePluginMutation,
  useParsePluginMutation,
  useUpdatePluginMutation,
} from "@marketplace/gql/graphql-client-api";
import { useCallback, useMemo } from "react";

export default () => {
  const [parsePluginMutation, { data: parsedData }] = useParsePluginMutation();
  console.log(parsedData);
  const [createPluginMutation] = useCreatePluginMutation();
  const [updatePluginMutation] = useUpdatePluginMutation();
  const handleCreatePluginMutation = useCallback(
    async (data: { file?: FileUploadType; repo?: string }) => {
      await createPluginMutation({
        variables: {
          file: data.file,
          repo: data.repo,
        },
      });
    },
    [createPluginMutation]
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
    [parsePluginMutation]
  );

  const handleUpdatePluginMutation = useCallback(
    async (data: { id: string; images?: string[] }) => {
      console.log(data.images);
      await updatePluginMutation({
        variables: {
          pluginId: data.id,
          active: true,
          images: data.images,
        },
      });
    },
    [updatePluginMutation]
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
          }
        : undefined,
    [parsedData?.parsePlugin.plugin]
  );
  return {
    parsedPlugin,
    handleParsePluginMutation,
    handleCreatePluginMutation,
    handleUpdatePluginMutation,
  };
};
