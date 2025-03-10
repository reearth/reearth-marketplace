import { useCallback } from "react";

import { useAuth } from "@marketplace/auth";
import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import ModalContent from "@marketplace/components/molecules/PluginDetailPage/ModalContent";

import useHooks from "./hooks";

export type Props = {
  pluginId?: string;
  accessToken?: string;
  installedPlugins?: {
    id: string;
    version: string;
  }[];
  onPluginInstall?: (pluginId: string) => void;
  onBack?: () => void;
};

const PluginDetail: React.FC<Props> = ({
  pluginId,
  accessToken,
  installedPlugins,
  onPluginInstall: onExtPluginInstall,
  onBack,
}) => {
  const { isAuthenticated } = useAuth(accessToken);

  const {
    plugin,
    workspaces,
    modalVisible,
    onLike,
    onUnlike,
    onToggleModal,
    handleOpenPluginInReearth,
  } = useHooks(pluginId ? pluginId : "", installedPlugins);

  const handleClickLike = useCallback(
    (isLiked: boolean) => {
      if (!pluginId) return;
      isLiked ? onUnlike(pluginId) : onLike(pluginId);
    },
    [onLike, onUnlike, pluginId],
  );

  return (
    <>
      <PluginDetailPage
        isLoggedIn={isAuthenticated}
        plugin={plugin}
        handleClickLike={handleClickLike}
        onExtPluginInstall={onExtPluginInstall}
        onToggleModal={onToggleModal}
        onBack={onBack}
      />
      <ModalContent
        plugin={plugin}
        onCancel={() => onToggleModal?.(false)}
        onOpenPluginInReearth={handleOpenPluginInReearth}
        visible={modalVisible ?? false}
        workspaces={workspaces}
      />
    </>
  );
};

export default PluginDetail;
