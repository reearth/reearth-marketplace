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
