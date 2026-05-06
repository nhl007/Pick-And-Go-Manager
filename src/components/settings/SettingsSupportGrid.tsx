import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";

import { UICard } from "@/components/ui/UICard";
import { UiInput } from "@/components/ui/UiInput";
import { UiText } from "@/components/ui/UiText";
import { settingsStyles } from "@/constants/settings.styles";
import { COLORS, SPACING } from "@/constants/styles";

const UX_KEYS = ["feature", "ui", "bug", "other"] as const;
type UxKey = (typeof UX_KEYS)[number];

type Props = {
  t: TFunction;
  isRtl: boolean;
  onContactWhatsapp: () => void;
  onContactTech: () => void;
  onContactEmergency: () => void;
  onUrgentCall: () => void;
  onSubmitSuggestion: () => void;
};

export function SettingsSupportGrid({
  t,
  isRtl,
  onContactWhatsapp,
  onContactTech,
  onContactEmergency,
  onUrgentCall,
  onSubmitSuggestion,
}: Props) {
  const [uxTopic, setUxTopic] = useState<UxKey>("feature");
  const [suggestion, setSuggestion] = useState("");

  const chipLabel = useCallback(
    (key: UxKey) => {
      switch (key) {
        case "feature":
          return t("settings.uxChipFeature");
        case "ui":
          return t("settings.uxChipUi");
        case "bug":
          return t("settings.uxChipBug");
        default:
          return t("settings.uxChipOther");
      }
    },
    [t],
  );

  return (
    <View style={[settingsStyles.g3, isRtl && settingsStyles.rowRtl]}>
      <UICard style={[settingsStyles.g3Card, settingsStyles.cardFlex0]}>
        <UiText style={settingsStyles.panelTitle}>{t("settings.helpCenterTitle")}</UiText>
        <Pressable
          accessibilityRole="button"
          onPress={onContactWhatsapp}
          style={[settingsStyles.contactBtn, isRtl && settingsStyles.rowRtl]}
        >
          <View style={[settingsStyles.contactIc, { backgroundColor: COLORS.neonYellow }]}>
            <Ionicons name="logo-whatsapp" size={18} color={COLORS.white} />
          </View>
          <View style={settingsStyles.contactBody}>
            <UiText style={settingsStyles.contactName}>{t("settings.contactWhatsappName")}</UiText>
            <UiText style={settingsStyles.contactSub}>{t("settings.contactWhatsappSub")}</UiText>
          </View>
          <UiText style={settingsStyles.contactArrow}>{isRtl ? "←" : "→"}</UiText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onContactTech}
          style={[settingsStyles.contactBtn, isRtl && settingsStyles.rowRtl]}
        >
          <View style={[settingsStyles.contactIc, { backgroundColor: COLORS.sky500 }]}>
            <Ionicons name="headset-outline" size={18} color={COLORS.white} />
          </View>
          <View style={settingsStyles.contactBody}>
            <UiText style={settingsStyles.contactName}>{t("settings.contactTechName")}</UiText>
            <UiText style={settingsStyles.contactSub}>{t("settings.contactTechSub")}</UiText>
          </View>
          <UiText style={settingsStyles.contactArrow}>{isRtl ? "←" : "→"}</UiText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onContactEmergency}
          style={[settingsStyles.contactBtn, settingsStyles.contactBtnLast, isRtl && settingsStyles.rowRtl]}
        >
          <View style={[settingsStyles.contactIc, { backgroundColor: COLORS.neonRed }]}>
            <Ionicons name="call-outline" size={18} color={COLORS.white} />
          </View>
          <View style={settingsStyles.contactBody}>
            <UiText style={settingsStyles.contactName}>{t("settings.contactEmergencyName")}</UiText>
            <UiText style={settingsStyles.contactSub}>{t("settings.contactEmergencySub")}</UiText>
          </View>
          <UiText style={settingsStyles.contactArrow}>{isRtl ? "←" : "→"}</UiText>
        </Pressable>
      </UICard>

      <UICard style={[settingsStyles.g3Card, settingsStyles.cardFlex0]}>
        <UiText style={settingsStyles.panelTitle}>{t("settings.directAssistTitle")}</UiText>
        <View style={[settingsStyles.amCard, isRtl && settingsStyles.rowRtl]}>
          <View style={settingsStyles.amAvatar}>
            <UiText style={settingsStyles.amAvatarText}>SA</UiText>
          </View>
          <View style={settingsStyles.amBody}>
            <UiText style={settingsStyles.amNm}>{t("settings.amName")}</UiText>
            <View
              style={[
                { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 },
                isRtl && settingsStyles.rowRtl,
              ]}
            >
              <UiText style={settingsStyles.amSub}>{t("settings.amRole")}</UiText>
              <View style={[{ flexDirection: "row", alignItems: "center", gap: 4 }, isRtl && settingsStyles.rowRtl]}>
                <View style={settingsStyles.liveDot} />
                <UiText style={[settingsStyles.amSub, { color: COLORS.trendPositiveDeep }]}>
                  {t("settings.amOnline")}
                </UiText>
              </View>
            </View>
          </View>
        </View>
        <View style={[settingsStyles.amStats, isRtl && settingsStyles.rowRtl]}>
          <View style={settingsStyles.amStatCell}>
            <UiText style={settingsStyles.amStatLabel}>{t("settings.amStatCalls")}</UiText>
            <UiText style={settingsStyles.amStatVal}>{t("settings.amStatCallsVal")}</UiText>
          </View>
          <View style={settingsStyles.amStatCell}>
            <UiText style={settingsStyles.amStatLabel}>{t("settings.amStatPickup")}</UiText>
            <UiText style={settingsStyles.amStatVal}>{t("settings.amStatPickupVal")}</UiText>
          </View>
          <View style={settingsStyles.amStatCell}>
            <UiText style={settingsStyles.amStatLabel}>{t("settings.amStatRating")}</UiText>
            <UiText style={settingsStyles.amStatVal}>{t("settings.amStatRatingVal")}</UiText>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onUrgentCall}
          style={({ pressed }) => [settingsStyles.urgentBtn, pressed && { opacity: 0.92 }]}
        >
          <Ionicons name="call" size={18} color={COLORS.portalInk} />
          <UiText style={settingsStyles.urgentBtnText}>{t("settings.urgentCall")}</UiText>
        </Pressable>
        <UiText style={settingsStyles.amNote}>{t("settings.amNote")}</UiText>
      </UICard>

      <UICard style={[settingsStyles.g3Card, settingsStyles.cardFlex0]}>
        <View style={[settingsStyles.flexBetween, isRtl && settingsStyles.rowRtl]}>
          <UiText style={[settingsStyles.panelTitle, settingsStyles.panelTitleInline]}>
            {t("settings.uxTitle")}
          </UiText>
          <View style={settingsStyles.uxBadgePill}>
            <UiText style={settingsStyles.uxBadgePillText}>{t("settings.uxBadge")}</UiText>
          </View>
        </View>
        <UiText style={settingsStyles.uxIntro}>{t("settings.uxIntro")}</UiText>
        <UiText style={settingsStyles.uxCatLabel}>{t("settings.uxCategory")}</UiText>
        <View style={[settingsStyles.chipRow, isRtl && settingsStyles.rowRtl]}>
          {UX_KEYS.map((key) => {
            const on = uxTopic === key;
            return (
              <Pressable
                key={key}
                accessibilityRole="button"
                onPress={() => {
                  setUxTopic(key);
                }}
                style={[settingsStyles.uxChip, on && settingsStyles.uxChipOn]}
              >
                <UiText style={[settingsStyles.uxChipText, on && settingsStyles.uxChipTextOn]}>
                  {chipLabel(key)}
                </UiText>
              </Pressable>
            );
          })}
        </View>
        <UiInput
          multiline
          numberOfLines={5}
          height={120}
          textAlignVertical="top"
          placeholder={t("settings.uxPlaceholder")}
          value={suggestion}
          onChangeText={setSuggestion}
          containerStyle={settingsStyles.uxInput}
          style={{ paddingTop: SPACING.sm }}
        />
        <Pressable
          accessibilityRole="button"
          onPress={onSubmitSuggestion}
          style={({ pressed }) => [settingsStyles.uxSubmitBtn, pressed && { opacity: 0.9 }]}
        >
          <UiText style={settingsStyles.uxSubmitBtnText}>{t("settings.uxSubmit")}</UiText>
        </Pressable>
      </UICard>
    </View>
  );
}
