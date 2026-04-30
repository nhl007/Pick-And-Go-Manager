import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { COLORS } from "@/constants/styles";

import { UiText } from "./UiText";

const VIEWBOX_W = 140;
const VIEWBOX_H = 85;
const ARC_PATH = "M 15 72 A 55 55 0 0 1 125 72";
const ARC_LENGTH = Math.PI * 55;
const DEFAULT_SIZE = 220;

type UiLiveSemiGaugeProps = {
  /** 0–100 portion of the arc that reads as “filled”. */
  percent: number;
  centerMain: string;
  /** Optional smaller suffix on the main value (e.g. `%`). */
  centerMainSuffix?: string;
  centerSub: string;
  /**
   * Overall width of the gauge in dp. Height follows the SVG viewBox aspect ratio.
   * @default 220
   */
  size?: number;
  /** Filled arc stroke; defaults to pickup/intelligence orange. */
  strokeColor?: string;
};

export function UiLiveSemiGauge({
  percent,
  centerMain,
  centerMainSuffix,
  centerSub,
  size = DEFAULT_SIZE,
  strokeColor = COLORS.neonOrange,
}: UiLiveSemiGaugeProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const dashOffset = ARC_LENGTH * (1 - clamped / 100);

  const strokeDasharray = useMemo(() => `${ARC_LENGTH}`, []);

  const width = Math.max(120, size);
  const height = Math.round((width * VIEWBOX_H) / VIEWBOX_W);
  const scale = width / DEFAULT_SIZE;
  const mainFont = Math.round(28 * scale);
  const suffixFont = Math.round(20 * scale);
  const subFont = Math.max(7, Math.round(8 * scale));
  const bottomPad = Math.max(2, Math.round(4 * scale));

  return (
    <View style={[styles.wrap, { width, maxWidth: width }]}>
      <Svg width={width} height={height} viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}>
        <Path
          d={ARC_PATH}
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={9}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d={ARC_PATH}
          stroke={strokeColor}
          strokeWidth={9}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={dashOffset}
        />
      </Svg>
      <View style={[styles.center, { bottom: bottomPad }]} pointerEvents="none">
        <View style={styles.centerMainRow}>
          <UiText size={mainFont} font="black" color="portalInk">
            {centerMain}
          </UiText>
          {centerMainSuffix ? (
            <UiText size={suffixFont} font="bold" color="ink3">
              {centerMainSuffix}
            </UiText>
          ) : null}
        </View>
        <UiText size={subFont} font="bold" color="ink4" style={styles.centerSub}>
          {centerSub}
        </UiText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: "center",
    marginTop: 4,
  },
  center: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  centerMainRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 1,
  },
  centerSub: {
    marginTop: 4,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
