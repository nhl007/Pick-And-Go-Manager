import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import { StyleSheet, View } from "react-native";

import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

import { TIER_THEMES } from "./tier.types";

type Benefit = {
  id: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  titleKey: string;
  metaKey: string;
};

const BENEFITS: Benefit[] = [
  {
    id: "reduced",
    icon: "trending-down-outline",
    titleKey: "tier.diamondBenefitReducedTitle",
    metaKey: "tier.diamondBenefitReducedMeta",
  },
  {
    id: "payout",
    icon: "flash-outline",
    titleKey: "tier.diamondBenefitPayoutTitle",
    metaKey: "tier.diamondBenefitPayoutMeta",
  },
  {
    id: "map",
    icon: "location-outline",
    titleKey: "tier.diamondBenefitMapTitle",
    metaKey: "tier.diamondBenefitMapMeta",
  },
  {
    id: "concierge",
    icon: "briefcase-outline",
    titleKey: "tier.diamondBenefitConciergeTitle",
    metaKey: "tier.diamondBenefitConciergeMeta",
  },
  {
    id: "dispute",
    icon: "time-outline",
    titleKey: "tier.diamondBenefitDisputeTitle",
    metaKey: "tier.diamondBenefitDisputeMeta",
  },
  {
    id: "badge",
    icon: "star-outline",
    titleKey: "tier.diamondBenefitBadgeTitle",
    metaKey: "tier.diamondBenefitBadgeMeta",
  },
  {
    id: "early",
    icon: "star-outline",
    titleKey: "tier.diamondBenefitEarlyTitle",
    metaKey: "tier.diamondBenefitEarlyMeta",
  },
];

type TierDiamondBenefitsModalProps = {
  visible: boolean;
  onClose: () => void;
  progressPct?: number;
  t: TFunction;
};

export function TierDiamondBenefitsModal({
  visible,
  onClose,
  progressPct = 72,
  t,
}: TierDiamondBenefitsModalProps) {
  const diamondTheme = TIER_THEMES.diamond;
  const clamped = Math.min(100, Math.max(0, progressPct));

  return (
    <StaffBaseModal visible={visible} onClose={onClose} maxWidth={620} maxHeight={760}>
      <View style={styles.heroCard}>
        <View style={styles.heroBarTrack}>
          <View
            style={[
              styles.heroBarFill,
              { width: `${clamped}%`, backgroundColor: diamondTheme.medalColor },
            ]}
          />
        </View>
        <View style={styles.heroIconWrap}>
          <Ionicons name="diamond" size={44} color={diamondTheme.medalColor} />
        </View>
        <UiText style={styles.heroKicker}>{t("tier.diamondModalKicker")}</UiText>
        <UiText style={[styles.heroTitle, { color: "#3B2EA8" }]}>
          {t("tier.diamondModalTitle")}
        </UiText>
        <View style={styles.heroProgressTrack}>
          <View
            style={[
              styles.heroProgressFill,
              { width: `${clamped}%`, backgroundColor: "#7C3AED" },
            ]}
          />
        </View>
        <UiText style={styles.heroProgressMeta}>
          {t("tier.diamondModalProgressMeta")}
        </UiText>
      </View>

      <UiText style={styles.sectionLabel}>{t("tier.diamondImpactSection")}</UiText>
      <View style={styles.impactRow}>
        <View style={styles.impactBox}>
          <UiText style={styles.impactValue}>
            {t("tier.diamondImpactCommissionValue")}
          </UiText>
          <UiText style={styles.impactLabel}>
            {t("tier.diamondImpactCommissionLabel")}
          </UiText>
          <UiText style={styles.impactCaption}>
            {t("tier.diamondImpactCommissionCaption")}
          </UiText>
        </View>
        <View style={[styles.impactBox, styles.impactBoxHi]}>
          <UiText style={[styles.impactValue, styles.impactValueHi]}>
            {t("tier.diamondImpactSavingsValue")}
          </UiText>
          <UiText style={[styles.impactLabel, styles.impactLabelHi]}>
            {t("tier.diamondImpactSavingsLabel")}
          </UiText>
          <UiText style={[styles.impactCaption, styles.impactCaptionHi]}>
            {t("tier.diamondImpactSavingsCaption")}
          </UiText>
        </View>
        <View style={styles.impactBox}>
          <UiText style={styles.impactValue}>
            {t("tier.diamondImpactPayoutValue")}
          </UiText>
          <UiText style={styles.impactLabel}>
            {t("tier.diamondImpactPayoutLabel")}
          </UiText>
          <UiText style={styles.impactCaption}>
            {t("tier.diamondImpactPayoutCaption")}
          </UiText>
        </View>
      </View>

      <UiText style={[styles.sectionLabel, styles.sectionLabelSpaced]}>
        {t("tier.diamondBenefitsSection")}
      </UiText>
      <View style={styles.benefitsList}>
        {BENEFITS.map((benefit) => (
          <View key={benefit.id} style={styles.benefitRow}>
            <View style={styles.benefitIconBox}>
              <Ionicons name={benefit.icon} size={16} color={COLORS.portalInk} />
            </View>
            <View style={styles.benefitText}>
              <UiText style={styles.benefitTitle}>{t(benefit.titleKey)}</UiText>
              <UiText style={styles.benefitMeta}>{t(benefit.metaKey)}</UiText>
            </View>
          </View>
        ))}
      </View>
    </StaffBaseModal>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    alignItems: "center",
    paddingVertical: 22,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    overflow: "hidden",
    gap: 4,
    marginBottom: 18,
  },
  heroBarTrack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  heroBarFill: {
    height: "100%",
  },
  heroIconWrap: {
    marginTop: 4,
    marginBottom: 6,
  },
  heroKicker: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 1.4,
    color: COLORS.ink5,
    marginBottom: 2,
  },
  heroTitle: {
    fontFamily: "Inter_900Black",
    fontSize: 26,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  heroProgressTrack: {
    width: "80%",
    maxWidth: 360,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.06)",
    overflow: "hidden",
    marginBottom: 8,
  },
  heroProgressFill: {
    height: "100%",
    borderRadius: 999,
  },
  heroProgressMeta: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  sectionLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 1.4,
    color: COLORS.ink5,
    marginBottom: 8,
  },
  sectionLabelSpaced: {
    marginTop: 18,
  },
  impactRow: {
    flexDirection: "row",
    gap: 10,
  },
  impactBox: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
    alignItems: "center",
    gap: 4,
  },
  impactBoxHi: {
    backgroundColor: "#FFF6CD",
    borderColor: "#EBD78A",
  },
  impactValue: {
    fontFamily: "Inter_900Black",
    fontSize: 22,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
    fontVariant: ["tabular-nums"],
  },
  impactValueHi: {
    color: "#A04F0E",
  },
  impactLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 1.2,
    color: COLORS.ink5,
    textAlign: "center",
  },
  impactLabelHi: {
    color: "#7A5A0A",
  },
  impactCaption: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
  },
  impactCaptionHi: {
    color: "#7A5A0A",
  },
  benefitsList: {
    gap: 8,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
  },
  benefitIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
  },
  benefitText: {
    flex: 1,
    gap: 2,
  },
  benefitTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  benefitMeta: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: COLORS.ink3,
    lineHeight: 16,
  },
});
