import useHooks from "./hooks";

export type Props = {
  accessToken?: string;
  selectedPluginId?: string;
  installedPlugins?: {
    id: string;
    version: string;
  }[];
  theme?: string; // "dark" | "right"
  lang?: string; // "und" | "en" | "ja"
  onInstall?: (pluginId: string) => void; // xxxxxxx~1.0.0
  onUninstall?: (pluginId: string) => void; // xxxxxxx~1.0.0
  onNotificationChange?: (
    type: "error" | "warning" | "info" | "success",
    text: string,
    heading?: string,
  ) => void;
};

export default function Extension({
  selectedPluginId,
  // installedPlugins,
  // theme,
  // lang,
  onInstall,
}: // onUninstall,
// onNotificationChange,
Props) {
  const { plugin, handleInstall } = useHooks(selectedPluginId, onInstall);

  return (
    <div>
      <p>ID: {plugin?.id}</p>
      <p>
        <button onClick={handleInstall}>Install</button>
      </p>
    </div>
  );
}
