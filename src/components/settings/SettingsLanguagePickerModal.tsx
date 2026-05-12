import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";
import type { SupportedLanguage } from "@/localization/resources";

export type SettingsLanguagePickerModalCopy = {
  title: string;
  subtitle: string;
  previewLabel: string;
  previewHeadEn: string;
  previewSubEn: string;
  previewHeadAr: string;
  previewSubAr: string;
  syncNote: string;
  langEnName: string;
  langEnSub: string;
  langArName: string;
  langArSub: string;
  langHiName: string;
  langHiSub: string;
  langUrName: string;
  langUrSub: string;
  langTlName: string;
  langTlSub: string;
  soonBadge: string;
  flagEn: string;
  flagAr: string;
  flagHi: string;
  flagUr: string;
  flagTl: string;
};

type RowKey = "en" | "ar" | "hi" | "ur" | "tl";

export type SettingsLanguagePickerModalProps = {
  visible: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  onSelectLanguage: (lng: SupportedLanguage) => void;
  copy: SettingsLanguagePickerModalCopy;
  isRtl: boolean;
};

type LangRowDef = {
  key: RowKey;
  supported: boolean;
  flag: string;
  name: string;
  sub: string;
};

export function SettingsLanguagePickerModal({
  visible,
  onClose,
  language,
  onSelectLanguage,
  copy,
  isRtl,
}: SettingsLanguagePickerModalProps) {
  const [previewLng, setPreviewLng] = useState<SupportedLanguage>(language);

  useEffect(() => {
    if (visible) {
      setPreviewLng(language);
    }
  }, [visible, language]);

  const rows = useMemo<LangRowDef[]>(
    () => [
      {
        key: "en",
        supported: true,
        flag: copy.flagEn,
        name: copy.langEnName,
        sub: copy.langEnSub,
      },
      {
        key: "ar",
        supported: true,
        flag: copy.flagAr,
        name: copy.langArName,
        sub: copy.langArSub,
      },
      {
        key: "hi",
        supported: false,
        flag: copy.flagHi,
        name: copy.langHiName,
        sub: copy.langHiSub,
      },
      {
        key: "ur",
        supported: false,
        flag: copy.flagUr,
        name: copy.langUrName,
        sub: copy.langUrSub,
      },
      {
        key: "tl",
        supported: false,
        flag: copy.flagTl,
        name: copy.langTlName,
        sub: copy.langTlSub,
      },
    ],
    [copy],
  );

  const previewHead =
    previewLng === "ar" ? copy.previewHeadAr : copy.previewHeadEn;
  const previewSub = previewLng === "ar" ? copy.previewSubAr : copy.previewSubEn;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      presentationStyle={Platform.OS === "ios" ? "overFullScreen" : undefined}
    >
      <View style={styles.root} accessibilityViewIsModal>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button" />

        <View style={[styles.sheet, isRtl && styles.sheetRtl]}>
          <Pressable
            onPress={onClose}
            style={[styles.closeBtn, isRtl ? styles.closeBtnRtl : styles.closeBtnLtr]}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={14} color={COLORS.ink3} />
          </Pressable>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.headRow, isRtl && styles.headRowRtl]}>
              <View style={styles.headIc}>
                <Ionicons name="globe-outline" size={18} color={COLORS.portalInk} />
              </View>
              <View style={styles.headText}>
                <UiText style={styles.title}>{copy.title}</UiText>
                <UiText style={styles.subtitle}>{copy.subtitle}</UiText>
              </View>
            </View>

            <View style={styles.list}>
              {rows.map((row) => {
                const selected = row.supported && language === row.key;
                const flagStyle =
                  row.key === "en"
                    ? styles.flagEn
                    : row.key === "ar"
                      ? styles.flagAr
                      : styles.flagMuted;

                const content = (
                  <>
                    <View style={[styles.flag, flagStyle]}>
                      <UiText style={styles.flagTxt}>{row.flag}</UiText>
                    </View>
                    <View style={styles.rowBody}>
                      <UiText style={styles.rowName}>{row.name}</UiText>
                      <UiText style={styles.rowSub}>{row.sub}</UiText>
                    </View>
                    {row.supported ? (
                      <View style={[styles.check, selected && styles.checkOn]}>
                        {selected ? (
                          <UiText style={styles.checkMark}>✓</UiText>
                        ) : null}
                      </View>
                    ) : (
                      <View style={styles.soonPill}>
                        <UiText style={styles.soonTxt}>{copy.soonBadge}</UiText>
                      </View>
                    )}
                  </>
                );

                if (!row.supported) {
                  return (
                    <View
                      key={row.key}
                      style={[styles.row, styles.rowDisabled]}
                      accessibilityState={{ disabled: true }}
                    >
                      {content}
                    </View>
                  );
                }

                return (
                  <Pressable
                    key={row.key}
                    onPress={() => {
                      const lng = row.key as SupportedLanguage;
                      setPreviewLng(lng);
                      onSelectLanguage(lng);
                    }}
                    style={({ pressed }) => [
                      styles.row,
                      selected && styles.rowOn,
                      pressed && styles.rowPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                  >
                    {content}
                  </Pressable>
                );
              })}
            </View>

            <View
              style={[
                styles.preview,
                previewLng === "ar" ? styles.previewRtl : styles.previewLtr,
              ]}
            >
              <UiText
                style={[
                  styles.previewLbl,
                  previewLng === "ar" && styles.previewTxtRtl,
                ]}
              >
                {copy.previewLabel}
              </UiText>
              <UiText
                style={[
                  styles.previewHead,
                  previewLng === "ar" && styles.previewTxtRtl,
                ]}
              >
                {previewHead}
              </UiText>
              <UiText
                style={[
                  styles.previewSub,
                  previewLng === "ar" && styles.previewTxtRtl,
                ]}
              >
                {previewSub}
              </UiText>
            </View>

            <View style={[styles.noteRow, isRtl && styles.noteRowRtl]}>
              <Ionicons name="information-circle-outline" size={14} color={COLORS.ink4} />
              <UiText style={styles.noteTxt}>{copy.syncNote}</UiText>
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
    maxWidth: 440,
    maxHeight: "90%",
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
  sheetRtl: {
    direction: "rtl",
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
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl + 8,
    paddingBottom: SPACING.lg,
  },
  headRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  headRowRtl: {
    flexDirection: "row-reverse",
  },
  headIc: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  headText: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  title: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 20,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
  },
  subtitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.ink3,
  },
  list: {
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  rowOn: {
    borderColor: COLORS.secondary,
    backgroundColor: "rgba(34, 197, 94, 0.08)",
  },
  rowPressed: {
    opacity: 0.92,
  },
  rowDisabled: {
    opacity: 0.52,
  },
  flag: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  flagEn: {
    backgroundColor: "rgba(79, 70, 229, 0.1)",
  },
  flagAr: {
    backgroundColor: "rgba(34, 197, 94, 0.12)",
  },
  flagMuted: {
    backgroundColor: COLORS.white,
  },
  flagTxt: {
    fontFamily: "Inter_900Black",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  rowBody: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  rowName: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 14,
    color: COLORS.portalInk,
  },
  rowSub: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    lineHeight: 15,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
  },
  checkOn: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
  },
  checkMark: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 14,
    color: COLORS.white,
  },
  soonPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.chartMist,
  },
  soonTxt: {
    fontFamily: "Inter_900Black",
    fontSize: 9,
    letterSpacing: 0.8,
    color: COLORS.ink4,
  },
  preview: {
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    backgroundColor: COLORS.portalInk,
    gap: 6,
    marginBottom: SPACING.md,
  },
  previewLtr: {
    alignItems: "flex-start",
  },
  previewRtl: {
    alignItems: "flex-end",
  },
  previewLbl: {
    fontFamily: "Inter_900Black",
    fontSize: 9,
    letterSpacing: 1.2,
    color: COLORS.ink4,
  },
  previewHead: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 16,
    color: COLORS.white,
    textAlign: "left",
    alignSelf: "stretch",
  },
  previewSub: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.chartSilver,
    textAlign: "left",
    alignSelf: "stretch",
  },
  previewTxtRtl: {
    textAlign: "right",
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
    paddingTop: SPACING.xs,
  },
  noteRowRtl: {
    flexDirection: "row-reverse",
  },
  noteTxt: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.ink4,
  },
});
