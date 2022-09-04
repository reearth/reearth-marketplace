declare global {
  interface Window {
    REEARTH_CONFIG?: Config;
  }
}

export const defaultConfig: Config = {
  // api: import.meta.env.REEARTH_API || "/api",
  api: "https://api.marketplace.test.reearth.dev/api",
  authAudience: import.meta.env.REEARTH_AUTH_AUDIENCE,
  authDomain: import.meta.env.REEARTH_AUTH_DOMAIN,
  authClientId: import.meta.env.REEARTH_AUTH_CLIENT_ID,
};

export async function loadConfig() {
  if (window.REEARTH_CONFIG) return;
  window.REEARTH_CONFIG = defaultConfig;
  window.REEARTH_CONFIG = {
    ...defaultConfig,
    ...(await (await fetch("/reearth_config.json")).json()),
  };
}
