import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Switch, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, SPACING } from "@/constants/styles";

type ControlSmartCrowdCardProps = {
  title: string;
  showingLabel: string;
  normalLabel: string;
  busyLabel: string;
  description: string;
  footPrefix: string;
  footStrong: string;
  footSuffix: string;
  busy: boolean;
  onBusyChange: (v: boolean) => void;
};

export function ControlSmartCrowdCard({
  title,
  showingLabel,
  normalLabel,
  busyLabel,
  description,
  footPrefix,
  footStrong,
  footSuffix,
  busy,
  onBusyChange,
}: ControlSmartCrowdCardProps) {
  return (
    <>
      <View style={styles.smartHead}>
        <View style={styles.smartIc}>
          <Ionicons name="people-outline" size={18} color={COLORS.portalInk} />
        </View>
        <UiText style={styles.smartTitle}>{title}</UiText>
      </View>
      <View style={styles.smartBody}>
        <View style={styles.smartState}>
          <UiText style={styles.smartLbl}>{showingLabel}</UiText>
          <View style={[styles.crowdPill, busy && styles.crowdPillBusy]}>
            <UiText style={[styles.crowdPillText, busy && styles.crowdPillTextBusy]}>
              {busy ? busyLabel : normalLabel}
            </UiText>
          </View>
        </View>
        <UiText style={styles.smartDesc}>{description}</UiText>
      </View>
      <View style={styles.smartFoot}>
        <Switch
          style={{
            height: 20,
          }}
          value={busy}
          onValueChange={onBusyChange}
          trackColor={{ false: COLORS.chartMist, true: COLORS.neonYellow }}
          thumbColor={COLORS.white}
        />
        <UiText style={styles.smartAction}>
          {footPrefix}
          <UiText style={styles.smartActionStrong}>{footStrong}</UiText>
          {footSuffix}
        </UiText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  smartCard: {
    gap: SPACING.sm,
  },
  smartHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  smartIc: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
  },
  smartTitle: {
    flex: 1,
    fontFamily: "Inter_800ExtraBold",
    fontSize: 14,
    color: COLORS.portalInk,
  },
  smartBody: {
    gap: SPACING.sm,
  },
  smartState: {
    gap: 6,
  },
  smartLbl: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: COLORS.ink4,
  },
  crowdPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.chartMist,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  crowdPillBusy: {
    backgroundColor: COLORS.neonOrange,
    borderColor: COLORS.neonOrange,
  },
  crowdPillText: {
    fontFamily: "Inter_900Black",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  crowdPillTextBusy: {
    color: COLORS.white,
  },
  smartDesc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
    lineHeight: 17,
  },
  smartFoot: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: COLORS.hairline,
    paddingTop: 8,
  },
  smartAction: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
    lineHeight: 17,
  },
  smartActionStrong: {
    fontFamily: "Inter_900Black",
    color: COLORS.portalInk,
  },
});
