/* eslint-disable react/destructuring-assignment */
import useSiteThemeMode from "../hooks/useSiteThemeMode";
import { ThemeProviderProps } from "@emotion/react";
import {
  CssBaseline,
  Palette,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { darkTheme, lightTheme } from "./theme.config";

export function AppThemeProvider(props: Partial<ThemeProviderProps>) {
  const isSystemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const themeMode = useSiteThemeMode();

  const isDark =
    (themeMode === "media" && isSystemDark) || themeMode === "dark";

  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    if (isDark) {
      // document.documentElement.classList.add("dark");
      document.documentElement
        .getElementsByTagName("body")[0]
        .classList.add("dark");
    } else {
      // document.documentElement.classList.remove("dark");
      document.documentElement
        .getElementsByTagName("body")[0]
        .classList.remove("dark");
    }
    [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "error",
      "common",
      "text",
      "background",
      "action",
    ].forEach((palatteKey) => {
      const palt = palatteKey as keyof Palette;
      Object.keys(theme.palette[palt]).forEach((palatteKeyColor) => {
        const value = (theme.palette[palt] as Record<string, any>)[
          palatteKeyColor
        ];

        console.log(`${palatteKey}--${palatteKeyColor}--${value}`);
        document.documentElement.style.setProperty(
          `--color-${palatteKey}-${palatteKeyColor}`,
          value,
        );
      });
    });
  }, [isDark, theme.palette]);
  return (
    <ThemeProvider theme={theme} {...props}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;
