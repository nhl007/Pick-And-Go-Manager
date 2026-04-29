import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
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

import { AuthRecoveryCard } from "@/components/auth/AuthRecoveryCard";
import { AuthRecoveryPrimaryButton } from "@/components/auth/AuthRecoveryPrimaryButton";
import { AuthRecoveryStageIcon } from "@/components/auth/AuthRecoveryStageIcon";
import { AuthRecoveryStepper } from "@/components/auth/AuthRecoveryStepper";
import { AuthScreenBackdrop } from "@/components/auth/AuthScreenBackdrop";
import UiInput from "@/components/ui/UiInput";
import { UiSpacer } from "@/components/ui/UiSpacer";
import { UiText } from "@/components/ui/UiText";
import { LOGIN_SCREEN_HREF, OTP_VERIFY_HREF } from "@/constants/routes";
import { COLORS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export default function ForgetPasswordScreen() {
  const { t, i18n } = useAppTranslation();
  const [contact, setContact] = useState("jon@french-bakery.ae");
  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );

  const handleContinue = () => {
    if (!contact.trim()) {
      return;
    }

    router.push({
      pathname: OTP_VERIFY_HREF,
      params: { contact: contact.trim() },
    });
  };

  const goLogin = () => {
    router.replace(LOGIN_SCREEN_HREF);
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
            <AuthRecoveryStepper activeStep={1} />

            <AuthRecoveryStageIcon variant="key" />

            <UiText size="xxxl" font="bold" align="center">
              {t("auth.recoveryResetTitle")}
            </UiText>
            <UiText size="sm" color="textSecondary" align="center" style={styles.desc}>
              {t("auth.recoveryResetDesc")}
            </UiText>

            <View style={styles.field}>
              <UiText
                size="sm"
                font="semiBold"
                color="textSecondary"
                align={isRtl ? "right" : "left"}
              >
                {t("auth.recoveryEmailOrWhatsappShort")}
              </UiText>
              <UiInput
                logo={
                  <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
                }
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                value={contact}
                onChangeText={setContact}
                placeholder={t("auth.recoveryForgotContactPlaceholder")}
                placeholderTextColor={COLORS.textSecondary}
                style={[isRtl && styles.alignRight]}
              />
            </View>
            <UiSpacer size="xs" />

            <AuthRecoveryPrimaryButton
              label={t("auth.sendCode")}
              onPress={handleContinue}
              trailingIcon="arrow"
            />

            <Pressable onPress={goLogin} style={styles.backRow} hitSlop={8}>
              <Ionicons
                name={isRtl ? "arrow-forward" : "arrow-back"}
                size={18}
                color={COLORS.textSecondary}
              />
              <UiText size="sm" font="semiBold" color="textSecondary">
                {t("auth.backToSignIn")}
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
    backgroundColor: COLORS.background,
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
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  alignRight: {
    textAlign: "right",
  },
});
