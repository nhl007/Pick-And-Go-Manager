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

import { UiInput } from "@/components/ui/UiInput";
import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type SettingsPasswordChangeModalCopy = {
  title: string;
  subtitle: string;
  step1Label: string;
  step2Label: string;
  step3Label: string;
  fieldCurrentLabel: string;
  placeholderCurrent: string;
  noteLockout: string;
  cancel: string;
  continue: string;
  back: string;
  adminTitle: string;
  adminSub: string;
  adminWaiting: string;
  adminApproved: string;
  continueAfterAdmin: string;
  fieldNewLabel: string;
  placeholderNew: string;
  fieldConfirmLabel: string;
  placeholderConfirm: string;
  matchError: string;
  noteSignout: string;
  updatePassword: string;
  strengthWeak: string;
  strengthMedium: string;
  strengthStrong: string;
};

export type SettingsPasswordChangeModalProps = {
  visible: boolean;
  onClose: () => void;
  copy: SettingsPasswordChangeModalCopy;
  isRtl: boolean;
};

function strengthPct(password: string): number {
  let s = 0;
  if (password.length >= 8) {
    s += 30;
  }
  if (/[A-Z]/.test(password)) {
    s += 25;
  }
  if (/\d/.test(password)) {
    s += 25;
  }
  if (/[^A-Za-z0-9]/.test(password)) {
    s += 20;
  }
  return Math.min(100, s);
}

