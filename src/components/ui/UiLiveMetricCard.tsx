import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { COLORS } from "@/constants/styles";

import { UICard } from "./UICard";
import { UiText } from "./UiText";

type UiLiveMetricCardProps = {
  title: string;
  metaRight: string;
  value: React.ReactNode;
  footer: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function UiLiveMetricCard({
  title,
  metaRight,
  value,
  footer,
  style,
}: UiLiveMetricCardProps) {
  return (
    <UICard style={[style]}>
      <View style={styles.top}>
        <UiText style={styles.name}>{title}</UiText>
        <UiText style={styles.metaSm}>{metaRight}</UiText>
      </View>
      <View style={styles.bot}>
        <View style={styles.value}>{value}</View>
        <View style={styles.stat}>{footer}</View>
      </View>
    </UICard>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  metaSm: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink5,
  },
  bot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  value: {
    flexShrink: 1,
  },
  stat: {
    flexShrink: 0,
    maxWidth: "52%",
    alignItems: "flex-end",
  },
});
