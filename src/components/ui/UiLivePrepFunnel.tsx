import React from "react";
import { StyleSheet, View } from "react-native";

import { COLORS } from "@/constants/styles";

import { UiText } from "./UiText";

export type UiLiveFunnelStage = {
  label: string;
  count: string;
  widthPct: number;
};

type UiLivePrepFunnelProps = {
  stages: UiLiveFunnelStage[];
  legendLeft: React.ReactNode;
  legendRight: React.ReactNode;
};

export function UiLivePrepFunnel({
  stages,
  legendLeft,
  legendRight,
}: UiLivePrepFunnelProps) {
  return (
    <View style={styles.root}>
      <View style={styles.funnel}>
        {stages.map((stage) => (
          <View key={stage.label} style={styles.row}>
            <View style={[styles.barTrack, { width: `${stage.widthPct}%` }]}>
              <View style={styles.bar}>
                <UiText numberOfLines={1} style={styles.barNm}>
                  {stage.label}
                </UiText>
                <UiText style={styles.barN}>{stage.count}</UiText>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.legend}>
        <View style={styles.legendSide}>{legendLeft}</View>
        <View style={[styles.legendSide, styles.legendRight]}>{legendRight}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 10,
    marginTop: 8,
  },
  funnel: {
    gap: 6,
    alignItems: "center",
  },
  row: {
    width: "100%",
    alignItems: "center",
  },
  barTrack: {
    maxWidth: "100%",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 4,
    backgroundColor: COLORS.neonOrange,
  },
  barNm: {
    flex: 1,
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: COLORS.white,
  },
  barN: {
    fontFamily: "Inter_900Black",
    fontSize: 10,
    fontVariant: ["tabular-nums"],
    color: COLORS.white,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    marginTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
  legendSide: {
    flex: 1,
  },
  legendRight: {
    alignItems: "flex-end",
  },
});
