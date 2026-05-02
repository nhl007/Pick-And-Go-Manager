import type { ComponentProps } from "react";
import { View } from "react-native";

import { ControlPromoTemplatesPanel } from "@/components/control/ControlPromoTemplatesPanel";
import { ControlQuickLaunchPanel } from "@/components/control/ControlQuickLaunchPanel";
import { ControlQuickMenuStatsPanel } from "@/components/control/ControlQuickMenuStatsPanel";
import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import { controlStyles } from "@/constants/control.styles";

import { UICard } from "../ui/UICard";
import type { PromoTemplateDef } from "./ControlPromoTemplatesPanel";

type ControlQuickMenuSectionProps = {
  isRtl: boolean;
  sectionTitle: string;
  sectionCaption: string;
  stats: {
    panelTitle: string;
    availableLabel: string;
    availableCount: string;
    snoozedLabel: string;
    snoozedCount: string;
    unavailableLabel: string;
    unavailableCount: string;
    editMenuLabel: string;
    onEditFullMenu: () => void;
  };
  quickLaunch: ComponentProps<typeof ControlQuickLaunchPanel>;
  promo: {
    panelTitle: string;
    featuredBadgeLabel: string;
    templates: PromoTemplateDef[];
    onCreate: (key: string) => void;
  };
};

export function ControlQuickMenuSection({
  isRtl,
  sectionTitle,
  sectionCaption,
  stats,
  quickLaunch,
  promo,
}: ControlQuickMenuSectionProps) {
  return (
    <View>
      <ControlSectionHeader
        title={sectionTitle}
        caption={sectionCaption}
        isRtl={isRtl}
        tightTop
      />
      <View style={controlStyles.g2}>
        <UICard>
          <ControlQuickMenuStatsPanel {...stats} />
        </UICard>
        <UICard>
          <ControlQuickLaunchPanel {...quickLaunch} />
        </UICard>
      </View>
      <UICard style={[controlStyles.g2Full, { marginVertical: 16 }]}>
        <ControlPromoTemplatesPanel {...promo} />
      </UICard>
    </View>
  );
}
