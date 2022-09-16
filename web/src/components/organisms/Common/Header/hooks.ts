import { useAuth } from "@marketplace/auth";
import { useGetMeQuery, useUpdateMeMutation } from "@marketplace/gql";
import { useCurrentLang } from "@marketplace/state";
import { useCallback, useMemo } from "react";

export type Lang = "en" | "ja" | "und";

export default () => {
  const { login, logout, isAuthenticated } = useAuth();
  const [currentLang, setLang] = useCurrentLang();

  const { data } = useGetMeQuery({
    variables: {
      first: 50,
    },
  });

  const [updateMeMutation] = useUpdateMeMutation();

  const handleLangUpdate = useCallback(
    async (lang: Lang) => {
      if (isAuthenticated) {
        await updateMeMutation({
          variables: {
            lang,
          },
        });
      } else {
        setLang(lang);
      }
    },
    [isAuthenticated, setLang],
  );

  const username = useMemo(() => data?.me.name, [data]);
  const lang = useMemo(() => (data?.me.lang ?? currentLang) as Lang, [currentLang, data]);

  return {
    username,
    lang,
    isAuthenticated,
    login,
    logout,
    handleLangUpdate,
  };
};
