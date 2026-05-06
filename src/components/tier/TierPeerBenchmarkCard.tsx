import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import { StyleSheet, Text, View } from "react-native";

import { UICard } from "@/components/ui/UICard";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type Bar = {
  id: string;
  labelKey: string;
  valueKey: string;
  widthPct: number;
  color: string;
  highlight?: boolean;
};

const BARS: Bar[] = [
  {
    id: "top10",
    labelKey: "tier.peerBarTop10Label",
    valueKey: "tier.peerBarTop10Value",
    widthPct: 100,
    color: COLORS.trendPositive,
  },
  {
    id: "you",
    labelKey: "tier.peerBarYouLabel",
    valueKey: "tier.peerBarYouValue",
    widthPct: 92,
    color: COLORS.neonOrange,
    highlight: true,
  },
  {
    id: "top25",
    labelKey: "tier.peerBarTop25Label",
    valueKey: "tier.peerBarTop25Value",
    widthPct: 84,
    color: COLORS.trendPositive,
  },
  {
    id: "tierAvg",
    labelKey: "tier.peerBarTierAvgLabel",
    valueKey: "tier.peerBarTierAvgValue",
    widthPct: 70,
    color: "#FFE680",
  },
  {
    id: "tierMin",
    labelKey: "tier.peerBarTierMinLabel",
    valueKey: "tier.peerBarTierMinValue",
    widthPct: 50,
    color: "#FFE680",
  },
];

type TierPeerBenchmarkCardProps = {
  t: TFunction;
};

export function TierPeerBenchmarkCard({ t }: TierPeerBenchmarkCardProps) {
  return (
    <UICard style={styles.card}>
      <View style={styles.head}>
        <View style={styles.headLeft}>
          <View style={styles.iconBox}>
            <Ionicons name="bar-chart" size={16} color={COLORS.portalInk} />
          </View>
          <UiText style={styles.title}>{t("tier.peerTitle")}</UiText>
        </View>
        <View style={styles.topBadge}>
          <UiText style={styles.topBadgeText}>{t("tier.peerTopBadge")}</UiText>
        </View>
      </View>

      <Text style={styles.description}>
        {t("tier.peerDescriptionPrefix")}
        <Text style={styles.descriptionStrong}>{t("tier.peerDescriptionStrong")}</Text>
      </Text>

      <View style={styles.barList}>
        {BARS.map((bar) => (
          <View key={bar.id} style={styles.barRow}>
            <UiText
              style={[styles.barLabel, bar.highlight && styles.barLabelHi]}
              numberOfLines={1}
            >
              {t(bar.labelKey)}
            </UiText>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${bar.widthPct}%`, backgroundColor: bar.color },
                ]}
              />
            </View>
            <UiText style={styles.barValue} numberOfLines={1}>
              {t(bar.valueKey)}
            </UiText>
          </View>
        ))}
      </View>

      <View style={styles.tileRow}>
        <View style={styles.tile}>
          <UiText style={styles.tileLabel}>{t("tier.peerRankLabel")}</UiText>
          <UiText style={styles.tileValue}>{t("tier.peerRankValue")}</UiText>
          <UiText style={styles.tileCaption}>{t("tier.peerRankCaption")}</UiText>
        </View>
        <View style={styles.tile}>
          <UiText style={styles.tileLabel}>{t("tier.peerCityLabel")}</UiText>
          <UiText style={styles.tileValue}>{t("tier.peerCityValue")}</UiText>
          <UiText style={styles.tileCaption}>{t("tier.peerCityCaption")}</UiText>
        </View>
      </View>
    </UICard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 18,
    gap: 14,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  headLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  title: {
    flex: 1,
    fontFamily: "Inter_900Black",
    fontSize: 15,
    letterSpacing: -0.2,
    color: COLORS.portalInk,
  },
  topBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#FFE6CD",
  },
  topBadgeText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    color: "#9A4F0E",
  },
  description: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.ink3,
  },
  descriptionStrong: {
    fontFamily: "Inter_900Black",
    color: COLORS.portalInk,
  },
  barList: {
    gap: 8,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  barLabel: {
    width: 70,
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 0.6,
    color: COLORS.ink4,
  },
  barLabelHi: {
    color: COLORS.neonOrange,
  },
  barTrack: {
    flex: 1,
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 999,
  },
  barValue: {
    width: 44,
    textAlign: "right",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    color: COLORS.portalInk,
    fontVariant: ["tabular-nums"],
  },
  tileRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: "auto",
  },
  tile: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
    gap: 2,
  },
  tileLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 1.2,
    color: COLORS.ink5,
  },
  tileValue: {
    fontFamily: "Inter_900Black",
    fontSize: 22,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
  },
  tileCaption: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
  },
});
