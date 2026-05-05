import type { ComponentProps } from "react";
import { View } from "react-native";

import { ConciergeEmergencyOverridePanel } from "@/components/concierge/ConciergeEmergencyOverridePanel";
import { ConciergeTicketsPanel } from "@/components/concierge/ConciergeTicketsPanel";
import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import { conciergeStyles } from "@/constants/concierge.styles";

import { UICard } from "../ui/UICard";

type ConciergeEscalationSectionProps = {
  isRtl: boolean;
  title: string;
  caption: string;
  tickets: ComponentProps<typeof ConciergeTicketsPanel>;
  emergency: ComponentProps<typeof ConciergeEmergencyOverridePanel>;
};

export function ConciergeEscalationSection({
  isRtl,
  title,
  caption,
  tickets,
  emergency,
}: ConciergeEscalationSectionProps) {
  return (
    <View>
      <ControlSectionHeader title={title} caption={caption} isRtl={isRtl} tightTop />
      <View style={conciergeStyles.g21}>
        <UICard style={conciergeStyles.g21Main}>
          <ConciergeTicketsPanel {...tickets} />
        </UICard>
        <UICard style={conciergeStyles.g21Side}>
          <ConciergeEmergencyOverridePanel {...emergency} />
        </UICard>
      </View>
    </View>
  );
}
