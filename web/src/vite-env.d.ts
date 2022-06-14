/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REEARTH_MARKETPLACE_API: string;
  readonly REEARTH_MARKETPLACE_AUTH_DOMAIN: string;
  readonly REEARTH_MARKETPLACE_AUTH_AUDIENCE: string;
  readonly REEARTH_MARKETPLACE_AUTH_CLIENT_ID: string;
}

declare global {
  interface Window {
    REEARTH_E2E_ACCESS_TOKEN?: string;
  }
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
