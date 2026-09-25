import { watch } from "vue";
import { loadTranslations } from "../utils/load";
import { locale, translations } from "../store";
import { onMounted } from "vue";
import { LOCALES } from "../constants";

import type { Locale } from "../types";

export const useTranslations = () => {
  onMounted(() => {
    const storedLocale = window.localStorage.getItem("portfolio-locale");
    if (storedLocale && storedLocale in LOCALES) {
      locale.value = storedLocale as Locale;
      return;
    }

    // Migrate visitors who previously saved the removed German locale.
    if (storedLocale === "de") {
      locale.value = "fil";
      return;
    }

    const preferredLocale = navigator.language.split("-")[0].toLowerCase();
    locale.value = preferredLocale === "fil" || preferredLocale === "tl" ? "fil" : "en";
  });

  watch(locale, (newLocale) => {
    if (!newLocale) return;
    window.localStorage.setItem("portfolio-locale", newLocale);
    document.documentElement.lang = LOCALES[newLocale].iso;
  });

  watch(
    locale,
    async (newLocale) => {
      if (!newLocale) return;
      translations.value = (await loadTranslations("common", newLocale)) ?? {};
    },
    { immediate: true },
  );
};
