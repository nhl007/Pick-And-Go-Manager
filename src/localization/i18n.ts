import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  resources,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/localization/resources";

export function getDeviceLanguage(): SupportedLanguage {
  const locale = getLocales()[0];
  const languageCode = locale?.languageCode?.toLowerCase();

  if (languageCode && isSupportedLanguage(languageCode)) {
    return languageCode;
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Bundled resources initialize asynchronously; UI must not call `t()` before this resolves.
 */
export const i18nInitPromise: Promise<unknown> = i18n.isInitialized
  ? Promise.resolve()
  : i18n.use(initReactI18next).init({
      compatibilityJSON: "v4",
      resources,
      lng: DEFAULT_LANGUAGE,
      fallbackLng: DEFAULT_LANGUAGE,
      supportedLngs: [...SUPPORTED_LANGUAGES],
      load: "languageOnly",
      defaultNS: "translation",
      ns: ["translation"],
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

export default i18n;
