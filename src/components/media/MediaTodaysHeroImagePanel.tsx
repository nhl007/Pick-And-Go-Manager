import { Pressable, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";

type MediaTodaysHeroImagePanelProps = {
  isRtl: boolean;
  title: string;
  badgeShowing: string;
  emptyTitle: string;
  emptySub: string;
  uploadLabel: string;
  scheduleLabel: string;
  onUpload: () => void;
  onSchedule: () => void;
};

export function MediaTodaysHeroImagePanel({
  isRtl,
  title,
  badgeShowing,
  emptyTitle,
  emptySub,
  uploadLabel,
  scheduleLabel,
  onUpload,
  onSchedule,
}: MediaTodaysHeroImagePanelProps) {
  return (
    <>
      <View style={[mediaStyles.flexBetween, isRtl && mediaStyles.flexBetweenRtl]}>
        <UiText style={mediaStyles.panelTitleInline}>{title}</UiText>
        <View style={mediaStyles.badgeOk}>
          <View style={mediaStyles.liveDot} />
          <UiText style={mediaStyles.badgeOkText}>{badgeShowing}</UiText>
        </View>
      </View>
      <View style={mediaStyles.heroEmpty}>
        <UiText style={mediaStyles.heroEmptyTitle}>{emptyTitle}</UiText>
        <UiText style={mediaStyles.heroEmptySub}>{emptySub}</UiText>
      </View>
      <View style={[mediaStyles.mhActions, isRtl && controlStyles.rowRtl]}>
        <Pressable
          accessibilityRole="button"
          onPress={onUpload}
          style={mediaStyles.ghostSmBtn}
        >
          <UiText style={mediaStyles.ghostSmBtnText}>{uploadLabel}</UiText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onSchedule}
          style={mediaStyles.ghostSmBtn}
        >
          <UiText style={mediaStyles.ghostSmBtnText}>{scheduleLabel}</UiText>
        </Pressable>
      </View>
    </>
  );
}
