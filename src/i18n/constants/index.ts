export const LOCALES = {
  en: {
    iso: "en-US",
    name: "English",
  },
  fil: {
    iso: "fil-PH",
    name: "Filipino",
  },
} as const satisfies Record<
  string,
  {
    name: string;
    iso: string;
  }
>;

export const LOCALE_DEFAULT: keyof typeof LOCALES = "en";
