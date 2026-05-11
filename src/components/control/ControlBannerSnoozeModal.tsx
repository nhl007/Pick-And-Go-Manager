import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, FONT_FAMILIES, RADIUS, SPACING } from "@/constants/styles";

export type SnoozePresetId = "60" | "120" | "240" | "eod" | "tomorrow9" | "custom";

export type ControlBannerSnoozeModalCopy = {
  kicker: string;
  title: string;
  desc: string;
  preset1h: string;
  preset2h: string;
  preset4h: string;
  presetEod: string;
  presetTomorrow: string;
  presetCustom: string;
  customDateLabel: string;
  customTimeLabel: string;
  summaryPrefix: string;
  summaryMid: string;
  resumeMinutes: string;
  cancel: string;
  schedule: string;
};

export type ControlBannerSnoozeModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  copy: ControlBannerSnoozeModalCopy;
  locale: string;
  isRtl: boolean;
};

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function toIsoDate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function parseIsoDateTime(dateStr: string, timeStr: string): Date | null {
  const dp = dateStr.trim().split("-").map(Number);
  const tp = timeStr.trim().split(":").map(Number);
  if (dp.length !== 3 || tp.length < 2) return null;
  const [y, m, day] = dp;
  const [hh = 0, mm = 0] = tp;
  if (
    y == null ||
    m == null ||
    day == null ||
    Number.isNaN(y) ||
    Number.isNaN(m) ||
    Number.isNaN(day)
  ) {
    return null;
  }
  const d = new Date(y, m - 1, day, hh, mm, 0, 0);
  return Number.isNaN(d.getTime()) ? null : d;
}

function targetDateForPreset(
  preset: SnoozePresetId,
  anchor: Date,
  customDate: string,
  customTime: string,
): Date | null {
  switch (preset) {
    case "60":
      return new Date(anchor.getTime() + 60 * 60000);
    case "120":
      return new Date(anchor.getTime() + 120 * 60000);
    case "240":
      return new Date(anchor.getTime() + 240 * 60000);
    case "eod": {
      const d = new Date(anchor);
      d.setHours(23, 59, 0, 0);
      return d;
    }
    case "tomorrow9": {
      const d = new Date(anchor);
      d.setDate(d.getDate() + 1);
      d.setHours(9, 0, 0, 0);
      return d;
    }
    case "custom":
      return parseIsoDateTime(customDate, customTime);
    default:
      return null;
  }
}

