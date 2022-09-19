import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import { useAuth } from "@marketplace/auth";
import { useGetMeQuery } from "@marketplace/gql";
import { useCurrentLang } from "@marketplace/state";

import i18n from "./i18n";

const getBrowserLanguage = () => {
  const lang = navigator.language;
  if (lang.includes("ja")) {
    return "ja";
  } else {
    return "en";
  }
};

export default function Provider({ children }: { children?: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [currentLang, setLang] = useCurrentLang();

  const { data } = useGetMeQuery({
    variables: {
      first: 50,
    },
    skip: !isAuthenticated,
  });
  const locale = data?.me.lang ?? currentLang;

  useEffect(() => {
    const lang = locale === "und" ? getBrowserLanguage() : locale;
    i18n.changeLanguage(lang);
    if (currentLang !== locale) {
      setLang(locale);
    }
  }, [locale, currentLang, setLang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
