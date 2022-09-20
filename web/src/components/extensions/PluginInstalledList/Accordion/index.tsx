import { useMemo } from "react";

import { usePluginsQuery } from "@marketplace/gql";

import Accordion from "./accordion";
import PluginAccordionItemBody from "./body";
import PluginAccordionItemHeader from "./header";

export type PluginItem = {
  pluginId: string;
  newPluginId?: string;
  title: string;
  author: string;
  installed: boolean;
  bodyMarkdown?: string;
  thumbnailUrl?: string;
  updatable?: boolean;
};

export type PluginAccordionProps = {
  className?: string;
  plugins?: {
    id: string;
    version: string;
    title?: string;
    author?: string;
    icon?: string;
    readme?: string;
  }[];
  onInstall?: (pluginId: string | undefined, oldPluginId: string) => void;
  onUninstall?: (pluginId: string) => void;
};

const PluginAccordion: React.FC<PluginAccordionProps> = ({
  className,
  plugins,
  onInstall,
  onUninstall,
}) => {
  const { data } = usePluginsQuery({
    variables: {
      ids: plugins?.map(p => p.id) ?? [],
    },
    skip: !plugins?.length,
  });

  const installedPlugins: PluginItem[] | undefined = useMemo(
    () =>
      plugins
        ?.map((p): PluginItem | undefined => {
          const pluginNode = data?.nodes.find(n => n?.__typename === "Plugin" && n.id === p.id);
          const plugin = pluginNode?.__typename === "Plugin" ? pluginNode : undefined;
          const updatable =
            !!plugin?.latestVersion?.version && plugin.latestVersion.version !== p.version;

          return {
            pluginId: `${p.id}~${p.version}`,
            newPluginId: updatable
              ? `${plugin.id}~${plugin?.latestVersion?.version ?? ""}`
              : undefined,
            title: plugin?.name || p.title || p.id,
            author: plugin?.author || p.author || "",
            installed: true,
            bodyMarkdown: plugin?.readme || p.readme,
            thumbnailUrl: plugin?.icon || p.icon || "",
            updatable,
          };
        })
        .filter((p): p is PluginItem => !!p),
    [data?.nodes, plugins],
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
              installed={p.installed}
              updatable={p.updatable}
              onInstall={() => onInstall?.(p.newPluginId, p.pluginId)}
              onUninstall={() => onUninstall?.(p.pluginId)}
            />
          ),
          content: <PluginAccordionItemBody>{p.bodyMarkdown}</PluginAccordionItemBody>,
        };
      })}
    />
  ) : null;
};

export default PluginAccordion;
