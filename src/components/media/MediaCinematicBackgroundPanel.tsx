import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Switch, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";
import { COLORS } from "@/constants/styles";

type MediaCinematicBackgroundPanelProps = {
  title: string;
  emptyTitle: string;
  emptySub: string;
  cap: string;
  showOnOpen: boolean;
  onShowOnOpen: (v: boolean) => void;
  loop: boolean;
  onLoop: (v: boolean) => void;
  muted: boolean;
  onMuted: (v: boolean) => void;
  showOnOpenLabel: string;
  loopLabel: string;
  mutedLabel: string;
  uploadLabel: string;
  onUpload: () => void;
};

export function MediaCinematicBackgroundPanel({
  title,
  emptyTitle,
  emptySub,
  cap,
  showOnOpen,
  onShowOnOpen,
  loop,
  onLoop,
  muted,
  onMuted,
  showOnOpenLabel,
  loopLabel,
  mutedLabel,
  uploadLabel,
  onUpload,
}: MediaCinematicBackgroundPanelProps) {
  return (
    <>
      <UiText style={controlStyles.panelTitle}>{title}</UiText>
      <View style={mediaStyles.cineWrap}>
        <View style={mediaStyles.cineEmpty}>
          <Ionicons name="film-outline" size={44} color={COLORS.ink3} />
          <UiText style={mediaStyles.cineEmptyTitle}>{emptyTitle}</UiText>
          <UiText style={mediaStyles.cineEmptySub}>{emptySub}</UiText>
        </View>
        <View style={mediaStyles.cineCap}>
          <UiText style={mediaStyles.cineCapText}>{cap}</UiText>
        </View>
      </View>
      <View style={mediaStyles.cineOpts}>
        <View style={mediaStyles.cineOpt}>
          <UiText style={mediaStyles.cineOptText}>{showOnOpenLabel}</UiText>
          <Switch
            value={showOnOpen}
            onValueChange={onShowOnOpen}
            trackColor={{ false: COLORS.chartMist, true: COLORS.secondary }}
            thumbColor={COLORS.white}
          />
        </View>
        <View style={mediaStyles.cineOpt}>
          <UiText style={mediaStyles.cineOptText}>{loopLabel}</UiText>
          <Switch
            value={loop}
            onValueChange={onLoop}
            trackColor={{ false: COLORS.chartMist, true: COLORS.secondary }}
            thumbColor={COLORS.white}
          />
        </View>
        <View style={mediaStyles.cineOpt}>
          <UiText style={mediaStyles.cineOptText}>{mutedLabel}</UiText>
          <Switch
            value={muted}
            onValueChange={onMuted}
            trackColor={{ false: COLORS.chartMist, true: COLORS.secondary }}
            thumbColor={COLORS.white}
          />
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onUpload}
        style={mediaStyles.ghostFullBtn}
      >
        <UiText style={mediaStyles.ghostFullBtnText}>{uploadLabel}</UiText>
      </Pressable>
    </>
  );
}
