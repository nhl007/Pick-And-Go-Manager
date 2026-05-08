import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

import { TeamMember } from "@/components/staff/AllTeamMembersModal";
import { AssignStationModal } from "@/components/staff/AssignStationModal";
import { prepStationCardStyles as s } from "@/components/staff/PrepStationCard.styles";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type Workload = "heavy" | "medium" | "light" | "unassigned";

type PrepStation = {
  id: string;
  nameKey: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  workload: Workload;
  assigneeName?: string;
  assigneeInitials?: string;
  assigneeMetaKey?: string;
  isTop?: boolean;
  currentAssignee?: TeamMember;
};

const STATIONS: PrepStation[] = [
  {
    id: "coffee",
    nameKey: "staff.prepStationCoffeeBar",
    icon: "cafe-outline",
    workload: "heavy",
    assigneeName: "Layla M.",
    assigneeInitials: "LM",
    assigneeMetaKey: "staff.prepStationTopBarista",
    isTop: true,
    currentAssignee: {
      id: "3",
      name: "Layla Masoud",
      roleDept: "Barista · Coffee Bar",
      badgeId: "FB-2026-003",
      rating: "4.89",
      icon: "cafe-outline",
      filter: "barista",
      dept: "service",
      station: "Coffee Bar",
      accessLevel: "Standard",
      phone: "+971 50 333 1144",
      email: "layla.masoud@frenchbakery.ae",
      shift: "06:30-14:30 · Tue-Sun",
      tenure: "1y 11m",
      ordersPerMonth: "892",
      attendance: "94%",
      startDate: "Jun 04, 2024",
      emergencyContact: "Hassan Masoud · +971 50 444 9988",
    },
  },
  {
    id: "grill",
    nameKey: "staff.prepStationGrill",
    icon: "flame-outline",
    workload: "medium",
    assigneeName: "Chef Rami",
    assigneeInitials: "RA",
    currentAssignee: {
      id: "1",
      name: "Rami Abbas",
      roleDept: "Head Chef",
      badgeId: "FB-2026-001",
      rating: "4.92",
      icon: "restaurant-outline",
      filter: "chefs",
      dept: "kitchen",
      station: "Kitchen Line",
      accessLevel: "Admin",
      phone: "+971 50 111 2233",
      email: "rami.abbas@frenchbakery.ae",
      shift: "06:00-14:00 · Mon-Fri",
      tenure: "5y 2m",
      ordersPerMonth: "—",
      attendance: "98%",
      startDate: "Sep 12, 2020",
      emergencyContact: "Yara Abbas · +971 50 555 7711",
    },
  },
  {
    id: "mezze",
    nameKey: "staff.prepStationMezze",
    icon: "leaf-outline",
    workload: "light",
    assigneeName: "Mohamed K.",
    assigneeInitials: "MK",
  },
  {
    id: "cashier",
    nameKey: "staff.prepStationCashierFront",
    icon: "leaf-outline",
    workload: "light",
    assigneeName: "Mohamed K.",
    assigneeInitials: "MK",
  },
  // {
  //   id: "cashier",
  //   nameKey: "staff.prepStationCashierFront",
  //   icon: "card-outline",
  //   workload: "unassigned",
  // },
];

const workloadStyle = (w: Workload) => {
  if (w === "heavy") return { box: s.workloadHeavy, txt: s.workloadHeavyTxt, key: "staff.workloadHeavy" };
  if (w === "medium") return { box: s.workloadMedium, txt: s.workloadMediumTxt, key: "staff.workloadMedium" };
  if (w === "light") return { box: s.workloadLight, txt: s.workloadLightTxt, key: "staff.workloadLight" };
  return { box: s.workloadUnassigned, txt: s.workloadUnassignedTxt, key: "staff.workloadUnassigned" };
};

export type PrepStationCardProps = {
  t: TFunction;
  onAssign?: (stationId: string) => void;
};

