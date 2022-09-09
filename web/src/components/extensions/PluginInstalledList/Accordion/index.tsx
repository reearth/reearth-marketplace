import { usePluginsQuery } from "@marketplace/gql";
import { useMemo } from "react";

import Accordion from "./accordion";
import PluginAccordionItemBody from "./body";
import PluginAccordionItemHeader from "./header";

export type PluginItem = {
  pluginId: string;
  title: string;
  author: string;
  isInstalled: boolean;
  bodyMarkdown?: string;
  thumbnailUrl?: string;
  updatable?: boolean;
};

export type PluginAccordionProps = {
  className?: string;
  plugins?: {
    id: string;
    version: string;
  }[];
  onInstall?: (pluginId: string) => void;
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
      ids: plugins?.map((p) => p.id) ?? [],
    },
    skip: !plugins?.length,
  });

  const installedPlugins: PluginItem[] | undefined = useMemo(
    () =>
      data?.nodes
        .map((p): PluginItem | undefined =>
          p && p.__typename === "Plugin"
            ? {
                pluginId: `${p.id}~${
                  p.latestVersion ? p.latestVersion.version : "x.x.x"
                }`,
                title: p.name,
                author: p.author ?? "",
                isInstalled: true,
                bodyMarkdown: p.readme,
                thumbnailUrl: p.icon ?? "",
                updatable:
                  p.latestVersion !==
                  plugins?.find((q) => q.id === p.id)?.version,
              }
            : undefined
        )
        .filter((p): p is PluginItem => !!p),
    [data?.nodes, plugins]
  );

  return installedPlugins ? (
    <Accordion
      className={className}
      allowMultipleExpanded
      items={installedPlugins?.map((p) => {
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
              updatable={p.updatable}
              onInstall={() => onInstall?.(p.pluginId)}
              onUninstall={() => onUninstall?.(p.pluginId)}
            />
          ),
          content: (
            <PluginAccordionItemBody>{p.bodyMarkdown}</PluginAccordionItemBody>
          ),
        };
      })}
    />
  ) : null;
};

export default PluginAccordion;
