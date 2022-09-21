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

export type ParsedPlugin = {
  id: string;
  name: string;
  description: string;
  readme: string;
  version: string;
};

export default ({ pluginId }: { pluginId?: string }) => {
  const t = useT();
  const navigate = useNavigate();

  const [parsePluginMutation, { data: parsedData, reset, loading: loading1 }] =
    useParsePluginMutation();
  const [createPluginMutation, { loading: loading2 }] = useCreatePluginMutation();
  const [updatePluginMutation, { loading: loading3 }] = useUpdatePluginMutation();
  const isLoading = loading1 || loading2 || loading3;

  const updatePlugin = useCallback(
    async (data: { id: string; images?: File[]; active?: boolean }) => {
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
              Message.success(t("Your plugin was successfully published!"));
            } else {
              Message.success(t("Your plugin was successfully unpublished!"));
            }
          } else {
            Message.success(t("Your plugin was successfully updated!"));
          }
          navigate("/myplugins");
        },
        onError: () => Message.error(t("Something went wrong with the update. Please try again.")),
      });
    },
    [t, navigate, updatePluginMutation],
  );

  const parsePlugin = useCallback(
    async ({ file, repo }: { file?: FileUploadType; repo?: string }) => {
      if (!file && !repo) return;
      await parsePluginMutation({
        variables: {
          file,
          repo,
        },
        onError: () => {
          Message.error(t("Something might be wrong with your URL. Please check and try again."));
        },
      });
    },
    [parsePluginMutation, t],
  );

  const parsedPlugin = useMemo(() => {
    if (
      parsedData?.parsePlugin.plugin.__typename !== "Plugin" ||
      (pluginId && parsedData.parsePlugin.plugin.id !== pluginId)
    )
      return;

    return {
      id: parsedData.parsePlugin.plugin.id,
      name: parsedData.parsePlugin.plugin.name,
      author: parsedData.parsePlugin.plugin.author,
      description: parsedData.parsePlugin.plugin.description ?? "",
      readme: parsedData.parsePlugin.plugin.readme,
      version: parsedData.parsePlugin.plugin.latestVersion?.version ?? "",
    };
  }, [parsedData, pluginId]);

  const [githubUrl, changeGithubUrl] = useState<string>();
  const [uploadedFile, uploadZip] = useState<FileUploadType>();
  const [uploadedImages, uploadImages] = useState<File[]>([]);

  const createPlugin = useCallback(
    async (publish?: boolean) => {
      if (!parsedPlugin) return;

      const { errors } = await createPluginMutation({
        variables: {
          file: uploadedFile,
          repo: githubUrl,
        },
        refetchQueries: ["GetMe"],
      });

      if (!errors && uploadImages.length) {
        await updatePlugin({
          id: parsedPlugin.id,
          images: uploadedImages,
          active: publish,
        });
      }
    },
    [parsedPlugin, uploadedFile, githubUrl, uploadedImages, createPluginMutation, updatePlugin],
  );

  const handleClickPublish = useCallback(async () => {
    if (parsedPlugin && !pluginId) {
      await createPlugin(true);
    }
  }, [pluginId, parsedPlugin, createPlugin]);

  // When Github URL is inputed
  const handleChangeGithubUrl = useCallback(
    async (url: string) => {
      changeGithubUrl(url);
      await parsePlugin({
        file: undefined,
        repo: url,
      });
    },
    [parsePlugin],
  );

  // When zip file is uploaded
  const handleParsePluginFromFile = useCallback(
    async (file?: FileUploadType) => {
      uploadZip(file);
      await parsePlugin({
        file: file,
        repo: undefined,
      });
    },
    [parsePlugin],
  );

  const handlePluginSave = useCallback(async () => {
    if (!pluginId) {
      await createPlugin();
    } else if (parsedPlugin) {
      await updatePlugin({
        id: parsedPlugin.id,
        images: uploadedImages,
      });
    }
  }, [pluginId, parsedPlugin, createPlugin, updatePlugin, uploadedImages]);

  return {
    parsedPlugin,
    isLoading,
    githubUrl,
    handleClearParsedPlugin: reset,
    handleUploadImages: uploadImages,
    handleClickPublish,
    handleChangeGithubUrl,
    handleParsePlugin: handleParsePluginFromFile,
    handlePluginSave,
  };
};
