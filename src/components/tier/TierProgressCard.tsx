import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import type { TFunction } from "i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { UICard } from "@/components/ui/UICard";
import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

import { type Tier,TIER_THEMES } from "./tier.types";

type Requirement = {
  id: string;
  done: boolean;
  titleKey: string;
  metaKey: string;
  valueKey: string;
};

type TierProgressCardProps = {
  nextTier: Tier;
  nextTierLabelKey: string;
  progressPct: number;
  requirements: Requirement[];
  isRtl?: boolean;
  onSeeBenefits?: () => void;
  t: TFunction;
};

export function TierProgressCard({
  nextTier,
  nextTierLabelKey,
  progressPct,
  requirements,
  isRtl = false,
  onSeeBenefits,
  t,
}: TierProgressCardProps) {
  const theme = TIER_THEMES[nextTier];
  const tierLabel = t(nextTierLabelKey);
  const clampedPct = Math.min(100, Math.max(0, progressPct));

  return (
    <UICard style={styles.card}>
      <View style={[styles.headRow, isRtl && styles.rowRtl]}>
        <View style={styles.headLeft}>
          <UiText style={styles.kicker}>{t("tier.progressKicker")}</UiText>
          <View style={[styles.headTitleRow, isRtl && styles.rowRtl]}>
            <UiText style={styles.headTitle}>
              {t("tier.progressTitle", { tier: tierLabel })}
            </UiText>
            <Ionicons
              name={nextTier === "diamond" ? "diamond" : "medal"}
              size={18}
              color={theme.medalColor}
            />
          </View>
        </View>
        <View style={[styles.pctBlock, isRtl && styles.pctBlockRtl]}>
          <View style={[styles.pctValueRow, isRtl && styles.rowRtl]}>
            <UiText style={[styles.pctValue, { color: theme.inkPrimary }]}>
              {t("tier.progressCompleteValue", { pct: clampedPct })}
            </UiText>
            <UiText style={[styles.pctSuffix, { color: theme.inkSecondary }]}>%</UiText>
          </View>
          <UiText style={styles.pctLabel}>{t("tier.progressCompleteLabel")}</UiText>
        </View>
      </View>

      <View style={styles.barTrack}>
        <LinearGradient
          colors={["#3FB6FF", "#6B5CFF", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.barFill, { width: `${clampedPct}%` }]}
        />
      </View>

      <View style={styles.reqList}>
        {requirements.map((req) => (
          <View
            key={req.id}
            style={[styles.reqRow, !req.done && styles.reqRowMuted, isRtl && styles.rowRtl]}
          >
            <View
              style={[
                styles.reqCheck,
                req.done ? styles.reqCheckDone : styles.reqCheckPending,
              ]}
            >
              {req.done ? (
                <Ionicons name="checkmark" size={14} color={COLORS.portalInk} />
              ) : null}
            </View>
            <View style={styles.reqText}>
              <UiText
                style={[styles.reqTitle, !req.done && styles.reqTitleMuted]}
                numberOfLines={1}
              >
                {t(req.titleKey)}
              </UiText>
              <UiText style={styles.reqMeta} numberOfLines={1}>
                {t(req.metaKey)}
              </UiText>
            </View>
            <View style={[styles.reqValuePill, !req.done && styles.reqValuePillMuted]}>
              <UiText
                style={[styles.reqValue, !req.done && styles.reqValueMuted]}
                numberOfLines={1}
              >
                {t(req.valueKey)}
              </UiText>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footerDivider} />

      <View style={[styles.footerRow, isRtl && styles.rowRtl]}>
        <UiText style={styles.footerText}>
          {t("tier.progressEstArrivalLabel")}{" "}
          <UiText style={styles.footerStrong}>{t("tier.progressEstArrivalDate")}</UiText>
          {t("tier.progressEstArrivalSuffix")}
        </UiText>
        <Pressable onPress={onSeeBenefits} style={styles.benefitsCta}>
          <UiText style={styles.benefitsCtaText}>
            {t("tier.progressBenefitsCta", { tier: tierLabel })}
          </UiText>
        </Pressable>
      </View>
    </UICard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 0,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  headLeft: {
    flex: 1,
    gap: 4,
  },
  kicker: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 1.4,
    color: COLORS.ink5,
  },
  headTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headTitle: {
    fontFamily: "Inter_900Black",
    fontSize: 20,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
  },
  pctBlock: {
    alignItems: "flex-end",
  },
  pctBlockRtl: {
    alignItems: "flex-start",
  },
  pctValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 1,
  },
  pctValue: {
    fontFamily: "Inter_900Black",
    fontSize: 28,
    letterSpacing: -0.6,
  },
  pctSuffix: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
  },
  pctLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 1.2,
    color: COLORS.ink4,
    marginTop: -2,
  },
  barTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 999,
  },
  reqList: {
    gap: 8,
    marginTop: 2,
  },
  reqRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
  },
  reqRowMuted: {
    backgroundColor: COLORS.whiteSecondary,
  },
  reqCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  reqCheckDone: {
    borderColor: COLORS.portalInk,
    backgroundColor: COLORS.white,
  },
  reqCheckPending: {
    borderColor: COLORS.ink5,
    backgroundColor: "transparent",
  },
  reqText: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  reqTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  reqTitleMuted: {
    color: COLORS.ink4,
  },
  reqMeta: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: COLORS.ink4,
  },
  reqValuePill: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.portalInk,
    backgroundColor: COLORS.white,
  },
  reqValuePillMuted: {
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
  },
  reqValue: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    color: COLORS.portalInk,
    fontVariant: ["tabular-nums"],
  },
  reqValueMuted: {
    color: COLORS.ink4,
  },
  footerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.hairline,
    marginTop: 4,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.md,
    flexWrap: "wrap",
  },
  footerText: {
    flex: 1,
    minWidth: 200,
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: COLORS.ink3,
    lineHeight: 16,
  },
  footerStrong: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.portalInk,
  },
  benefitsCta: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.portalInk,
    backgroundColor: COLORS.white,
  },
  benefitsCtaText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    color: COLORS.portalInk,
  },
});
