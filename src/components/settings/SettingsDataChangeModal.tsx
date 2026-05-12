import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { UiInput } from "@/components/ui/UiInput";
import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type DataChangeKind = "email" | "phone";

export type SettingsDataChangeModalCopy = {
  title: string;
  currentLabel: string;
  currentValue: string;
  step1Label: string;
  step2Label: string;
  step3Label: string;
  newValueLabel: string;
  newValuePlaceholder: string;
  noteOtp: string;
  cancel: string;
  continue: string;
  back: string;
  verify: string;
  otpSentLine: string;
  otpNewPrefix: string;
  resendPrompt: string;
  resend: string;
  successTitle: string;
  successSub: string;
  confirmChange: string;
};

export type SettingsDataChangeModalProps = {
  visible: boolean;
  kind: DataChangeKind | null;
  onClose: () => void;
  copy: SettingsDataChangeModalCopy | null;
  headIcon: ComponentProps<typeof Ionicons>["name"] | null;
  isRtl: boolean;
};

export function SettingsDataChangeModal({
  visible,
  kind,
  onClose,
  copy,
  headIcon,
  isRtl,
}: SettingsDataChangeModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [newValue, setNewValue] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (visible) {
      setStep(1);
      setNewValue("");
      setOtp("");
    }
  }, [visible, kind]);

  if (!copy || !kind) {
    return null;
  }

  const stepActive = (n: 1 | 2 | 3) => step === n;
  const iconName = headIcon ?? (kind === "phone" ? "call-outline" : "mail-outline");

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
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
          >
            <View style={[styles.headRow, isRtl && styles.headRowRtl]}>
              <View style={styles.headIc}>
                <Ionicons name={iconName} size={18} color={COLORS.portalInk} />
              </View>
              <View style={styles.headText}>
                <UiText style={styles.title}>{copy.title}</UiText>
                <UiText style={styles.desc}>
                  {copy.currentLabel}{" "}
                  <UiText style={styles.descStrong}>{copy.currentValue}</UiText>
                </UiText>
              </View>
            </View>

            <View style={[styles.stepper, isRtl && styles.stepperRtl]}>
              <View style={[styles.step, stepActive(1) && styles.stepOn]}>
                <UiText style={[styles.stepN, stepActive(1) && styles.stepNOn]}>1</UiText>
                <UiText style={[styles.stepL, stepActive(1) && styles.stepLOn]}>
                  {copy.step1Label}
                </UiText>
              </View>
              <View style={styles.stepSep} />
              <View style={[styles.step, stepActive(2) && styles.stepOn]}>
                <UiText style={[styles.stepN, stepActive(2) && styles.stepNOn]}>2</UiText>
                <UiText style={[styles.stepL, stepActive(2) && styles.stepLOn]}>
                  {copy.step2Label}
                </UiText>
              </View>
              <View style={styles.stepSep} />
              <View style={[styles.step, stepActive(3) && styles.stepOn]}>
                <UiText style={[styles.stepN, stepActive(3) && styles.stepNOn]}>3</UiText>
                <UiText style={[styles.stepL, stepActive(3) && styles.stepLOn]}>
                  {copy.step3Label}
                </UiText>
              </View>
            </View>

            {step === 1 ? (
              <View>
                <UiText style={styles.fieldLbl}>{copy.newValueLabel}</UiText>
                <UiInput
                  value={newValue}
                  onChangeText={setNewValue}
                  placeholder={copy.newValuePlaceholder}
                  autoCapitalize={kind === "email" ? "none" : "none"}
                  keyboardType={kind === "phone" ? "phone-pad" : "email-address"}
                  height={44}
                />
                <View style={[styles.note, isRtl && styles.noteRtl]}>
                  <Ionicons name="information-circle-outline" size={14} color={COLORS.ink4} />
                  <UiText style={styles.noteTxt}>{copy.noteOtp}</UiText>
                </View>
                <View style={[styles.actions, isRtl && styles.actionsRtl]}>
                  <Pressable
                    onPress={onClose}
                    style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}
                    accessibilityRole="button"
                  >
                    <UiText style={styles.btnGhostTxt}>{copy.cancel}</UiText>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      if (newValue.trim().length > 0) {
                        setStep(2);
                      }
                    }}
                    style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
                    accessibilityRole="button"
                  >
                    <UiText style={styles.btnPrimaryTxt}>{copy.continue}</UiText>
                  </Pressable>
                </View>
              </View>
            ) : null}

            {step === 2 ? (
              <View>
                <View style={styles.otpInfo}>
                  <UiText style={styles.otpLbl}>{copy.otpSentLine}</UiText>
                  <UiText style={styles.otpNew}>
                    {`${copy.otpNewPrefix} ${newValue.trim().length > 0 ? newValue.trim() : "—"}`}
                  </UiText>
                </View>
                <TextInput
                  value={otp}
                  onChangeText={(v) => {
                    setOtp(v.replace(/\D/g, "").slice(0, 6));
                  }}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholder="000000"
                  placeholderTextColor={COLORS.textInput}
                  style={[styles.otpInput, isRtl && styles.otpInputRtl]}
                />
                <View style={[styles.resendRow, isRtl && styles.resendRowRtl]}>
                  <UiText style={styles.resendPrompt}>{copy.resendPrompt}</UiText>
                  <Pressable
                    onPress={() => {
                      setOtp("");
                    }}
                    accessibilityRole="button"
                  >
                    <UiText style={styles.resendBtn}>{copy.resend}</UiText>
                  </Pressable>
                </View>
                <View style={[styles.actions, isRtl && styles.actionsRtl]}>
                  <Pressable
                    onPress={() => {
                      setStep(1);
                    }}
                    style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}
                    accessibilityRole="button"
                  >
                    <UiText style={styles.btnGhostTxt}>{copy.back}</UiText>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      if (otp.length === 6) {
                        setStep(3);
                      }
                    }}
                    style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
                    accessibilityRole="button"
                  >
                    <UiText style={styles.btnPrimaryTxt}>{copy.verify}</UiText>
                  </Pressable>
                </View>
              </View>
            ) : null}

            {step === 3 ? (
              <View>
                <View style={styles.success}>
                  <View style={styles.successIc}>
                    <Ionicons name="checkmark" size={28} color={COLORS.secondary} />
                  </View>
                  <UiText style={styles.successT}>{copy.successTitle}</UiText>
                  <UiText style={styles.successS}>{copy.successSub}</UiText>
                </View>
                <View style={[styles.actions, isRtl && styles.actionsRtl]}>
                  <Pressable
                    onPress={() => {
                      setStep(2);
                    }}
                    style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}
                    accessibilityRole="button"
                  >
                    <UiText style={styles.btnGhostTxt}>{copy.back}</UiText>
                  </Pressable>
                  <Pressable
                    onPress={onClose}
                    style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
                    accessibilityRole="button"
                  >
                    <UiText style={styles.btnPrimaryTxt}>{copy.confirmChange}</UiText>
                  </Pressable>
                </View>
              </View>
            ) : null}
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
  closeBtnLtr: { right: SPACING.sm },
  closeBtnRtl: { left: SPACING.sm },
  scroll: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl + 8,
    paddingBottom: SPACING.lg,
  },
  headRow: { flexDirection: "row", alignItems: "flex-start", gap: SPACING.md, marginBottom: SPACING.md },
  headRowRtl: { flexDirection: "row-reverse" },
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
  headText: { flex: 1, minWidth: 0, gap: 4 },
  title: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 20,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
  },
  desc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.ink3,
  },
  descStrong: { fontFamily: "Inter_800ExtraBold", color: COLORS.portalInk },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
    flexWrap: "wrap",
    gap: SPACING.xs,
  },
  stepperRtl: { flexDirection: "row-reverse" },
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  stepOn: { borderColor: COLORS.secondary, backgroundColor: "rgba(34,197,94,0.08)" },
  stepN: {
    fontFamily: "Inter_900Black",
    fontSize: 11,
    color: COLORS.ink4,
    minWidth: 16,
    textAlign: "center",
  },
  stepNOn: { color: COLORS.secondary },
  stepL: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: COLORS.ink4 },
  stepLOn: { color: COLORS.portalInk },
  stepSep: { width: 12, height: 1, backgroundColor: COLORS.hairline },
  fieldLbl: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 0.8,
    color: COLORS.ink2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  note: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  noteRtl: { flexDirection: "row-reverse" },
  noteTxt: { flex: 1, fontFamily: "Inter_600SemiBold", fontSize: 11, lineHeight: 16, color: COLORS.ink4 },
  actions: { flexDirection: "row", gap: SPACING.sm },
  actionsRtl: { flexDirection: "row-reverse" },
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
  btnGhostTxt: { fontFamily: "Inter_700Bold", fontSize: 13, color: COLORS.portalInk },
  btnPrimary: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.portalInk,
  },
  btnPrimaryTxt: { fontFamily: "Inter_700Bold", fontSize: 13, color: COLORS.white },
  pressed: { opacity: 0.88 },
  otpInfo: { gap: SPACING.sm, marginBottom: SPACING.md },
  otpLbl: { fontFamily: "Inter_600SemiBold", fontSize: 12, lineHeight: 18, color: COLORS.ink3 },
  otpNew: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: COLORS.portalInk },
  otpInput: {
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: RADIUS.sm,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    fontFamily: "Inter_800ExtraBold",
    fontSize: 20,
    letterSpacing: 8,
    color: COLORS.portalInk,
    backgroundColor: COLORS.whiteSecondary,
    textAlign: "center",
  },
  otpInputRtl: { textAlign: "center" },
  resendRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, marginTop: SPACING.md, marginBottom: SPACING.lg },
  resendRowRtl: { flexDirection: "row-reverse" },
  resendPrompt: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: COLORS.ink4 },
  resendBtn: { fontFamily: "Inter_800ExtraBold", fontSize: 11, color: COLORS.sky500, textDecorationLine: "underline" },
  success: { alignItems: "center", gap: SPACING.sm, marginBottom: SPACING.lg },
  successIc: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(34,197,94,0.15)",
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  successT: { fontFamily: "Inter_900Black", fontSize: 16, color: COLORS.portalInk },
  successS: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.ink3,
    textAlign: "center",
  },
});
