import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

const HOLD_MS = 2800;

export type ControlSosShutdownModalCopy = {
  title: string;
  desc: string;
  effectHide: string;
  effectPromos: string;
  effectOrders: string;
  effectNotify: string;
  holdLabel: string;
  cancelLink: string;
};

export type ControlSosShutdownModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirmShutdown: () => void;
  copy: ControlSosShutdownModalCopy;
  isRtl: boolean;
};

export function ControlSosShutdownModal({
  visible,
  onClose,
  onConfirmShutdown,
  copy,
  isRtl,
}: ControlSosShutdownModalProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  const resetProgress = useCallback(() => {
    animRef.current?.stop();
    animRef.current = null;
    progress.setValue(0);
  }, [progress]);

  useEffect(() => {
    if (!visible) {
      resetProgress();
    }
  }, [visible, resetProgress]);

  const endHold = useCallback(() => {
    resetProgress();
  }, [resetProgress]);

  const startHold = useCallback(() => {
    resetProgress();
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: HOLD_MS,
      useNativeDriver: false,
    });
    animRef.current = anim;
    anim.start(({ finished }) => {
      animRef.current = null;
      if (finished) {
        progress.setValue(0);
        onConfirmShutdown();
      }
    });
  }, [onConfirmShutdown, progress, resetProgress]);

  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

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

          <View style={styles.ringWrap}>
            <View style={styles.ringOuter}>
              <View style={styles.ringInner}>
                <Ionicons name="warning" size={32} color={COLORS.neonRed} />
              </View>
            </View>
          </View>

          <UiText style={styles.title}>{copy.title}</UiText>
          <UiText style={styles.desc}>{copy.desc}</UiText>

          <View style={styles.effects}>
            <View style={[styles.effRow, isRtl && styles.effRowRtl]}>
              <View style={styles.effDot} />
              <UiText style={styles.effText}>{copy.effectHide}</UiText>
            </View>
            <View style={[styles.effRow, isRtl && styles.effRowRtl]}>
              <View style={styles.effDot} />
              <UiText style={styles.effText}>{copy.effectPromos}</UiText>
            </View>
            <View style={[styles.effRow, isRtl && styles.effRowRtl]}>
              <View style={styles.effDot} />
              <UiText style={styles.effText}>{copy.effectOrders}</UiText>
            </View>
            <View style={[styles.effRow, isRtl && styles.effRowRtl]}>
              <View style={styles.effDot} />
              <UiText style={styles.effText}>{copy.effectNotify}</UiText>
            </View>
          </View>

          <View style={styles.holdWrap}>
            <Pressable
              onPressIn={startHold}
              onPressOut={endHold}
              style={({ pressed }) => [styles.holdBtn, pressed && styles.holdBtnPressed]}
              accessibilityRole="button"
              accessibilityHint={copy.holdLabel}
            >
              <Animated.View style={[styles.holdFill, { width: fillWidth }]} />
              <View style={[styles.holdLabelRow, isRtl && styles.holdLabelRowRtl]}>
                <Ionicons name="warning" size={14} color={COLORS.white} />
                <UiText style={styles.holdLabel}>{copy.holdLabel}</UiText>
              </View>
            </Pressable>
          </View>

          <Pressable onPress={onClose} accessibilityRole="button">
            <UiText style={styles.cancelLink}>{copy.cancelLink}</UiText>
          </Pressable>
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
    paddingTop: SPACING.xl + 8,
    paddingBottom: SPACING.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
    alignItems: "center",
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
  ringWrap: {
    marginBottom: SPACING.md,
  },
  ringOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: "rgba(255,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  ringInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,0,0,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Inter_900Black",
    fontSize: 18,
    letterSpacing: -0.3,
    color: COLORS.portalInk,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  desc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.ink3,
    textAlign: "center",
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  effects: {
    alignSelf: "stretch",
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  effRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
  },
  effRowRtl: {
    flexDirection: "row-reverse",
  },
  effDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    backgroundColor: COLORS.neonRed,
  },
  effText: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.ink3,
  },
  holdWrap: {
    alignSelf: "stretch",
    marginBottom: SPACING.md,
  },
  holdBtn: {
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.neonRed,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
  },
  holdBtnPressed: {
    opacity: 0.95,
  },
  holdFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  holdLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 1,
  },
  holdLabelRowRtl: {
    flexDirection: "row-reverse",
  },
  holdLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    letterSpacing: 0.6,
    color: COLORS.white,
  },
  cancelLink: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.ink3,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
