import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { conciergeStyles } from "@/constants/concierge.styles";
import { controlStyles } from "@/constants/control.styles";
import { COLORS } from "@/constants/styles";

type ConciergeEmergencyOverridePanelProps = {
  title: string;
  desc: string;
  warn: string;
  cta: string;
  foot: string;
  onEscalate: () => void;
};

export function ConciergeEmergencyOverridePanel({
  title,
  desc,
  warn,
  cta,
  foot,
  onEscalate,
}: ConciergeEmergencyOverridePanelProps) {
  return (
    <>
      <UiText style={[controlStyles.panelTitle, { marginBottom: 10 }]}>{title}</UiText>
      <UiText style={conciergeStyles.escDesc}>{desc}</UiText>
      <View style={conciergeStyles.escWarn}>
        <Ionicons name="warning-outline" size={14} color={COLORS.neonRed} />
        <UiText style={conciergeStyles.escWarnText}>{warn}</UiText>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onEscalate}
        style={conciergeStyles.escBtn}
      >
        <Ionicons name="arrow-up" size={16} color={COLORS.white} />
        <UiText style={conciergeStyles.escBtnText}>{cta}</UiText>
      </Pressable>
      <UiText style={conciergeStyles.escFoot}>{foot}</UiText>
    </>
  );
}
