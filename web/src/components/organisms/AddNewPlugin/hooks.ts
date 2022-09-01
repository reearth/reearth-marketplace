import type { FileUploadType } from "@marketplace/components/molecules/AddNewPluginPage/PackageArea";
import {
  useCreatePluginMutation,
  useParsePluginMutation,
} from "@marketplace/gql/graphql-client-api";
import { useCallback } from "react";

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
