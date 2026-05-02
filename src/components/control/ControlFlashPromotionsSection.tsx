import type { ComponentProps } from "react";

import { ControlLivePromoTracker } from "@/components/control/ControlLivePromoTracker";
import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";

import { UICard } from "../ui/UICard";

type ControlFlashPromotionsSectionProps = {
  isRtl: boolean;
  sectionTitle: string;
  sectionCaption: string;
  tracker: ComponentProps<typeof ControlLivePromoTracker>;
};

export function ControlFlashPromotionsSection({
  isRtl,
  sectionTitle,
  sectionCaption,
  tracker,
}: ControlFlashPromotionsSectionProps) {
  return (
    <UICard>
      <ControlSectionHeader
        title={sectionTitle}
        caption={sectionCaption}
        isRtl={isRtl}
        tightTop
      />
      <ControlLivePromoTracker {...tracker} />
    </UICard>
  );
}
