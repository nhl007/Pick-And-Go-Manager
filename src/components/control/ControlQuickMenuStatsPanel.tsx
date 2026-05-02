import { StyleSheet, View } from "react-native";

import { UiButton } from "@/components/ui/UiButton";
import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

type ControlQuickMenuStatsPanelProps = {
  panelTitle: string;
  availableLabel: string;
  availableCount: string;
  snoozedLabel: string;
  snoozedCount: string;
  unavailableLabel: string;
  unavailableCount: string;
  editMenuLabel: string;
  onEditFullMenu: () => void;
};

export function ControlQuickMenuStatsPanel({
  panelTitle,
  availableLabel,
  availableCount,
  snoozedLabel,
  snoozedCount,
  unavailableLabel,
  unavailableCount,
  editMenuLabel,
  onEditFullMenu,
}: ControlQuickMenuStatsPanelProps) {
  return (
    <>
      <UiText style={controlStyles.panelTitle}>{panelTitle}</UiText>
      <View style={styles.qmmStats}>
        <View style={styles.qmmStat}>
          <UiText style={styles.qmmN}>{availableCount}</UiText>
          <UiText style={styles.qmmL}>{availableLabel}</UiText>
        </View>
        <View style={styles.qmmStat}>
          <UiText style={[styles.qmmN, { color: COLORS.neonOrange }]}>
            {snoozedCount}
          </UiText>
          <UiText style={styles.qmmL}>{snoozedLabel}</UiText>
        </View>
        <View style={styles.qmmStat}>
          <UiText style={[styles.qmmN, { color: COLORS.error }]}>
            {unavailableCount}
          </UiText>
          <UiText style={styles.qmmL}>{unavailableLabel}</UiText>
        </View>
      </View>
      <View style={styles.qmmFoot}>
        <UiButton variant="outline" onPress={onEditFullMenu} height={44}>
          <UiText style={styles.launchBtnText}>{editMenuLabel}</UiText>
        </UiButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  qmmStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  qmmStat: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: 4,
  },
  qmmN: {
    fontFamily: "Inter_900Black",
    fontSize: 28,
    letterSpacing: -1,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  qmmL: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: COLORS.ink4,
  },
  qmmFoot: {
    marginTop: "auto",
    paddingTop: SPACING.sm,
  },
  launchBtnText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
});
