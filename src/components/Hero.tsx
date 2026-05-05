import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { COLORS, SPACING } from "@/constants/styles";
import { useNowTicker } from "@/hooks/useNowTicker";

import { UiText } from "./ui/UiText";

type HeroProps = {
  children: React.ReactNode;
  isRtl: boolean;
  brandName: string;
  brandBranch: string;
  title: string;
  titleStrong: string;
  subtitle: string;
  locale: "ar-AE" | "en-GB";
  /** Renders between the meta row and the divider (e.g. Media Hub `display-sub`). */
  belowMeta?: React.ReactNode;
};

export default function Hero({
  children,
  isRtl,
  brandName,
  brandBranch,
  title,
  titleStrong,
  subtitle,
  locale,
  belowMeta,
}: HeroProps) {
  const now = useNowTicker();

  const timeLine = useMemo(() => {
    return now.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }, [locale, now]);

  const dateLine = useMemo(() => {
    return now.toLocaleDateString(locale, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [locale, now]);

  return (
    <>
      <View style={[styles.meta, isRtl && styles.rowRtl]}>
        <View style={styles.metaLeft}>
          <View style={styles.brandStack}>
            <UiText style={styles.brandName}>{brandName}</UiText>
            <UiText style={styles.brandBranch}>{brandBranch}</UiText>
          </View>
        </View>

        {children}

        <View style={[styles.metaRight, isRtl && styles.metaRightRtl]}>
          <UiText style={styles.metaTime}>{timeLine}</UiText>
          <UiText style={styles.metaDate}>{dateLine}</UiText>
        </View>
      </View>

      {belowMeta}

      <View style={styles.divider} />

      <View style={[styles.pgHead, isRtl && styles.rowRtl]}>
        <View style={styles.pgHeadTitle}>
          <UiText style={styles.h1Light}>{title}</UiText>
          <UiText style={styles.h1Strong}>{titleStrong}</UiText>
        </View>
        <UiText style={styles.tag}>{subtitle}</UiText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  meta: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: SPACING.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  metaLeft: {
    flex: 1,
    minWidth: 120,
  },
  brandStack: {
    gap: 2,
  },
  brandName: {
    fontFamily: "Inter_900Black",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: COLORS.portalInk,
  },
  brandBranch: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    letterSpacing: 1,
    color: COLORS.ink4,
    marginTop: 2,
  },
  metaMid: {
    flex: 1.4,
    alignItems: "center",
    gap: 4,
    minWidth: 200,
  },
  metaMidRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    flexWrap: "wrap",
  },
  metaMidText: {
    flexShrink: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
    textAlign: "center",
    lineHeight: 18,
  },
  metaMidStrong: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.trendPositiveDeep,
  },
  metaMidSmall: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    textAlign: "center",
  },
  metaMidLive: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.portalInk,
  },
  metaRight: {
    flex: 1,
    alignItems: "flex-end",
    minWidth: 120,
  },
  metaRightRtl: {
    alignItems: "flex-start",
  },
  metaTime: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 15,
    letterSpacing: -0.3,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  metaDate: {
    marginTop: 4,
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: COLORS.ink4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.hairline,
    marginBottom: SPACING.lg,
  },
  pgHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: SPACING.lg,
    marginBottom: SPACING.md,
    flexWrap: "wrap",
  },
  pgHeadTitle: {
    flex: 1,
    minWidth: 220,
    gap: 0,
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  h1Light: {
    fontFamily: "Inter_400Regular",
    fontSize: 34,
    letterSpacing: -0.5,
    lineHeight: 38,
    color: COLORS.portalInk,
  },
  h1Strong: {
    fontFamily: "Inter_900Black",
    fontSize: 34,
    letterSpacing: -0.6,
    lineHeight: 38,
    color: COLORS.portalInk,
  },
  tag: {
    flex: 1,
    minWidth: 220,
    maxWidth: 320,
    paddingTop: 6,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.ink3,
  },
});
