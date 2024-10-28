/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REEARTH_MARKETPLACE_API: string;
  readonly REEARTH_MARKETPLACE_AUTH_DOMAIN: string;
  readonly REEARTH_MARKETPLACE_AUTH_AUDIENCE: string;
  readonly REEARTH_MARKETPLACE_AUTH_CLIENT_ID: string;
  readonly REEARTH_MARKETPLACE_REEARTH_API: string;
  readonly REEARTH_MARKETPLACE_REEARTH_CLASSIC_WEB: string;
  readonly REEARTH_MARKETPLACE_REEARTH_VISUALIZER_WEB: string;
  readonly REEARTH_MARKETPLACE_REPORT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.yml" {
  const yml: any;
  export default yml;
}

declare module "*.yaml" {
  const yml: any;
  export default yml;
}
