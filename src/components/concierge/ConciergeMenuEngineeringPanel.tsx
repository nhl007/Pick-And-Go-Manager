import { Pressable, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { conciergeStyles } from "@/constants/concierge.styles";
import { controlStyles } from "@/constants/control.styles";

import { UiButton } from "../ui/UiButton";

export type ConciergeMenuRow =
  | {
      key: string;
      type: "star";
      rank: string;
      title: string;
      sub: string;
      price: string;
      priceLabel: string;
    }
  | {
      key: string;
      type: "fix";
      rank: string;
      title: string;
      sub: string;
      fixLabel: string;
      onFix: () => void;
    }
  | {
      key: string;
      type: "hold";
      rank: string;
      title: string;
      sub: string;
      metaN: string;
      metaL: string;
    };

type ConciergeMenuEngineeringPanelProps = {
  isRtl: boolean;
  title: string;
  badgeLabel: string;
  rows: ConciergeMenuRow[];
  footerCta: string;
  onFooter: () => void;
};

export function ConciergeMenuEngineeringPanel({
  isRtl,
  title,
  badgeLabel,
  rows,
  footerCta,
  onFooter,
}: ConciergeMenuEngineeringPanelProps) {
  return (
    <>
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <UiText style={{ ...controlStyles.panelTitle, marginBottom: 0 }}>{title}</UiText>
        <View style={conciergeStyles.badgeNeutral}>
          <UiText style={conciergeStyles.badgeNeutralText}>{badgeLabel}</UiText>
        </View>
      </View>

      {rows.map((row) => {
        const rankStyle =
          row.type === "star"
            ? conciergeStyles.menuRankStar
            : row.type === "fix"
              ? conciergeStyles.menuRankDog
              : conciergeStyles.menuRankHold;

        return (
          <View
            key={row.key}
            style={[conciergeStyles.menuRow, isRtl && { flexDirection: "row-reverse" }]}
          >
            <View style={[conciergeStyles.menuRank, rankStyle]}>
              <UiText style={conciergeStyles.menuRankText}>{row.rank}</UiText>
            </View>

            <View style={conciergeStyles.menuBody}>
              <UiText style={conciergeStyles.menuName}>{row.title}</UiText>
              <UiText style={conciergeStyles.menuSub}>{row.sub}</UiText>
            </View>

            {row.type === "fix" ? (
              <Pressable
                accessibilityRole="button"
                onPress={row.onFix}
                style={conciergeStyles.menuFixBtn}
              >
                <UiText style={conciergeStyles.menuFixBtnText}>{row.fixLabel}</UiText>
              </Pressable>
            ) : row.type === "star" ? (
              <View style={conciergeStyles.menuMini}>
                <UiText style={conciergeStyles.menuMiniN}>{row.price}</UiText>
                <UiText style={conciergeStyles.menuMiniL}>{row.priceLabel}</UiText>
              </View>
            ) : (
              <View style={conciergeStyles.menuMini}>
                <UiText style={conciergeStyles.menuMiniN}>{row.metaN}</UiText>
                <UiText style={conciergeStyles.menuMiniL}>{row.metaL}</UiText>
              </View>
            )}
          </View>
        );
      })}

      <UiButton variant="outline" onPress={onFooter} style={{ marginTop: 12 }}>
        <UiText font="extraBold" size="sm" color="black">
          {footerCta}
        </UiText>
      </UiButton>
    </>
  );
}
