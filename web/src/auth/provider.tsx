import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

const Provider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const domain = window.REEARTH_MARKETPLACE_CONFIG?.authDomain;
  const clientId = window.REEARTH_MARKETPLACE_CONFIG?.authClientId;
  const audience = window.REEARTH_MARKETPLACE_CONFIG?.authAudience;
  return domain && clientId ? (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      useRefreshTokens
      scope="openid profile email"
      cacheLocation="localstorage"
      redirectUri={window.location.origin}>
      {children}
    </Auth0Provider>
  ) : (
    <>{children}</>
  );
};

export default Provider;
