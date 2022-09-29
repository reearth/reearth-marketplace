import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

import { getConfig } from "@marketplace/config";

const Provider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const config = getConfig();
  const domain = config?.authDomain;
  const clientId = config?.authClientId;
  const audience = config?.authAudience;
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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

export default Provider;
