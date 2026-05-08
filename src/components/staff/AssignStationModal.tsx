import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";

import { ActionConfirmationModal } from "@/components/staff/ActionConfirmationModal";
import { TeamMember } from "@/components/staff/AllTeamMembersModal";
import { assignStationModalStyles as s } from "@/components/staff/AssignStationModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type Workload = "heavy" | "medium" | "light" | "unassigned";

type LoadOption = {
  id: Workload;
  labelKey: string;
  subKey: string;
};

const LOAD_OPTIONS: LoadOption[] = [
  { id: "heavy", labelKey: "staff.workloadHeavy", subKey: "staff.workloadSubHeavy" },
  { id: "medium", labelKey: "staff.workloadMedium", subKey: "staff.workloadSubMedium" },
  { id: "light", labelKey: "staff.workloadLight", subKey: "staff.workloadSubLight" },
  { id: "unassigned", labelKey: "staff.workloadUnassigned", subKey: "staff.workloadSubUnassigned" },
];

const TEAM_MEMBERS_ALL: TeamMember[] = [
  { id: "1", name: "Rami Abbas", roleDept: "Head Chef", badgeId: "FB-2026-001", rating: "4.92", icon: "restaurant-outline", filter: "chefs", dept: "kitchen", station: "Kitchen Line", accessLevel: "Admin", phone: "+971 50 111 2233", email: "rami.abbas@frenchbakery.ae", shift: "06:00-14:00 · Mon-Fri", tenure: "5y 2m", ordersPerMonth: "—", attendance: "98%", startDate: "Sep 12, 2020", emergencyContact: "Yara Abbas · +971 50 555 7711" },
  { id: "2", name: "Ahmed Khalil", roleDept: "Runner · Auto-Pick", badgeId: "FB-2026-002", rating: "4.95", icon: "bicycle-outline", filter: "runners", dept: "runners", station: "Auto-Pick Dispatch", accessLevel: "Standard", phone: "+971 50 234 5678", email: "ahmed.khalil@frenchbakery.ae", shift: "07:00-15:00 · Mon-Sat", tenure: "2y 3m", ordersPerMonth: "1,247", attendance: "96%", startDate: "Jan 10, 2024", emergencyContact: "Mona Khalil · +971 50 888 2345" },
  { id: "3", name: "Layla Masoud", roleDept: "Barista · Coffee Bar", badgeId: "FB-2026-003", rating: "4.89", icon: "cafe-outline", filter: "barista", dept: "service", station: "Coffee Bar", accessLevel: "Standard", phone: "+971 50 333 1144", email: "layla.masoud@frenchbakery.ae", shift: "06:30-14:30 · Tue-Sun", tenure: "1y 11m", ordersPerMonth: "892", attendance: "94%", startDate: "Jun 04, 2024", emergencyContact: "Hassan Masoud · +971 50 444 9988" },
  { id: "4", name: "Omar Mansour", roleDept: "Runner · Auto-Pick", badgeId: "FB-2026-004", rating: "4.81", icon: "bicycle-outline", filter: "runners", dept: "runners", station: "Auto-Pick Dispatch", accessLevel: "Standard", phone: "+971 50 666 7788", email: "omar.mansour@frenchbakery.ae", shift: "10:00-18:00 · Mon-Sat", tenure: "8m", ordersPerMonth: "1,082", attendance: "92%", startDate: "Aug 22, 2025", emergencyContact: "Nadia Mansour · +971 50 222 3344" },
  { id: "5", name: "Yousef Karim", roleDept: "Assist. Manager", badgeId: "FB-2026-005", rating: "4.98", icon: "briefcase-outline", filter: "service", dept: "front", station: "Front Office", accessLevel: "Admin", phone: "+971 50 999 0001", email: "yousef.karim@frenchbakery.ae", shift: "08:00-17:00 · Mon-Fri", tenure: "3y 6m", ordersPerMonth: "—", attendance: "99%", startDate: "Oct 15, 2022", emergencyContact: "Karim Sr. · +971 50 777 8899" },
  { id: "6", name: "Nadia Ahmed", roleDept: "Server · Floor", badgeId: "FB-2026-006", rating: "4.86", icon: "fast-food-outline", filter: "service", dept: "service", station: "Floor Service", accessLevel: "Basic", phone: "+971 50 232 4455", email: "nadia.ahmed@frenchbakery.ae", shift: "11:00-19:00 · Wed-Sun", tenure: "1y 4m", ordersPerMonth: "—", attendance: "95%", startDate: "Jan 02, 2025", emergencyContact: "Salma Ahmed · +971 50 121 3434" },
  { id: "7", name: "Karim Hassan", roleDept: "Pastry Chef", badgeId: "FB-2026-007", rating: "4.94", icon: "ice-cream-outline", filter: "chefs", dept: "kitchen", station: "Pastry", accessLevel: "Advanced", phone: "+971 50 100 2233", email: "karim.hassan@frenchbakery.ae", shift: "05:00-13:00 · Tue-Sat", tenure: "4y 1m", ordersPerMonth: "—", attendance: "97%", startDate: "Mar 19, 2022", emergencyContact: "Layla Hassan · +971 50 990 7766" },
  { id: "9", name: "Tarek Ali", roleDept: "Line Cook", badgeId: "FB-2026-009", rating: "4.83", icon: "flame-outline", filter: "chefs", dept: "kitchen", station: "Grill Line", accessLevel: "Standard", phone: "+971 50 446 8899", email: "tarek.ali@frenchbakery.ae", shift: "10:00-18:00 · Tue-Sun", tenure: "2y 7m", ordersPerMonth: "—", attendance: "94%", startDate: "Sep 28, 2023", emergencyContact: "Ali Sr. · +971 50 778 1010" },
  { id: "10", name: "Hana Rashid", roleDept: "Host · Greeter", badgeId: "FB-2026-010", rating: "4.88", icon: "person-outline", filter: "service", dept: "front", station: "Front Desk", accessLevel: "Basic", phone: "+971 50 770 1144", email: "hana.rashid@frenchbakery.ae", shift: "09:00-17:00 · Mon-Sat", tenure: "1y 9m", ordersPerMonth: "—", attendance: "96%", startDate: "Aug 11, 2024", emergencyContact: "Rashid Sr. · +971 50 889 0099" },
  { id: "11", name: "Samir Nasr", roleDept: "Runner · Auto-Pick", badgeId: "FB-2026-011", rating: "4.75", icon: "bicycle-outline", filter: "runners", dept: "runners", station: "Auto-Pick Dispatch", accessLevel: "Standard", phone: "+971 50 332 1100", email: "samir.nasr@frenchbakery.ae", shift: "13:00-21:00 · Mon-Sat", tenure: "6m", ordersPerMonth: "841", attendance: "90%", startDate: "Nov 01, 2025", emergencyContact: "Nour Nasr · +971 50 442 1199" },
  { id: "12", name: "Dina Habib", roleDept: "Cashier · Front Desk", badgeId: "FB-2026-012", rating: "4.91", icon: "card-outline", filter: "cashier", dept: "front", station: "Front Desk", accessLevel: "Standard", phone: "+971 50 223 0987", email: "dina.habib@frenchbakery.ae", shift: "09:00-17:00 · Wed-Sun", tenure: "2y 2m", ordersPerMonth: "—", attendance: "97%", startDate: "Feb 25, 2024", emergencyContact: "Habib Sr. · +971 50 667 8899" },
  { id: "13", name: "Ibrahim Farah", roleDept: "Expeditor · Kitchen", badgeId: "FB-2026-013", rating: "4.87", icon: "clipboard-outline", filter: "chefs", dept: "kitchen", station: "Pass / Expo", accessLevel: "Standard", phone: "+971 50 901 2244", email: "ibrahim.farah@frenchbakery.ae", shift: "11:00-19:00 · Tue-Sat", tenure: "3y 0m", ordersPerMonth: "—", attendance: "95%", startDate: "Apr 30, 2023", emergencyContact: "Sara Farah · +971 50 200 1212" },
  { id: "14", name: "Zaid Omar", roleDept: "Prep Cook", badgeId: "FB-2026-014", rating: "4.78", icon: "file-tray-outline", filter: "chefs", dept: "kitchen", station: "Prep", accessLevel: "Basic", phone: "+971 50 100 9876", email: "zaid.omar@frenchbakery.ae", shift: "05:30-13:30 · Mon-Fri", tenure: "1y 1m", ordersPerMonth: "—", attendance: "93%", startDate: "Apr 10, 2025", emergencyContact: "Omar Sr. · +971 50 555 4433" },
  { id: "15", name: "Sara Fahmy", roleDept: "Cashier · Front Desk", badgeId: "FB-2026-015", rating: "4.74", icon: "card-outline", filter: "cashier", dept: "front", station: "Front Desk", accessLevel: "Standard", phone: "+971 50 311 2244", email: "sara.fahmy@frenchbakery.ae", shift: "12:00-20:00 · Mon-Sat", tenure: "11m", ordersPerMonth: "—", attendance: "92%", startDate: "Jun 12, 2025", emergencyContact: "Fahmy Sr. · +971 50 776 1133" },
  { id: "16", name: "Basem Rouf", roleDept: "Busboy", badgeId: "FB-2026-016", rating: "4.79", icon: "trash-outline", filter: "service", dept: "service", station: "Floor Service", accessLevel: "Basic", phone: "+971 50 887 6655", email: "basem.rouf@frenchbakery.ae", shift: "11:00-19:00 · Wed-Sun", tenure: "1y 3m", ordersPerMonth: "—", attendance: "94%", startDate: "Feb 09, 2025", emergencyContact: "Rouf Sr. · +971 50 909 4433" },
  { id: "17", name: "Yara Abbas", roleDept: "Barista · Coffee Bar", badgeId: "FB-2026-017", rating: "4.82", icon: "cafe-outline", filter: "barista", dept: "service", station: "Coffee Bar", accessLevel: "Standard", phone: "+971 50 778 1212", email: "yara.abbas@frenchbakery.ae", shift: "07:00-15:00 · Mon-Fri", tenure: "1y 6m", ordersPerMonth: "765", attendance: "93%", startDate: "Nov 12, 2024", emergencyContact: "Rami Abbas · +971 50 111 2233" },
  { id: "18", name: "Fatima Boudaoud", roleDept: "Line Cook · Grill", badgeId: "FB-2026-018", rating: "4.93", icon: "flame-outline", filter: "chefs", dept: "kitchen", station: "Grill Line", accessLevel: "Standard", phone: "+971 50 110 3322", email: "fatima.boudaoud@frenchbakery.ae", shift: "10:00-18:00 · Tue-Sat", tenure: "2y 9m", ordersPerMonth: "—", attendance: "96%", startDate: "Aug 04, 2023", emergencyContact: "Boudaoud Sr. · +971 50 666 1100" },
];

