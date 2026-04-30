import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

import { COLORS } from "@/constants/styles";

import { UiText } from "./UiText";

export type UiLivePeakBar = {
  label: string;
  heightPct: number;
  active?: boolean;
};

type UiLivePeakBarsProps = {
  title: string;
  subtitle: string;
  heroMain: string;
  heroSuffix?: string;
  heroMeta: React.ReactNode;
  bars: UiLivePeakBar[];
};

export function UiLivePeakBars({
  title,
  subtitle,
  heroMain,
  heroSuffix,
  heroMeta,
  bars,
}: UiLivePeakBarsProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.head}>
        <View style={styles.headLeft}>
          <UiText style={styles.chartTitle}>{title}</UiText>
          <UiText style={styles.chartSub}>{subtitle}</UiText>
        </View>
        <View style={styles.hero}>
          <View style={styles.heroMainRow}>
            <UiText style={styles.heroVal}>{heroMain}</UiText>
            {heroSuffix ? (
              <UiText size={10} font="bold" color="ink3">
                {heroSuffix}
              </UiText>
            ) : null}
          </View>
          <View style={styles.heroMetaWrap}>{heroMeta}</View>
        </View>
      </View>

      <View style={styles.grid}>
        {bars.map((b) => (
          <View key={b.label} style={styles.col}>
            <View style={styles.colInner}>
              {b.active ? (
                <LinearGradient
                  colors={[COLORS.neonOrange, "#FFB060"]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={[styles.bar, { height: `${b.heightPct}%` }]}
                />
              ) : (
                <View style={[styles.barMuted, { height: `${b.heightPct}%` }]} />
              )}
            </View>
            <UiText style={[styles.lbl, b.active && styles.lblOn]}>{b.label}</UiText>
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
  heroMainRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  heroVal: {
    fontFamily: "Inter_900Black",
    fontSize: 18,
    letterSpacing: -0.4,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  heroMetaWrap: {
    marginTop: 4,
    alignItems: "flex-end",
  },
  grid: {
    flexDirection: "row",
    gap: 6,
    height: 112,
    alignItems: "flex-end",
    paddingTop: 8,
    paddingBottom: 4,
  },
  col: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    height: "100%",
    justifyContent: "flex-end",
  },
  colInner: {
    width: "100%",
    maxWidth: 22,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bar: {
    width: "100%",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    minHeight: 6,
    shadowColor: COLORS.neonOrange,
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  barMuted: {
    width: "100%",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    minHeight: 6,
    backgroundColor: "#E8E8E8",
  },
  lbl: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 8,
    color: COLORS.ink4,
    fontVariant: ["tabular-nums"],
  },
  lblOn: {
    color: COLORS.neonOrange,
    fontFamily: "Inter_800ExtraBold",
  },
});
