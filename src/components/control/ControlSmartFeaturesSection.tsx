import type { ComponentProps } from "react";
import { View } from "react-native";

import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import { ControlSmartCrowdCard } from "@/components/control/ControlSmartCrowdCard";
import { ControlSmartSosCard } from "@/components/control/ControlSmartSosCard";
import { ControlSmartWeatherCard } from "@/components/control/ControlSmartWeatherCard";
import { controlStyles } from "@/constants/control.styles";

import { UICard } from "../ui/UICard";

type ControlSmartFeaturesSectionProps = {
  isRtl: boolean;
  sectionTitle: string;
  sectionCaption: string;
  crowd: ComponentProps<typeof ControlSmartCrowdCard>;
  weather: ComponentProps<typeof ControlSmartWeatherCard>;
  sos: ComponentProps<typeof ControlSmartSosCard>;
};

export function ControlSmartFeaturesSection({
  isRtl,
  sectionTitle,
  sectionCaption,
  crowd,
  weather,
  sos,
}: ControlSmartFeaturesSectionProps) {
  return (
    <View>
      <ControlSectionHeader
        title={sectionTitle}
        caption={sectionCaption}
        isRtl={isRtl}
        tightTop
      />
      <View style={controlStyles.g3}>
        <UICard style={controlStyles.g3Item}>
          <ControlSmartCrowdCard {...crowd} />
        </UICard>
        <UICard style={controlStyles.g3Item}>
          <ControlSmartWeatherCard {...weather} />
        </UICard>
        <UICard style={[controlStyles.g3Item]}>
          <ControlSmartSosCard {...sos} />
        </UICard>
      </View>
    </View>
  );
}
