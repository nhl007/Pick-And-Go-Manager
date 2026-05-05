import type { ComponentProps } from "react";
import { View } from "react-native";

import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import { MediaLiveStoriesPanel } from "@/components/media/MediaLiveStoriesPanel";
import { MediaStatusOverlayPanel } from "@/components/media/MediaStatusOverlayPanel";
import { MediaTodaysHeroImagePanel } from "@/components/media/MediaTodaysHeroImagePanel";
import { controlStyles } from "@/constants/control.styles";

import { UICard } from "../ui/UICard";

type MediaDailySpotlightSectionProps = {
  isRtl: boolean;
  sectionTitle: string;
  sectionCaption: string;
  hero: ComponentProps<typeof MediaTodaysHeroImagePanel>;
  stories: ComponentProps<typeof MediaLiveStoriesPanel>;
  status: ComponentProps<typeof MediaStatusOverlayPanel>;
};

export function MediaDailySpotlightSection({
  isRtl,
  sectionTitle,
  sectionCaption,
  hero,
  stories,
  status,
}: MediaDailySpotlightSectionProps) {
  return (
    <View>
      <ControlSectionHeader title={sectionTitle} caption={sectionCaption} isRtl={isRtl} />
      <View style={controlStyles.g3}>
        <UICard>
          <MediaTodaysHeroImagePanel {...hero} />
        </UICard>
        <UICard>
          <MediaLiveStoriesPanel {...stories} />
        </UICard>
        <UICard>
          <MediaStatusOverlayPanel {...status} />
        </UICard>
      </View>
    </View>
  );
}
