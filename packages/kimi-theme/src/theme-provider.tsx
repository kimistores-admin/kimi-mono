import type {} from "@mui/lab/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/material/themeCssVarsAugmentation";

import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { useTranslate } from "kimi-locales";

import { createTheme } from "./create-theme";
import { Rtl } from "./with-settings/right-to-left";
import { schemeConfig } from "./color-scheme-script";
import { useSettingsContext } from "./settings";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Readonly<Props>) {
  const { currentLang } = useTranslate();
  const settings = useSettingsContext();

  const theme = createTheme(currentLang?.systemValue, settings);

  return (
    <CssVarsProvider
      theme={theme}
      defaultMode={schemeConfig.defaultMode}
      modeStorageKey={schemeConfig.modeStorageKey}
    >
      <CssBaseline />
      <Rtl direction={settings.direction}>{children}</Rtl>
    </CssVarsProvider>
  );
}
