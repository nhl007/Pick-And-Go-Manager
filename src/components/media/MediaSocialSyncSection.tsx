import type { ComponentProps } from "react";
import { View } from "react-native";

import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import { MediaConnectedAccountsPanel } from "@/components/media/MediaConnectedAccountsPanel";
import { MediaIgFeedOnPagePanel } from "@/components/media/MediaIgFeedOnPagePanel";
import { mediaStyles } from "@/constants/media.styles";

import { UICard } from "../ui/UICard";

type MediaSocialSyncSectionProps = {
  isRtl: boolean;
  sectionTitle: string;
  sectionCaption: string;
  connected: ComponentProps<typeof MediaConnectedAccountsPanel>;
  igFeed: ComponentProps<typeof MediaIgFeedOnPagePanel>;
};

export function MediaSocialSyncSection({
  isRtl,
  sectionTitle,
  sectionCaption,
  connected,
  igFeed,
}: MediaSocialSyncSectionProps) {
  return (
    <View>
      <ControlSectionHeader
        title={sectionTitle}
        caption={sectionCaption}
        isRtl={isRtl}
        tightTop
      />
      <View style={mediaStyles.g21}>
        <UICard>
          <MediaConnectedAccountsPanel {...connected} />
        </UICard>
        <UICard>
          <MediaIgFeedOnPagePanel {...igFeed} />
        </UICard>
      </View>
    </View>
  );
}
