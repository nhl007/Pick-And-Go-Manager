import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type ControlBannerPublishModalCopy = {
  kicker: string;
  title: string;
  desc: string;
  impactVisibleTo: string;
  impactMid: string;
  impactRadius: string;
  cancel: string;
  publishNow: string;
};

export type ControlBannerPublishModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bannerQuote: string;
  viewersLabel: string;
  copy: ControlBannerPublishModalCopy;
  isRtl: boolean;
};

export function ControlBannerPublishModal({
  visible,
  onClose,
  onConfirm,
  bannerQuote,
  viewersLabel,
  copy,
  isRtl,
}: ControlBannerPublishModalProps) {
  const quoteDisplay = bannerQuote.trim().length > 0 ? bannerQuote : "—";

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
              <Ionicons name="send" size={26} color={COLORS.trendPositiveDeep} />
            </View>
          </View>

          <UiText style={styles.title}>{copy.title}</UiText>
          <UiText style={styles.desc}>{copy.desc}</UiText>

          <View style={styles.quoteBox}>
            <UiText style={styles.quoteText}>{quoteDisplay}</UiText>
          </View>

          <View style={[styles.impact, isRtl && styles.impactRtl]}>
            <Ionicons name="information-circle-outline" size={12} color={COLORS.ink4} />
            <Text style={styles.impactText}>
              {copy.impactVisibleTo}
              {" "}
              <Text style={styles.impactStrong}>{viewersLabel}</Text>
              {copy.impactMid}
              {copy.impactRadius}
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
              onPress={onConfirm}
              style={({ pressed }) => [styles.btnPublish, pressed && styles.btnPressed]}
              accessibilityRole="button"
            >
              <UiText style={styles.btnPublishTxt}>{copy.publishNow}</UiText>
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
    maxWidth: 400,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
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
  quoteBox: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.strengthBadgeBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.strengthBadgeBorder,
    marginBottom: SPACING.md,
  },
  quoteText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.portalInk,
    textAlign: "center",
    lineHeight: 18,
  },
  impact: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    marginBottom: SPACING.sm,
  },
  impactRtl: {
    flexDirection: "row-reverse",
  },
  impactText: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.ink4,
  },
  impactStrong: {
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
  btnPublish: {
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
  btnPressed: {
    opacity: 0.88,
  },
  btnCancelTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  btnPublishTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.trendPositiveDeep,
  },
});
