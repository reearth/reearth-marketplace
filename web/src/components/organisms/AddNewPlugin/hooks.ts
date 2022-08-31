import { useCallback } from "react";

import type { FileUploadType } from "@/components/molecules/AddNewPluginPage/PackageArea";
import { useCreatePluginMutation, useParsePluginMutation } from "@/gql/graphql-client-api";

export default () => {
  const [createPluginMutation] = useCreatePluginMutation();
  const [parsePluginMutation] = useParsePluginMutation();

  const handleCreatePluginMutation = useCallback(
    (data: { file?: File; repo?: string; publisher: string }) => {
      createPluginMutation({
        variables: {
          file: data.file,
          repo: data.repo,
          publisher: data.publisher,
        },
      });
    },
    [createPluginMutation],
  );

  const handleParsePluginMutation = useCallback(
    (data: { file?: FileUploadType; repo?: string }) => {
      parsePluginMutation({
        variables: {
          file: data.file && data.file,
          repo: data.repo && data.repo,
        },
      });
    },
    [parsePluginMutation],
  );
  return {
    handleParsePluginMutation,
    handleCreatePluginMutation,
  };
};
