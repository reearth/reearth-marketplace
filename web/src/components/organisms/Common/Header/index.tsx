import HeaderOrganism from "@marketplace/components/molecules/Common/Header/Header";

import useHooks from "./hooks";

export type Props = {
  myUserId?: string;
};

const Header: React.FC<Props> = () => {
  const { username, lang, isAuthenticated, login, logout, handleLangUpdate } = useHooks();

  return (
    <HeaderOrganism
      username={username}
      lang={lang}
      isLoggedIn={isAuthenticated}
      login={login}
      logout={logout}
      onLangUpdate={handleLangUpdate}
    />
  );
};

export default Header;
