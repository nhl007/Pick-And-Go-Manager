import { StyleSheet, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import { UICard } from "@/components/ui/UICard";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

const RING_SIZE = 130;
const RING_R = 42;
const RING_STROKE = 9;
const RING_CIRC = 2 * Math.PI * RING_R;

export type KpiTrend = "up" | "down" | "flat";
export type KpiBadgeTone = "ok" | "warn" | "exceed" | "excellent";

type TierKpiCardProps = {
  title: string;
  badgeLabel: string;
  badgeTone: KpiBadgeTone;
  /** 0–1 value used to fill the ring. */
  progress: number;
  centerValue: string;
  centerUnit: string;
  delta: string;
  deltaTrend: KpiTrend;
  targetLabel: string;
  targetValue: string;
};

const BADGE_TONE_STYLE: Record<KpiBadgeTone, { bg: string; ink: string }> = {
  ok: { bg: "#FFF6CD", ink: "#7A5A0A" },
  warn: { bg: "#FFE0E0", ink: "#9B1C1C" },
  exceed: { bg: "#FFF6CD", ink: "#7A5A0A" },
  excellent: { bg: "#FFF6CD", ink: "#7A5A0A" },
};

export function TierKpiCard({
  title,
  badgeLabel,
  badgeTone,
  progress,
  centerValue,
  centerUnit,
  delta,
  deltaTrend,
  targetLabel,
  targetValue,
}: TierKpiCardProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  const dashOffset = RING_CIRC * (1 - clamped);
  const tone = BADGE_TONE_STYLE[badgeTone];
  const deltaColor =
    deltaTrend === "up"
      ? COLORS.neonOrange
      : deltaTrend === "down"
        ? COLORS.error
        : COLORS.ink4;

  return (
    <UICard style={styles.card}>
      <View style={styles.head}>
        <UiText style={styles.title}>{title}</UiText>
        <View style={[styles.badge, { backgroundColor: tone.bg }]}>
          <UiText style={[styles.badgeText, { color: tone.ink }]}>{badgeLabel}</UiText>
        </View>
      </View>

      <View style={styles.gaugeWrap}>
        <Svg width={RING_SIZE} height={RING_SIZE} viewBox="0 0 100 100">
          <G transform="rotate(-90 50 50)">
            <Circle
              cx={50}
              cy={50}
              r={RING_R}
              stroke="rgba(0,0,0,0.06)"
              strokeWidth={RING_STROKE}
              fill="none"
            />
            <Circle
              cx={50}
              cy={50}
              r={RING_R}
              stroke={COLORS.trendPositive}
              strokeWidth={RING_STROKE}
              fill="none"
              strokeDasharray={`${RING_CIRC}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={styles.gaugeCenter} pointerEvents="none">
          <View style={styles.centerRow}>
            <UiText style={styles.centerValue}>{centerValue}</UiText>
            <UiText style={styles.centerUnit}>{centerUnit}</UiText>
          </View>
        </View>
      </View>

      <UiText style={[styles.delta, { color: deltaColor }]}>{delta}</UiText>

      <View style={styles.targetPill}>
        <UiText style={styles.targetLabel}>{targetLabel}</UiText>
        <UiText style={styles.targetValue}>{targetValue}</UiText>
      </View>
    </UICard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: "22%",
    minWidth: 200,
    padding: 16,
    gap: 10,
    alignItems: "stretch",
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    flex: 1,
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    letterSpacing: 1.2,
    color: COLORS.portalInk,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  badgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
  },
  gaugeWrap: {
    alignSelf: "center",
    width: RING_SIZE,
    height: RING_SIZE,
    marginVertical: 4,
  },
  gaugeCenter: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 1,
  },
  centerValue: {
    fontFamily: "Inter_900Black",
    fontSize: 26,
    letterSpacing: -0.8,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  centerUnit: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.ink4,
  },
  delta: {
    alignSelf: "center",
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    marginTop: -2,
  },
  footerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.hairline,
    marginTop: 4,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  targetLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  targetValue: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    color: COLORS.portalInk,
    fontVariant: ["tabular-nums"],
  },
});
