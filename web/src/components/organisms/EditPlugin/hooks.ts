import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import Message from "@marketplace/components/atoms/Message";
// import type { FileUploadType } from "@marketplace/components/molecules/Common/PluginUpload/PackageArea";
import { usePluginQuery, useUpdatePluginMutation } from "@marketplace/gql";
import { useT } from "@marketplace/i18n";

export type Plugin = {
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

  const { data } = usePluginQuery({
    variables: {
      id: pluginId ?? "",
    },
    skip: !pluginId,
  });
  const currentPlugin = data?.node?.__typename === "Plugin" ? data.node : undefined;

  const [updatePluginMutation] = useUpdatePluginMutation();

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

  return {
    currentPlugin,
    isLoading,
    handleUpdatePluginMutation,
  };
};
