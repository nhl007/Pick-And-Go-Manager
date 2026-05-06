import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import { Pressable, Text, View } from "react-native";

import { UICard } from "@/components/ui/UICard";
import { UiText } from "@/components/ui/UiText";
import { settingsStyles } from "@/constants/settings.styles";
import { COLORS } from "@/constants/styles";

type Props = {
  t: TFunction;
  isRtl: boolean;
  onUpdateEmail: () => void;
  onUpdatePhone: () => void;
  onPasswordMethod1: () => void;
  onPasswordMethod2: () => void;
};

export function SettingsProfileCards({
  t,
  isRtl,
  onUpdateEmail,
  onUpdatePhone,
  onPasswordMethod1,
  onPasswordMethod2,
}: Props) {
  return (
    <>
      <View style={[settingsStyles.contactGrid, isRtl && settingsStyles.rowRtl]}>
        <UICard style={settingsStyles.contactGridCard}>
          <View style={[settingsStyles.fieldHead, isRtl && settingsStyles.rowRtl]}>
            <View style={[settingsStyles.fieldHeadIcon, settingsStyles.fieldHeadIconBlue]}>
              <Ionicons name="mail-outline" size={16} color={COLORS.sky500} />
            </View>
            <UiText style={settingsStyles.fieldHeadTitle}>{t("settings.emailCardTitle")}</UiText>
          </View>
          <View style={[settingsStyles.fieldRow, isRtl && settingsStyles.rowRtl]}>
            <View style={settingsStyles.fieldRowIcon}>
              <Ionicons name="mail-outline" size={15} color={COLORS.ink4} />
            </View>
            <View style={settingsStyles.fieldData}>
              <UiText style={settingsStyles.fieldLbl}>{t("settings.emailCurrentLabel")}</UiText>
              <UiText style={settingsStyles.fieldVal}>{t("settings.emailValue")}</UiText>
              <UiText style={settingsStyles.fieldSub}>{t("settings.emailVerified")}</UiText>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={onUpdateEmail}
              style={({ pressed }) => [settingsStyles.fieldUpdate, pressed && { opacity: 0.85 }]}
            >
              <Ionicons name="create-outline" size={12} color={COLORS.portalInk} />
              <UiText style={settingsStyles.fieldUpdateText}>{t("settings.update")}</UiText>
            </Pressable>
          </View>
          <View style={[settingsStyles.banner, settingsStyles.bannerWarn]}>
            <Ionicons name="warning-outline" size={14} color={COLORS.neonOrange} />
            <Text style={settingsStyles.bannerText}>{t("settings.bannerEmailWarn")}</Text>
          </View>
        </UICard>

        <UICard style={settingsStyles.contactGridCard}>
          <View style={[settingsStyles.fieldHead, isRtl && settingsStyles.rowRtl]}>
            <View style={[settingsStyles.fieldHeadIcon, settingsStyles.fieldHeadIconGreen]}>
              <Ionicons name="call-outline" size={16} color={COLORS.secondary} />
            </View>
            <UiText style={settingsStyles.fieldHeadTitle}>{t("settings.phoneCardTitle")}</UiText>
          </View>
          <View style={[settingsStyles.fieldRow, isRtl && settingsStyles.rowRtl]}>
            <View style={settingsStyles.fieldRowIcon}>
              <Ionicons name="call-outline" size={15} color={COLORS.ink4} />
            </View>
            <View style={settingsStyles.fieldData}>
              <UiText style={settingsStyles.fieldLbl}>{t("settings.phonePrimaryLabel")}</UiText>
              <UiText style={settingsStyles.fieldVal}>{t("settings.phoneValue")}</UiText>
              <UiText style={settingsStyles.fieldSub}>{t("settings.phoneSub")}</UiText>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={onUpdatePhone}
              style={({ pressed }) => [settingsStyles.fieldUpdate, pressed && { opacity: 0.85 }]}
            >
              <Ionicons name="create-outline" size={12} color={COLORS.portalInk} />
              <UiText style={settingsStyles.fieldUpdateText}>{t("settings.update")}</UiText>
            </Pressable>
          </View>
          <View style={[settingsStyles.banner, settingsStyles.bannerOk]}>
            <Ionicons name="checkmark-circle-outline" size={14} color={COLORS.secondary} />
            <Text style={settingsStyles.bannerText}>{t("settings.bannerPhoneOk")}</Text>
          </View>
        </UICard>
      </View>

      <UICard style={settingsStyles.cardFlex0}>
        <View style={[settingsStyles.pwHead, isRtl && settingsStyles.rowRtl]}>
          <View style={settingsStyles.pwHeadIcon}>
            <Ionicons name="lock-closed-outline" size={18} color={COLORS.portalInk} />
          </View>
          <View style={settingsStyles.pwHeadBody}>
            <UiText style={settingsStyles.pwHeadTitle}>{t("settings.passwordPanelTitle")}</UiText>
            <UiText style={settingsStyles.pwHeadSub}>{t("settings.passwordPanelSub")}</UiText>
          </View>
          <View style={settingsStyles.strengthBadge}>
            <Ionicons name="shield-checkmark-outline" size={12} color={COLORS.strengthBadgeText} />
            <UiText style={settingsStyles.strengthBadgeText}>{t("settings.badgeStrong")}</UiText>
          </View>
        </View>

        <Text style={settingsStyles.pwDesc}>
          {t("settings.passwordDescLead")}
          <Text style={settingsStyles.pwDescStrong}>{t("settings.passwordDescStrong")}</Text>
          {t("settings.passwordDescTrail")}
        </Text>

        <View style={[settingsStyles.pwMethods, isRtl && settingsStyles.rowRtl]}>
          <View style={settingsStyles.pwMethod}>
            <View style={[settingsStyles.pwMethodHead, isRtl && settingsStyles.rowRtl]}>
              <View style={settingsStyles.pwMethodIc}>
                <Ionicons name="people-outline" size={15} color={COLORS.portalInk} />
              </View>
              <UiText style={settingsStyles.pwMethodTitle}>{t("settings.method1Title")}</UiText>
            </View>
            <UiText style={settingsStyles.pwMethodSub}>{t("settings.method1Body")}</UiText>
            <Pressable
              accessibilityRole="button"
              onPress={onPasswordMethod1}
              style={({ pressed }) => [settingsStyles.pwMethodBtn, pressed && { opacity: 0.9 }]}
            >
              <Ionicons name="share-social-outline" size={13} color={COLORS.white} />
              <UiText style={settingsStyles.pwMethodBtnText}>{t("settings.method1Cta")}</UiText>
            </Pressable>
          </View>
          <View style={settingsStyles.pwMethod}>
            <View style={[settingsStyles.pwMethodHead, isRtl && settingsStyles.rowRtl]}>
              <View style={settingsStyles.pwMethodIc}>
                <Ionicons name="keypad-outline" size={15} color={COLORS.portalInk} />
              </View>
              <UiText style={settingsStyles.pwMethodTitle}>{t("settings.method2Title")}</UiText>
            </View>
            <UiText style={settingsStyles.pwMethodSub}>{t("settings.method2Body")}</UiText>
            <Pressable
              accessibilityRole="button"
              onPress={onPasswordMethod2}
              style={({ pressed }) => [settingsStyles.pwMethodBtn, pressed && { opacity: 0.9 }]}
            >
              <Ionicons name="lock-closed-outline" size={13} color={COLORS.white} />
              <UiText style={settingsStyles.pwMethodBtnText}>{t("settings.method2Cta")}</UiText>
            </Pressable>
          </View>
        </View>

        <View style={[settingsStyles.pwMeta, isRtl && settingsStyles.rowRtl]}>
          <Text style={settingsStyles.pwMetaText}>
            {t("settings.passwordLastChanged")}{" "}
            <Text style={settingsStyles.pwMetaStrong}>{t("settings.passwordLastDate")}</Text>
          </Text>
          <View style={settingsStyles.strengthRow}>
            <View style={settingsStyles.strengthTrack}>
              <View style={settingsStyles.strengthFill} />
            </View>
            <UiText style={settingsStyles.strengthPct}>
              {t("settings.passwordStrength", { pct: 88 })}
            </UiText>
          </View>
        </View>
      </UICard>
    </>
  );
}
