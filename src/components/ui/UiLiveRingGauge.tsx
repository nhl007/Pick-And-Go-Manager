import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import { COLORS } from "@/constants/styles";

import { UiDirhamSymbol } from "./UiDirhamSymbol";
import { UiText } from "./UiText";

const SIZE = 118;
const CX = 50;
const CY = 50;
const R = 40;
const STROKE = 10;
const CIRC = 2 * Math.PI * R;

type UiLiveRingGaugeProps = {
  /** 0–1 collected portion (HTML shows 75%). */
  progress: number;
  pctLabel: string;
  ringCaption: string;
  collectedLabel: string;
  collectedAmount: string;
  owedLabel: string;
  owedAmount: string;
};

export function UiLiveRingGauge({
  progress,
  pctLabel,
  ringCaption,
  collectedLabel,
  collectedAmount,
  owedLabel,
  owedAmount,
}: UiLiveRingGaugeProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  const dashOffset = CIRC * (1 - clamped);

  const dasharray = useMemo(() => `${CIRC}`, []);

  return (
    <View style={styles.row}>
      <View style={styles.gauge}>
        <Svg width={SIZE} height={SIZE} viewBox="0 0 100 100">
          <G transform={`rotate(-90 ${CX} ${CY})`}>
            <Circle cx={CX} cy={CY} r={R} stroke="rgba(0,0,0,0.08)" strokeWidth={STROKE} fill="none" />
            <Circle
              cx={CX}
              cy={CY}
              r={R}
              stroke={COLORS.neonOrange}
              strokeWidth={STROKE}
              fill="none"
              strokeDasharray={dasharray}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={styles.center} pointerEvents="none">
          <View style={styles.pctRow}>
            <UiText size={30} font="black" color="neonOrange">
              {pctLabel}
            </UiText>
            <UiText size={30} font="black" color="neonOrange">
              %
            </UiText>
          </View>
          <UiText size={9} font="bold" color="ink4" style={styles.centerLbl}>
            {ringCaption}
          </UiText>
        </View>
      </View>

      <View style={styles.amounts}>
        <View style={styles.amountBlock}>
          <UiText style={styles.k}>{collectedLabel}</UiText>
          <View style={styles.amountRow}>
            <UiDirhamSymbol size={18} color={COLORS.portalInk} />
            <UiText style={styles.amount}>{collectedAmount}</UiText>
          </View>
        </View>
        <View style={styles.amountBlock}>
          <UiText style={styles.k}>{owedLabel}</UiText>
          <View style={styles.amountRow}>
            <UiDirhamSymbol size={18} color={COLORS.ink3} />
            <UiText style={[styles.amount, styles.amountOwed]}>{owedAmount}</UiText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 4,
  },
  gauge: {
    width: SIZE,
    height: SIZE,
    flexShrink: 0,
  },
  center: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  pctRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 0,
  },
  centerLbl: {
    marginTop: 4,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  amounts: {
    flex: 1,
    minWidth: 0,
    gap: 10,
  },
  amountBlock: {
    gap: 2,
  },
  k: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: COLORS.ink4,
    marginBottom: 2,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  amount: {
    fontFamily: "Inter_900Black",
    fontSize: 22,
    letterSpacing: -0.8,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  amountOwed: {
    color: COLORS.ink3,
  },
});
