import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import { I18nManager, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";

import { AddTeamMemberModal } from "@/components/staff/AddTeamMemberModal";
import { AllStaffModal } from "@/components/staff/AllMember";
import { UiLiveBlinkDot } from "@/components/ui/UiLiveBlinkDot";
import { UiText } from "@/components/ui/UiText";
import { staffStyles as styles } from "@/constants/staff";
import { COLORS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useNowTicker } from "@/hooks/useNowTicker";

const SNAPSHOT = { clocked: 14, late: 3, off: 1 };
const HEADER_QUICK = { clocked: 15, late: 3, off: 1 };
const TEAM = {
  registered: 18,
  roles: 13,
  avgRating: "4.87",
  attendance: "96%",
};

export default function StaffAndPrivilegesScreen() {
  const { t, i18n } = useAppTranslation();
  const now = useNowTicker();
  const { width } = useWindowDimensions();
  const [allStaffVisible, setAllStaffVisible] = useState(false);
  const [addMemberVisible, setAddMemberVisible] = useState(false);

  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );

  const horizontalPad = Math.min(30, Math.max(SPACING.md, width * 0.02));

  const timeLine = useMemo(() => {
    return now.toLocaleTimeString(i18n.language === "ar" ? "ar-AE" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }, [i18n.language, now]);

  const dateLine = useMemo(() => {
    return now.toLocaleDateString(i18n.language === "ar" ? "ar-AE" : "en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [i18n.language, now]);

  const clockedInitials = ["RA", "AK", "LM", "OM"];

  const openAllStaff = () => setAllStaffVisible(true);
  const openAddMember = () => {
    setAllStaffVisible(false);
    setAddMemberVisible(true);
  };

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPad }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroDisplay}>
          <View style={[styles.heroAmountRow, isRtl && styles.rowRtl]}>
            <UiText style={styles.heroNumber} numberOfLines={1} adjustsFontSizeToFit>
              {t("staff.heroProjected")}
            </UiText>
          </View>
        </View>

        <View style={[styles.meta, isRtl && styles.rowRtl]}>
          <View style={styles.metaLeft}>
            <View style={styles.brandStack}>
              <UiText style={styles.brandName}>{t("staff.brandName")}</UiText>
              <UiText style={styles.brandBranch}>{t("staff.brandBranch")}</UiText>
            </View>
          </View>

          <View style={styles.metaMid}>
            <View style={[styles.metaMidRow, isRtl && styles.rowRtl]}>
              <Ionicons name="pulse-outline" size={14} color={COLORS.accentAmber} />
              <Text style={styles.metaMidText}>
                {t("staff.projectedLinePrefix")}
                <Text style={styles.metaMidStrong}>
                  {t("staff.projectedHighlight", {
                    count: HEADER_QUICK.clocked,
                    late: HEADER_QUICK.late,
                    off: HEADER_QUICK.off,
                  })}
                </Text>
              </Text>
            </View>
            <View style={styles.metaMidRow}>
              <UiText style={styles.metaMidSmall}>
                {t("staff.syncLineStart")}
                <UiText style={styles.metaMidLive}>{t("staff.live")}</UiText>
              </UiText>
            </View>
          </View>

          <View style={[styles.metaRight, isRtl && styles.metaRightRtl]}>
            <UiText style={styles.metaTime}>{timeLine}</UiText>
            <UiText style={styles.metaDate}>{dateLine}</UiText>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={[styles.pgHead, isRtl && styles.rowRtl]}>
          <View style={styles.pgHeadTitle}>
            <UiText style={styles.h1Light}>{t("staff.titleLine1")}</UiText>
            <UiText style={styles.h1Strong}>{t("staff.titleStrong")}</UiText>
          </View>
          <UiText style={styles.tag}>{t("staff.subtitle")}</UiText>
        </View>

        <View
          style={[
            styles.sectionHeadRow,
            isRtl && styles.rowRtl,
            { justifyContent: "space-between", width: "100%" },
          ]}
        >
          <View style={{ flex: 1, minWidth: 180 }}>
            <UiText style={styles.sectionTitle}>{t("staff.operationsTitle")}</UiText>
            <UiText style={styles.sectionCaption}>{t("staff.operationsCaption")}</UiText>
          </View>
          <View style={[styles.liveBadge, isRtl && styles.rowRtl]}>
            <UiLiveBlinkDot />
            <UiText style={styles.liveBadgeText}>{t("staff.live")}</UiText>
          </View>
        </View>

        <View style={styles.attendancePanel}>
          <View style={[styles.panelKickerRow, isRtl && styles.rowRtl]}>
            <UiText style={styles.panelKicker}>{t("staff.digitalClockKicker")}</UiText>
            <View style={[styles.panelQuickStats, isRtl && styles.rowRtl]}>
              <UiText style={styles.quickStatYellow}>
                {t("staff.quickStatClocked", { count: HEADER_QUICK.clocked })}
              </UiText>
              <UiText style={styles.quickStatOrange}>
                {t("staff.quickStatLate", { count: HEADER_QUICK.late })}
              </UiText>
              <UiText style={styles.quickStatGrey}>
                {t("staff.quickStatOff", { count: HEADER_QUICK.off })}
              </UiText>
            </View>
          </View>

          {/* ───────────── snapshot row — 3 cards, each laid out [icon | value+label | initials] ───────────── */}
          <View style={[styles.snapshotGrid, isRtl && styles.rowRtl]}>
            {/* Card 1 — Clocked in */}
            <View style={[styles.snapshotCard, styles.snapshotCardAccent, isRtl && styles.rowRtl]}>
              <View style={styles.snapshotIconWrap}>
                <Ionicons name="checkmark-circle" size={22} color={COLORS.trendPositiveDeep} />
              </View>
              <View style={styles.snapshotBody}>
                <UiText
                  style={[styles.snapshotValue, styles.snapshotValueAccent]}
                  numberOfLines={1}
                >
                  {String(SNAPSHOT.clocked)}
                </UiText>
                <UiText style={styles.snapshotLabel} numberOfLines={2}>
                  {t("staff.clockedInLabel")}
                </UiText>
              </View>
              <View style={[styles.initialsStack, isRtl && styles.rowRtl]}>
                {clockedInitials.map((x) => (
                  <View key={x} style={styles.initialsPill}>
                    <UiText style={styles.initialsText}>{x}</UiText>
                  </View>
                ))}
                <View style={styles.morePill}>
                  <UiText style={styles.initialsText}>
                    {t("staff.snapshotMore", { count: 10 })}
                  </UiText>
                </View>
              </View>
            </View>

            {/* Card 2 — Late arrivals */}
            <View style={[styles.snapshotCard, styles.snapshotCardAccent, isRtl && styles.rowRtl]}>
              <View style={styles.snapshotIconWrap}>
                <Ionicons name="time-outline" size={22} color={COLORS.portalInk} />
              </View>
              <View style={styles.snapshotBody}>
                <UiText style={styles.snapshotValue} numberOfLines={1}>
                  {String(SNAPSHOT.late)}
                </UiText>
                <UiText style={styles.snapshotLabel} numberOfLines={2}>
                  {t("staff.lateArrivalsLabel")}
                </UiText>
              </View>
              <View style={[styles.initialsStack, isRtl && styles.rowRtl]}>
                <View style={styles.initialsPill}>
                  <UiText style={styles.initialsText}>SF</UiText>
                </View>
                <View style={styles.morePill}>
                  <UiText style={styles.initialsText}>
                    {t("staff.snapshotMore", { count: 2 })}
                  </UiText>
                </View>
              </View>
            </View>


            <View style={[styles.snapshotCard, styles.snapshotCardAccent, isRtl && styles.rowRtl]}>
            <View style={styles.snapshotIconWrap}>
                <Ionicons name="calendar-outline" size={22} color={COLORS.portalInk} />
              </View>
              <View style={styles.snapshotBody}>
                <UiText style={styles.snapshotValue} numberOfLines={1}>
                {String(SNAPSHOT.off)}
                </UiText>
                <UiText style={styles.snapshotLabel} numberOfLines={2}>
                {t("staff.offTodayLabel")}
                </UiText>
              </View>
              <View style={[styles.initialsStack, isRtl && styles.rowRtl]}>
                <View style={[styles.initialsStack, isRtl && styles.rowRtl]}>
                <View style={styles.initialsPill}>
                  <UiText style={styles.initialsText}>FB</UiText>
                </View>
              </View>
              </View>
            </View>
          </View>

          <View style={[styles.attendanceFooter, isRtl && styles.rowRtl]}>
            <View style={[styles.topTodayRow, isRtl && styles.rowRtl]}>
              <View style={[styles.trophyBadge, isRtl && styles.rowRtl]}>
                <Ionicons name="trophy" size={12} color={COLORS.neonOrange} />
                <UiText style={styles.trophyText}>{t("staff.topTodayBadge")}</UiText>
              </View>
              <View style={styles.topAvatar}>
                <UiText style={styles.topAvatarTxt}>AK</UiText>
              </View>
              <View style={styles.topNameBlock}>
                <UiText style={styles.topName}>Ahmed Khalil</UiText>
                <UiText style={styles.topSub}>
                  {t("staff.topPerformerSub", { orders: 52, role: "Runner" })}
                </UiText>
              </View>
            </View>
            <Pressable onPress={openAllStaff} hitSlop={8}>
              <UiText style={styles.linkBold}>{t("staff.viewAllStaff")} →</UiText>
            </Pressable>
          </View>
        </View>

        <View
          style={[
            styles.sectionHeadRow,
            isRtl && styles.rowRtl,
            { marginTop: SPACING.lg, justifyContent: "space-between", width: "100%" },
          ]}
        >
          <View style={{ flex: 1, minWidth: 200 }}>
            <UiText style={styles.sectionTitle}>{t("staff.teamDirectoryTitle")}</UiText>
            <UiText style={styles.sectionCaption}>{t("staff.teamDirectoryCaption")}</UiText>
          </View>
          <View style={styles.registeredBadge}>
            <UiText style={styles.registeredBadgeText}>
              {t("staff.registeredBadge", { count: TEAM.registered })}
            </UiText>
          </View>
        </View>

        <View style={styles.dirCardOuter}>
          <View style={[styles.dirMainRow, isRtl && styles.rowRtl]}>
            <View style={styles.dirLeftCol}>
              <UiText style={styles.dirBrowseTitle}>{t("staff.browseMembersTitle")}</UiText>
              <UiText style={styles.dirBrowseDesc}>{t("staff.browseMembersDesc")}</UiText>
            </View>
            <View style={styles.dirRightCol}>
              <View style={[styles.roleIconsRow, isRtl && styles.rowRtl]}>
                <Ionicons name="restaurant-outline" size={20} color={COLORS.ink3} />
                <Ionicons name="bicycle-outline" size={20} color={COLORS.ink3} />
                <Ionicons name="cafe-outline" size={20} color={COLORS.ink3} />
                <Ionicons name="card-outline" size={20} color={COLORS.ink3} />
                <View style={styles.plusBadge}>
                  <UiText style={styles.plusBadgeTxt}>
                    {t("staff.roleMore", { count: 14 })}
                  </UiText>
                </View>
              </View>
              <View style={[styles.metricColumns, isRtl && styles.rowRtl]}>
                <View style={styles.metricCol}>
                  <UiText style={styles.metricValue}>{String(TEAM.registered)}</UiText>
                  <UiText style={styles.metricLbl}>{t("staff.metricMembers")}</UiText>
                </View>
                <View style={styles.metricCol}>
                  <UiText style={styles.metricValue}>{String(TEAM.roles)}</UiText>
                  <UiText style={styles.metricLbl}>{t("staff.metricRoles")}</UiText>
                </View>
                <View style={styles.metricCol}>
                  <UiText style={styles.metricValue}>{TEAM.avgRating}</UiText>
                  <UiText style={styles.metricLbl}>{t("staff.metricAvgRating")}</UiText>
                </View>
                <View style={styles.metricCol}>
                  <UiText style={styles.metricValue}>{TEAM.attendance}</UiText>
                  <UiText style={styles.metricLbl}>{t("staff.metricAttendance")}</UiText>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.dirFooterRow, isRtl && styles.rowRtl]}>
            <Pressable onPress={openAllStaff} hitSlop={8}>
              <UiText style={styles.linkBold}>{t("staff.seeAllMembers")} →</UiText>
            </Pressable>
          </View>
        </View>

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>

      <AllStaffModal
        visible={allStaffVisible}
        onClose={() => setAllStaffVisible(false)}
        onPressAddMember={openAddMember}
        t={t}
      />
      <AddTeamMemberModal
        visible={addMemberVisible}
        onClose={() => setAddMemberVisible(false)}
        t={t}
      />
    </>
  );
}