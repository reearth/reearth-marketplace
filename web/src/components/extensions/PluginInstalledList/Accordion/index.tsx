import { useT } from "@marketplace/i18n";
import { useCallback } from "react";

import Accordion from "./accordion";
import PluginAccordionItemBody from "./body";
import PluginAccordionItemHeader from "./header";

const markdown = `
# Coolest plugin

## Subheader here for coolest plugin

Some text is here. Some text is here. Some text is here. Some text is here. 

Some text is here. Some text is here. Some text is here. Some text is here. 
`;
const markdown2 = `
# Coolest plugin

## Subheader here for coolest plugin

Some text is here. Some text is here. Some text is here. Some text is here. 

Some text is here. Some text is here. Some text is here. Some text is here. 

## Subheader here for coolest plugin

Some text is here. Some text is here. Some text is here. Some text is here. 

Some text is here. Some text is here. Some text is here. Some text is here. 
`;

const mockPlugins = [
  {
    title: "CoolestPlugin",
    isInstalled: true,
    bodyMarkdown: markdown,
    author: "kyle",
    pluginId: "somePlugin~1.1.1",
  },
  {
    title: "CoolestPlugin2 asfasfd asdfsdfasdf",
    isInstalled: true,
    bodyMarkdown: markdown2,
    author: "kylew",
    pluginId: "somePlugin~2.1.3",
  },
];

export type PluginItem = {
  thumbnailUrl?: string;
  title: string;
  isInstalled: boolean;
  bodyMarkdown?: string;
  author: string;
  pluginId: string;
};

export type PluginAccordionProps = {
  className?: string;
  plugins?: {
    id: string;
    version: string;
  }[];
  onInstall?: (pluginId: string) => void;
  onUninstall?: (pluginId: string) => void;
  onNotificationChange?: (
    type: "error" | "warning" | "info" | "success",
    text: string,
    heading?: string,
  ) => void;
};

const PluginAccordion: React.FC<PluginAccordionProps> = ({
  className,
  plugins,
  onInstall,
  onUninstall,
  onNotificationChange,
}) => {
  const t = useT();
  console.log(plugins, "plugins");
  // Need to fetch plugins and cross reference the ids and version
  // Need to fetch plugins and cross reference the ids and version
  // Need to fetch plugins and cross reference the ids and version
  // Need to fetch plugins and cross reference the ids and version
  // Check here if isInstalled perhaps
  const installedPlugins: PluginItem[] = mockPlugins;

  const handleUpdate = useCallback(
    (id: string) => {
      onInstall?.(id);
      onNotificationChange?.("success", t("You successfully updated your plugin"), t("Success"));
    },
    [t, onInstall, onNotificationChange],
  );

  const handleUninstall = useCallback(
    (id: string) => {
      onUninstall?.(id);
      onNotificationChange?.(
        "success",
        t("You successfully uninstalled your plugin"),
        t("Success"),
      );
    },
    [t, onUninstall, onNotificationChange],
  );

  return installedPlugins ? (
    <Accordion
      className={className}
      allowMultipleExpanded
      items={installedPlugins?.map(p => {
        const version = p.pluginId.split("~")[1] ?? "x.x.x";
        return {
          id: p.title,
          heading: (
            <PluginAccordionItemHeader
              thumbnail={p.thumbnailUrl}
              title={p.title}
              version={version}
              author={p.author}
              isInstalled={p.isInstalled}
              onInstall={() => handleUpdate(p.pluginId)}
              onUninstall={() => handleUninstall(p.pluginId)}
            />
          ),
          content: <PluginAccordionItemBody>{p.bodyMarkdown}</PluginAccordionItemBody>,
        };
      })}
    />
  ) : null;
};

export default PluginAccordion;
