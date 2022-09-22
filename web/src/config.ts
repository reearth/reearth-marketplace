import { useEffect, useState } from "react";

declare global {
  interface Window {
    REEARTH_CONFIG?: {
      marketplaceUrl?: string;
    };
    REEARTH_MARKETPLACE_CONFIG?: Config;
  }
}

export type Config = {
  marketplaceApi: string;
  authClientId?: string;
  authDomain?: string;
  authAudience?: string;
  reearthApi?: string;
  reearthWeb?: string;
  reportUrl?: string;
};

export const defaultConfig: Config = {
  marketplaceApi: import.meta.env.REEARTH_MARKETPLACE_API || "/api",
  authAudience: import.meta.env.REEARTH_MARKETPLACE_AUTH_AUDIENCE,
  authDomain: import.meta.env.REEARTH_MARKETPLACE_AUTH_DOMAIN,
  authClientId: import.meta.env.REEARTH_MARKETPLACE_AUTH_CLIENT_ID,
  reearthApi: import.meta.env.REEARTH_MARKETPLACE_REEARTH_API,
  reearthWeb: import.meta.env.REEARTH_MARKETPLACE_REEARTH_WEB,
  reportUrl: import.meta.env.REEARTH_MARKETPLACE_REPORT_URL,
};

export async function loadConfig() {
  if (window.REEARTH_MARKETPLACE_CONFIG) return;
  window.REEARTH_MARKETPLACE_CONFIG = defaultConfig;

  let config: any = {};
  try {
    const res = await fetch(
      `${window.REEARTH_CONFIG?.marketplaceUrl?.replace(/\/$/, "") ?? ""}/reearth_config.json`,
    );
    if (res.status === 200) config = await res.json();
  } catch (err) {
    console.error("config load error", err);
  }

  window.REEARTH_MARKETPLACE_CONFIG = {
    ...defaultConfig,
    ...config,
  };
}

export function getConfig(): Config | undefined {
  return window.REEARTH_MARKETPLACE_CONFIG;
}

let resolvers: ((value: Config | PromiseLike<Config | undefined> | undefined) => void)[] = [];
let rejecters: ((reason: any) => void)[] = [];

// syncronize loading a config
export async function getOrLoadConfig(): Promise<Config | undefined> {
  let config = getConfig();
  if (config) return config;

  const first = resolvers.length === 0;
  const promise = new Promise<Config | undefined>((resolve, reject) => {
    resolvers.push(resolve);
    rejecters.push(reject);
  });
  if (!first) return promise;

  try {
    await loadConfig();
    config = getConfig();
    for (const r of resolvers) {
      r(config);
    }
  } catch (err) {
    for (const r of rejecters) {
      r(err);
    }
  } finally {
    resolvers = [];
    rejecters = [];
  }

  return config;
}

export function useConfig() {
  const [config, setConfig] = useState<Config>();
  useEffect(() => {
    (async () => {
      setConfig(await getOrLoadConfig());
    })();
  }, []);
  return config;
}
