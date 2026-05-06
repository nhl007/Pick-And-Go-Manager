import type { TFunction } from "i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

import { type Tier,TIER_THEMES } from "./tier.types";
import { TierMedal } from "./TierMedal";

type MiniState = "active" | "next" | "locked";

type TierMiniCardProps = {
  tier: Tier;
  state: MiniState;
  isPreviewActive: boolean;
  onPress: () => void;
  t: TFunction;
};

const TIER_NAME_KEY: Record<Tier, string> = {
  bronze: "tier.tierBronze",
  silver: "tier.tierSilver",
  gold: "tier.tierGold",
  diamond: "tier.tierDiamond",
};

const TIER_CAPTION_KEY: Record<Tier, string> = {
  bronze: "tier.miniBronzeCaption",
  silver: "tier.miniSilverCaption",
  gold: "tier.miniGoldCaption",
  diamond: "tier.miniDiamondCaption",
};

const STATE_LABEL_KEY: Record<MiniState, string> = {
  active: "tier.miniStateActive",
  next: "tier.miniStateNext",
  locked: "tier.miniStateLocked",
};

export function TierMiniCard({
  tier,
  state,
  isPreviewActive,
  onPress,
  t,
}: TierMiniCardProps) {
  const theme = TIER_THEMES[tier];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: isPreviewActive 
            ? theme.cardBgSoft
            : COLORS.white,
          borderColor: isPreviewActive ? theme.cardBorder : COLORS.hairline,
          borderWidth: isPreviewActive ? 1.5 : StyleSheet.hairlineWidth,
        },
      ]}
    >
      <TierMedal tier={tier} size={48} />
      <UiText style={[styles.name, { color: theme.inkPrimary }]}>
        {t(TIER_NAME_KEY[tier])}
      </UiText>
      <UiText style={styles.caption}>
        {t(TIER_CAPTION_KEY[tier])}
        {state === "active" ? ` · ${t("tier.miniStateYouAreHere")}` : ""}
      </UiText>
      <View
        style={[
          styles.stateChip,
          state === "active" && [
            styles.stateChipActive,
            { borderColor: theme.cardBorder },
          ],
        ]}
      >
        {state === "active" ? (
          <View style={[styles.dot, { backgroundColor: theme.medalColor }]} />
        ) : null}
        <UiText
          style={[
            styles.stateText,
            state === "active" && styles.stateTextActive,
            state === "locked" && styles.stateTextLocked,
          ]}
        >
          {t(STATE_LABEL_KEY[state])}
        </UiText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: "22%",
    minWidth: 140,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 6,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  name: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 14,
    letterSpacing: -0.2,
    marginTop: 4,
  },
  caption: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
    textAlign: "center",
  },
  stateChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    marginTop: 4,
  },
  stateChipActive: {
    backgroundColor: COLORS.white,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  stateText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: COLORS.ink3,
  },
  stateTextActive: {
    color: COLORS.portalInk,
  },
  stateTextLocked: {
    color: COLORS.ink5,
  },
});
