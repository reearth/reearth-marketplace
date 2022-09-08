declare global {
  interface Window {
    REEARTH_CONFIG?: {
      marketplaceUrl?: string;
    };
    REEARTH_MARKETPLACE_CONFIG?: Config;
  }
}

export const defaultConfig: Config = {
  marketplaceApi: import.meta.env.REEARTH_MARKETPLACE_API || "/api",
  authAudience: import.meta.env.REEARTH_MARKETPLACE_AUTH_AUDIENCE,
  authDomain: import.meta.env.REEARTH_MARKETPLACE_AUTH_DOMAIN,
  authClientId: import.meta.env.REEARTH_MARKETPLACE_AUTH_CLIENT_ID,
};

export async function loadConfig() {
  if (window.REEARTH_MARKETPLACE_CONFIG) return;
  window.REEARTH_MARKETPLACE_CONFIG = defaultConfig;
  window.REEARTH_MARKETPLACE_CONFIG = {
    ...defaultConfig,
    ...(await (
      await fetch(`${window.REEARTH_CONFIG?.marketplaceUrl ?? ""}/reearth_config.json`)
    ).json()),
  };
}
