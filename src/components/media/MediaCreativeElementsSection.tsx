import type { ComponentProps } from "react";
import { View } from "react-native";

import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import { MediaChefsCornerPanel } from "@/components/media/MediaChefsCornerPanel";
import { MediaCustomerRepostPanel } from "@/components/media/MediaCustomerRepostPanel";
import { MediaPageMoodPanel } from "@/components/media/MediaPageMoodPanel";
import { MediaSmartSchedulePanel } from "@/components/media/MediaSmartSchedulePanel";
import { controlStyles } from "@/constants/control.styles";
import { SPACING } from "@/constants/styles";

import { UICard } from "../ui/UICard";

type MediaCreativeElementsSectionProps = {
  isRtl: boolean;
  sectionTitle: string;
  sectionCaption: string;
  mood: ComponentProps<typeof MediaPageMoodPanel>;
  chef: ComponentProps<typeof MediaChefsCornerPanel>;
  repost: ComponentProps<typeof MediaCustomerRepostPanel>;
  schedule: ComponentProps<typeof MediaSmartSchedulePanel>;
};

export function MediaCreativeElementsSection({
  isRtl,
  sectionTitle,
  sectionCaption,
  mood,
  chef,
  repost,
  schedule,
}: MediaCreativeElementsSectionProps) {
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
          <MediaPageMoodPanel {...mood} />
        </UICard>
        <UICard>
          <MediaChefsCornerPanel {...chef} />
        </UICard>
      </View>
      <View style={[controlStyles.g2, { marginTop: SPACING.sm }]}>
        <UICard>
          <MediaCustomerRepostPanel {...repost} />
        </UICard>
        <UICard>
          <MediaSmartSchedulePanel {...schedule} />
        </UICard>
      </View>
    </View>
  );
}
