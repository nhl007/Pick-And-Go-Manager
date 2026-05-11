import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { UiDirhamSymbol } from "@/components/ui/UiDirhamSymbol";
import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type ControlQuickLaunchConfirmModalCopy = {
  title: string;
  descTemplate: string;
  sumCategory: string;
  sumPrice: string;
  sumVisibility: string;
  sumReach: string;
  viewersSuffix: string;
  visibilityValue: string;
  reviewDetails: string;
  launchNow: string;
};

export type ControlQuickLaunchConfirmModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  copy: ControlQuickLaunchConfirmModalCopy;
  itemName: string;
  categoryLabel: string;
  price: string;
  viewersLabel: string;
  isRtl: boolean;
};

export function ControlQuickLaunchConfirmModal({
  visible,
  onClose,
  onConfirm,
  copy,
  itemName,
  categoryLabel,
  price,
  viewersLabel,
  isRtl,
}: ControlQuickLaunchConfirmModalProps) {
  const displayName = itemName.trim().length > 0 ? itemName : "—";
  const parts = copy.descTemplate.split("{{name}}");

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

        <View style={styles.sheet}>
          <Pressable
            onPress={onClose}
            style={[styles.closeBtn, isRtl ? styles.closeBtnRtl : styles.closeBtnLtr]}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={14} color={COLORS.ink3} />
          </Pressable>

          <View style={styles.iconWrap}>
            <View style={styles.iconCircle}>
              <Ionicons name="brush-outline" size={26} color={COLORS.portalInk} />
            </View>
          </View>

          <UiText style={styles.title}>{copy.title}</UiText>

          <Text style={[styles.desc, isRtl && styles.descRtl]}>
            {parts[0]}
            <Text style={styles.descStrong}>{displayName}</Text>
            {parts[1] ?? ""}
          </Text>

          <View style={styles.summary}>
            <View style={[styles.sumRow, isRtl && styles.sumRowRtl]}>
              <UiText style={styles.sumL}>{copy.sumCategory}</UiText>
              <UiText style={styles.sumV}>{categoryLabel}</UiText>
            </View>
            <View style={[styles.sumRow, isRtl && styles.sumRowRtl]}>
              <UiText style={styles.sumL}>{copy.sumPrice}</UiText>
              <View style={[styles.sumPriceRow, isRtl && styles.sumPriceRowRtl]}>
                <UiDirhamSymbol size={14} color={COLORS.portalInk} />
                <UiText style={styles.sumV}> {price.trim() || "—"}</UiText>
              </View>
            </View>
            <View style={[styles.sumRow, isRtl && styles.sumRowRtl]}>
              <UiText style={styles.sumL}>{copy.sumVisibility}</UiText>
              <UiText style={styles.sumV}>{copy.visibilityValue}</UiText>
            </View>
            <View style={[styles.sumRow, isRtl && styles.sumRowRtl]}>
              <UiText style={styles.sumL}>{copy.sumReach}</UiText>
              <Text style={styles.sumVText}>
                <Text style={styles.sumVStrong}>{viewersLabel}</Text>
                {` ${copy.viewersSuffix}`}
              </Text>
            </View>
          </View>

          <View style={[styles.actions, isRtl && styles.actionsRtl]}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <UiText style={styles.btnGhostTxt}>{copy.reviewDetails}</UiText>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Ionicons name="brush-outline" size={14} color={COLORS.white} />
              <UiText style={styles.btnPrimaryTxt}>{copy.launchNow}</UiText>
            </Pressable>
          </View>
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
    maxWidth: 380,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
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
  iconWrap: {
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  title: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 20,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  desc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.ink3,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  descRtl: {
    textAlign: "center",
  },
  descStrong: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.portalInk,
  },
  summary: {
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  sumRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.md,
    paddingVertical: 6,
  },
  sumRowRtl: {
    flexDirection: "row-reverse",
  },
  sumL: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
  },
  sumV: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
    flexShrink: 1,
    textAlign: "right",
  },
  sumVText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
    flexShrink: 1,
    textAlign: "right",
  },
  sumVStrong: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.portalInk,
  },
  sumPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  sumPriceRowRtl: {
    flexDirection: "row-reverse",
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  actionsRtl: {
    flexDirection: "row-reverse",
  },
  btnGhost: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  btnGhostTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  btnPrimary: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.portalInk,
  },
  btnPrimaryTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.88,
  },
});
