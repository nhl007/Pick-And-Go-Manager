import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { UiButton } from "@/components/ui/UiButton";
import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { COLORS, FONT_FAMILIES, RADIUS, SPACING } from "@/constants/styles";

const MAX_LEN = 48;

type ControlMapBannerPanelProps = {
  panelTitle: string;
  dropLabel: string;
  dropSub: string;
  placeholder: string;
  previewLabel: string;
  snoozeLabel: string;
  publishLabel: string;
  message: string;
  onMessageChange: (text: string) => void;
  onSnooze: () => void;
  onPublish: () => void;
  onPreview: () => void;
  onPickPhoto: () => void;
};

export function ControlMapBannerPanel({
  panelTitle,
  dropLabel,
  dropSub,
  placeholder,
  previewLabel,
  snoozeLabel,
  publishLabel,
  message,
  onMessageChange,
  onSnooze,
  onPublish,
  onPreview,
  onPickPhoto,
}: ControlMapBannerPanelProps) {
  const remaining = useMemo(() => MAX_LEN - message.length, [message.length]);

  return (
    <>
      <UiText style={controlStyles.panelTitle}>{panelTitle}</UiText>
      <Pressable
        accessibilityRole="button"
        onPress={onPickPhoto}
        style={styles.bannerUpload}
      >
        <Ionicons name="image-outline" size={22} color={COLORS.ink3} />
        <UiText style={styles.bannerUpLbl}>{dropLabel}</UiText>
        <UiText style={styles.bannerUpSub}>{dropSub}</UiText>
      </Pressable>

      <View style={styles.bannerInputWrap}>
        <TextInput
          value={message}
          placeholder={placeholder}
          placeholderTextColor={COLORS.ink4}
          maxLength={MAX_LEN}
          onChangeText={onMessageChange}
          style={styles.bannerInput}
          multiline={false}
        />
        <UiText style={styles.bannerCounter}>
          <UiText style={styles.bannerCounterNum}>{remaining}</UiText>/{MAX_LEN}
        </UiText>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onPreview}
        style={styles.previewLink}
      >
        <Ionicons name="map-outline" size={14} color={COLORS.portalInk} />
        <UiText style={styles.previewLinkText}>{previewLabel}</UiText>
        <Ionicons name="arrow-forward" size={12} color={COLORS.portalInk} />
      </Pressable>

      <View style={styles.bannerActions}>
        <Pressable accessibilityRole="button" onPress={onSnooze} style={styles.btnChip}>
          <Ionicons name="alarm-outline" size={14} color={COLORS.portalInk} />
          <UiText style={styles.btnChipText}>{snoozeLabel}</UiText>
        </Pressable>
        <UiButton variant="outline" onPress={onPublish} height={40} width={80}>
          <UiText style={styles.publishBtnText}>{publishLabel}</UiText>
        </UiButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bannerUpload: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
    marginBottom: SPACING.sm,
    gap: 6,
  },
  bannerUpLbl: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  bannerUpSub: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
    textAlign: "center",
  },
  bannerInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.hairline,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.whiteSecondary,
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  bannerInput: {
    flex: 1,
    minHeight: 44,
    paddingVertical: 10,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    color: COLORS.portalInk,
  },
  bannerCounter: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    marginLeft: SPACING.sm,
  },
  bannerCounterNum: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.portalInk,
  },
  previewLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: SPACING.md,
  },
  previewLinkText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
    flex: 1,
  },
  bannerActions: {
    flexDirection: "row",
    gap: SPACING.sm,
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  btnChipText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  publishBtn: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.portalInk,
    borderWidth: 0,
  },
  publishBtnText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
  },
});
