export type Plugin = {
  id: string;
  name: string;
  cover: string;
  publisher: string;
  like: number;
  images: string[];
  description: string;
  readme: string;
  liked: boolean;
  version: string | undefined;
  downloads: number;
  hasUpdate: boolean;
  updatedAt: Date;
  installed: boolean | undefined;
  isCorePlugin: boolean;
};

export enum TabsType {
  Version = "VERSION",
  Package = "PACKAGE",
  Settings = "SETTINGS",
}

export type Version = "classic" | "visualizer";
