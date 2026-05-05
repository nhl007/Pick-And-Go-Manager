import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, TextInput, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";
import { COLORS } from "@/constants/styles";

const BIO_MAX = 180;

type Chip = { key: string; label: string };

type MediaDynamicBioPanelProps = {
  title: string;
  bio: string;
  onBioChange: (v: string) => void;
  charsSuffix: string;
  brandVoiceLabel: string;
  voiceChips: Chip[];
  voiceActive: string;
  onVoiceChange: (key: string) => void;
  seasonalLabel: string;
  seasonChips: Chip[];
  seasonActive: string;
  onSeasonChange: (key: string) => void;
  voiceOtherLabel: string;
  seasonOtherLabel: string;
  onVoiceOther: () => void;
  onSeasonOther: () => void;
  publishLabel: string;
  onPublish: () => void;
};

export function MediaDynamicBioPanel({
  title,
  bio,
  onBioChange,
  charsSuffix,
  brandVoiceLabel,
  voiceChips,
  voiceActive,
  onVoiceChange,
  seasonalLabel,
  seasonChips,
  seasonActive,
  onSeasonChange,
  voiceOtherLabel,
  seasonOtherLabel,
  onVoiceOther,
  onSeasonOther,
  publishLabel,
  onPublish,
}: MediaDynamicBioPanelProps) {
  const usedChars = bio.length;

  return (
    <>
      <UiText style={controlStyles.panelTitle}>{title}</UiText>
      <TextInput
        value={bio}
        onChangeText={(t) => onBioChange(t.slice(0, BIO_MAX))}
        multiline
        maxLength={BIO_MAX}
        style={mediaStyles.bioArea}
        placeholderTextColor={COLORS.ink4}
      />
      <UiText style={mediaStyles.bioCount}>
        {usedChars}/{BIO_MAX}
        {charsSuffix}
      </UiText>
      <UiText style={mediaStyles.bioLbl}>{brandVoiceLabel}</UiText>
      <View style={mediaStyles.bioChips}>
        {voiceChips.map((c) => {
          const on = voiceActive === c.key;
          return (
            <Pressable
              key={c.key}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => {
                onVoiceChange(c.key);
              }}
              style={[mediaStyles.vchip, on && mediaStyles.vchipOn]}
            >
              <UiText style={[mediaStyles.vchipText, on && mediaStyles.vchipTextOn]}>
                {c.label}
              </UiText>
            </Pressable>
          );
        })}
        <Pressable
          accessibilityRole="button"
          onPress={onVoiceOther}
          style={mediaStyles.vchip}
        >
          <UiText style={mediaStyles.vchipText}>{voiceOtherLabel}</UiText>
        </Pressable>
      </View>
      <UiText style={mediaStyles.bioLbl}>{seasonalLabel}</UiText>
      <View style={mediaStyles.bioChips}>
        {seasonChips.map((c) => {
          const on = seasonActive === c.key;
          return (
            <Pressable
              key={c.key}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => {
                onSeasonChange(c.key);
              }}
              style={[mediaStyles.vchip, on && mediaStyles.vchipOn]}
            >
              <UiText style={[mediaStyles.vchipText, on && mediaStyles.vchipTextOn]}>
                {c.label}
              </UiText>
            </Pressable>
          );
        })}
        <Pressable
          accessibilityRole="button"
          onPress={onSeasonOther}
          style={mediaStyles.vchip}
        >
          <UiText style={mediaStyles.vchipText}>{seasonOtherLabel}</UiText>
        </Pressable>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onPublish}
        style={mediaStyles.bioPublish}
      >
        <UiText style={mediaStyles.bioPublishText}>{publishLabel}</UiText>
        <Ionicons name="paper-plane-outline" size={16} color={COLORS.white} />
      </Pressable>
    </>
  );
}
