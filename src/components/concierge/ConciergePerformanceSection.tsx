import type { ComponentProps } from "react";
import { View } from "react-native";

import { ConciergeMenuEngineeringPanel } from "@/components/concierge/ConciergeMenuEngineeringPanel";
import { ConciergeOpportunitiesPanel } from "@/components/concierge/ConciergeOpportunitiesPanel";
import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import { controlStyles } from "@/constants/control.styles";

import { UICard } from "../ui/UICard";

type ConciergePerformanceSectionProps = {
  isRtl: boolean;
  title: string;
  caption: string;
  opportunities: ComponentProps<typeof ConciergeOpportunitiesPanel>;
  menu: ComponentProps<typeof ConciergeMenuEngineeringPanel>;
};

export function ConciergePerformanceSection({
  isRtl,
  title,
  caption,
  opportunities,
  menu,
}: ConciergePerformanceSectionProps) {
  return (
    <View>
      <ControlSectionHeader title={title} caption={caption} isRtl={isRtl} tightTop />
      <View style={controlStyles.g2}>
        <UICard style={controlStyles.g2Half}>
          <ConciergeOpportunitiesPanel {...opportunities} />
        </UICard>
        <UICard style={controlStyles.g2Half}>
          <ConciergeMenuEngineeringPanel {...menu} />
        </UICard>
      </View>
    </View>
  );
}
