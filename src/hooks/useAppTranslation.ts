import { useTranslation } from "react-i18next";

import "@/localization/i18n";
import { useLanguageStore } from "@/store/language.store";

export function useAppTranslation() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const translation = useTranslation();

  return {
    ...translation,
    language,
    setLanguage,
  };
}
