import { Switch, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";
import { COLORS } from "@/constants/styles";

type PostMeta = { likes: string; comments: string };

type MediaIgFeedOnPagePanelProps = {
  isRtl: boolean;
  title: string;
  enabled: boolean;
  onEnabledChange: (v: boolean) => void;
  desc: string;
  posts: PostMeta[];
  note: string;
};

export function MediaIgFeedOnPagePanel({
  isRtl,
  title,
  enabled,
  onEnabledChange,
  desc,
  posts,
  note,
}: MediaIgFeedOnPagePanelProps) {
  return (
    <>
      <View style={[mediaStyles.flexBetween, isRtl && mediaStyles.flexBetweenRtl]}>
        <UiText style={mediaStyles.panelTitleInline}>{title}</UiText>
        <Switch
          value={enabled}
          onValueChange={onEnabledChange}
          trackColor={{ false: COLORS.chartMist, true: COLORS.secondary }}
          thumbColor={COLORS.white}
        />
      </View>
      <UiText style={mediaStyles.igFeedDesc}>{desc}</UiText>
      <View style={mediaStyles.sfGrid}>
        {posts.map((p, i) => (
          <View key={i} style={mediaStyles.sfPost}>
            <View style={[mediaStyles.sfMeta, isRtl && controlStyles.rowRtl]}>
              <UiText style={mediaStyles.sfMetaText}>{p.likes}</UiText>
              <UiText style={mediaStyles.sfMetaText}>{p.comments}</UiText>
            </View>
          </View>
        ))}
      </View>
      <UiText style={mediaStyles.sfNote}>{note}</UiText>
    </>
  );
}
