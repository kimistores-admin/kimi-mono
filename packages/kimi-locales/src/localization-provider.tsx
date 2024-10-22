/* eslint-disable perfectionist/sort-imports */

import "dayjs/locale/ar-sa";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import "dayjs/locale/vi";
import "dayjs/locale/zh-cn";

import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider as Provider } from "@mui/x-date-pickers/LocalizationProvider";

import React from "react";
import { useTranslate } from "./use-locales";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function LocalizationProvider({ children }: Props) {
  const { currentLang } = useTranslate();

  dayjs.locale(currentLang.adapterLocale);

  return (
    <Provider
      dateAdapter={AdapterDayjs}
      adapterLocale={currentLang.adapterLocale}
    >
      {children}
    </Provider>
  );
}
