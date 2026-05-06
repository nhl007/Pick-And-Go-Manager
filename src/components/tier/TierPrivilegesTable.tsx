import type { TFunction } from "i18next";
import { StyleSheet, View } from "react-native";

import { UICard } from "@/components/ui/UICard";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

import { type Tier,TIER_THEMES, TIERS } from "./tier.types";
import { TierMedal } from "./TierMedal";

type TierPrivilegesTableProps = {
  currentTier: Tier;
  t: TFunction;
};

type Row = {
  id: string;
  labelKey: string;
  cellKeys: Record<Tier, string>;
};

const ROWS: Row[] = [
  {
    id: "commission",
    labelKey: "tier.privCommissionLabel",
    cellKeys: {
      bronze: "tier.privCommissionBronze",
      silver: "tier.privCommissionSilver",
      gold: "tier.privCommissionGold",
      diamond: "tier.privCommissionDiamond",
    },
  },
  {
    id: "visibility",
    labelKey: "tier.privVisibilityLabel",
    cellKeys: {
      bronze: "tier.privVisibilityBronze",
      silver: "tier.privVisibilitySilver",
      gold: "tier.privVisibilityGold",
      diamond: "tier.privVisibilityDiamond",
    },
  },
  {
    id: "badge",
    labelKey: "tier.privBadgeLabel",
    cellKeys: {
      bronze: "tier.privBadgeBronze",
      silver: "tier.privBadgeSilver",
      gold: "tier.privBadgeGold",
      diamond: "tier.privBadgeDiamond",
    },
  },
  {
    id: "support",
    labelKey: "tier.privSupportLabel",
    cellKeys: {
      bronze: "tier.privSupportBronze",
      silver: "tier.privSupportSilver",
      gold: "tier.privSupportGold",
      diamond: "tier.privSupportDiamond",
    },
  },
  {
    id: "payout",
    labelKey: "tier.privPayoutLabel",
    cellKeys: {
      bronze: "tier.privPayoutBronze",
      silver: "tier.privPayoutSilver",
      gold: "tier.privPayoutGold",
      diamond: "tier.privPayoutDiamond",
    },
  },
  {
    id: "marketing",
    labelKey: "tier.privMarketingLabel",
    cellKeys: {
      bronze: "tier.privMarketingBronze",
      silver: "tier.privMarketingSilver",
      gold: "tier.privMarketingGold",
      diamond: "tier.privMarketingDiamond",
    },
  },
  {
    id: "event",
    labelKey: "tier.privEventLabel",
    cellKeys: {
      bronze: "tier.privEventBronze",
      silver: "tier.privEventSilver",
      gold: "tier.privEventGold",
      diamond: "tier.privEventDiamond",
    },
  },
  {
    id: "featured",
    labelKey: "tier.privFeaturedLabel",
    cellKeys: {
      bronze: "tier.privFeaturedBronze",
      silver: "tier.privFeaturedSilver",
      gold: "tier.privFeaturedGold",
      diamond: "tier.privFeaturedDiamond",
    },
  },
];

const TIER_NAME_KEY: Record<Tier, string> = {
  bronze: "tier.tierBronze",
  silver: "tier.tierSilver",
  gold: "tier.tierGold",
  diamond: "tier.tierDiamond",
};

export function TierPrivilegesTable({ currentTier, t }: TierPrivilegesTableProps) {
  return (
    <UICard style={styles.card}>
      <View style={styles.headerRow}>
        <View style={[styles.benefitCell, styles.headerBenefitCell]}>
          <UiText style={styles.benefitHeaderLabel}>
            {t("tier.privilegesBenefitColumn")}
          </UiText>
        </View>
        {TIERS.map((tier) => {
          const theme = TIER_THEMES[tier];
          const isCurrent = tier === currentTier;
          const isDiamond = tier === "diamond";
          return (
            <View
              key={tier}
              style={[
                styles.tierCell,
                styles.headerTierCell,
                isCurrent && [
                  styles.headerCurrent,
                  { backgroundColor: theme.cardBg },
                ],
                isDiamond && !isCurrent && [
                  styles.headerDiamond,
                  { backgroundColor: theme.cardBgSoft, borderColor: theme.cardBorder },
                ],
              ]}
            >
              {isCurrent ? (
                <View
                  style={[
                    styles.youBadge,
                    { backgroundColor: theme.cardBgSoft, borderColor: theme.cardBorder },
                  ]}
                >
                  <UiText style={[styles.youBadgeText, { color: theme.inkPrimary }]}>
                    {t("tier.privilegesYouLabel")}
                  </UiText>
                </View>
              ) : null}
              <TierMedal tier={tier} size={36} />
              <UiText style={[styles.tierColLabel, { color: theme.inkPrimary }]}>
                {t(TIER_NAME_KEY[tier]).toUpperCase()}
              </UiText>
            </View>
          );
        })}
      </View>

      {ROWS.map((row, index) => {
        const isLast = index === ROWS.length - 1;
        return (
          <View key={row.id} style={[styles.bodyRow, !isLast && styles.bodyRowDivider]}>
            <View style={styles.benefitCell}>
              <UiText style={styles.benefitLabel}>{t(row.labelKey)}</UiText>
            </View>
            {TIERS.map((tier) => {
              const theme = TIER_THEMES[tier];
              const isCurrent = tier === currentTier;
              const isDiamond = tier === "diamond";
              const value = t(row.cellKeys[tier]);
              const isEmpty = value === t("tier.privEmpty");

              return (
                <View
                  key={tier}
                  style={[
                    styles.tierCell,
                    isCurrent && {
                      backgroundColor: theme.cardBg,
                    },
                    isDiamond && !isCurrent && {
                      backgroundColor: theme.cardBgSoft,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderColor: theme.cardBorder,
                    },
                  ]}
                >
                  <UiText
                    style={[
                      styles.cellText,
                      isEmpty && styles.cellTextEmpty,
                      isCurrent && [styles.cellTextStrong, { color: theme.inkPrimary }],
                      isDiamond && !isCurrent && { color: theme.inkPrimary },
                    ]}
                    numberOfLines={2}
                  >
                    {value}
                  </UiText>
                </View>
              );
            })}
          </View>
        );
      })}
    </UICard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 0,
    padding: 0,
    overflow: "hidden",
    gap: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingVertical: 14,
    paddingHorizontal: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.hairline,
  },
  bodyRow: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 54,
  },
  bodyRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.hairline,
    borderStyle: "dashed",
  },
  benefitCell: {
    flex: 1.4,
    minWidth: 140,
    paddingHorizontal: 18,
    paddingVertical: 12,
    justifyContent: "center",
  },
  headerBenefitCell: {
    paddingVertical: 8,
  },
  benefitHeaderLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 1.4,
    color: COLORS.ink5,
  },
  benefitLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  tierCell: {
    flex: 1,
    minWidth: 110,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  headerTierCell: {
    gap: 4,
    paddingVertical: 8,
  },
  headerCurrent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerDiamond: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  youBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 2,
  },
  youBadgeText: {
    fontFamily: "Inter_900Black",
    fontSize: 9,
    letterSpacing: 1.2,
  },
  tierColLabel: {
    fontFamily: "Inter_900Black",
    fontSize: 11,
    letterSpacing: 1.2,
    marginTop: 2,
  },
  cellText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.ink2,
    textAlign: "center",
  },
  cellTextEmpty: {
    fontFamily: "Inter_500Medium",
    color: COLORS.ink5,
  },
  cellTextStrong: {
    fontFamily: "Inter_900Black",
  },
});