const RECOMMENDED_IDS = ["3", "14", "17"];

type StationToolKind = "swap" | "reinforce" | "break" | "close";

const STATION_TOOL_CONFIG: Record<
  StationToolKind,
  {
    icon: React.ComponentProps<typeof Ionicons>["name"];
    titleKey: string;
    bodyPrefixKey: string;
    bodySuffixKey: string;
    refPrefix: string;
  }
> = {
  swap: {
    icon: "swap-horizontal-outline",
    titleKey: "staff.swapStationConfirmTitle",
    bodyPrefixKey: "staff.swapStationConfirmBodyPrefix",
    bodySuffixKey: "staff.swapStationConfirmBodySuffix",
    refPrefix: "SWAP",
  },
  reinforce: {
    icon: "person-add-outline",
    titleKey: "staff.reinforceStationConfirmTitle",
    bodyPrefixKey: "staff.reinforceStationConfirmBodyPrefix",
    bodySuffixKey: "staff.reinforceStationConfirmBodySuffix",
    refPrefix: "RNF",
  },
  break: {
    icon: "time-outline",
    titleKey: "staff.breakStationConfirmTitle",
    bodyPrefixKey: "staff.breakStationConfirmBodyPrefix",
    bodySuffixKey: "staff.breakStationConfirmBodySuffix",
    refPrefix: "BRK",
  },
  close: {
    icon: "ban-outline",
    titleKey: "staff.closeStationConfirmTitle",
    bodyPrefixKey: "staff.closeStationConfirmBodyPrefix",
    bodySuffixKey: "staff.closeStationConfirmBodySuffix",
    refPrefix: "CLS",
  },
};

