import type { ComponentProps } from "react";
import { View } from "react-native";

import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import { MediaCinematicBackgroundPanel } from "@/components/media/MediaCinematicBackgroundPanel";
import { MediaDynamicBioPanel } from "@/components/media/MediaDynamicBioPanel";
import { MediaVisualAlbumsPanel } from "@/components/media/MediaVisualAlbumsPanel";
import { controlStyles } from "@/constants/control.styles";

import { UICard } from "../ui/UICard";

type MediaGalleryBioSectionProps = {
  isRtl: boolean;
  sectionTitle: string;
  sectionCaption: string;
  albums: ComponentProps<typeof MediaVisualAlbumsPanel>;
  bio: ComponentProps<typeof MediaDynamicBioPanel>;
  cine: ComponentProps<typeof MediaCinematicBackgroundPanel>;
};

export function MediaGalleryBioSection({
  isRtl,
  sectionTitle,
  sectionCaption,
  albums,
  bio,
  cine,
}: MediaGalleryBioSectionProps) {
  return (
    <View>
      <ControlSectionHeader
        title={sectionTitle}
        caption={sectionCaption}
        isRtl={isRtl}
        tightTop
      />
      <View style={controlStyles.g3}>
        <UICard>
          <MediaVisualAlbumsPanel {...albums} />
        </UICard>
        <UICard>
          <MediaDynamicBioPanel {...bio} />
        </UICard>
        <UICard>
          <MediaCinematicBackgroundPanel {...cine} />
        </UICard>
      </View>
    </View>
  );
}