function formatTargetLabel(d: Date, locale: string) {
  try {
    return d.toLocaleString(locale, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d.toISOString();
  }
}

function resumeLabelForPreset(
  preset: SnoozePresetId,
  copy: ControlBannerSnoozeModalCopy,
  target: Date | null,
  anchor: Date,
): string {
  switch (preset) {
    case "60":
      return copy.preset1h;
    case "120":
      return copy.preset2h;
    case "240":
      return copy.preset4h;
    case "eod":
      return copy.presetEod;
    case "tomorrow9":
      return copy.presetTomorrow;
    case "custom":
      if (!target) return "—";
      {
        const mins = Math.max(0, Math.round((target.getTime() - anchor.getTime()) / 60000));
        return copy.resumeMinutes.replace("{{count}}", String(mins));
      }
    default:
      return "—";
  }
}

function presetChipLabel(id: SnoozePresetId, copy: ControlBannerSnoozeModalCopy): string {
  switch (id) {
    case "60":
      return copy.preset1h;
    case "120":
      return copy.preset2h;
    case "240":
      return copy.preset4h;
    case "eod":
      return copy.presetEod;
    case "tomorrow9":
      return copy.presetTomorrow;
    case "custom":
      return copy.presetCustom;
    default:
      return "";
  }
}

const PRESET_ORDER: SnoozePresetId[] = ["60", "120", "240", "eod", "tomorrow9", "custom"];

export function ControlBannerSnoozeModal({
  visible,
  onClose,
  onConfirm,
  copy,
  locale,
  isRtl,
}: ControlBannerSnoozeModalProps) {
  const [anchorNow, setAnchorNow] = useState(() => new Date());
  const [preset, setPreset] = useState<SnoozePresetId>("60");
  const [customDate, setCustomDate] = useState(() => toIsoDate(new Date()));
  const [customTime, setCustomTime] = useState("18:00");

  useEffect(() => {
    if (!visible) return;
    const n = new Date();
    setAnchorNow(n);
    setPreset("60");
    setCustomDate(toIsoDate(n));
    setCustomTime("18:00");
  }, [visible]);

  const targetDate = useMemo(
    () => targetDateForPreset(preset, anchorNow, customDate, customTime),
    [preset, anchorNow, customDate, customTime],
  );

  const resumeLabel = useMemo(
    () => resumeLabelForPreset(preset, copy, targetDate, anchorNow),
    [preset, copy, targetDate, anchorNow],
  );

  const targetLabel = targetDate ? formatTargetLabel(targetDate, locale) : "—";

  const scheduleDisabled =
    preset === "custom" && (targetDate == null || targetDate.getTime() <= anchorNow.getTime());

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      presentationStyle={Platform.OS === "ios" ? "overFullScreen" : undefined}
    >
      <View style={styles.root} accessibilityViewIsModal>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={copy.cancel}
        />
        <View style={styles.sheet}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollBody}
          >
            <Pressable
              onPress={onClose}
              style={[styles.closeBtn, isRtl ? styles.closeBtnRtl : styles.closeBtnLtr]}
              accessibilityRole="button"
              accessibilityLabel={copy.cancel}
            >
              <Ionicons name="close" size={14} color={COLORS.ink3} />
            </Pressable>

            <UiText style={styles.kicker}>{copy.kicker}</UiText>

            <View style={styles.iconWrap}>
              <View style={styles.iconCircle}>
                <Ionicons name="alarm-outline" size={26} color={COLORS.trendPositiveDeep} />
              </View>
            </View>

            <UiText style={styles.title}>{copy.title}</UiText>
            <UiText style={styles.desc}>{copy.desc}</UiText>

            <View style={[styles.presets, isRtl && styles.presetsRtl]}>
              {PRESET_ORDER.map((id) => {
                const on = preset === id;
                const label = presetChipLabel(id, copy);
                return (
                  <Pressable
                    key={id}
                    onPress={() => {
                      setPreset(id);
                    }}
                    style={[styles.presetChip, on && styles.presetChipOn]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                  >
                    <UiText style={[styles.presetChipTxt, on && styles.presetChipTxtOn]}>
                      {label}
                    </UiText>
                  </Pressable>
                );
              })}
            </View>

            {preset === "custom" ? (
              <View style={styles.customBlock}>
                <View style={styles.customField}>
                  <UiText style={styles.customLbl}>{copy.customDateLabel}</UiText>
                  <TextInput
                    value={customDate}
                    onChangeText={setCustomDate}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor={COLORS.ink4}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.customInput}
                  />
                </View>
                <View style={styles.customField}>
                  <UiText style={styles.customLbl}>{copy.customTimeLabel}</UiText>
                  <TextInput
                    value={customTime}
                    onChangeText={setCustomTime}
                    placeholder="HH:MM"
                    placeholderTextColor={COLORS.ink4}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.customInput}
                  />
                </View>
              </View>
            ) : null}

            <View style={[styles.summary, isRtl && styles.summaryRtl]}>
              <Ionicons name="time-outline" size={12} color={COLORS.ink4} />
              <Text style={styles.summaryText}>
                {copy.summaryPrefix}{" "}
                <Text style={styles.summaryStrong}>{resumeLabel}</Text>
                {" "}
                {copy.summaryMid}{" "}
                <Text style={styles.summaryStrong}>{targetLabel}</Text>
              </Text>
            </View>

            <View style={[styles.actions, isRtl && styles.actionsRtl]}>
              <Pressable
                onPress={onClose}
                style={({ pressed }) => [styles.btnCancel, pressed && styles.btnPressed]}
                accessibilityRole="button"
              >
                <UiText style={styles.btnCancelTxt}>{copy.cancel}</UiText>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (scheduleDisabled) return;
                  onConfirm();
                }}
                disabled={scheduleDisabled}
                style={({ pressed }) => [
                  styles.btnSchedule,
                  scheduleDisabled && styles.btnScheduleDisabled,
                  pressed && !scheduleDisabled && styles.btnPressed,
                ]}
                accessibilityRole="button"
              >
                <UiText style={styles.btnScheduleTxt}>{copy.schedule}</UiText>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    width: "100%",
    maxWidth: 400,
    maxHeight: "88%",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  scrollBody: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  closeBtn: {
    position: "absolute",
    top: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    zIndex: 2,
  },
  closeBtnLtr: {
    right: SPACING.sm,
  },
  closeBtnRtl: {
    left: SPACING.sm,
  },
  kicker: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: COLORS.ink4,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  iconWrap: {
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.strengthBadgeBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.strengthBadgeBorder,
  },
  title: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 18,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  desc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.ink3,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  presets: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
    marginBottom: SPACING.md,
    justifyContent: "center",
  },
  presetsRtl: {
    flexDirection: "row-reverse",
  },
  presetChip: {
    paddingVertical: 8,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  presetChipOn: {
    borderColor: COLORS.portalInk,
    backgroundColor: COLORS.white,
  },
  presetChipTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  presetChipTxtOn: {
    color: COLORS.portalInk,
  },
  customBlock: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  customField: {
    gap: 6,
  },
  customLbl: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.portalInk,
  },
  customInput: {
    borderWidth: 1,
    borderColor: COLORS.hairline,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 10,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    color: COLORS.portalInk,
    backgroundColor: COLORS.whiteSecondary,
  },
  summary: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    marginBottom: SPACING.md,
  },
  summaryRtl: {
    flexDirection: "row-reverse",
  },
  summaryText: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.ink4,
  },
  summaryStrong: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.portalInk,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  actionsRtl: {
    flexDirection: "row-reverse",
  },
  btnCancel: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  btnSchedule: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.neonYellow,
    shadowColor: COLORS.neonYellow,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  btnScheduleDisabled: {
    opacity: 0.45,
  },
  btnPressed: {
    opacity: 0.88,
  },
  btnCancelTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  btnScheduleTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.trendPositiveDeep,
  },
});
