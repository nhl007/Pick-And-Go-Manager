import { StyleSheet, View } from "react-native";

import { UICard } from "@/components/ui/UICard";
import { UiText } from "@/components/ui/UiText";
import { COLORS, SPACING } from "@/constants/styles";

type ControlStatusStripProps = {
  isRtl: boolean;
  onlineLabel: string;
  currentStateLabel: string;
  viewersLabel: string;
  viewersValue: string;
  promoReachLabel: string;
  promoReachValue: string;
  nextReviewLabel: string;
  nextReviewValue: string;
};

export function ControlStatusStrip({
  isRtl,
  onlineLabel,
  currentStateLabel,
  viewersLabel,
  viewersValue,
  promoReachLabel,
  promoReachValue,
  nextReviewLabel,
  nextReviewValue,
}: ControlStatusStripProps) {
  return (
    <View style={[styles.strip, isRtl && styles.stripRtl]}>
      <UICard style={styles.metric}>
        <UiText style={styles.ssN}>{onlineLabel}</UiText>
        <UiText style={styles.ssM}>{currentStateLabel}</UiText>
      </UICard>
      <UICard style={styles.metric}>
        <UiText style={styles.ssN}>{viewersValue}</UiText>
        <UiText style={styles.ssM}>{viewersLabel}</UiText>
      </UICard>
      <UICard style={styles.metric}>
        <UiText style={styles.ssN}>{promoReachValue}</UiText>
        <UiText style={styles.ssM}>{promoReachLabel}</UiText>
      </UICard>
      <UICard style={styles.metric}>
        <UiText style={styles.ssN}>{nextReviewValue}</UiText>
        <UiText style={styles.ssM}>{nextReviewLabel}</UiText>
      </UICard>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  stripRtl: {
    flexDirection: "row-reverse",
  },
  metric: {
    flex: 1,
    gap: 4,
  },
  ssNRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ssNRowRtl: {
    flexDirection: "row-reverse",
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: COLORS.neonYellow,
    shadowColor: COLORS.neonYellow,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  ssN: {
    fontFamily: "Inter_900Black",
    fontSize: 24,
    letterSpacing: -0.4,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  ssM: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: COLORS.ink4,
  },
});