export function PrepStationCard({ t, onAssign }: PrepStationCardProps) {
  const [selectedStation, setSelectedStation] = useState<PrepStation | null>(null);

  const handleStationPress = (station: PrepStation) => {
    setSelectedStation(station);
  };

  const handleAssignPress = (stationId: string) => {
    const station = STATIONS.find((st) => st.id === stationId);
    if (station) setSelectedStation(station);
    onAssign?.(stationId);
  };

  const handleCloseModal = () => {
    setSelectedStation(null);
  };

  const handleConfirmAssign = (member: TeamMember, newWorkload: "heavy" | "medium" | "light" | "unassigned") => {
    setSelectedStation(null);
  };

  return (
    <>
      <View style={s.card}>
        <View style={s.headerRow}>
          <UiText style={s.headerTitle} size="sm" numberOfLines={1}>
            {t("staff.prepStationTitle")}
          </UiText>
          <View style={s.peakBadge}>
            <UiText style={s.peakBadgeTxt}>{t("staff.peakInMinutes", { count: 14 })}</UiText>
          </View>
        </View>

        {STATIONS.map((station) => {
          const wl = workloadStyle(station.workload);
          const unassigned = station.workload === "unassigned";
          return (
            <Pressable
              key={station.id}
              onPress={() => { handleStationPress(station); }}
              style={[s.stationItem, unassigned && s.stationItemUnassigned]}
            >
              <View style={s.stationTopRow}>
                <View style={s.stationLeft}>
                  <View style={s.stationIconWrap}>
                    <Ionicons name={station.icon} size={16} color={COLORS.portalInk} />
                  </View>
                  <UiText style={s.stationName} numberOfLines={1}>
                    {t(station.nameKey)}
                  </UiText>
                </View>
                <View style={[s.workloadBadge, wl.box]}>
                  <UiText style={[s.workloadBadgeTxt, wl.txt]}>{t(wl.key)}</UiText>
                </View>
              </View>

              {unassigned ? (
                <Pressable onPress={() => { handleAssignPress(station.id); }} hitSlop={8} style={s.assigneeRow}>
                  <View style={s.assigneeLeft}>
                    <View style={[s.avatarPill, s.avatarPillUnassigned]}>
                      <Ionicons name="add" size={14} color={COLORS.ink4} />
                    </View>
                    <UiText style={s.assignCta}>{t("staff.assignStaff")} →</UiText>
                  </View>
                </Pressable>
              ) : (
                <View style={s.assigneeRow}>
                  <View style={s.assigneeLeft}>
                    <View style={s.avatarPill}>
                      <UiText style={s.avatarTxt}>{station.assigneeInitials}</UiText>
                    </View>
                    <View style={s.assigneeNameWrap}>
                      <UiText style={s.assigneeName} numberOfLines={1}>
                        {station.assigneeName}
                      </UiText>
                      {station.assigneeMetaKey ? (
                        <>
                          <UiText style={s.assigneeMetaSep}>·</UiText>
                          {station.isTop ? (
                            <Ionicons name="star" size={10} color={COLORS.neonOrange} />
                          ) : null}
                          <UiText style={s.assigneeMeta} numberOfLines={1}>
                            {t(station.assigneeMetaKey)}
                          </UiText>
                        </>
                      ) : null}
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={COLORS.ink4} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {selectedStation ? (
        <AssignStationModal
          visible={selectedStation !== null}
          onClose={handleCloseModal}
          stationId={selectedStation.id}
          stationNameKey={selectedStation.nameKey}
          stationIcon={selectedStation.icon}
          stationWorkload={selectedStation.workload}
          currentAssignee={selectedStation.currentAssignee}
          onConfirmAssign={handleConfirmAssign}
          onSwapStation={handleCloseModal}
          onAddReinforcement={handleCloseModal}
          t={t}
        />
      ) : null}
    </>
  );
}