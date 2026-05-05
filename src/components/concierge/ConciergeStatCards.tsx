import { View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { conciergeStyles } from "@/constants/concierge.styles";

import { UICard } from "../ui/UICard";

export type ConciergeStatCardData = {
  key: string;
  name: string;
  meta: string;
  big: string;
  stat: string;
  bigVariant?: "default" | "revenue";
};

type ConciergeStatCardsProps = {
  isRtl: boolean;
  cards: ConciergeStatCardData[];
};

export function ConciergeStatCards({ isRtl, cards }: ConciergeStatCardsProps) {
  return (
    <View style={conciergeStyles.g4}>
      {cards.map((card) => (
        <UICard key={card.key} style={conciergeStyles.statCard}>
          <View
            style={[conciergeStyles.statTop, isRtl && { flexDirection: "row-reverse" }]}
          >
            <UiText style={conciergeStyles.statName}>{card.name}</UiText>
            <UiText style={conciergeStyles.statMeta}>{card.meta}</UiText>
          </View>
          <View
            style={[conciergeStyles.statBot, isRtl && { flexDirection: "row-reverse" }]}
          >
            <UiText
              style={[
                conciergeStyles.statBig,
                card.bigVariant === "revenue" && conciergeStyles.statBigRevenue,
              ]}
            >
              {card.big}
            </UiText>
            <UiText style={conciergeStyles.statSmall}>{card.stat}</UiText>
          </View>
        </UICard>
      ))}
    </View>
  );
}
