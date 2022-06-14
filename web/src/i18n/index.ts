import { useTranslation } from "react-i18next";

export { useTranslation } from "react-i18next";
export { default as Provider } from "./provider";
export { default as i18n } from "./i18n";

export const useT = () => useTranslation().t;
export const useLang = () => useTranslation().i18n.language;
