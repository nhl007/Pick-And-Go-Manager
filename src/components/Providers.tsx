import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import { queryClient } from "@/lib/queryClient";
import i18n, { getDeviceLanguage } from "@/localization/i18n";
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  type SupportedLanguage,
} from "@/localization/resources";

function normalizeSupportedLanguage(raw: string): SupportedLanguage {
  const base = raw.split("-")[0]?.toLowerCase() ?? "";
  return isSupportedLanguage(base) ? base : DEFAULT_LANGUAGE;
}
import { useLanguageStore } from "@/store/language.store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const language = useLanguageStore((state) => state.language);
  const isHydrated = useLanguageStore((state) => state.isHydrated);
  const hasUserSelectedLanguage = useLanguageStore(
    (state) => state.hasUserSelectedLanguage,
  );
  const setLanguageFromDevice = useLanguageStore((state) => state.setLanguageFromDevice);

  useEffect(() => {
    if (!isHydrated || hasUserSelectedLanguage) {
      return;
    }

    setLanguageFromDevice(getDeviceLanguage());
  }, [hasUserSelectedLanguage, isHydrated, setLanguageFromDevice]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const lng = isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE;
    void i18n.changeLanguage(lng);
  }, [isHydrated, language]);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nextProvider>
  );
}
