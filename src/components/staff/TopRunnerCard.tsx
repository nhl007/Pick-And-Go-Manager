import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React from "react";
import { View } from "react-native";

import { topRunnerCardStyles as s } from "@/components/staff/TopRunnerCard.styles";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type Podium = "silver" | "gold" | "bronze";

type Runner = {
  id: string;
  rank: number;
  podium: Podium;
  nameKey: string;
  ordersKey: string;
};

type Stat = {
  id: string;
  lblKey: string;
  valKey: string;
};

const RUNNERS: Runner[] = [
  { id: "second", rank: 2, podium: "silver", nameKey: "staff.topRunner2", ordersKey: "staff.topRunner2Orders" },
  { id: "first", rank: 1, podium: "gold", nameKey: "staff.topRunner1", ordersKey: "staff.topRunner1Orders" },
  { id: "third", rank: 3, podium: "bronze", nameKey: "staff.topRunner3", ordersKey: "staff.topRunner3Orders" },
];

const STATS: Stat[] = [
  { id: "avg", lblKey: "staff.avgDeliveryLbl", valKey: "staff.avgDeliveryVal" },
  { id: "best", lblKey: "staff.bestRunLbl", valKey: "staff.bestRunVal" },
  { id: "bonus", lblKey: "staff.weeklyBonusLbl", valKey: "staff.weeklyBonusVal" },
];

const podiumStyle = (p: Podium) => {
  if (p === "gold") return s.podiumTileGold;
  if (p === "silver") return s.podiumTileSilver;
  return s.podiumTileBronze;
};

export type TopRunnerCardProps = {
  t: TFunction;
};

export function TopRunnerCard({ t }: TopRunnerCardProps) {
  return (
    <View style={s.card}>
      <View style={s.headerRow}>
        <UiText style={s.headerTitle} numberOfLines={1}>
          {t("staff.topRunnerTitle")}
        </UiText>
        <View style={s.weekBadge}>
          <UiText style={s.weekBadgeTxt}>{t("staff.thisWeekBadge")}</UiText>
        </View>
      </View>

      <View style={s.podiumRow}>
        {RUNNERS.map((runner) => (
          <View key={runner.id} style={[s.podiumTile, podiumStyle(runner.podium)]}>
            <View style={s.podiumAvatar}>
              <Ionicons name="bicycle-outline" size={16} color={COLORS.portalInk} />
            </View>
            <UiText style={s.podiumRank}>{runner.rank}</UiText>
            <UiText style={s.podiumName} numberOfLines={1}>
              {t(runner.nameKey)}
            </UiText>
            <UiText style={s.podiumSub} numberOfLines={1}>
              {t(runner.ordersKey)}
            </UiText>
          </View>
        ))}
      </View>

      <View style={s.divider} />

      <View style={s.statsRow}>
        {STATS.map((stat) => (
          <View key={stat.id} style={s.statTile}>
            <UiText style={s.statLbl} numberOfLines={1}>
              {t(stat.lblKey)}
            </UiText>
            <UiText style={s.statVal} numberOfLines={1}>
              {t(stat.valKey)}
            </UiText>
          </View>
        ))}
      </View>
    </View>
  );
}
