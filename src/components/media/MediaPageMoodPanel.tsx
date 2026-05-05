import { Pressable, Switch, View, type ViewStyle } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";
import { COLORS } from "@/constants/styles";

export type MoodKey = "morning" | "lunch" | "dinner" | "night";

type MoodDef = {
  key: MoodKey;
  name: string;
  time: string;
  swatchStyle: ViewStyle;
};

type MediaPageMoodPanelProps = {
  isRtl: boolean;
  title: string;
  badgeLabel: string;
  moods: MoodDef[];
  activeMood: MoodKey;
  onMoodChange: (k: MoodKey) => void;
  autoSwitchLabel: string;
  autoSwitch: boolean;
  onAutoSwitch: (v: boolean) => void;
};

export function MediaPageMoodPanel({
  isRtl,
  title,
  badgeLabel,
  moods,
  activeMood,
  onMoodChange,
  autoSwitchLabel,
  autoSwitch,
  onAutoSwitch,
}: MediaPageMoodPanelProps) {
  return (
    <>
      <View style={[mediaStyles.flexBetween, isRtl && mediaStyles.flexBetweenRtl]}>
        <UiText style={mediaStyles.panelTitleInline}>{title}</UiText>
        <View style={mediaStyles.badgeAmber}>
          <UiText style={mediaStyles.badgeAmberText}>{badgeLabel}</UiText>
        </View>
      </View>
      <View style={mediaStyles.moods}>
        {moods.map((m) => {
          const on = activeMood === m.key;
          return (
            <Pressable
              key={m.key}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => {
                onMoodChange(m.key);
              }}
              style={[mediaStyles.mood, on && mediaStyles.moodOn]}
            >
              <View style={[mediaStyles.moodSwatch, m.swatchStyle]} />
              <View style={mediaStyles.moodBody}>
                <UiText style={mediaStyles.moodNm}>{m.name}</UiText>
                <UiText style={mediaStyles.moodTm}>{m.time}</UiText>
              </View>
            </Pressable>
          );
        })}
      </View>
      <View style={[mediaStyles.moodFoot, isRtl && controlStyles.rowRtl]}>
        <UiText style={mediaStyles.moodFootText}>{autoSwitchLabel}</UiText>
        <Switch
          value={autoSwitch}
          onValueChange={onAutoSwitch}
          trackColor={{ false: COLORS.chartMist, true: COLORS.secondary }}
          thumbColor={COLORS.white}
        />
      </View>
    </>
  );
}
