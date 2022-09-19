import { ThemeProvider } from "@emotion/react";
import { ReactNode, useEffect } from "react";

import { useCurrentTheme } from "@marketplace/state";

import darkTheme from "./darkTheme";
// import GlobalStyle from "./globalstyle";
import lightTheme from "./lightTheme";

const Provider: React.FC<{ theme?: "light" | "dark"; children?: ReactNode }> = ({
  theme,
  children,
}) => {
  const [currentTheme, setThemeType] = useCurrentTheme();

  useEffect(() => {
    setThemeType(theme ?? "light");
  }, [theme, setThemeType]);

  const themePackage = currentTheme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themePackage}>
      {/* <GlobalStyle /> */}
      {children}
    </ThemeProvider>
  );
};

export default Provider;
