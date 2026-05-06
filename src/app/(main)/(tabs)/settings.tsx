import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useMemo } from "react";
import {
  I18nManager,
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import Hero from "@/components/Hero";
import { SettingsMergedIdentity } from "@/components/settings/SettingsMergedIdentity";
import { SettingsProfileCards } from "@/components/settings/SettingsProfileCards";
import { SettingsSupportGrid } from "@/components/settings/SettingsSupportGrid";
import { SettingsSystemSection } from "@/components/settings/SettingsSystemSection";
import { UiButton } from "@/components/ui/UiButton";
import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { settingsStyles } from "@/constants/settings.styles";
import { COLORS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { SupportedLanguage } from "@/localization/resources";

export default function SettingsScreen() {
  const { t, i18n, language, setLanguage } = useAppTranslation();
  const { width } = useWindowDimensions();
  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );
  const locale = i18n.language === "ar" ? "ar-AE" : "en-GB";
  const horizontalPad = Math.min(30, Math.max(SPACING.md, width * 0.02));

  const noop = useCallback(() => {}, []);

  const toggleLanguage = useCallback(() => {
    const next: SupportedLanguage = language === "en" ? "ar" : "en";
    setLanguage(next);
  }, [language, setLanguage]);

  const langPillValue =
    language === "ar" ? t("settings.langPillValueAr") : t("settings.langPillValueEn");

  return (
    <ScrollView
      style={settingsStyles.screen}
      contentContainerStyle={[
        settingsStyles.scrollContent,
        { paddingHorizontal: horizontalPad },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Hero
        locale={locale}
        brandBranch={t("intelligence.brandBranch")}
        brandName={t("intelligence.brandName")}
        subtitle={t("settings.subtitle")}
        title={t("settings.titleLine1")}
        titleStrong={t("settings.titleStrong")}
        isRtl={isRtl}
        belowMeta={
          <View style={settingsStyles.displaySub}>
            <Text style={settingsStyles.displaySubLead}>
              {t("settings.displaySubLead")}{" "}
              <Text style={settingsStyles.displaySubTrail}>
                {t("settings.displaySubTrail")}
              </Text>
            </Text>
          </View>
        }
        pgHeadAccessory={
          <UiButton radius="full" variant="outline" width={160} onPress={toggleLanguage}>
            <Ionicons
              name="language-outline"
              strokeWidth={2}
              size={14}
              color={COLORS.textSecondary}
            />
            <UiText size="sm" font="semiBold" color="textSecondary">
              {langPillValue}
            </UiText>
            <Ionicons
              name="chevron-down-outline"
              strokeWidth={2}
              size={14}
              color={COLORS.textSecondary}
            />
          </UiButton>
        }
      >
        <View style={controlStyles.metaMid}>
          <Image
            source={require("@/assets/images/user.png")}
            resizeMode="cover"
            width={100}
            height={100}
            style={settingsStyles.heroAvatarImage}
          />
          <View style={[controlStyles.metaMidRow, isRtl && controlStyles.rowRtl]}>
            <Ionicons name="time-outline" size={14} color={COLORS.accentAmber} />
            <Text style={controlStyles.metaMidText}>
              {t("settings.metaSessionPrefix")}
              <Text style={controlStyles.metaMidStrong}>
                {t("settings.metaSessionStrong")}
              </Text>
            </Text>
          </View>
          <View style={[controlStyles.metaMidRow, isRtl && controlStyles.rowRtl]}>
            <UiText style={controlStyles.metaMidSmall}>
              {t("settings.metaAccountLine")}
            </UiText>
          </View>
        </View>
      </Hero>

      <View style={[controlStyles.sectionHeadRow, isRtl && controlStyles.rowRtl]}>
        <UiText style={controlStyles.sectionTitle}>
          {t("settings.sectionProfileTitle")}
        </UiText>
        <UiText style={controlStyles.sectionCaption}>
          {t("settings.sectionProfileCaption")}
        </UiText>
        <View style={[settingsStyles.encryptedBadge, isRtl && settingsStyles.rowRtl]}>
          <Ionicons name="lock-closed-outline" size={11} color={COLORS.slateBadgeText} />
          <UiText style={settingsStyles.encryptedBadgeText}>
            {t("settings.encryptedBadge")}
          </UiText>
        </View>
      </View>

      <SettingsMergedIdentity
        t={t}
        isRtl={isRtl}
        onChangePhoto={noop}
        onView={noop}
        onDownload={noop}
        onShare={noop}
      />

      <SettingsProfileCards
        t={t}
        isRtl={isRtl}
        onUpdateEmail={noop}
        onUpdatePhone={noop}
        onPasswordMethod1={noop}
        onPasswordMethod2={noop}
      />

      <View
        style={[
          controlStyles.sectionHeadRow,
          controlStyles.sectionHeadRowTight,
          isRtl && controlStyles.rowRtl,
        ]}
      >
        <UiText style={controlStyles.sectionTitle}>
          {t("settings.sectionSupportTitle")}
        </UiText>
        <UiText style={controlStyles.sectionCaption}>
          {t("settings.sectionSupportCaption")}
        </UiText>
      </View>

      <SettingsSupportGrid
        t={t}
        isRtl={isRtl}
        onContactWhatsapp={noop}
        onContactTech={noop}
        onContactEmergency={noop}
        onUrgentCall={noop}
        onSubmitSuggestion={noop}
      />

      <View
        style={[
          controlStyles.sectionHeadRow,
          controlStyles.sectionHeadRowTight,
          isRtl && controlStyles.rowRtl,
        ]}
      >
        <UiText style={controlStyles.sectionTitle}>
          {t("settings.sectionSystemTitle")}
        </UiText>
        <UiText style={controlStyles.sectionCaption}>
          {t("settings.sectionSystemCaption")}
        </UiText>
        <View style={[settingsStyles.badgeOk, isRtl && settingsStyles.rowRtl]}>
          <View style={settingsStyles.liveDot} />
          <UiText style={settingsStyles.badgeOkText}>
            {t("settings.badgeSessionsOk")}
          </UiText>
        </View>
      </View>

      <SettingsSystemSection
        t={t}
        isRtl={isRtl}
        onTerminate={noop}
        onLogoutThisDevice={noop}
        onLogoutAllDevices={noop}
      />
    </ScrollView>
  );
}
