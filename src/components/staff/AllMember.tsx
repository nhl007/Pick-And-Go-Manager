import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { I18nManager, Pressable, TextInput, View } from "react-native";

import { allMemberStyles as m } from "@/components/staff/AllMember.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { staffBaseModalStyles as mb } from "@/components/staff/StaffBaseModal.styles";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type StaffBucket = "all" | "onDuty" | "late" | "off";

export type DemoStaffMember = {
  id: string;
  name: string;
  roleDept: string;
  roleIcon: React.ComponentProps<typeof Ionicons>["name"];
  locationKey: "locationInside" | "locationOnDelivery" | "locationReturning";
  statusKey:
    | "statusClockedIn"
    | "statusOnDelivery"
    | "statusReturning"
    | "statusOffToday";
  shiftTime: string;
  orders: number | null;
  isTop?: boolean;
  isAdmin?: boolean;
  bucket: Exclude<StaffBucket, "all">;
};

const DEMO_TEAM: DemoStaffMember[] = [
  {
    id: "1",
    name: "Rami Abbas",
    roleDept: "Head Chef · Kitchen",
    roleIcon: "restaurant-outline",
    locationKey: "locationInside",
    statusKey: "statusClockedIn",
    shiftTime: "06:42",
    orders: 38,
    bucket: "onDuty",
  },
  {
    id: "2",
    name: "Ahmed Khalil",
    roleDept: "Runner · Delivery",
    roleIcon: "bicycle-outline",
    locationKey: "locationOnDelivery",
    statusKey: "statusOnDelivery",
    shiftTime: "06:05",
    orders: 52,
    isTop: true,
    bucket: "onDuty",
  },
  {
    id: "3",
    name: "Sara Fouad",
    roleDept: "Barista · Front",
    roleIcon: "cafe-outline",
    locationKey: "locationInside",
    statusKey: "statusClockedIn",
    shiftTime: "06:51",
    orders: 19,
    bucket: "late",
  },
  {
    id: "4",
    name: "Yousef Karim",
    roleDept: "Ops Admin · HQ",
    roleIcon: "card-outline",
    locationKey: "locationInside",
    statusKey: "statusClockedIn",
    shiftTime: "06:10",
    orders: null,
    isAdmin: true,
    bucket: "onDuty",
  },
  {
    id: "5",
    name: "Layla Osman",
    roleDept: "Runner · Delivery",
    roleIcon: "bicycle-outline",
    locationKey: "locationReturning",
    statusKey: "statusReturning",
    shiftTime: "06:40",
    orders: 24,
    bucket: "onDuty",
  },
  {
    id: "6",
    name: "Firas Badawi",
    roleDept: "Cashier · Front",
    roleIcon: "card-outline",
    locationKey: "locationInside",
    statusKey: "statusOffToday",
    shiftTime: "—",
    orders: null,
    bucket: "off",
  },
];

const COUNTS = { onDuty: 14, late: 3, off: 1, total: 18 };

export type AllStaffModalProps = {
  visible: boolean;
  onClose: () => void;
  onPressAddMember: () => void;
  t: TFunction;
};

