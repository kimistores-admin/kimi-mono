import type { Theme as BaseTheme } from "@mui/material/styles/createTheme";
import type { CssVarsTheme, CssVarsThemeOptions } from "@mui/material/styles";
import type { TypographyOptions } from "@mui/material/styles/createTypography";

// ----------------------------------------------------------------------

export type Theme = Omit<BaseTheme, "palette" | "applyStyles"> & CssVarsTheme;

export type ThemeUpdateOptions = Omit<CssVarsThemeOptions, "typography"> & {
  typography?: TypographyOptions;
};

export type ThemeComponents = CssVarsThemeOptions["components"];

export type ThemeColorScheme = "light" | "dark";

export type ThemeDirection = "ltr" | "rtl";

export type ThemeLocaleComponents = { components: ThemeComponents };

export type SettingsState = {
  fontFamily: string;
  compactLayout: boolean;
  direction: ThemeDirection;
  colorScheme: ThemeColorScheme;
  contrast: "default" | "high";
  navColor: "integrate" | "apparent";
  navLayout: "vertical" | "horizontal" | "mini";
  primaryColor: "default" | "cyan" | "purple" | "blue" | "orange" | "red";
};
