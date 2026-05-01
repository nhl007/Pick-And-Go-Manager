import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import { allTeamMembersModalStyles as s } from "@/components/staff/AllTeamMembersModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type FilterBucket = "all" | "chefs" | "runners" | "barista" | "cashier" | "service";
type DeptBucket = "kitchen" | "service" | "runners" | "front";

export type TeamMember = {
  id: string;
  name: string;
  roleDept: string;
  badgeId: string;
  rating: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  filter: Exclude<FilterBucket, "all">;
  dept: DeptBucket;
  station: string;
  accessLevel: string;
  phone: string;
  email: string;
  shift: string;
  tenure: string;
  ordersPerMonth: string;
  attendance: string;
  startDate: string;
  emergencyContact: string;
};

const TEAM: TeamMember[] = [
  { id: "1", name: "Rami Abbas", roleDept: "Head Chef", badgeId: "FB-2026-001", rating: "4.92", icon: "restaurant-outline", filter: "chefs", dept: "kitchen", station: "Kitchen Line", accessLevel: "Admin", phone: "+971 50 111 2233", email: "rami.abbas@frenchbakery.ae", shift: "06:00-14:00 · Mon-Fri", tenure: "5y 2m", ordersPerMonth: "—", attendance: "98%", startDate: "Sep 12, 2020", emergencyContact: "Yara Abbas · +971 50 555 7711" },
  { id: "2", name: "Ahmed Khalil", roleDept: "Runner · Auto-Pick", badgeId: "FB-2026-002", rating: "4.95", icon: "bicycle-outline", filter: "runners", dept: "runners", station: "Auto-Pick Dispatch", accessLevel: "Standard", phone: "+971 50 234 5678", email: "ahmed.khalil@frenchbakery.ae", shift: "07:00-15:00 · Mon-Sat", tenure: "2y 3m", ordersPerMonth: "1,247", attendance: "96%", startDate: "Jan 10, 2024", emergencyContact: "Mona Khalil · +971 50 888 2345" },
  { id: "3", name: "Layla Masoud", roleDept: "Barista · Coffee Bar", badgeId: "FB-2026-003", rating: "4.89", icon: "cafe-outline", filter: "barista", dept: "service", station: "Coffee Bar", accessLevel: "Standard", phone: "+971 50 333 1144", email: "layla.masoud@frenchbakery.ae", shift: "06:30-14:30 · Tue-Sun", tenure: "1y 11m", ordersPerMonth: "892", attendance: "94%", startDate: "Jun 04, 2024", emergencyContact: "Hassan Masoud · +971 50 444 9988" },
  { id: "4", name: "Omar Mansour", roleDept: "Runner · Auto-Pick", badgeId: "FB-2026-004", rating: "4.81", icon: "bicycle-outline", filter: "runners", dept: "runners", station: "Auto-Pick Dispatch", accessLevel: "Standard", phone: "+971 50 666 7788", email: "omar.mansour@frenchbakery.ae", shift: "10:00-18:00 · Mon-Sat", tenure: "8m", ordersPerMonth: "1,082", attendance: "92%", startDate: "Aug 22, 2025", emergencyContact: "Nadia Mansour · +971 50 222 3344" },
  { id: "5", name: "Yousef Karim", roleDept: "Assist. Manager", badgeId: "FB-2026-005", rating: "4.98", icon: "briefcase-outline", filter: "service", dept: "front", station: "Front Office", accessLevel: "Admin", phone: "+971 50 999 0001", email: "yousef.karim@frenchbakery.ae", shift: "08:00-17:00 · Mon-Fri", tenure: "3y 6m", ordersPerMonth: "—", attendance: "99%", startDate: "Oct 15, 2022", emergencyContact: "Karim Sr. · +971 50 777 8899" },
  { id: "6", name: "Nadia Ahmed", roleDept: "Server · Floor", badgeId: "FB-2026-006", rating: "4.86", icon: "fast-food-outline", filter: "service", dept: "service", station: "Floor Service", accessLevel: "Basic", phone: "+971 50 232 4455", email: "nadia.ahmed@frenchbakery.ae", shift: "11:00-19:00 · Wed-Sun", tenure: "1y 4m", ordersPerMonth: "—", attendance: "95%", startDate: "Jan 02, 2025", emergencyContact: "Salma Ahmed · +971 50 121 3434" },
  { id: "7", name: "Karim Hassan", roleDept: "Pastry Chef", badgeId: "FB-2026-007", rating: "4.94", icon: "ice-cream-outline", filter: "chefs", dept: "kitchen", station: "Pastry", accessLevel: "Advanced", phone: "+971 50 100 2233", email: "karim.hassan@frenchbakery.ae", shift: "05:00-13:00 · Tue-Sat", tenure: "4y 1m", ordersPerMonth: "—", attendance: "97%", startDate: "Mar 19, 2022", emergencyContact: "Layla Hassan · +971 50 990 7766" },
  { id: "8", name: "Maryam Saleh", roleDept: "Dishwasher", badgeId: "FB-2026-008", rating: "4.72", icon: "bulb-outline", filter: "service", dept: "kitchen", station: "Wash Pit", accessLevel: "Basic", phone: "+971 50 553 7788", email: "maryam.saleh@frenchbakery.ae", shift: "12:00-20:00 · Mon-Fri", tenure: "10m", ordersPerMonth: "—", attendance: "91%", startDate: "Jul 03, 2025", emergencyContact: "Adel Saleh · +971 50 661 2233" },
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

const FILTERS: { id: FilterBucket; labelKey: string }[] = [
  { id: "all", labelKey: "staff.dirFilterAll" },
  { id: "chefs", labelKey: "staff.dirFilterChefs" },
  { id: "runners", labelKey: "staff.dirFilterRunners" },
  { id: "barista", labelKey: "staff.dirFilterBarista" },
  { id: "cashier", labelKey: "staff.dirFilterCashier" },
  { id: "service", labelKey: "staff.dirFilterService" },
];

export type AllTeamMembersModalProps = {
  visible: boolean;
  onClose: () => void;
  onPressMember?: (member: TeamMember) => void;
  t: TFunction;
};

export function AllTeamMembersModal({
  visible,
  onClose,
  onPressMember,
  t,
}: AllTeamMembersModalProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterBucket>("all");

  const stats = useMemo(() => {
    return {
      total: TEAM.length,
      kitchen: TEAM.filter((x) => x.dept === "kitchen").length,
      service: TEAM.filter((x) => x.dept === "service").length,
      runners: TEAM.filter((x) => x.dept === "runners").length,
      front: TEAM.filter((x) => x.dept === "front").length,
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEAM.filter((member) => {
      if (filter !== "all" && member.filter !== filter) return false;
      if (!q) return true;
      return (
        member.name.toLowerCase().includes(q) ||
        member.roleDept.toLowerCase().includes(q) ||
        member.badgeId.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  return (
    <StaffBaseModal
      maxWidth={1200}
      maxHeight={840}
      visible={visible}
      onClose={onClose}
      bodyContentContainerStyle={s.bodyPad}
      header={
        <View style={s.bannerHeadingCol}>
          <View style={s.bannerBadge}>
            <View style={s.bannerBadgeDot} />
            <UiText style={s.bannerBadgeTxt}>
              {t("staff.dirHeaderBadge", { count: stats.total })}
            </UiText>
          </View>
          <UiText style={s.bannerTitle}>{t("staff.dirHeaderTitle")}</UiText>
          <UiText style={s.bannerSubtitle}>{t("staff.dirHeaderSubtitle")}</UiText>
        </View>
      }
      
    >
      <View style={s.statsRow}>
        <View style={s.statBox}>
          <UiText style={s.statLbl}>{t("staff.dirStatTotal")}</UiText>
          <UiText style={s.statVal}>{String(stats.total)}</UiText>
        </View>
        <View style={s.statBox}>
          <UiText style={s.statLbl}>{t("staff.dirStatKitchen")}</UiText>
          <UiText style={s.statVal}>{String(stats.kitchen)}</UiText>
        </View>
        <View style={s.statBox}>
          <UiText style={s.statLbl}>{t("staff.dirStatService")}</UiText>
          <UiText style={s.statVal}>{String(stats.service)}</UiText>
        </View>
        <View style={s.statBox}>
          <UiText style={s.statLbl}>{t("staff.dirStatRunners")}</UiText>
          <UiText style={s.statVal}>{String(stats.runners)}</UiText>
        </View>
        <View style={s.statBox}>
          <UiText style={s.statLbl}>{t("staff.dirStatFront")}</UiText>
          <UiText style={s.statVal}>{String(stats.front)}</UiText>
        </View>
      </View>

      <View style={s.searchAndFiltersRow}>
        <View style={s.searchBox}>
          <Ionicons name="search-outline" size={18} color={COLORS.ink4} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t("staff.dirSearchPlaceholder")}
            placeholderTextColor={COLORS.ink5}
            style={s.searchInput}
          />
        </View>
        <View style={s.filterPillsRow}>
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <Pressable
                key={f.id}
                onPress={() => setFilter(f.id)}
                style={[s.filterPill, active && s.filterPillActive]}
              >
                <UiText style={[s.filterPillTxt, active && s.filterPillTxtActive]}>
                  {t(f.labelKey)}
                </UiText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={s.gridWrap}>
        {filtered.length === 0 ? (
          <View style={s.emptyState}>
            <UiText style={s.emptyStateTxt}>{t("staff.dirEmptyState")}</UiText>
          </View>
        ) : (
          filtered.map((member) => (
            <Pressable
              key={member.id}
              onPress={() => onPressMember?.(member)}
              style={s.memberCard}
            >
              <View style={s.memberIconWrap}>
                <Ionicons name={member.icon} size={18} color={COLORS.portalInk} />
              </View>
              <View style={s.memberTextCol}>
                <UiText style={s.memberName} numberOfLines={1}>
                  {member.name}
                </UiText>
                <UiText style={s.memberRole} numberOfLines={1}>
                  {member.roleDept}
                </UiText>
                <UiText style={s.memberId} numberOfLines={1}>
                  {member.badgeId}
                </UiText>
              </View>
              <View style={s.memberRatingCol}>
                <UiText style={s.memberRatingVal}>{member.rating}</UiText>
                <UiText style={s.memberRatingLbl}>{t("staff.dirRatingLbl")}</UiText>
              </View>
            </Pressable>
          ))
        )}
      </View>
    </StaffBaseModal>
  );
}
