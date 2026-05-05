import { Pressable, StyleSheet, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";
import { COLORS } from "@/constants/styles";

type MediaLiveStoriesPanelProps = {
  isRtl: boolean;
  title: string;
  maxHint: string;
  liveBadge: string;
  dropTitle: string;
  dropSub: string;
  onAddStory: () => void;
  onDropStory: () => void;
};

export function MediaLiveStoriesPanel({
  isRtl,
  title,
  maxHint,
  liveBadge,
  dropTitle,
  dropSub,
  onAddStory,
  onDropStory,
}: MediaLiveStoriesPanelProps) {
  return (
    <>
      <View style={[mediaStyles.flexBetween, isRtl && mediaStyles.flexBetweenRtl]}>
        <View style={[styles.titleRow, isRtl && controlStyles.rowRtl]}>
          <UiText style={mediaStyles.panelTitleInline}>{title}</UiText>
          <UiText style={styles.maxHint}>{maxHint}</UiText>
        </View>
        <View style={mediaStyles.badgeNeutral}>
          <UiText style={mediaStyles.badgeNeutralText}>{liveBadge}</UiText>
        </View>
      </View>
      <View style={[mediaStyles.storiesRow, isRtl && controlStyles.rowRtl]}>
        <Pressable
          accessibilityRole="button"
          onPress={onAddStory}
          style={mediaStyles.storyAdd}
        >
          <UiText style={mediaStyles.storyPlus}>+</UiText>
        </Pressable>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onDropStory}
        style={mediaStyles.storyDrop}
      >
        <UiText style={mediaStyles.storyDropTitle}>{dropTitle}</UiText>
        <UiText style={mediaStyles.storyDropSub}>{dropSub}</UiText>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  maxHint: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
  },
});
