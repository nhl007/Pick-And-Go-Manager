import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { UiDirhamSymbol } from "@/components/ui/UiDirhamSymbol";
import { UiText } from "@/components/ui/UiText";

import { type Tier,TIER_THEMES } from "./tier.types";

type TierPerkStatProps = {
  tier: Tier;
  label: string;
  value: string;
  valueSuffix?: string;
  withCurrency?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function TierPerkStat({
  tier,
  label,
  value,
  valueSuffix,
  withCurrency = false,
  style,
}: TierPerkStatProps) {
  const theme = TIER_THEMES[tier];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.perkBg, borderColor: theme.perkBorder },
        style,
      ]}
    >
      <UiText style={[styles.label, { color: theme.perkLabelInk }]}>{label}</UiText>
      <View style={styles.valueRow}>
        {withCurrency ? (
          <UiDirhamSymbol size={14} color={theme.perkValueInk} />
        ) : null}
        <UiText style={[styles.value, { color: theme.perkValueInk }]}>{value}</UiText>
        {valueSuffix ? (
          <UiText style={[styles.suffix, { color: theme.perkLabelInk }]}>
            {valueSuffix}
          </UiText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: "22%",
    minWidth: 140,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  label: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 1.2,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  value: {
    fontFamily: "Inter_900Black",
    fontSize: 20,
    letterSpacing: -0.5,
    fontVariant: ["tabular-nums"],
  },
  suffix: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
  },
});
