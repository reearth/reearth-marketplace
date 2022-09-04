import { PropsWithChildren } from "react";

import { useAuthenticationRequired } from "./hooks";

export { default as Provider } from "./provider";
export { useAuth, useCleanUrl, useAuthenticationRequired } from "./hooks";

export { withAuthenticationRequired } from "@auth0/auth0-react";

export function AuthenticationRequiredPage({
  accessToken,
  children,
}: PropsWithChildren<{ accessToken?: string }>): JSX.Element | null {
  const [isAuthenticated] = useAuthenticationRequired({ accessToken }); // TODO: show error
  return isAuthenticated && children ? <>{children}</> : null;
}
