import type { Theme, Components } from "@mui/material/styles";

import { colors } from "../core/colors";
import { primaryColors } from "./primary-colors";
import { components as coreComponents } from "../core/components";
import { hexToRgbChannel, createPaletteChannel } from "../styles";
import {
  grey as coreGreyPalette,
  primary as corePrimaryPalette,
} from "../core/palette";
import {
  createShadowColor,
  customShadows as coreCustomShadows,
} from "../core/custom-shadows";

import type {
  SettingsState,
  ThemeComponents,
  ThemeUpdateOptions,
} from "../types";

// ----------------------------------------------------------------------

/**
 * [1] settings @primaryColor
 * [2] settings @contrast
 */

export function updateCoreWithSettings(
  theme: ThemeUpdateOptions,
  settings: SettingsState
): ThemeUpdateOptions {
  const { colorSchemes, customShadows } = theme;

  return {
    ...theme,
    colorSchemes: {
      ...colorSchemes,
      light: {
        palette: {
          ...(typeof colorSchemes?.light === "object"
            ? colorSchemes.light.palette
            : {}),
          /** [1] */
          primary: getPalettePrimary(settings.primaryColor),
          /** [2] */
          background: {
            ...(typeof colorSchemes?.light === "object"
              ? colorSchemes.light.palette?.background
              : {}),
            default: getBackgroundDefault(settings.contrast),
            defaultChannel: hexToRgbChannel(
              getBackgroundDefault(settings.contrast)
            ),
          },
        },
      },
      dark: {
        palette: {
          ...(typeof colorSchemes?.dark === "object"
            ? colorSchemes.dark.palette
            : {}),
          /** [1] */
          primary: getPalettePrimary(settings.primaryColor),
        },
      },
    },
    customShadows: {
      ...customShadows,
      /** [1] */
      primary:
        settings.primaryColor === "default"
          ? coreCustomShadows("light").primary
          : createShadowColor(
              getPalettePrimary(settings.primaryColor).mainChannel
            ),
    },
  };
}

// ----------------------------------------------------------------------

export function updateComponentsWithSettings(settings: SettingsState) {
  const components: ThemeComponents = {};

  /** [2] */
  if (settings.contrast === "high") {
    const MuiCard: Components<Theme>["MuiCard"] = {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          let rootStyles = {};
          if (
            typeof coreComponents?.MuiCard?.styleOverrides?.root === "function"
          ) {
            rootStyles =
              coreComponents.MuiCard.styleOverrides.root({
                ownerState,
                theme,
              }) ?? {};
          }

          return {
            ...rootStyles,
            boxShadow: theme.customShadows.z1,
          };
        },
      },
    };

    components.MuiCard = MuiCard;
  }

  return { components };
}

// ----------------------------------------------------------------------

const PRIMARY_COLORS = {
  default: colors.primary,
  cyan: primaryColors.cyan,
  purple: primaryColors.purple,
  blue: primaryColors.blue,
  orange: primaryColors.orange,
  red: primaryColors.red,
};

function getPalettePrimary(primaryColorName: SettingsState["primaryColor"]) {
  /** [1] */
  const selectedPrimaryColor = PRIMARY_COLORS[primaryColorName];
  const updatedPrimaryPalette = createPaletteChannel(selectedPrimaryColor);

  return primaryColorName === "default"
    ? corePrimaryPalette
    : updatedPrimaryPalette;
}

function getBackgroundDefault(contrast: SettingsState["contrast"]) {
  /** [2] */
  return contrast === "default" ? "#FFFFFF" : coreGreyPalette[200];
}
