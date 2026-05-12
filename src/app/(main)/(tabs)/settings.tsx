import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  I18nManager,
  Image,
  ScrollView,
  Share,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import Hero from "@/components/Hero";
import {
  SettingsBadgePreviewModal,
  type SettingsBadgePreviewModalCopy,
} from "@/components/settings/SettingsBadgePreviewModal";
import {
  SettingsDataChangeModal,
  type SettingsDataChangeModalCopy,
} from "@/components/settings/SettingsDataChangeModal";
import {
  SettingsLanguagePickerModal,
  type SettingsLanguagePickerModalCopy,
} from "@/components/settings/SettingsLanguagePickerModal";
import { SettingsMergedIdentity } from "@/components/settings/SettingsMergedIdentity";
import {
  SettingsPasswordChangeModal,
  type SettingsPasswordChangeModalCopy,
} from "@/components/settings/SettingsPasswordChangeModal";
import { SettingsProfileCards } from "@/components/settings/SettingsProfileCards";
import {
  SettingsShareCardModal,
  type SettingsShareCardModalCopy,
  type ShareCardAction,
} from "@/components/settings/SettingsShareCardModal";
import { SettingsSupportGrid } from "@/components/settings/SettingsSupportGrid";
import { SettingsSystemSection } from "@/components/settings/SettingsSystemSection";
import { UiButton } from "@/components/ui/UiButton";
import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { settingsStyles } from "@/constants/settings.styles";
import { COLORS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import {
  exportSettingsBusinessCardSvg,
  exportVCardFile,
} from "@/lib/settingsBusinessCardSvg";

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

  const [langPickerOpen, setLangPickerOpen] = useState(false);
  const [badgePreviewOpen, setBadgePreviewOpen] = useState(false);
  const [shareCardOpen, setShareCardOpen] = useState(false);
  const [dataChangeKind, setDataChangeKind] = useState<"email" | "phone" | null>(null);
  const [passwordChangeOpen, setPasswordChangeOpen] = useState(false);

  const langPickerCopy = useMemo<SettingsLanguagePickerModalCopy>(
    () => ({
      title: t("settings.langPickerTitle"),
      subtitle: t("settings.langPickerSubtitle"),
      previewLabel: t("settings.langPickerPreviewLabel"),
      previewHeadEn: t("settings.langPickerPreviewHeadEn"),
      previewSubEn: t("settings.langPickerPreviewSubEn"),
      previewHeadAr: t("settings.langPickerPreviewHeadAr"),
      previewSubAr: t("settings.langPickerPreviewSubAr"),
      syncNote: t("settings.langPickerSyncNote"),
      langEnName: t("settings.langPickerEnName"),
      langEnSub: t("settings.langPickerEnSub"),
      langArName: t("settings.langPickerArName"),
      langArSub: t("settings.langPickerArSub"),
      langHiName: t("settings.langPickerHiName"),
      langHiSub: t("settings.langPickerHiSub"),
      langUrName: t("settings.langPickerUrName"),
      langUrSub: t("settings.langPickerUrSub"),
      langTlName: t("settings.langPickerTlName"),
      langTlSub: t("settings.langPickerTlSub"),
      soonBadge: t("settings.langPickerSoon"),
      flagEn: t("settings.langPickerFlagEn"),
      flagAr: t("settings.langPickerFlagAr"),
      flagHi: t("settings.langPickerFlagHi"),
      flagUr: t("settings.langPickerFlagUr"),
      flagTl: t("settings.langPickerFlagTl"),
    }),
    [t],
  );

  const badgePreviewCopy = useMemo<SettingsBadgePreviewModalCopy>(
    () => ({
      title: t("settings.badgePreviewTitle"),
      desc: t("settings.badgePreviewDesc"),
      brand: t("settings.badgePreviewBrand"),
      branch: t("intelligence.brandBranch"),
      tier: t("settings.badgePreviewTier"),
      initials: t("settings.badgePreviewInitials"),
      name: t("settings.mergedName"),
      jobTitle: t("settings.badgePreviewJobTitle"),
      empIdLine: t("settings.badgePreviewEmpIdLine", {
        id: t("settings.metaValEmployeeId"),
      }),
      scanLabel: t("settings.badgePreviewScan"),
      lblEmail: t("settings.badgeLblEmail"),
      lblPhone: t("settings.badgeLblPhone"),
      lblBranch: t("settings.badgeLblBranch"),
      lblAccess: t("settings.badgeLblAccess"),
      email: t("settings.emailValue"),
      phone: t("settings.phoneValue"),
      branchVal: t("settings.metaValBranch"),
      access: t("settings.metaValAccess"),
      footer: t("settings.badgePreviewFooter"),
      share: t("settings.badgePreviewShare"),
      downloadSvg: t("settings.badgePreviewDownloadSvg"),
      qrUrl: t("settings.mergedIdentityQrUrl"),
      qrA11y: t("settings.mergedIdentityQrA11y"),
    }),
    [t],
  );

  const shareCardCopy = useMemo<SettingsShareCardModalCopy>(
    () => ({
      title: t("settings.shareCardTitle"),
      subtitle: t("settings.shareCardSubtitle"),
      initials: t("settings.badgePreviewInitials"),
      name: t("settings.mergedName"),
      roleLine: t("settings.shareCardRoleLine"),
      verifyUrl: t("settings.shareCardVerifyUrl"),
      optLink: {
        title: t("settings.shareOptLinkTitle"),
        sub: t("settings.shareOptLinkSub"),
      },
      optVcard: {
        title: t("settings.shareOptVcardTitle"),
        sub: t("settings.shareOptVcardSub"),
      },
      optWa: {
        title: t("settings.shareOptWaTitle"),
        sub: t("settings.shareOptWaSub"),
      },
      optEmail: {
        title: t("settings.shareOptEmailTitle"),
        sub: t("settings.shareOptEmailSub"),
      },
      optQr: {
        title: t("settings.shareOptQrTitle"),
        sub: t("settings.shareOptQrSub"),
      },
      optNative: {
        title: t("settings.shareOptNativeTitle"),
        sub: t("settings.shareOptNativeSub"),
      },
      note: t("settings.shareCardNote"),
      qrPanelTitle: t("settings.shareCardQrPanelTitle"),
    }),
    [t],
  );

  const dataChangeCopy = useMemo((): SettingsDataChangeModalCopy | null => {
    if (!dataChangeKind) {
      return null;
    }
    const isEmail = dataChangeKind === "email";
    return {
      title: t(isEmail ? "settings.dcTitleEmail" : "settings.dcTitlePhone"),
      currentLabel: t("settings.dcCurrentLabel"),
      currentValue: t(isEmail ? "settings.emailValue" : "settings.phoneValue"),
      step1Label: t("settings.dcStepNewValue"),
      step2Label: t("settings.dcStepOtp"),
      step3Label: t("settings.dcStepConfirm"),
      newValueLabel: t("settings.dcFieldNewLabel"),
      newValuePlaceholder: t(
        isEmail ? "settings.dcPlaceholderEmail" : "settings.dcPlaceholderPhone",
      ),
      noteOtp: t("settings.dcNoteOtp"),
      cancel: t("settings.dcBtnCancel"),
      continue: t("settings.dcBtnContinue"),
      back: t("settings.dcBtnBack"),
      verify: t("settings.dcBtnVerify"),
      otpSentLine: t("settings.dcOtpSentLine", { phone: t("settings.phoneValue") }),
      otpNewPrefix: t("settings.dcOtpNewPrefix"),
      resendPrompt: t("settings.dcResendPrompt"),
      resend: t("settings.dcResend"),
      successTitle: t("settings.dcSuccessTitle"),
      successSub: t("settings.dcSuccessSub"),
      confirmChange: t("settings.dcBtnConfirm"),
    };
  }, [t, dataChangeKind]);

  const passwordChangeCopy = useMemo<SettingsPasswordChangeModalCopy>(
    () => ({
      title: t("settings.pwModalTitle"),
      subtitle: t("settings.pwModalSubtitle"),
      step1Label: t("settings.pwStepVerifyCurrent"),
      step2Label: t("settings.pwStepAdmin"),
      step3Label: t("settings.pwStepSetNew"),
      fieldCurrentLabel: t("settings.pwFieldCurrent"),
      placeholderCurrent: t("settings.pwPlaceholderCurrent"),
      noteLockout: t("settings.pwNoteLockout"),
      cancel: t("settings.dcBtnCancel"),
      continue: t("settings.dcBtnContinue"),
      back: t("settings.dcBtnBack"),
      adminTitle: t("settings.pwAdminTitle"),
      adminSub: t("settings.pwAdminSub"),
      adminWaiting: t("settings.pwAdminWaiting"),
      adminApproved: t("settings.pwAdminApproved"),
      continueAfterAdmin: t("settings.pwContinueAfterAdmin"),
      fieldNewLabel: t("settings.pwFieldNew"),
      placeholderNew: t("settings.pwPlaceholderNew"),
      fieldConfirmLabel: t("settings.pwFieldConfirm"),
      placeholderConfirm: t("settings.pwPlaceholderConfirm"),
      matchError: t("settings.pwMatchError"),
      noteSignout: t("settings.pwNoteSignout"),
      updatePassword: t("settings.pwBtnUpdate"),
      strengthWeak: t("settings.pwStrengthWeak"),
      strengthMedium: t("settings.pwStrengthMedium"),
      strengthStrong: t("settings.pwStrengthStrong"),
    }),
    [t],
  );

  const downloadBusinessCardSvg = useCallback(() => {
    exportSettingsBusinessCardSvg(t).catch(() => {
      Alert.alert(t("settings.svgExportErrorTitle"), t("settings.svgExportErrorBody"));
    });
  }, [t]);

  const handleShareCardAction = useCallback(
    async (action: ShareCardAction) => {
      const verifyUrl = t("settings.shareCardVerifyUrl");
      const name = t("settings.mergedName");
      try {
        switch (action) {
          case "link": {
            await Clipboard.setStringAsync(verifyUrl);
            break;
          }
          case "vcard": {
            await exportVCardFile(t);
            break;
          }
          case "whatsapp": {
            const body = encodeURIComponent(
              t("settings.shareCardWhatsAppBody", { url: verifyUrl }),
            );
            await Linking.openURL(`https://wa.me/?text=${body}`);
            break;
          }
          case "email": {
            const subject = encodeURIComponent(t("settings.shareCardEmailSubject"));
            const mailBody = encodeURIComponent(
              t("settings.shareCardEmailBody", { url: verifyUrl }),
            );
            await Linking.openURL(`mailto:?subject=${subject}&body=${mailBody}`);
            break;
          }
          case "native": {
            await Share.share({
              title: t("settings.shareCardTitle"),
              message: `${name}\n${verifyUrl}`,
            });
            break;
          }
          default:
            break;
        }
      } catch {
        Alert.alert(t("settings.svgExportErrorTitle"), t("settings.svgExportErrorBody"));
      }
    },
    [t],
  );

  const langPillValue =
    language === "ar" ? t("settings.langPillValueAr") : t("settings.langPillValueEn");

  return (
    <>
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
            <UiButton
              radius="full"
              variant="outline"
              width={160}
              onPress={() => {
                setLangPickerOpen(true);
              }}
            >
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
            <Ionicons
              name="lock-closed-outline"
              size={11}
              color={COLORS.slateBadgeText}
            />
            <UiText style={settingsStyles.encryptedBadgeText}>
              {t("settings.encryptedBadge")}
            </UiText>
          </View>
        </View>

        <SettingsMergedIdentity
          t={t}
          isRtl={isRtl}
          onChangePhoto={noop}
          onView={() => {
            setBadgePreviewOpen(true);
          }}
          onDownload={downloadBusinessCardSvg}
          onShare={() => {
            setShareCardOpen(true);
          }}
        />

        <SettingsProfileCards
          t={t}
          isRtl={isRtl}
          onUpdateEmail={() => {
            setDataChangeKind("email");
          }}
          onUpdatePhone={() => {
            setDataChangeKind("phone");
          }}
          onPasswordMethod1={() => {
            setPasswordChangeOpen(true);
          }}
          onPasswordMethod2={() => {
            setPasswordChangeOpen(true);
          }}
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

      <SettingsLanguagePickerModal
        visible={langPickerOpen}
        onClose={() => {
          setLangPickerOpen(false);
        }}
        language={language}
        onSelectLanguage={setLanguage}
        copy={langPickerCopy}
        isRtl={isRtl}
      />

      <SettingsBadgePreviewModal
        visible={badgePreviewOpen}
        onClose={() => {
          setBadgePreviewOpen(false);
        }}
        onShareSvg={downloadBusinessCardSvg}
        onDownloadSvg={downloadBusinessCardSvg}
        copy={badgePreviewCopy}
        isRtl={isRtl}
      />

      <SettingsShareCardModal
        visible={shareCardOpen}
        onClose={() => {
          setShareCardOpen(false);
        }}
        onAction={(action) => {
          handleShareCardAction(action).catch(() => undefined);
        }}
        copy={shareCardCopy}
        isRtl={isRtl}
      />

      <SettingsDataChangeModal
        visible={dataChangeKind !== null}
        kind={dataChangeKind}
        onClose={() => {
          setDataChangeKind(null);
        }}
        copy={dataChangeCopy}
        headIcon={
          dataChangeKind === "phone"
            ? "call-outline"
            : dataChangeKind === "email"
              ? "mail-outline"
              : null
        }
        isRtl={isRtl}
      />

      <SettingsPasswordChangeModal
        visible={passwordChangeOpen}
        onClose={() => {
          setPasswordChangeOpen(false);
        }}
        copy={passwordChangeCopy}
        isRtl={isRtl}
      />
    </>
  );
}