type WorkloadStyleMap = {
  badgeBox: object;
  badgeTxt: object;
  dotStyle: object;
};

const workloadHeaderStyle = (w: Workload, styles: typeof s): WorkloadStyleMap => {
  if (w === "heavy") return { badgeBox: styles.workloadBadgeHeaderHeavy, badgeTxt: styles.workloadBadgeHeaderTxtHeavy, dotStyle: styles.loadOptionDotHeavy };
  if (w === "medium") return { badgeBox: styles.workloadBadgeHeaderMedium, badgeTxt: styles.workloadBadgeHeaderTxtMedium, dotStyle: styles.loadOptionDotMedium };
  if (w === "light") return { badgeBox: styles.workloadBadgeHeaderLight, badgeTxt: styles.workloadBadgeHeaderTxtLight, dotStyle: styles.loadOptionDotLight };
  return { badgeBox: styles.workloadBadgeHeaderUnassigned, badgeTxt: styles.workloadBadgeHeaderTxtUnassigned, dotStyle: styles.loadOptionDotUnassigned };
};

const loadOptionDotStyle = (id: Workload): object => {
  if (id === "heavy") return s.loadOptionDotHeavy;
  if (id === "medium") return s.loadOptionDotMedium;
  if (id === "light") return s.loadOptionDotLight;
  return s.loadOptionDotUnassigned;
};

