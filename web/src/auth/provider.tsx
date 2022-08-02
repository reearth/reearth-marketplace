import { Auth0Provider } from "@auth0/auth0-react";

type Props = {
  children?: React.ReactNode;
  domain?: string;
  clientId?: string;
  audience?: string;
};

const Provider: React.FC<Props> = ({ children, domain, clientId, audience }) => {
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
