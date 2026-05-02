import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Switch, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

type ControlSmartWeatherCardProps = {
  title: string;
  temp: string;
  unit: string;
  locLine1: string;
  locLine2: string;
  aiPrefix: string;
  aiStrong: string;
  aiSuffix: string;
  createLabel: string;
  onCreateWeatherMenu: () => void;
  autoReorganize: boolean;
  onAutoReorganizeChange: (v: boolean) => void;
  autoMenuLabel: string;
};

export function ControlSmartWeatherCard({
  title,
  temp,
  unit,
  locLine1,
  locLine2,
  aiPrefix,
  aiStrong,
  aiSuffix,
  createLabel,
  onCreateWeatherMenu,
  autoReorganize,
  onAutoReorganizeChange,
  autoMenuLabel,
}: ControlSmartWeatherCardProps) {
  return (
    <>
      <View style={styles.smartHead}>
        <View style={styles.smartIc}>
          <Ionicons name="sunny-outline" size={18} color={COLORS.portalInk} />
        </View>
        <UiText style={styles.smartTitle}>{title}</UiText>
      </View>
      <View style={styles.smartBody}>
        <View style={styles.weatherReading}>
          <View style={styles.wrTempRow}>
            <UiText style={styles.wrTemp}>{temp}</UiText>
            <UiText style={styles.wrUnit}>{unit}</UiText>
          </View>
          <View style={styles.wrLoc}>
            <UiText style={styles.wrLoc1}>{locLine1}</UiText>
            <UiText style={styles.wrLoc2}>{locLine2}</UiText>
          </View>
        </View>
        <UiText style={styles.smartDesc}>
          {aiPrefix}
          <UiText style={styles.aiStrong}>{aiStrong}</UiText>
          {aiSuffix}
        </UiText>
        <Pressable
          accessibilityRole="button"
          onPress={onCreateWeatherMenu}
          style={styles.weatherCreate}
        >
          <Ionicons name="add" size={16} color={COLORS.white} />
          <UiText style={styles.weatherCreateText}>{createLabel}</UiText>
        </Pressable>
      </View>
      <View style={styles.smartFoot}>
        <Switch
          style={{
            height: 20,
          }}
          value={autoReorganize}
          onValueChange={onAutoReorganizeChange}
          trackColor={{ false: COLORS.chartMist, true: COLORS.secondary }}
          thumbColor={COLORS.white}
        />
        <UiText style={styles.smartAction}>{autoMenuLabel}</UiText>
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
  weatherReading: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
    flexWrap: "wrap",
  },
  wrTempRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  wrTemp: {
    fontFamily: "Inter_900Black",
    fontSize: 36,
    letterSpacing: -1,
    color: COLORS.portalInk,
  },
  wrUnit: {
    marginTop: 6,
    marginLeft: 2,
    fontFamily: "Inter_800ExtraBold",
    fontSize: 14,
    color: COLORS.ink4,
  },
  wrLoc: {
    flex: 1,
    minWidth: 160,
    gap: 4,
  },
  wrLoc1: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  wrLoc2: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
    lineHeight: 15,
  },
  smartDesc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
    lineHeight: 17,
  },
  aiStrong: {
    fontFamily: "Inter_900Black",
    color: COLORS.portalInk,
  },
  weatherCreate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.portalInk,
    marginTop: SPACING.xs,
  },
  weatherCreateText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    color: COLORS.white,
  },
  smartFoot: {
    marginTop: 8,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.hairline,
  },
  smartAction: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
  },
});
