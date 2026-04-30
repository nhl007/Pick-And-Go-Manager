import React from "react";
import { StyleSheet, View } from "react-native";

import { COLORS } from "@/constants/styles";

import { UiText } from "./UiText";

export type UiLiveHBarItem = {
  name: string;
  value: string;
  widthPct: number;
  barColor: string;
};

type UiLiveHBarChartProps = {
  title: string;
  subtitle: string;
  heroValue: string;
  heroMeta: string;
  items: UiLiveHBarItem[];
};

export function UiLiveHBarChart({ title, subtitle, heroValue, heroMeta, items }: UiLiveHBarChartProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.head}>
        <View style={styles.headLeft}>
          <UiText style={styles.chartTitle}>{title}</UiText>
          <UiText style={styles.chartSub}>{subtitle}</UiText>
        </View>
        <View style={styles.hero}>
          <UiText style={styles.heroVal}>{heroValue}</UiText>
          <UiText style={styles.heroMeta}>{heroMeta}</UiText>
        </View>
      </View>

      <View style={styles.list}>
        {items.map((it) => (
          <View key={it.name} style={styles.row}>
            <UiText numberOfLines={1} style={styles.nm}>
              {it.name}
            </UiText>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${it.widthPct}%`, backgroundColor: it.barColor }]} />
            </View>
            <UiText style={styles.val}>{it.value}</UiText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    flex: 1,
    minWidth: 0,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  headLeft: {
    flex: 1,
    minWidth: 0,
  },
  chartTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    letterSpacing: -0.2,
    color: COLORS.portalInk,
  },
  chartSub: {
    marginTop: 4,
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: COLORS.ink4,
  },
  hero: {
    alignItems: "flex-end",
  },
  heroVal: {
    fontFamily: "Inter_900Black",
    fontSize: 18,
    letterSpacing: -0.4,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  heroMeta: {
    marginTop: 4,
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: COLORS.ink4,
    textAlign: "right",
  },
  list: {
    gap: 11,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nm: {
    width: 110,
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.portalInk,
  },
  track: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 5,
  },
  val: {
    width: 30,
    textAlign: "right",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
});
