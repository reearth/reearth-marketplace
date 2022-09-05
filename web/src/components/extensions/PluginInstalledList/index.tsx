import List from "./Accordion";

export default function PluginInstalledList() {
  const mockPlugins = [
    {
      title: "CoolestPlugin",
      isInstalled: true,
      bodyMarkdown: "## Coolest Plugin",
      author: "kyle",
      pluginId: "somePlugin~1.1.1",
    },
    {
      title: "CoolestPlugin2",
      isInstalled: true,
      bodyMarkdown: "## Coolest Plugin2",
      author: "kylew",
      pluginId: "somePlugin~2.1.3",
    },
  ];
  return (
    <div>
      Hi Im all the installed marketplace plugins
      <List plugins={mockPlugins} />
    </div>
  );
}
