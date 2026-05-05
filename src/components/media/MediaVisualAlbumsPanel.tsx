import { Pressable, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";

type MediaVisualAlbumsPanelProps = {
  title: string;
  emptyTitle: string;
  emptySub: string;
  newAlbumLabel: string;
  onNewAlbum: () => void;
};

export function MediaVisualAlbumsPanel({
  title,
  emptyTitle,
  emptySub,
  newAlbumLabel,
  onNewAlbum,
}: MediaVisualAlbumsPanelProps) {
  return (
    <>
      <UiText style={controlStyles.panelTitle}>{title}</UiText>
      <View style={mediaStyles.heroEmpty}>
        <UiText style={mediaStyles.heroEmptyTitle}>{emptyTitle}</UiText>
        <UiText style={mediaStyles.heroEmptySub}>{emptySub}</UiText>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onNewAlbum}
        style={mediaStyles.ghostFullBtn}
      >
        <UiText style={mediaStyles.ghostFullBtnText}>{newAlbumLabel}</UiText>
      </Pressable>
    </>
  );
}
