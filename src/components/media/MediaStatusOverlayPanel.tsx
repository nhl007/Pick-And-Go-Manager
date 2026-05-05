import { useMemo } from "react";
import { Pressable, TextInput, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";
import { COLORS } from "@/constants/styles";

const STATUS_MAX = 42;

type Preset = { key: string; label: string };

type MediaStatusOverlayPanelProps = {
  title: string;
  value: string;
  onChange: (v: string) => void;
  previewLabel: string;
  presetsLabel: string;
  presets: Preset[];
  onPreset: (label: string) => void;
  onOtherPreset: () => void;
  otherPresetLabel: string;
};

export function MediaStatusOverlayPanel({
  title,
  value,
  onChange,
  previewLabel,
  presetsLabel,
  presets,
  onPreset,
  onOtherPreset,
  otherPresetLabel,
}: MediaStatusOverlayPanelProps) {
  const remaining = useMemo(() => STATUS_MAX - value.length, [value.length]);

  return (
    <>
      <UiText style={controlStyles.panelTitle}>{title}</UiText>
      <View style={mediaStyles.statusInputWrap}>
        <TextInput
          value={value}
          onChangeText={(t) => onChange(t.slice(0, STATUS_MAX))}
          maxLength={STATUS_MAX}
          style={mediaStyles.statusInput}
          placeholderTextColor={COLORS.ink4}
        />
        <UiText style={mediaStyles.statusCount}>
          <UiText style={mediaStyles.statusCountNum}>{remaining}</UiText>/{STATUS_MAX}
        </UiText>
      </View>
      <View style={mediaStyles.statusPreview}>
        <UiText style={mediaStyles.spLabel}>{previewLabel}</UiText>
        <View style={mediaStyles.spBadge}>
          <View style={mediaStyles.spDot} />
          <UiText style={mediaStyles.spBadgeText} numberOfLines={2}>
            {value.trim() || "—"}
          </UiText>
        </View>
      </View>
      <UiText style={mediaStyles.presetsLbl}>{presetsLabel}</UiText>
      <View style={mediaStyles.presetsRow}>
        {presets.map((p) => (
          <Pressable
            key={p.key}
            accessibilityRole="button"
            onPress={() => {
              onPreset(p.label);
            }}
            style={mediaStyles.presetChip}
          >
            <UiText style={mediaStyles.presetChipText}>{p.label}</UiText>
          </Pressable>
        ))}
        <Pressable
          accessibilityRole="button"
          onPress={onOtherPreset}
          style={mediaStyles.presetChip}
        >
          <UiText style={mediaStyles.presetChipText}>{otherPresetLabel}</UiText>
        </Pressable>
      </View>
    </>
  );
}
