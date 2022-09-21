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

  const [isLoading, toggleLoading] = useState<boolean>(false);
  // const [parsedPlugin, setParsedPlugin] = useState<ParsedPlugin | undefined>();

  const [parsePluginMutation, { data: parsedData, reset }] = useParsePluginMutation();
  const [createPluginMutation] = useCreatePluginMutation();
  const [updatePluginMutation] = useUpdatePluginMutation();

  const handleCreatePluginMutation = useCallback(
    async ({ file, repo }: { file?: FileUploadType; repo?: string }) => {
      toggleLoading(true);
      await createPluginMutation({
        variables: {
          file,
          repo,
        },
        refetchQueries: ["GetMe"],
      });
      toggleLoading(false);
    },
    [createPluginMutation],
  );

  const handleUpdatePluginMutation = useCallback(
    async (data: { id: string; images?: File[]; active?: boolean }) => {
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
      toggleLoading(false);
    },
    [t, navigate, updatePluginMutation],
  );

  const parsePlugin = useCallback(
    async ({ file, repo }: { file?: FileUploadType; repo?: string }) => {
      if (!file && !repo) return;
      const { errors } = await parsePluginMutation({
        variables: {
          file,
          repo,
        },
      });
      if (errors) {
        Message.error(
          t("The plugin you uploaded is different from the one you are trying to update."),
        );
      }
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

  const handlePluginCreation = useCallback(
    async (publish?: boolean) => {
      if (!parsedPlugin) return;

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

      if (uploadImages.length) {
        await handleUpdatePluginMutation({
          id: parsedPlugin.id,
          images: uploadedImages,
          active: publish,
        });
      }
    },
    [
      githubUrl,
      parsedPlugin,
      uploadedFile,
      uploadedImages,
      handleCreatePluginMutation,
      handleUpdatePluginMutation,
    ],
  );

  const handlePluginUpdate = useCallback(async () => {
    if (parsedPlugin) {
      await handleUpdatePluginMutation({
        id: parsedPlugin.id,
        images: uploadedImages,
      });
    }
  }, [parsedPlugin, uploadedImages, handleUpdatePluginMutation]);

  const handleClickPublish = useCallback(async () => {
    if (parsedPlugin) {
      if (!pluginId) {
        await handlePluginCreation(true);
      }
    }
  }, [pluginId, parsedPlugin, handlePluginCreation]);

  // When Github Url Input
  const handleChangeGithubUrl = useCallback(
    async (url: string) => {
      changeGithubUrl(url);
      await parsePlugin({
        file: undefined,
        repo: url,
      }).catch(
        Message.error(t("Something might be wrong with your URL. Please check and try again.")),
      );
    },
    [t, parsePlugin],
  );

  // When Zip File Uploaded
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
      await handlePluginCreation();
    } else {
      await handlePluginUpdate();
    }
  }, [pluginId, handlePluginCreation, handlePluginUpdate]);

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
