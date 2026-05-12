import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type ShareCardOptionCopy = {
  title: string;
  sub: string;
};

export type SettingsShareCardModalCopy = {
  title: string;
  subtitle: string;
  initials: string;
  name: string;
  roleLine: string;
  verifyUrl: string;
  optLink: ShareCardOptionCopy;
  optVcard: ShareCardOptionCopy;
  optWa: ShareCardOptionCopy;
  optEmail: ShareCardOptionCopy;
  optQr: ShareCardOptionCopy;
  optNative: ShareCardOptionCopy;
  note: string;
  qrPanelTitle: string;
};

export type ShareCardAction =
  | "link"
  | "vcard"
  | "whatsapp"
  | "email"
  | "qr"
  | "native";

export type SettingsShareCardModalProps = {
  visible: boolean;
  onClose: () => void;
  onAction: (action: ShareCardAction) => void;
  copy: SettingsShareCardModalCopy;
  isRtl: boolean;
};

const OPTIONS: {
  action: ShareCardAction;
  icon: ComponentProps<typeof Ionicons>["name"];
}[] = [
  { action: "link", icon: "link-outline" },
  { action: "vcard", icon: "download-outline" },
  { action: "whatsapp", icon: "logo-whatsapp" },
  { action: "email", icon: "mail-outline" },
  { action: "qr", icon: "qr-code-outline" },
  { action: "native", icon: "share-outline" },
];

export function SettingsShareCardModal({
  visible,
  onClose,
  onAction,
  copy,
  isRtl,
}: SettingsShareCardModalProps) {
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    if (!visible) {
      setQrOpen(false);
    }
  }, [visible]);

  const optCopy: Record<ShareCardAction, ShareCardOptionCopy> = {
    link: copy.optLink,
    vcard: copy.optVcard,
    whatsapp: copy.optWa,
    email: copy.optEmail,
    qr: copy.optQr,
    native: copy.optNative,
  };

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
          onPress={() => {
            setQrOpen(false);
            onClose();
          }}
          accessibilityRole="button"
        />

        <View style={[styles.sheet, isRtl && styles.sheetRtl]}>
          <Pressable
            onPress={() => {
              setQrOpen(false);
              onClose();
            }}
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
                <Ionicons name="share-social-outline" size={18} color={COLORS.portalInk} />
              </View>
              <View style={styles.headText}>
                <UiText style={styles.title}>{copy.title}</UiText>
                <UiText style={styles.subtitle}>{copy.subtitle}</UiText>
              </View>
            </View>

            <View style={[styles.preview, isRtl && styles.previewRtl]}>
              <View style={styles.previewAv}>
                <UiText style={styles.previewAvTxt}>{copy.initials}</UiText>
              </View>
              <View style={styles.previewBody}>
                <UiText style={styles.previewNm}>{copy.name}</UiText>
                <UiText style={styles.previewRole}>{copy.roleLine}</UiText>
                <UiText style={styles.previewUrl}>{copy.verifyUrl}</UiText>
              </View>
            </View>

            <View style={styles.grid}>
              {OPTIONS.map(({ action, icon }) => {
                const o = optCopy[action];
                return (
                  <Pressable
                    key={action}
                    onPress={() => {
                      if (action === "qr") {
                        setQrOpen((v) => !v);
                        return;
                      }
                      onAction(action);
                    }}
                    style={({ pressed }) => [styles.opt, pressed && styles.optPressed]}
                    accessibilityRole="button"
                  >
                    <View style={styles.optIc}>
                      <Ionicons name={icon} size={20} color={COLORS.portalInk} />
                    </View>
                    <UiText style={styles.optT}>{o.title}</UiText>
                    <UiText style={styles.optS}>{o.sub}</UiText>
                  </Pressable>
                );
              })}
            </View>

            {qrOpen ? (
              <View style={styles.qrPanel}>
                <UiText style={styles.qrPanelLbl}>{copy.qrPanelTitle}</UiText>
                <Image
                  source={require("@/assets/images/qr.png")}
                  resizeMode="contain"
                  style={styles.qrLarge}
                />
              </View>
            ) : null}

            <View style={[styles.noteRow, isRtl && styles.noteRowRtl]}>
              <Ionicons name="information-circle-outline" size={14} color={COLORS.ink4} />
              <UiText style={styles.noteTxt}>{copy.note}</UiText>
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
    maxWidth: 480,
    maxHeight: "92%",
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
  preview: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    marginBottom: SPACING.md,
  },
  previewRtl: {
    flexDirection: "row-reverse",
  },
  previewAv: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.portalInk,
    alignItems: "center",
    justifyContent: "center",
  },
  previewAvTxt: {
    fontFamily: "Inter_900Black",
    fontSize: 14,
    color: COLORS.white,
  },
  previewBody: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  previewNm: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 15,
    color: COLORS.portalInk,
  },
  previewRole: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  previewUrl: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.secondary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  opt: {
    width: "31%",
    flexGrow: 1,
    minWidth: 120,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
    alignItems: "center",
    gap: 6,
  },
  optPressed: {
    opacity: 0.9,
  },
  optIc: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  optT: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    color: COLORS.portalInk,
    textAlign: "center",
  },
  optS: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
    textAlign: "center",
    lineHeight: 14,
  },
  qrPanel: {
    alignItems: "center",
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    gap: SPACING.sm,
  },
  qrPanelLbl: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  qrLarge: {
    width: 180,
    height: 180,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
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
