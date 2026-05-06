import type { TFunction } from "i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

import { type Tier, TIER_THEMES, TIERS } from "./tier.types";
import { TierMedal } from "./TierMedal";

type TierPreviewSelectorProps = {
  active: Tier;
  current: Tier;
  onSelect: (tier: Tier) => void;
  isRtl?: boolean;
  t: TFunction;
};

const TIER_LABEL_KEY: Record<Tier, string> = {
  bronze: "tier.tierBronze",
  silver: "tier.tierSilver",
  gold: "tier.tierGold",
  diamond: "tier.tierDiamond",
};

export function TierPreviewSelector({
  active,
  current,
  onSelect,
  isRtl = false,
  t,
}: TierPreviewSelectorProps) {
  return (
    <View style={[styles.wrap, isRtl && styles.wrapRtl]}>
      <View style={styles.previewBadge}>
        <UiText style={styles.previewLabel}>{t("tier.previewLabel")}</UiText>
      </View>
      {TIERS.map((tier) => {
        const isActive = tier === active;
        const isCurrent = tier === current;
        const theme = TIER_THEMES[tier];
        return (
          <Pressable
            key={tier}
            onPress={() => onSelect(tier)}
            style={[
              styles.pill,
              isActive && [
                styles.pillActive,
                { backgroundColor: theme.cardBgSoft, borderColor: theme.cardBorder },
              ],
            ]}
          >
            <TierMedal tier={tier} size={24} style={styles.medal} />
            <UiText
              style={[
                styles.pillLabel,
                isActive && { color: theme.inkPrimary },
                isCurrent && !isActive && styles.pillLabelCurrent,
              ]}
            >
              {t(TIER_LABEL_KEY[tier])}
            </UiText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  wrapRtl: {
    flexDirection: "row-reverse",
  },
  previewBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  previewLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 1,
    color: COLORS.ink5,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
  },
  pillActive: {
    backgroundColor: COLORS.white,
  },
  pillLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: COLORS.ink3,
  },
  pillLabelCurrent: {
    color: COLORS.portalInk,
  },
  medal: {
    marginRight: 2,
  },
});
