import { Pressable, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";

type SlotPill = { key: string; label: string };

export type ScheduleSlot = {
  key: string;
  label: string;
  time: string;
  pills: SlotPill[];
  empty?: boolean;
  emptyText?: string;
  active?: boolean;
};

type MediaSmartSchedulePanelProps = {
  isRtl: boolean;
  title: string;
  badgeLabel: string;
  slots: ScheduleSlot[];
  scheduleCtaLabel: string;
  onScheduleCta: () => void;
};

export function MediaSmartSchedulePanel({
  isRtl,
  title,
  badgeLabel,
  slots,
  scheduleCtaLabel,
  onScheduleCta,
}: MediaSmartSchedulePanelProps) {
  return (
    <>
      <View style={[mediaStyles.flexBetween, isRtl && mediaStyles.flexBetweenRtl]}>
        <UiText style={mediaStyles.panelTitleInline}>{title}</UiText>
        <View style={mediaStyles.badgeNeutral}>
          <UiText style={mediaStyles.badgeNeutralText}>{badgeLabel}</UiText>
        </View>
      </View>
      <View style={mediaStyles.schedTimeline}>
        {slots.map((slot) => (
          <View
            key={slot.key}
            style={[mediaStyles.schedSlot, slot.active && mediaStyles.schedSlotActive]}
          >
            <View style={[mediaStyles.slotTime, isRtl && controlStyles.rowRtl]}>
              <UiText style={mediaStyles.slotLbl}>{slot.label}</UiText>
              <UiText style={mediaStyles.slotTm}>{slot.time}</UiText>
            </View>
            {slot.empty ? (
              <UiText style={mediaStyles.slotEmpty}>{slot.emptyText}</UiText>
            ) : (
              <View style={[mediaStyles.slotContent, isRtl && controlStyles.rowRtl]}>
                {slot.pills.map((p) => (
                  <View key={p.key} style={mediaStyles.slotPill}>
                    <UiText style={mediaStyles.slotPillText}>{p.label}</UiText>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onScheduleCta}
        style={mediaStyles.ghostFullBtn}
      >
        <UiText style={mediaStyles.ghostFullBtnText}>{scheduleCtaLabel}</UiText>
      </Pressable>
    </>
  );
}
