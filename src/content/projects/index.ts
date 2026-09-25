import type { Locale } from "../../i18n/types";

export const projectIds: string[] = [];

export const projectModules = {
  de: {},
  en: {},
} as const satisfies Record<Locale, Record<string, any>>;
