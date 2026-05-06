import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

import { UICard } from "@/components/ui/UICard";
import { UiText } from "@/components/ui/UiText";
import { settingsStyles } from "@/constants/settings.styles";
import { COLORS } from "@/constants/styles";

type SessionDef = {
  key: string;
  kind: "current" | "default" | "warn";
  icon: keyof typeof Ionicons.glyphMap;
  nameKey: string;
  subKey: string;
  loggedKey: string;
  ipKey: string;
  warnTagKey?: string;
};

type Props = {
  t: TFunction;
  isRtl: boolean;
  onTerminate: (deviceKey: string) => void;
  onLogoutThisDevice: () => void;
  onLogoutAllDevices: () => void;
};

export function SettingsSystemSection({
  t,
  isRtl,
  onTerminate,
  onLogoutThisDevice,
  onLogoutAllDevices,
}: Props) {
  const sessions = useMemo<SessionDef[]>(
    () => [
      {
        key: "ipad",
        kind: "current",
        icon: "tablet-portrait-outline",
        nameKey: "settings.session1Name",
        subKey: "settings.session1Sub",
        loggedKey: "settings.session1Logged",
        ipKey: "settings.session1Ip",
      },
      {
        key: "iphone",
        kind: "default",
        icon: "phone-portrait-outline",
        nameKey: "settings.session2Name",
        subKey: "settings.session2Sub",
        loggedKey: "settings.session2Logged",
        ipKey: "settings.session2Ip",
      },
      {
        key: "mac",
        kind: "default",
        icon: "laptop-outline",
        nameKey: "settings.session3Name",
        subKey: "settings.session3Sub",
        loggedKey: "settings.session3Logged",
        ipKey: "settings.session3Ip",
      },
      {
        key: "android",
        kind: "warn",
        icon: "phone-portrait-outline",
        nameKey: "settings.session4Name",
        subKey: "settings.session4Sub",
        loggedKey: "settings.session4Logged",
        ipKey: "settings.session4Ip",
        warnTagKey: "settings.session4WarnTag",
      },
    ],
    [],
  );

  return (
    <View style={[settingsStyles.g21, isRtl && settingsStyles.rowRtl]}>
      <View style={settingsStyles.g21Main}>
        <UICard style={settingsStyles.cardFlex0}>
          <View style={[settingsStyles.flexBetween, isRtl && settingsStyles.rowRtl]}>
            <UiText style={[settingsStyles.panelTitle, settingsStyles.panelTitleInline]}>
              {t("settings.sessionsTitle")}
            </UiText>
            <View style={[settingsStyles.sessionsBadge, isRtl && settingsStyles.rowRtl]}>
              <UiText style={[settingsStyles.sessionsBadgeText, { fontFamily: "Inter_900Black" }]}>
                {t("settings.sessionsBadgeCount")}
              </UiText>
              <UiText style={settingsStyles.sessionsBadgeText}> {t("settings.sessionsBadgeRest")}</UiText>
            </View>
          </View>
          {sessions.map((s, index) => {
            const isLast = index === sessions.length - 1;
            return (
              <View
                key={s.key}
                style={[
                  settingsStyles.sessionRow,
                  isLast && settingsStyles.sessionRowLast,
                  s.kind === "current" && settingsStyles.sessionRowCurrent,
                  s.kind === "warn" && settingsStyles.sessionRowWarn,
                  isRtl && settingsStyles.rowRtl,
                ]}
              >
                <View style={[settingsStyles.sessIc, s.kind === "warn" && settingsStyles.sessIcWarn]}>
                  <Ionicons name={s.icon} size={18} color={COLORS.portalInk} />
                </View>
                <View style={settingsStyles.sessBody}>
                  <Text style={settingsStyles.sessNm}>
                    {t(s.nameKey)}
                    {s.kind === "current" ? (
                      <>
                        {" · "}
                        <Text style={settingsStyles.sessThis}>{t("settings.sessionThisDevice")}</Text>
                      </>
                    ) : null}
                    {s.warnTagKey ? (
                      <Text style={settingsStyles.warnTag}>
                        {"  "}
                        {t(s.warnTagKey)}
                      </Text>
                    ) : null}
                  </Text>
                  <UiText style={settingsStyles.sessSub}>{t(s.subKey)}</UiText>
                  <View style={[settingsStyles.sessMeta, isRtl && settingsStyles.rowRtl]}>
                    <UiText style={settingsStyles.sessMetaText}>{t(s.loggedKey)}</UiText>
                    <UiText style={settingsStyles.sessMetaText}>{t(s.ipKey)}</UiText>
                  </View>
                </View>
                {s.kind === "current" ? (
                  <View style={[settingsStyles.sessFlag, isRtl && settingsStyles.rowRtl]}>
                    <View style={settingsStyles.liveDot} />
                    <UiText style={settingsStyles.sessFlagText}>{t("settings.sessionCurrent")}</UiText>
                  </View>
                ) : (
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => {
                      onTerminate(s.key);
                    }}
                    style={[
                      settingsStyles.sessKill,
                      s.kind === "warn" && settingsStyles.sessKillWarn,
                    ]}
                  >
                    <UiText
                      style={[
                        settingsStyles.sessKillText,
                        s.kind === "warn" && settingsStyles.sessKillWarnText,
                      ]}
                    >
                      {s.kind === "warn"
                        ? t("settings.sessionTerminateNow")
                        : t("settings.sessionTerminate")}
                    </UiText>
                  </Pressable>
                )}
              </View>
            );
          })}
        </UICard>
      </View>

      <View style={settingsStyles.g21Side}>
        <UICard style={settingsStyles.cardFlex0}>
          <UiText style={settingsStyles.panelTitle}>{t("settings.secureLogoutTitle")}</UiText>
          <UiText style={settingsStyles.logoutDesc}>{t("settings.secureLogoutDesc")}</UiText>
          <View style={[settingsStyles.logoutChecks, isRtl && settingsStyles.rowRtl]}>
            <View style={settingsStyles.logoutCheck}>
              <UiText style={{ fontFamily: "Inter_800ExtraBold", fontSize: 11, color: COLORS.secondary }}>
                ✓
              </UiText>
              <UiText style={settingsStyles.logoutCheckText}>{t("settings.secureCheck1")}</UiText>
            </View>
            <View style={settingsStyles.logoutCheck}>
              <UiText style={{ fontFamily: "Inter_800ExtraBold", fontSize: 11, color: COLORS.secondary }}>
                ✓
              </UiText>
              <UiText style={settingsStyles.logoutCheckText}>{t("settings.secureCheck2")}</UiText>
            </View>
            <View style={settingsStyles.logoutCheck}>
              <UiText style={{ fontFamily: "Inter_800ExtraBold", fontSize: 11, color: COLORS.secondary }}>
                ✓
              </UiText>
              <UiText style={settingsStyles.logoutCheckText}>{t("settings.secureCheck3")}</UiText>
            </View>
            <View style={settingsStyles.logoutCheck}>
              <UiText style={{ fontFamily: "Inter_800ExtraBold", fontSize: 11, color: COLORS.secondary }}>
                ✓
              </UiText>
              <UiText style={settingsStyles.logoutCheckText}>{t("settings.secureCheck4")}</UiText>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onLogoutThisDevice}
            style={({ pressed }) => [settingsStyles.logoutBtn, pressed && { opacity: 0.92 }]}
          >
            <Ionicons name="log-out-outline" size={16} color={COLORS.white} />
            <UiText style={settingsStyles.logoutBtnText}>{t("settings.logoutThisDevice")}</UiText>
          </Pressable>
        </UICard>

        <UICard style={[settingsStyles.cardFlex0, settingsStyles.emergencyPanel]}>
          <View style={[settingsStyles.flexBetween, isRtl && settingsStyles.rowRtl]}>
            <UiText style={[settingsStyles.panelTitle, settingsStyles.panelTitleInline]}>
              {t("settings.emergencyTitle")}
            </UiText>
            <View style={settingsStyles.emergencyBadge}>
              <UiText style={settingsStyles.emergencyBadgeText}>{t("settings.emergencyBadge")}</UiText>
            </View>
          </View>
          <UiText style={settingsStyles.logoutDesc}>{t("settings.emergencyDesc", { count: 4 })}</UiText>
          <Pressable
            accessibilityRole="button"
            onPress={onLogoutAllDevices}
            style={({ pressed }) => [settingsStyles.emergencyBtn, pressed && { opacity: 0.92 }]}
          >
            <Ionicons name="warning-outline" size={18} color={COLORS.white} />
            <UiText style={settingsStyles.emergencyBtnText}>{t("settings.emergencyLogoutAll")}</UiText>
          </Pressable>
        </UICard>
      </View>
    </View>
  );
}
