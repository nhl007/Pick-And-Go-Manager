import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  I18nManager,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BuildingIcon from "@/assets/icons/building";
import LockIcon from "@/assets/icons/lock";
import MailIcon from "@/assets/icons/mail";
import { UiButton } from "@/components/ui/UiButton";
import UICheckBox from "@/components/ui/UICheckBox";
import UiInput from "@/components/ui/UiInput";
import { UiSpacer } from "@/components/ui/UiSpacer";
import { UiText } from "@/components/ui/UiText";
import { FORGET_PASSWORD_HREF, TAB_INDEX_HREF } from "@/constants/routes";
import { COLORS, FONT_FAMILIES, FONT_SIZE, RADIUS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useLogin } from "@/hooks/useLogin";

export default function LoginScreen() {
  const { t, i18n } = useAppTranslation();
  const [emailOrPhone, setEmailOrPhone] = useState("jon@french-bakery.ae");
  const [password, setPassword] = useState("demopassword");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const { mutate: login, isPending } = useLogin();

  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );

  const handleLogin = () => {
    if (!emailOrPhone.trim() || !password.trim()) {
      return;
    }
    router.replace(TAB_INDEX_HREF);

    // login(
    //   {
    //     email: emailOrPhone.trim(),
    //     password: password.trim(),
    //   },
    //   {
    //     onSuccess: () => {
    //       router.replace(TAB_INDEX_HREF);
    //     },
    //   },
    // );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardRoot}
      >
        <View style={styles.stage}>
          <View style={styles.card}>
            <View style={styles.logoBadge}>
              <Image
                source={require("@/assets/images/logo-secondary.png")}
                style={styles.logo}
              />
            </View>

            <UiText size="xxxl" font="black" align={isRtl ? "right" : "left"}>
              {t("auth.welcome")}
            </UiText>
            <UiText
              size="md"
              font="regular"
              color="textSecondary"
              style={[isRtl && styles.alignRight]}
            >
              {t("auth.signInToBusiness")}
            </UiText>

            <UiSpacer size="lg" />

            <View style={styles.form}>
              <View style={styles.field}>
                <UiText
                  size="sm"
                  font="semiBold"
                  color="textSecondary"
                  align={isRtl ? "right" : "left"}
                >
                  {t("auth.workEmailOrWhatsapp")}
                </UiText>
                <UiInput
                  height={48}
                  logo={<MailIcon width={20} height={20} color={COLORS.textInput} />}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="username"
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                  editable={!isPending}
                  placeholder={t("auth.emailOrPhonePlaceholder")}
                  style={[isRtl && styles.alignRight]}
                />
              </View>

              <UiText
                size="sm"
                font="semiBold"
                color="textSecondary"
                align={isRtl ? "right" : "left"}
              >
                {t("auth.password")}
              </UiText>
              <View style={styles.passwordInputWrapper}>
                <UiInput
                  height={48}
                  logo={<LockIcon width={20} height={20} color={COLORS.textInput} />}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="current-password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!isPending}
                  placeholder={t("auth.passwordPlaceholder")}
                  style={[isRtl && styles.alignRight]}
                />
                <Pressable
                  onPress={() => {
                    setShowPassword((previous) => !previous);
                  }}
                  style={styles.trailingAction}
                  hitSlop={8}
                >
                  <UiText size="sm" font="medium" align="right">
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color={COLORS.textInput}
                    />
                  </UiText>
                </Pressable>
              </View>

              <View style={[styles.row, isRtl && styles.rowRtl]}>
                <UICheckBox
                  checked={keepSignedIn}
                  onChange={setKeepSignedIn}
                  label={t("auth.keepMeSignedIn")}
                />

                <Pressable
                  onPress={() => {
                    router.push(FORGET_PASSWORD_HREF);
                  }}
                >
                  <UiText size="sm" font="medium" align="left">
                    {t("auth.forgotPassword")}
                  </UiText>
                </Pressable>
              </View>

              <UiButton
                height={48}
                radius="md"
                onPress={handleLogin}
                loading={isPending}
                variant="outline"
                style={[styles.primaryButton]}
              >
                <UiText size="md" font="semiBold" color="textPrimary" align="left">
                  {t("auth.signIn")}
                </UiText>
                <UiText size="md" font="semiBold" color="textPrimary" align="left">
                  →
                </UiText>
              </UiButton>

              <View style={styles.dividerWrap}>
                <View style={styles.dividerLine} />
                <UiText size="xs" font="semiBold" color="textSecondary" align="center">
                  {t("auth.newToPickAndGo").toUpperCase()}
                </UiText>
                <View style={styles.dividerLine} />
              </View>

              <Pressable
                onPress={() => {
                  Alert.alert(t("auth.registerBusiness"));
                }}
                disabled={isPending}
                style={styles.secondaryButton}
              >
                <BuildingIcon width={20} height={20} color={COLORS.textSecondary} />
                <UiText color="textSecondary" size="base" font="semiBold" align="left">
                  {t("auth.registerBusiness")}
                </UiText>
                <UiText color="textSecondary" size="md" font="semiBold" align="left">
                  →
                </UiText>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  keyboardRoot: {
    flex: 1,
  },
  stage: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    gap: SPACING.lg,
  },
  card: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 640,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  logoBadge: {
    alignSelf: "center",
    marginBottom: SPACING.md,
  },
  logo: {
    width: 120,
    height: 120,
    objectFit: "contain",
  },

  heading: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZE.xxxl,
    color: COLORS.textPrimary,
  },
  subHeading: {
    marginTop: SPACING.xs,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  form: {
    gap: SPACING.md,
  },
  field: {
    gap: SPACING.sm,
  },
  label: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.whiteSecondary,
    borderRadius: RADIUS.md,
    minHeight: 56,
    paddingHorizontal: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZE.md,
    paddingVertical: SPACING.sm,
  },
  passwordInputWrapper: {
    position: "relative",
  },
  trailingAction: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  row: {
    marginTop: SPACING.xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  checkboxWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  checkboxActive: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.border,
  },
  checkboxTick: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontFamily: FONT_FAMILIES.bold,
  },
  rowText: {
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.sm,
  },
  forgotText: {
    fontFamily: FONT_FAMILIES.medium,
    color: COLORS.black,
    fontSize: FONT_SIZE.sm,
  },
  primaryButton: {
    marginTop: SPACING.sm,
    borderColor: COLORS.black,
    borderWidth: 1.5,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  primaryButtonLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
  },
  primaryButtonArrow: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontFamily: FONT_FAMILIES.semiBold,
  },
  dividerWrap: {
    marginTop: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textSecondary,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZE.xs,
    textTransform: "uppercase",
  },
  secondaryButton: {
    minHeight: 52,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },
  secondaryButtonLabel: {
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZE.md,
  },
  secondaryButtonArrow: {
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZE.md,
  },
  footer: {
    alignItems: "center",
    gap: SPACING.xs,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZE.xs,
  },
  alignRight: {
    textAlign: "right",
  },
});
