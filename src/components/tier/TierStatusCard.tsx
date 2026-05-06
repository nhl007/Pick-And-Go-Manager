import type { TFunction } from "i18next";
import { StyleSheet, View } from "react-native";

import { UiText } from "@/components/ui/UiText";

import {
  type Tier,
  TIER_INDEX,
  TIER_THEMES,
  TIER_TOTAL,
} from "./tier.types";
import { TierMedal } from "./TierMedal";
import { TierPerkStat } from "./TierPerkStat";

type TierStatusCardProps = {
  tier: Tier;
  isCurrent: boolean;
  isRtl?: boolean;
  t: TFunction;
};

const TIER_KICKER_KEY: Record<Tier, string> = {
  bronze: "tier.cardKickerStarterTier",
  silver: "tier.cardKickerStableTier",
  gold: "tier.cardKickerExcellentTier",
  diamond: "tier.cardKickerPeakTier",
};

const TIER_NAME_KEY: Record<Tier, string> = {
  bronze: "tier.bronzeName",
  silver: "tier.silverName",
  gold: "tier.goldName",
  diamond: "tier.diamondName",
};

const TIER_TAGLINE_KEY: Record<Tier, string> = {
  bronze: "tier.bronzeTagline",
  silver: "tier.silverTagline",
  gold: "tier.goldTagline",
  diamond: "tier.diamondTagline",
};

const TIER_DESC_KEY: Record<Tier, string> = {
  bronze: "tier.bronzeDescription",
  silver: "tier.silverDescription",
  gold: "tier.goldDescription",
  diamond: "tier.diamondDescription",
};

const TIER_RANGE_KEY: Record<Tier, string> = {
  bronze: "tier.bronzeRange",
  silver: "tier.silverRange",
  gold: "tier.goldActiveDays",
  diamond: "tier.diamondRange",
};

const TIER_RANGE_CAP_KEY: Record<Tier, string> = {
  bronze: "tier.bronzeRangeCaption",
  silver: "tier.silverRangeCaption",
  gold: "tier.goldActiveSince",
  diamond: "tier.diamondRangeCaption",
};

const TIER_PERK_KEYS: Record<
  Tier,
  { commission: string; marketing: string; payout: string; support: string }
> = {
  bronze: {
    commission: "tier.bronzePerkCommission",
    marketing: "tier.bronzePerkMarketing",
    payout: "tier.bronzePerkPayout",
    support: "tier.bronzePerkSupport",
  },
  silver: {
    commission: "tier.silverPerkCommission",
    marketing: "tier.silverPerkMarketing",
    payout: "tier.silverPerkPayout",
    support: "tier.silverPerkSupport",
  },
  gold: {
    commission: "tier.goldPerkCommission",
    marketing: "tier.goldPerkMarketing",
    payout: "tier.goldPerkPayout",
    support: "tier.goldPerkSupport",
  },
  diamond: {
    commission: "tier.diamondPerkCommission",
    marketing: "tier.diamondPerkMarketing",
    payout: "tier.diamondPerkPayout",
    support: "tier.diamondPerkSupport",
  },
};

export function TierStatusCard({ tier, isCurrent, isRtl = false, t }: TierStatusCardProps) {
  const theme = TIER_THEMES[tier];
  const perks = TIER_PERK_KEYS[tier];
  const kicker = isCurrent
    ? t("tier.cardKickerCurrent")
    : t("tier.cardKickerPreview", { label: t(TIER_KICKER_KEY[tier]) });

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
      ]}
    >
      <View style={[styles.headRow, isRtl && styles.rowRtl]}>
        <UiText style={[styles.kicker, { color: theme.inkSecondary }]}>{kicker}</UiText>
        <View style={[styles.tierBadge, { backgroundColor: theme.badgeBg }]}>
          <UiText style={[styles.tierBadgeText, { color: theme.badgeInk }]}>
            {t("tier.tierIndex", {
              current: TIER_INDEX[tier],
              total: TIER_TOTAL,
            })}
          </UiText>
        </View>
      </View>

      <View style={[styles.bodyRow, isRtl && styles.rowRtl]}>
        <TierMedal tier={tier} size={92} />

        <View style={styles.bodyText}>
          <UiText style={[styles.tierName, { color: theme.inkPrimary }]}>
            {t(TIER_NAME_KEY[tier])}
          </UiText>
          <UiText style={[styles.tagline, { color: theme.inkSecondary }]}>
            {t(TIER_TAGLINE_KEY[tier])}
          </UiText>
          <UiText style={[styles.description, { color: theme.inkMuted }]}>
            {t(TIER_DESC_KEY[tier])}
          </UiText>
        </View>

        <View style={[styles.rangePill, { backgroundColor: theme.cardBgSoft }]}>
          <UiText style={[styles.rangeKicker, { color: theme.inkSecondary }]}>
            {isCurrent && tier === "gold"
              ? t("tier.goldActiveFor")
              : t(TIER_KICKER_KEY[tier])}
          </UiText>
          <UiText style={[styles.rangeValue, { color: theme.inkPrimary }]}>
            {t(TIER_RANGE_KEY[tier])}
          </UiText>
          <UiText style={[styles.rangeCaption, { color: theme.inkMuted }]}>
            {t(TIER_RANGE_CAP_KEY[tier])}
          </UiText>
        </View>
      </View>

      <View style={styles.perkGrid}>
        <TierPerkStat
          tier={tier}
          label={t("tier.perkCommissionLabel")}
          value={t(perks.commission)}
        />
        <TierPerkStat
          tier={tier}
          label={t("tier.perkMarketingLabel")}
          value={t(perks.marketing)}
          valueSuffix={t("tier.perkPerMonthSuffix")}
          withCurrency
        />
        <TierPerkStat
          tier={tier}
          label={t("tier.perkPayoutLabel")}
          value={t(perks.payout)}
        />
        <TierPerkStat
          tier={tier}
          label={t("tier.perkSupportLabel")}
          value={t(perks.support)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: "wrap",
  },
  kicker: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    letterSpacing: 1.5,
  },
  tierBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  tierBadgeText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 1,
  },
  bodyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  bodyText: {
    flex: 1,
    minWidth: 200,
    gap: 4,
  },
  tierName: {
    fontFamily: "Inter_900Black",
    fontSize: 30,
    letterSpacing: -0.4,
  },
  tagline: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
  },
  description: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  rangePill: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 130,
  },
  rangeKicker: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 1.2,
  },
  rangeValue: {
    fontFamily: "Inter_900Black",
    fontSize: 22,
    letterSpacing: -0.5,
    marginTop: 2,
  },
  rangeCaption: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    marginTop: 2,
  },
  perkGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
