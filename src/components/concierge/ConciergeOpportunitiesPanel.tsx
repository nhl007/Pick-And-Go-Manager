import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { conciergeStyles } from "@/constants/concierge.styles";
import { controlStyles } from "@/constants/control.styles";

import { UiButton } from "../ui/UiButton";

export type ConciergeOpportunity = {
  key: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  sub: string;
  lift: string;
  liftUnit: string;
};

type ConciergeOpportunitiesPanelProps = {
  isRtl: boolean;
  title: string;
  badgeLabel: string;
  applyLabel: string;
  opportunities: ConciergeOpportunity[];
  onApply: (key: string) => void;
};

export function ConciergeOpportunitiesPanel({
  isRtl,
  title,
  badgeLabel,
  applyLabel,
  opportunities,
  onApply,
}: ConciergeOpportunitiesPanelProps) {
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
        <View style={conciergeStyles.badgeAmber}>
          <UiText style={conciergeStyles.badgeAmberText}>{badgeLabel}</UiText>
        </View>
      </View>

      {opportunities.map((opp) => (
        <View key={opp.key} style={conciergeStyles.oppItem}>
          <View
            style={[conciergeStyles.oppHead, isRtl && { flexDirection: "row-reverse" }]}
          >
            <View style={conciergeStyles.oppIcon}>
              <Ionicons name={opp.icon} size={16} color="#0A0A0A" />
            </View>
            <View style={conciergeStyles.oppMain}>
              <UiText style={conciergeStyles.oppTitle}>{opp.title}</UiText>
              <UiText style={conciergeStyles.oppSub}>{opp.sub}</UiText>
            </View>
            <UiText style={conciergeStyles.oppLift}>
              {opp.lift}
              <UiText style={conciergeStyles.oppLiftUnit}>{opp.liftUnit}</UiText>
            </UiText>
          </View>
          <UiButton
            onPress={() => {
              onApply(opp.key);
            }}
            variant="outline"
          >
            <UiText font="extraBold" size="sm" color="black">
              {applyLabel}
            </UiText>
          </UiButton>
        </View>
      ))}
    </>
  );
}
