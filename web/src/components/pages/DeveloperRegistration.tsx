import { withAuthenticationRequired, AuthenticationRequiredPage } from "@marketplace/auth";
import { useT } from "@marketplace/i18n";

export type Props = {};

const DeveloperRegistration: React.FC<Props> = () => {
  const t = useT();
  return <AuthenticationRequiredPage>{t("Developer Registration")}</AuthenticationRequiredPage>;
};

export default withAuthenticationRequired(DeveloperRegistration);
