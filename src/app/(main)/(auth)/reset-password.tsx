import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  I18nManager,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthPasswordStrength } from "@/components/auth/AuthPasswordStrength";
import { AuthRecoveryCard } from "@/components/auth/AuthRecoveryCard";
import { AuthRecoveryPrimaryButton } from "@/components/auth/AuthRecoveryPrimaryButton";
import { AuthRecoveryStageIcon } from "@/components/auth/AuthRecoveryStageIcon";
import { AuthRecoveryStepper } from "@/components/auth/AuthRecoveryStepper";
import { AuthScreenBackdrop } from "@/components/auth/AuthScreenBackdrop";
import UiInput from "@/components/ui/UiInput";
import { UiSpacer } from "@/components/ui/UiSpacer";
import { UiText } from "@/components/ui/UiText";
import { LOGIN_SCREEN_HREF } from "@/constants/routes";
import { COLORS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { PasswordRuleKey } from "@/lib/passwordStrength";
import { evaluatePasswordStrength, passwordMeetsAllRules } from "@/lib/passwordStrength";

export default function ResetPasswordScreen() {
  const { t, i18n } = useAppTranslation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [completed, setCompleted] = useState(false);

  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );

  const strengthLabel = useMemo(() => {
    const { score } = evaluatePasswordStrength(password);
    if (!password) {
      return t("auth.passwordStrengthEmpty");
    }
    if (score <= 1) {
      return t("auth.passwordStrengthWeak");
    }
    if (score === 2) {
      return t("auth.passwordStrengthFair");
    }
    if (score === 3) {
      return t("auth.passwordStrengthGood");
    }
    return t("auth.passwordStrengthStrong");
  }, [password, t]);

  const ruleLabels = useMemo(
    (): Record<PasswordRuleKey, string> => ({
      length: t("auth.ruleAtLeast8Chars"),
      upper: t("auth.ruleOneUppercase"),
      number: t("auth.ruleOneNumber"),
      symbol: t("auth.ruleOneSpecial"),
    }),
    [t],
  );

  const goLogin = () => {
    router.replace(LOGIN_SCREEN_HREF);
  };

  const handleUpdatePassword = () => {
    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert(t("auth.requiredFieldError"));
      return;
    }

    if (!passwordMeetsAllRules(password)) {
      Alert.alert(t("auth.passwordPolicyError"));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t("auth.passwordMismatchError"));
      return;
    }

    setCompleted(true);
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
            <AuthRecoveryStepper activeStep={completed ? 4 : 3} />

            {completed ? (
              <>
                <AuthRecoveryStageIcon variant="success" />

                <UiText size="xxxl" font="bold" align="center">
                  {t("auth.recoverySuccessTitle")}
                </UiText>
                <UiText
                  size="sm"
                  color="textSecondary"
                  align="center"
                  style={styles.desc}
                >
                  {t("auth.recoverySuccessDesc")}
                </UiText>

                <AuthRecoveryPrimaryButton
                  label={t("auth.backToSignIn")}
                  onPress={goLogin}
                  trailingIcon="arrow"
                />
              </>
            ) : (
              <>
                <AuthRecoveryStageIcon variant="lock" />

                <UiText size="xxxl" font="bold" align="center">
                  {t("auth.recoveryNewPwdTitle")}
                </UiText>
                <UiText
                  size="sm"
                  color="textSecondary"
                  align="center"
                  style={styles.desc}
                >
                  {t("auth.recoveryNewPwdDesc")}
                </UiText>

                <View style={styles.field}>
                  <UiText
                    size="sm"
                    font="semiBold"
                    color="textSecondary"
                    align={isRtl ? "right" : "left"}
                  >
                    {t("auth.newPassword")}
                  </UiText>
                  <View style={styles.inputWrap}>
                    <UiInput
                      logo={
                        <Ionicons
                          name="lock-closed-outline"
                          size={20}
                          color={COLORS.textSecondary}
                        />
                      }
                      secureTextEntry={!showPassword}
                      autoComplete="new-password"
                      value={password}
                      onChangeText={setPassword}
                      placeholder={t("auth.recoveryNewPwdPlaceholder")}
                      style={[isRtl && styles.alignRight]}
                    />
                    <Pressable
                      style={styles.eye}
                      onPress={() => {
                        setShowPassword((prev) => !prev);
                      }}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color={COLORS.textSecondary}
                      />
                    </Pressable>
                  </View>
                </View>

                <View style={styles.field}>
                  <UiText
                    size="sm"
                    font="semiBold"
                    color="textSecondary"
                    align={isRtl ? "right" : "left"}
                  >
                    {t("auth.confirmPassword")}
                  </UiText>
                  <View style={styles.inputWrap}>
                    <UiInput
                      logo={
                        <Ionicons
                          name="checkmark-done-outline"
                          size={20}
                          color={COLORS.textSecondary}
                        />
                      }
                      secureTextEntry={!showConfirmPassword}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder={t("auth.recoveryConfirmPwdPlaceholder")}
                      placeholderTextColor={COLORS.textSecondary}
                      style={[isRtl && styles.alignRight]}
                    />
                    <Pressable
                      style={styles.eye}
                      onPress={() => {
                        setShowConfirmPassword((prev) => !prev);
                      }}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color={COLORS.textSecondary}
                      />
                    </Pressable>
                  </View>
                </View>

                <UiSpacer size="lg" />

                <AuthPasswordStrength
                  password={password}
                  strengthLabel={strengthLabel}
                  ruleLabels={ruleLabels}
                />

                <AuthRecoveryPrimaryButton
                  label={t("auth.updatePassword")}
                  onPress={handleUpdatePassword}
                  trailingIcon="check"
                />
              </>
            )}
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
  desc: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  field: {
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  inputWrap: {
    position: "relative",
  },
  eye: {
    position: "absolute",
    right: SPACING.md,
    top: 16,
  },
  alignRight: {
    textAlign: "right",
  },
});
