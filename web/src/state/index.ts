import { atom, useAtom } from "jotai";

// useError is needed for Apollo provider error only.
const error = atom<string | undefined>(undefined);
export const useError = () => useAtom(error);

const currentTheme = atom<"light" | "dark">("dark");
export const useCurrentTheme = () => useAtom(currentTheme);
