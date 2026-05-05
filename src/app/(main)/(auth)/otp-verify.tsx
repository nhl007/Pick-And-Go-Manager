import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  I18nManager,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthOtpDigitRow } from "@/components/auth/AuthOtpDigitRow";
import { AuthRecoveryCard } from "@/components/auth/AuthRecoveryCard";
import { AuthRecoveryPrimaryButton } from "@/components/auth/AuthRecoveryPrimaryButton";
import { AuthRecoveryStageIcon } from "@/components/auth/AuthRecoveryStageIcon";
import { AuthRecoveryStepper } from "@/components/auth/AuthRecoveryStepper";
import { AuthScreenBackdrop } from "@/components/auth/AuthScreenBackdrop";
import { UiText } from "@/components/ui/UiText";
import {
  FORGET_PASSWORD_HREF,
  LOGIN_SCREEN_HREF,
  RESET_PASSWORD_HREF,
} from "@/constants/routes";
import { COLORS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useOtpResendTimer } from "@/hooks/useOtpResendTimer";

export default function OtpVerifyScreen() {
  const { t, i18n } = useAppTranslation();
  const params = useLocalSearchParams<{ contact?: string }>();
  const [code, setCode] = useState("");
  const contact = params.contact ?? "jon@french-bakery.ae";
  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );
  const { secondsLeft, canResend, restart } = useOtpResendTimer(60);

  const handleVerify = () => {
    if (code.length !== 6) {
      return;
    }

    router.push({
      pathname: RESET_PASSWORD_HREF,
      params: { contact },
    });
  };

  const goLogin = () => {
    router.replace(LOGIN_SCREEN_HREF);
  };

  const handleResend = () => {
    setCode("");
    restart();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <AuthScreenBackdrop />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardRoot}
      >
        <View style={styles.stage}>
          <AuthRecoveryCard onClose={goLogin}>
            <AuthRecoveryStepper activeStep={2} />

            <AuthRecoveryStageIcon variant="mail" />

            <UiText size="xxxl" font="bold" align="center">
              {t("auth.recoveryVerifyTitle")}
            </UiText>

            <View style={[styles.verifyLine, isRtl && styles.verifyLineRtl]}>
              <UiText size="sm" color="textSecondary" align="center">
                {t("auth.recoveryVerifyLinePrefix")}{" "}
              </UiText>
              <UiText size="sm" font="bold" color="textPrimary" align="center">
                {contact}
              </UiText>
            </View>

            <AuthOtpDigitRow value={code} onChange={setCode} />

            <View style={styles.resendBlock}>
              <UiText size="sm" color="textSecondary" align="center">
                {t("auth.recoveryDidntReceive")}
              </UiText>
              {canResend ? (
                <Pressable onPress={handleResend} hitSlop={8}>
                  <UiText size="sm" font="semiBold" color="primary" align="center">
                    {t("auth.resendCode")}
                  </UiText>
                </Pressable>
              ) : (
                <UiText size="sm" color="textSecondary" align="center">
                  {t("auth.recoveryResendIn", { seconds: secondsLeft })}
                </UiText>
              )}
            </View>

            <AuthRecoveryPrimaryButton
              label={t("auth.verifyCode")}
              onPress={handleVerify}
              disabled={code.length !== 6}
              trailingIcon="check"
            />

            <Pressable
              onPress={() => {
                router.replace(FORGET_PASSWORD_HREF);
              }}
              style={styles.changeRow}
              hitSlop={8}
            >
              <Ionicons
                name={isRtl ? "arrow-forward" : "arrow-back"}
                size={18}
                color={COLORS.textSecondary}
              />
              <UiText size="sm" font="medium" color="textSecondary">
                {t("auth.recoveryChangeContact")}
              </UiText>
            </Pressable>
          </AuthRecoveryCard>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  keyboardRoot: {
    flex: 1,
  },
  stage: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
  },
  verifyLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  verifyLineRtl: {
    flexDirection: "row-reverse",
  },
  resendBlock: {
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
});