export function AllStaffModal({ visible, onClose, onPressAddMember, t }: AllStaffModalProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StaffBucket>("all");

  const isRtl = I18nManager.isRTL;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEMO_TEAM.filter((row) => {
      if (filter !== "all" && row.bucket !== filter) return false;
      if (!q) return true;
      return (
        row.name.toLowerCase().includes(q) ||
        row.roleDept.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  const pill = (bucket: StaffBucket, label: string, n: number) => {
    const active = filter === bucket;
    return (
      <Pressable
        key={bucket}
        onPress={() => setFilter(bucket)}
        style={[m.filterPill, active && m.filterPillActive]}
      >
        <UiText style={[m.filterPillTxt, active && m.filterPillTxtActive]}>
          {label} ({n})
        </UiText>
      </Pressable>
    );
  };

  return (
    <StaffBaseModal
		maxWidth={980}
      visible={visible}
      onClose={onClose}
      header={
        <View>
          <View style={mb.modalBadge}>
            <View style={mb.modalBadgeDot} />
            <UiText style={mb.modalBadgeTxt}>{t("staff.fullTeamLiveStatus")}</UiText>
          </View>
          <UiText style={mb.modalTitle}>{t("staff.allStaffTitle")}</UiText>
          <UiText style={mb.modalSubtitle}>{t("staff.allStaffDescription")}</UiText>
        </View>
      }
      footer={
        <View style={[mb.modalFooterRow, { flexWrap: "wrap" }]}>
          <Pressable style={mb.outlineBtn} onPress={onClose}>
            <UiText style={mb.outlineBtnLabel}>{t("staff.btnClose")}</UiText>
          </Pressable>
          <Pressable style={mb.outlineBtnStrong} onPress={onPressAddMember}>
            <Ionicons name="add" size={18} color={COLORS.portalInk} />
            <UiText style={mb.outlineBtnLabel}>{t("staff.btnAddMemberShort")}</UiText>
          </Pressable>
        </View>
      }
    >
      <View style={m.statBoxesRow}>
        <View style={m.statMiniBox}>
          <UiText style={m.statMiniLbl}>{t("staff.onDutyStat")}</UiText>
          <UiText style={m.statMiniVal}>{String(COUNTS.onDuty)}</UiText>
        </View>
        <View style={m.statMiniBox}>
          <UiText style={m.statMiniLbl}>{t("staff.lateStat")}</UiText>
          <UiText style={m.statMiniVal}>{String(COUNTS.late)}</UiText>
        </View>
        <View style={m.statMiniBox}>
          <UiText style={m.statMiniLbl}>{t("staff.offTodayStat")}</UiText>
          <UiText style={m.statMiniVal}>{String(COUNTS.off)}</UiText>
        </View>
        <View style={m.statMiniBox}>
          <UiText style={m.statMiniLbl}>{t("staff.totalTeamStat")}</UiText>
          <UiText style={m.statMiniVal}>{String(COUNTS.total)}</UiText>
        </View>
      </View>

      <View style={m.searchRow}>
        <View style={m.searchBox}>
          <Ionicons name="search-outline" size={18} color={COLORS.ink4} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t("staff.searchPlaceholder")}
            placeholderTextColor={COLORS.ink5}
            style={m.searchInput}
          />
        </View>
        <View style={m.filterPillsRow}>
          {pill("all", t("staff.filterAll"), COUNTS.total)}
          {pill("onDuty", t("staff.filterOnDuty"), COUNTS.onDuty)}
          {pill("late", t("staff.filterLate"), COUNTS.late)}
          {pill("off", t("staff.filterOff"), COUNTS.off)}
        </View>
      </View>

      <View style={[m.tableHeaderRow, isRtl && m.rowRtl]}>
        <UiText style={[m.tableHeaderTxt, m.colMember]}>{t("staff.colMember")}</UiText>
        <UiText style={[m.tableHeaderTxt, m.colLocation]}>{t("staff.colLocation")}</UiText>
        <UiText style={[m.tableHeaderTxt, m.colStatus]}>{t("staff.colStatus")}</UiText>
        <UiText style={[m.tableHeaderTxt, m.colShift]}>{t("staff.colShiftTime")}</UiText>
        <UiText style={[m.tableHeaderTxt, m.colPerf]}>{t("staff.colPerformance")}</UiText>
      </View>

      {filtered.map((member) => (
        <View key={member.id} style={[m.staffRowCard, isRtl && m.rowRtl]}>
          {/* MEMBER */}
          <View style={[m.colMember, m.cellMember, isRtl && m.rowRtl]}>
            <View style={m.rowRoleIcon}>
              <Ionicons name={member.roleIcon} size={20} color={COLORS.portalInk} />
            </View>
            <View style={m.memberTextCol}>
              <UiText style={m.rowMemberName} numberOfLines={1}>
                {member.name}
              </UiText>
              <UiText style={m.rowMemberRole} numberOfLines={1}>
                {member.roleDept}
              </UiText>
            </View>
          </View>

          
          <View style={[m.colLocation, m.cellLeft]}>
            <View style={[m.badgeSoft, isRtl && m.rowRtl]}>
              <Ionicons name="location-outline" size={12} color={COLORS.trendPositiveDeep} />
              <UiText style={m.badgeSoftTxt} numberOfLines={1}>
                {t(`staff.${member.locationKey}`)}
              </UiText>
            </View>
          </View>

         
          <View style={[m.colStatus, m.cellLeft]}>
            <View style={[m.badgeSoft, isRtl && m.rowRtl]}>
              <View
                style={[mb.modalBadgeDot, { marginRight: 0, backgroundColor: COLORS.neonOrange }]}
              />
              <UiText style={m.badgeSoftTxt} numberOfLines={1}>
                {t(`staff.${member.statusKey}`)}
              </UiText>
            </View>
          </View>

     
          <View style={[m.colShift, m.cellLeft]}>
            <UiText style={m.shiftTimeTxt}>{member.shiftTime}</UiText>
          </View>

          <View style={[m.colPerf, m.cellLeft]}>
            {member.isAdmin && member.orders == null ? (
              <UiText style={m.adminDash}>— {t("staff.admin")}</UiText>
            ) : member.orders == null ? (
              <UiText style={m.adminDash}>—</UiText>
            ) : (
              <View style={[m.perfWrap, isRtl && m.rowRtl]}>
                <UiText style={m.perfNumber}>
                  {member.orders}{" "}
                  <UiText style={m.perfUnit}>{t("staff.ordersUnit")}</UiText>
                </UiText>
                {member.isTop && (
                  <View style={m.topPillFilled}>
                    <UiText style={m.topPillFilledTxt}>{t("staff.topTag")}</UiText>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      ))}
    </StaffBaseModal>
  );
}