import { useAuth } from "@marketplace/auth";
import { useGetMeQuery, useUpdateMeMutation } from "@marketplace/gql";
import { useCallback, useMemo } from "react";

export type Lang = "en" | "ja" | "und";

export default () => {
  const { login, logout, isAuthenticated } = useAuth();

  const { data } = useGetMeQuery({
    variables: {
      first: 50,
    },
  });

  const [updateMeMutation] = useUpdateMeMutation();

  const handleLangUpdate = useCallback(async (lang: Lang) => {
    await updateMeMutation({
      variables: {
        lang,
      },
    });
  }, []);

  const username = useMemo(() => data?.me.name, [data]);
  const lang = useMemo(() => data?.me.lang as Lang, [data]);

  return {
    username,
    lang,
    isAuthenticated,
    login,
    logout,
    handleLangUpdate,
  };
};