export type AssignStationModalProps = {
  visible: boolean;
  onClose: () => void;
  stationId: string;
  stationNameKey: string;
  stationIcon: React.ComponentProps<typeof Ionicons>["name"];
  stationWorkload: Workload;
  currentAssignee?: TeamMember;
  onConfirmAssign?: (member: TeamMember, newWorkload: Workload) => void;
  onSwapStation?: () => void;
  onAddReinforcement?: () => void;
  onScheduleBreak?: () => void;
  onCloseStation?: () => void;
  t: TFunction;
};

export function AssignStationModal({
  visible,
  onClose,
  stationNameKey,
  stationIcon,
  stationWorkload,
  currentAssignee,
  onConfirmAssign,
  onSwapStation,
  onAddReinforcement,
  onScheduleBreak,
  onCloseStation,
  t,
}: AssignStationModalProps) {
  const [query, setQuery] = useState("");
  const [selectedLoad, setSelectedLoad] = useState<Workload>(stationWorkload);
  const [successMember, setSuccessMember] = useState<TeamMember | null>(null);
  const [activeTool, setActiveTool] = useState<StationToolKind | null>(null);

  const toolConfig = activeTool ? STATION_TOOL_CONFIG[activeTool] : null;

  const wlHeader = workloadHeaderStyle(stationWorkload, s);

  const recommended = useMemo(() => {
    return TEAM_MEMBERS_ALL.filter((m) => RECOMMENDED_IDS.includes(m.id));
  }, []);

  const others = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEAM_MEMBERS_ALL.filter((m) => {
      if (RECOMMENDED_IDS.includes(m.id)) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.roleDept.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const filteredRecommended = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recommended;
    return recommended.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.roleDept.toLowerCase().includes(q)
    );
  }, [query, recommended]);

  const handleMemberPress = (member: TeamMember) => {
    setSuccessMember(member);
    onConfirmAssign?.(member, selectedLoad);
  };

  const handleSuccessDone = () => {
    setSuccessMember(null);
    onClose();
  };

  const handleToolPress = (kind: StationToolKind) => {
    setActiveTool(kind);
    if (kind === "swap") onSwapStation?.();
    if (kind === "reinforce") onAddReinforcement?.();
    if (kind === "break") onScheduleBreak?.();
    if (kind === "close") onCloseStation?.();
  };

  const handleToolConfirmDone = () => {
    setActiveTool(null);
    onClose();
  };

  return (
    <>
      <StaffBaseModal
        maxWidth={680}
        maxHeight={860}
        visible={visible && activeTool === null && successMember === null}
        onClose={onClose}
        bodyContentContainerStyle={s.bodyPad}
        header={
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={s.headerIconWrap}>
              <Ionicons name={stationIcon} size={22} color={COLORS.portalInk} />
            </View>
            <View style={s.bannerHeadingCol}>
              <View style={s.bannerTitleRow}>
                <UiText style={s.bannerTitle}>{t(stationNameKey)}</UiText>
                <View style={[s.workloadBadgeHeader, wlHeader.badgeBox]}>
                  <UiText style={[s.workloadBadgeHeaderTxt, wlHeader.badgeTxt]}>
                    {t(`staff.workload${stationWorkload.charAt(0).toUpperCase()}${stationWorkload.slice(1)}`)}
                  </UiText>
                </View>
              </View>
              <UiText style={s.bannerSubtitle}>{t("staff.assignModalSubtitle")}</UiText>
            </View>
          </View>
        }
      >
        {currentAssignee ? (
          <View style={s.currentlyAssignedSection}>
            <UiText style={s.currentlyAssignedLbl}>{t("staff.currentlyAssigned")}</UiText>
            <View style={s.currentAssigneeRow}>
              <View style={s.currentAssigneeIconWrap}>
                <Ionicons name={currentAssignee.icon} size={16} color={COLORS.portalInk} />
              </View>
              <View style={s.currentAssigneeTextCol}>
                <UiText style={s.currentAssigneeName}>{currentAssignee.name}</UiText>
                <UiText style={s.currentAssigneeRole}>
                  {currentAssignee.roleDept} · {currentAssignee.badgeId}
                </UiText>
              </View>
              <View style={s.activeBadge}>
                <UiText style={s.activeBadgeTxt}>{t("staff.activeStatus")}</UiText>
              </View>
            </View>
          </View>
        ) : null}

        <View style={s.selectReplacementHeading}>
          <UiText style={s.selectReplacementTitle}>{t("staff.selectReplacement")}</UiText>
          <UiText style={s.selectReplacementSubtitle}>{t("staff.recommendedRolesHint")}</UiText>
        </View>

        <View style={s.searchBox}>
          <Ionicons name="search-outline" size={16} color={COLORS.ink4} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t("staff.searchByNameOrRole")}
            placeholderTextColor={COLORS.ink5}
            style={s.searchInput}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 280 }}>
          {filteredRecommended.length > 0 ? (
            <View style={s.listSection}>
              <View style={s.listSectionHeader}>
                <UiText style={s.listSectionHeaderTxt}>
                  {t("staff.recommended")} · {filteredRecommended.length}
                </UiText>
              </View>
              {filteredRecommended.map((member) => (
                <Pressable
                  key={member.id}
                  onPress={() => { handleMemberPress(member); }}
                  style={s.memberRow}
                >
                  <View style={s.memberIconWrap}>
                    <Ionicons name={member.icon} size={16} color={COLORS.portalInk} />
                  </View>
                  <View style={s.memberTextCol}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <UiText style={s.memberName} numberOfLines={1}>{member.name}</UiText>
                      <Ionicons
                        name="star"
                        size={10}
                        color={COLORS.neonOrange}
                        style={s.starIcon}
                      />
                    </View>
                    <UiText style={s.memberMeta} numberOfLines={1}>
                      {member.roleDept} · {member.station}
                    </UiText>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={COLORS.ink4} />
                </Pressable>
              ))}
            </View>
          ) : null}

          {others.length > 0 ? (
            <View style={s.listSection}>
              <View style={s.listSectionHeader}>
                <UiText style={s.listSectionHeaderTxt}>
                  {t("staff.otherStaff")} · {others.length}
                </UiText>
              </View>
              {others.map((member) => (
                <Pressable
                  key={member.id}
                  onPress={() => { handleMemberPress(member); }}
                  style={s.memberRow}
                >
                  <View style={s.memberIconWrap}>
                    <Ionicons name={member.icon} size={16} color={COLORS.portalInk} />
                  </View>
                  <View style={s.memberTextCol}>
                    <UiText style={s.memberName} numberOfLines={1}>{member.name}</UiText>
                    <UiText style={s.memberMeta} numberOfLines={1}>
                      {member.roleDept} · {member.station}
                    </UiText>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={COLORS.ink4} />
                </Pressable>
              ))}
            </View>
          ) : null}

          {filteredRecommended.length === 0 && others.length === 0 ? (
            <View style={s.emptyState}>
              <UiText style={s.emptyStateTxt}>{t("staff.dirEmptyState")}</UiText>
            </View>
          ) : null}
        </ScrollView>

        <View style={s.hintBox}>
          <Ionicons name="information-circle-outline" size={14} color={COLORS.ink4} />
          <UiText style={s.hintTxt}>{t("staff.assignHint")}</UiText>
        </View>

        <View style={s.setLoadSection}>
          <UiText style={s.setLoadTitle}>{t("staff.setStationLoad")}</UiText>
          <View style={s.loadOptionsRow}>
            {LOAD_OPTIONS.map((opt) => (
              <Pressable
                key={opt.id}
                onPress={() => { setSelectedLoad(opt.id); }}
                style={[s.loadOption, selectedLoad === opt.id && s.loadOptionActive]}
              >
                <View style={[s.loadOptionDot, loadOptionDotStyle(opt.id)]} />
                <UiText style={s.loadOptionLabel}>{t(opt.labelKey)}</UiText>
                <UiText style={s.loadOptionSub}>{t(opt.subKey)}</UiText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={s.stationToolsSection}>
          <UiText style={s.stationToolsTitle}>{t("staff.stationTools")}</UiText>
          <View style={s.stationToolsGrid}>
            <Pressable style={s.toolBtn} onPress={() => { handleToolPress("swap"); }}>
              <Ionicons name="swap-horizontal-outline" size={16} color={COLORS.portalInk} />
              <UiText style={s.toolBtnTxt}>{t("staff.swapWithStation")}</UiText>
            </Pressable>
            <Pressable style={s.toolBtn} onPress={() => { handleToolPress("reinforce"); }}>
              <Ionicons name="person-add-outline" size={16} color={COLORS.portalInk} />
              <UiText style={s.toolBtnTxt}>{t("staff.addReinforcement")}</UiText>
            </Pressable>
            <Pressable style={s.toolBtn} onPress={() => { handleToolPress("break"); }}>
              <Ionicons name="time-outline" size={16} color={COLORS.portalInk} />
              <UiText style={s.toolBtnTxt}>{t("staff.scheduleBreak")}</UiText>
            </Pressable>
            <Pressable style={[s.toolBtn, s.toolBtnDanger]} onPress={() => { handleToolPress("close"); }}>
              <Ionicons name="ban-outline" size={16} color="rgb(220, 38, 38)" />
              <UiText style={[s.toolBtnTxt, s.toolBtnTxtDanger]}>{t("staff.closeStation")}</UiText>
            </Pressable>
          </View>
        </View>

        <Pressable style={s.cancelBtn} onPress={onClose}>
          <UiText style={s.cancelBtnTxt}>{t("staff.cancel")}</UiText>
        </Pressable>
      </StaffBaseModal>

      {successMember ? (
        <ActionConfirmationModal
          visible={successMember !== null}
          onClose={handleSuccessDone}
          icon="checkmark"
          title={t("staff.stationReassigned")}
          bodyPrefix=""
          bodyBold={`${successMember.name} (${successMember.roleDept})`}
          bodySuffix={` ${t("staff.hasBeenAssignedTo")} ${t(stationNameKey)}. ${t("staff.previousAssigneeFreeUp")}`}
          refLabel={t("staff.ref")}
          refPrefix="STN"
          doneLabel={t("staff.done")}
        />
      ) : null}

      {toolConfig ? (
        <ActionConfirmationModal
          visible={activeTool !== null}
          onClose={handleToolConfirmDone}
          icon={toolConfig.icon}
          title={t(toolConfig.titleKey)}
          bodyPrefix={t(toolConfig.bodyPrefixKey)}
          bodyBold={t(stationNameKey)}
          bodySuffix={t(toolConfig.bodySuffixKey)}
          refLabel={t("staff.ref")}
          refPrefix={toolConfig.refPrefix}
          doneLabel={t("staff.done")}
        />
      ) : null}
    </>
  );
}