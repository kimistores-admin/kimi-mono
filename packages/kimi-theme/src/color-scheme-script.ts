import { defaultFont } from "./core/typography";
import { SettingsState } from "./types";

// ----------------------------------------------------------------------
const defaultSettings: SettingsState = {
  colorScheme: "light",
  direction: "ltr",
  contrast: "default",
  navLayout: "vertical",
  primaryColor: "default",
  navColor: "integrate",
  compactLayout: true,
  fontFamily: defaultFont,
};

export const schemeConfig = {
  modeStorageKey: "theme-mode",
  defaultMode: defaultSettings.colorScheme,
};
