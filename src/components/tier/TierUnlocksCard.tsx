import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { UICard } from "@/components/ui/UICard";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type UnlockRow = {
  id: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  titleKey: string;
  metaKey: string;
};

const UNLOCK_ROWS: UnlockRow[] = [
  {
    id: "commission",
    icon: "trending-down-outline",
    titleKey: "tier.unlocksCommissionTitle",
    metaKey: "tier.unlocksCommissionMeta",
  },
  {
    id: "payout",
    icon: "flash-outline",
    titleKey: "tier.unlocksPayoutTitle",
    metaKey: "tier.unlocksPayoutMeta",
  },
  {
    id: "map",
    icon: "location-outline",
    titleKey: "tier.unlocksMapTitle",
    metaKey: "tier.unlocksMapMeta",
  },
  {
    id: "concierge",
    icon: "briefcase-outline",
    titleKey: "tier.unlocksConciergeTitle",
    metaKey: "tier.unlocksConciergeMeta",
  },
];

type TierUnlocksCardProps = {
  t: TFunction;
  onSeeAll?: () => void;
};

export function TierUnlocksCard({ t, onSeeAll }: TierUnlocksCardProps) {
  return (
    <UICard style={styles.card}>
      <View style={styles.head}>
        <View style={styles.headLeft}>
          <View style={styles.iconBox}>
            <Ionicons name="lock-open-outline" size={16} color={COLORS.portalInk} />
          </View>
          <UiText style={styles.title}>{t("tier.unlocksTitle")}</UiText>
        </View>
        <View style={styles.progressBadge}>
          <UiText style={styles.progressBadgeText}>
            {t("tier.unlocksProgressBadge")}
          </UiText>
        </View>
      </View>

      <UiText style={styles.description}>{t("tier.unlocksDescription")}</UiText>

      <View style={styles.list}>
        {UNLOCK_ROWS.map((row) => (
          <View key={row.id} style={styles.row}>
            <View style={styles.rowIconBox}>
              <Ionicons name={row.icon} size={16} color={COLORS.portalInk} />
            </View>
            <View style={styles.rowText}>
              <UiText style={styles.rowTitle}>{t(row.titleKey)}</UiText>
              <UiText style={styles.rowMeta}>{t(row.metaKey)}</UiText>
            </View>
          </View>
        ))}
      </View>

      <Pressable onPress={onSeeAll} style={styles.footerCta}>
        <UiText style={styles.footerCtaText}>{t("tier.unlocksFooterCta")}</UiText>
      </Pressable>
    </UICard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 18,
    gap: 12,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  headLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  title: {
    flex: 1,
    fontFamily: "Inter_900Black",
    fontSize: 15,
    letterSpacing: -0.2,
    color: COLORS.portalInk,
  },
  progressBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#FFF6CD",
  },
  progressBadgeText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    color: "#7A5A0A",
  },
  description: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.ink3,
  },
  list: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
  },
  rowIconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  rowMeta: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: COLORS.ink4,
  },
  footerCta: {
    marginTop: "auto",
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.hairline,
    borderStyle: "dashed",
    alignItems: "center",
    backgroundColor: "#FFFCEF",
  },
  footerCtaText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
});
