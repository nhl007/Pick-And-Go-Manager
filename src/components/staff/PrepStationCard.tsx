import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React from "react";
import { Pressable, View } from "react-native";

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
  },
  {
    id: "grill",
    nameKey: "staff.prepStationGrill",
    icon: "flame-outline",
    workload: "medium",
    assigneeName: "Chef Rami",
    assigneeInitials: "RA",
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
    icon: "card-outline",
    workload: "unassigned",
  },
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
  return (
    <View style={s.card}>
      <View style={s.headerRow}>
        <UiText style={s.headerTitle} numberOfLines={1}>
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
          <View
            key={station.id}
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
              <Pressable onPress={() => onAssign?.(station.id)} hitSlop={8} style={s.assigneeRow}>
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
          </View>
        );
      })}
    </View>
  );
}
