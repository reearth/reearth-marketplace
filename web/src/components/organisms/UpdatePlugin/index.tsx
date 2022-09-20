import { useCallback } from "react";

import Message from "@marketplace/components/atoms/Message";
import UpdatePluginMolecule from "@marketplace/components/molecules/UpdatePlugin";
import { useT } from "@marketplace/i18n";

import useHooks, { FileUpload as FileUploadType } from "./hooks";

export type Plugin = {
  id: string;
  name: string;
  active: boolean;
  updateAt: Date;
  version: string;
};

export type Props = { pluginId?: string };

const MyPlugins: React.FC<Props> = ({ pluginId }) => {
  const t = useT();

  const {
    parsedPlugin,
    isLoading,
    githubUrl,
    uploadZip,
    changeGithubUrl,
    handleVersionUpdate,
    handleClearParsedPlugin,
    handleParsePluginMutation,
  } = useHooks({ pluginId });

  // When Github Url Input
  const handleChangeGithubUrl = useCallback(
    async (url: string) => {
      changeGithubUrl(url);
      await handleParsePluginMutation({
        file: undefined,
        repo: url,
      }).catch(
        Message.error(t("Something might be wrong with your URL. Please check and try again.")),
      );
    },
    [t, changeGithubUrl, handleParsePluginMutation],
  );

  // When Zip File Uploaded
  const handleParsePlugin = useCallback(
    async (file?: FileUploadType) => {
      uploadZip(file);
      await handleParsePluginMutation({
        file: file,
        repo: undefined,
      });
    },
    [uploadZip, handleParsePluginMutation],
  );

  const handlePluginUpdate = useCallback(async () => {
    if (!pluginId || !parsedPlugin) return;
    await handleVersionUpdate({ id: pluginId, version: parsedPlugin.version });
  }, [pluginId, parsedPlugin, handleVersionUpdate]);

  return (
    <UpdatePluginMolecule
      pluginName={parsedPlugin ? parsedPlugin.name : ""}
      version={parsedPlugin ? parsedPlugin.version : ""}
      // changelog={parsedPlugin ? parsedPlugin.description : ""}
      githubUrl={githubUrl}
      isLoading={isLoading}
      handleChangeGithubUrl={handleChangeGithubUrl}
      onParsePlugin={handleParsePlugin}
      onRemove={handleClearParsedPlugin}
      onPluginSave={handlePluginUpdate}
    />
  );
};

export default MyPlugins;
