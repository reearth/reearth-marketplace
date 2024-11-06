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

  const parsePlugin = useCallback(
    async ({ file, repo, core }: { file?: FileUploadType; repo?: string; core: boolean }) => {
      if (!file && !repo) return;
      await parsePluginMutation({
        variables: {
          file,
          repo,
          core,
        },
        onError: () => {
          Message.error(
            t("Something might be wrong with your plugin. Please check and try again."),
          );
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

  const savePlugin = useCallback(
    async ({ publish, core }: { publish?: boolean; core: boolean }) => {
      const pid = parsedPlugin?.id || pluginId;
      let error = false;

      if (parsedPlugin) {
        const { errors } = await createPluginMutation({
          variables: {
            file: uploadedFile,
            repo: githubUrl,
            core,
          },
          refetchQueries: ["GetMe"],
          onError: () =>
            Message.error(
              t("Something might be wrong with your plugin. Please check and try again."),
            ),
        });
        error = !!errors;
      }

      const active = typeof publish === "boolean" ? publish : undefined;
      if (!error && pid && (typeof active === "boolean" || uploadImages.length)) {
        await updatePluginMutation({
          variables: {
            pluginId: pid,
            active,
            images: uploadedImages,
          },
          refetchQueries: ["GetMe"],
          onCompleted: () => {
            if (active !== undefined) {
              if (active) {
                Message.success(t("Your plugin was successfully published!"));
              } else {
                Message.success(t("Your plugin was successfully unpublished!"));
              }
            } else {
              Message.success(t("Your plugin was successfully updated!"));
            }
            navigate("/myplugins");
          },
          onError: () =>
            Message.error(t("Something went wrong with the update. Please try again.")),
        });
      }
    },
    [
      parsedPlugin,
      pluginId,
      createPluginMutation,
      uploadedFile,
      githubUrl,
      t,
      updatePluginMutation,
      uploadedImages,
      navigate,
    ],
  );

  const handlePublish = useCallback(
    (core: boolean) => {
      savePlugin({ publish: true, core });
    },
    [savePlugin],
  );

  // When Github URL is inputed
  const handleParseFromUrl = useCallback(
    async ({ url, core }: { url: string; core: boolean }) => {
      uploadZip(undefined);
      changeGithubUrl(url);
      await parsePlugin({
        core,
        repo: url,
      });
    },
    [parsePlugin],
  );

  // When zip file is uploaded
  const handleParseFromFile = useCallback(
    async ({ file, core }: { core: boolean; file?: FileUploadType }) => {
      uploadZip(file);
      changeGithubUrl(undefined);
      await parsePlugin({
        core,
        file: file,
      });
    },
    [parsePlugin],
  );

  return {
    parsedPlugin,
    isLoading,
    githubUrl,
    handleRemove: reset,
    handleUploadImages: uploadImages,
    handleParseFromUrl,
    handleParseFromFile,
    handlePublish,
    handlePluginSave: savePlugin,
  };
};