export function SettingsPasswordChangeModal({
  visible,
  onClose,
  copy,
  isRtl,
}: SettingsPasswordChangeModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [currentPw, setCurrentPw] = useState("");
  const [adminApproved, setAdminApproved] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  useEffect(() => {
    if (visible) {
      setStep(1);
      setCurrentPw("");
      setAdminApproved(false);
      setNewPw("");
      setConfirmPw("");
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || step !== 2) {
      return;
    }
    setAdminApproved(false);
    const t = setTimeout(() => {
      setAdminApproved(true);
    }, 2400);
    return () => {
      clearTimeout(t);
    };
  }, [visible, step]);

  const pct = useMemo(() => strengthPct(newPw), [newPw]);
  const strengthLabel =
    pct < 40 ? copy.strengthWeak : pct < 70 ? copy.strengthMedium : copy.strengthStrong;
  const matchOk = newPw.length > 0 && newPw === confirmPw;
  const matchShowErr = confirmPw.length > 0 && !matchOk;
  const canUpdate = newPw.length >= 8 && /[A-Z]/.test(newPw) && /\d/.test(newPw) && matchOk;

  const stepActive = (n: 1 | 2 | 3) => step === n;

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
                <Ionicons name="lock-closed-outline" size={18} color={COLORS.portalInk} />
              </View>
              <View style={styles.headText}>
                <UiText style={styles.title}>{copy.title}</UiText>
                <UiText style={styles.subtitle}>{copy.subtitle}</UiText>
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
                <UiText style={styles.fieldLbl}>{copy.fieldCurrentLabel}</UiText>
                <UiInput
                  value={currentPw}
                  onChangeText={setCurrentPw}
                  placeholder={copy.placeholderCurrent}
                  secureTextEntry
                  height={44}
                />
                <View style={[styles.note, isRtl && styles.noteRtl]}>
                  <Ionicons name="information-circle-outline" size={14} color={COLORS.ink4} />
                  <UiText style={styles.noteTxt}>{copy.noteLockout}</UiText>
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
                      if (currentPw.length > 0) {
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
                <View style={[styles.adminBox, isRtl && styles.adminBoxRtl]}>
                  <View style={styles.adminIc}>
                    <Ionicons name="people-outline" size={22} color={COLORS.portalInk} />
                  </View>
                  <View style={styles.adminBody}>
                    <UiText style={styles.adminT}>{copy.adminTitle}</UiText>
                    <UiText style={styles.adminS}>{copy.adminSub}</UiText>
                    {adminApproved ? (
                      <View style={[styles.approvedRow, isRtl && styles.approvedRowRtl]}>
                        <Ionicons name="checkmark-circle" size={16} color={COLORS.secondary} />
                        <UiText style={styles.approvedTxt}>{copy.adminApproved}</UiText>
                      </View>
                    ) : (
                      <View style={[styles.waitRow, isRtl && styles.waitRowRtl]}>
                        <View style={styles.spin} />
                        <UiText style={styles.waitTxt}>{copy.adminWaiting}</UiText>
                      </View>
                    )}
                  </View>
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
                    disabled={!adminApproved}
                    onPress={() => {
                      setStep(3);
                    }}
                    style={({ pressed }) => [
                      styles.btnPrimary,
                      !adminApproved && styles.btnDisabled,
                      pressed && adminApproved && styles.pressed,
                    ]}
                    accessibilityRole="button"
                  >
                    <UiText style={styles.btnPrimaryTxt}>{copy.continueAfterAdmin}</UiText>
                  </Pressable>
                </View>
              </View>
            ) : null}

            {step === 3 ? (
              <View>
                <UiText style={styles.fieldLbl}>{copy.fieldNewLabel}</UiText>
                <UiInput
                  value={newPw}
                  onChangeText={setNewPw}
                  placeholder={copy.placeholderNew}
                  secureTextEntry
                  height={44}
                />
                <View style={styles.strengthTrack}>
                  <View style={[styles.strengthFill, { width: `${pct}%` }]} />
                </View>
                <UiText style={styles.strengthTxt}>
                  {pct}% · {strengthLabel}
                </UiText>

                <UiText style={[styles.fieldLbl, { marginTop: SPACING.md }]}>
                  {copy.fieldConfirmLabel}
                </UiText>
                <UiInput
                  value={confirmPw}
                  onChangeText={setConfirmPw}
                  placeholder={copy.placeholderConfirm}
                  secureTextEntry
                  height={44}
                />
                {matchShowErr ? (
                  <UiText style={styles.matchErr}>{copy.matchError}</UiText>
                ) : null}

                <View style={[styles.note, isRtl && styles.noteRtl]}>
                  <Ionicons name="information-circle-outline" size={14} color={COLORS.ink4} />
                  <UiText style={styles.noteTxt}>{copy.noteSignout}</UiText>
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
                    disabled={!canUpdate}
                    onPress={onClose}
                    style={({ pressed }) => [
                      styles.btnPrimary,
                      !canUpdate && styles.btnDisabled,
                      pressed && canUpdate && styles.pressed,
                    ]}
                    accessibilityRole="button"
                  >
                    <UiText style={styles.btnPrimaryTxt}>{copy.updatePassword}</UiText>
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
    maxHeight: "92%",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    elevation: 12,
  },
  sheetRtl: { direction: "rtl" },
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
  subtitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.ink3,
  },
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
  btnDisabled: { opacity: 0.45 },
  pressed: { opacity: 0.88 },
  adminBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    marginBottom: SPACING.lg,
  },
  adminBoxRtl: { flexDirection: "row-reverse" },
  adminIc: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  adminBody: { flex: 1, gap: SPACING.sm },
  adminT: { fontFamily: "Inter_800ExtraBold", fontSize: 14, color: COLORS.portalInk },
  adminS: { fontFamily: "Inter_600SemiBold", fontSize: 11, lineHeight: 16, color: COLORS.ink3 },
  waitRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  waitRowRtl: { flexDirection: "row-reverse" },
  waitTxt: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: COLORS.ink4 },
  spin: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: COLORS.hairline,
    borderTopColor: COLORS.secondary,
  },
  approvedRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  approvedRowRtl: { flexDirection: "row-reverse" },
  approvedTxt: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: COLORS.secondary, flex: 1 },
  strengthTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.chartMist,
    marginTop: SPACING.sm,
    overflow: "hidden",
  },
  strengthFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  },
  strengthTxt: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    marginTop: 6,
  },
  matchErr: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});
