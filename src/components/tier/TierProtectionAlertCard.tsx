import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ActionConfirmationModal } from "@/components/staff/ActionConfirmationModal";
import { UICard } from "@/components/ui/UICard";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type TierProtectionAlertCardProps = {
  t: TFunction;
  onDiagnose?: () => void;
  onGetHelp?: () => void;
};

export function TierProtectionAlertCard({
  t,
  onDiagnose,
  onGetHelp,
}: TierProtectionAlertCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"diagnose" | "help" | null>(null);

  const handleDiagnoseClick = () => {
    setModalType("diagnose");
    setModalVisible(true);
    onDiagnose?.();
  };

  const handleGetHelpClick = () => {
    setModalType("help");
    setModalVisible(true);
    onGetHelp?.();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  const getModalContent = useMemo(() => {
    if (modalType === "diagnose") {
      return {
        icon: "checkmark" as const,
        title: t("tier.protectDiagnosisTitle") || "Diagnosis Started",
        bodyPrefix: t("tier.protectDiagnosisBodyPrefix") || "Your tier protection ",
        bodyBold: t("tier.protectDiagnosisBodyBold") || "diagnosis",
        bodySuffix: t("tier.protectDiagnosisBodySuffix") || " has been initiated.",
        refLabel: t("tier.protectDiagnosisRefLabel") || "Diagnosis ID",
        refPrefix: "DIAG",
        doneLabel: t("tier.protectDiagnosisDone") || "Got it",
      };
    }

    if (modalType === "help") {
      return {
        icon: "help-circle" as const,
        title: t("tier.protectHelpTitle") || "Help Requested",
        bodyPrefix: t("tier.protectHelpBodyPrefix") || "Your support request has been ",
        bodyBold: t("tier.protectHelpBodyBold") || "submitted",
        bodySuffix: t("tier.protectHelpBodySuffix") || ". Our team will contact you shortly.",
        refLabel: t("tier.protectHelpRefLabel") || "Request ID",
        refPrefix: "HELP",
        doneLabel: t("tier.protectHelpDone") || "Thanks",
      };
    }

    return null;
  }, [modalType, t]);
  return (
    <UICard style={styles.card}>
      <View style={styles.head}>
        <View style={styles.headLeft}>
          <View style={styles.iconBox}>
            <Ionicons name="warning" size={16} color={COLORS.error} />
          </View>
          <UiText style={styles.title}>{t("tier.protectTitle")}</UiText>
        </View>
        <View style={styles.activeChip}>
          <View style={styles.activeDot} />
          <UiText style={styles.activeText}>{t("tier.protectActiveLabel")}</UiText>
        </View>
      </View>

      <Text style={styles.body}>
        {t("tier.protectBodyPrefix")}
        <Text style={styles.bodyStrong}>{t("tier.protectBodyDeltaStrong")}</Text>
        {t("tier.protectBodyMid")}
        <Text style={styles.bodyStrong}>{t("tier.protectBodyDaysStrong")}</Text>
        {t("tier.protectBodySuffix")}
      </Text>

      <View style={styles.statRow}>
        <View style={styles.statBox}>
          <UiText style={styles.statLabel}>{t("tier.protectTrendLabel")}</UiText>
          <UiText style={[styles.statValue, styles.statValueDanger]}>
            {t("tier.protectTrendValue")}
          </UiText>
        </View>
        <View style={styles.statBox}>
          <UiText style={styles.statLabel}>{t("tier.protectFloorLabel")}</UiText>
          <UiText style={styles.statValue}>{t("tier.protectFloorValue")}</UiText>
        </View>
        <View style={styles.statBox}>
          <UiText style={styles.statLabel}>{t("tier.protectMarginLabel")}</UiText>
          <UiText style={styles.statValue}>{t("tier.protectMarginValue")}</UiText>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={handleDiagnoseClick} style={[styles.actionBtn, styles.actionGhost]}>
          <UiText style={styles.actionGhostText}>{t("tier.protectDiagnoseCta")}</UiText>
        </Pressable>
        <Pressable onPress={handleGetHelpClick} style={[styles.actionBtn, styles.actionPrimary]}>
          <UiText style={styles.actionPrimaryText}>{t("tier.protectHelpCta")}</UiText>
        </Pressable>
      </View>

      {getModalContent && (
        <ActionConfirmationModal
          visible={modalVisible}
          onClose={handleCloseModal}
          icon={getModalContent.icon}
          title={getModalContent.title}
          bodyPrefix={getModalContent.bodyPrefix}
          bodyBold={getModalContent.bodyBold}
          bodySuffix={getModalContent.bodySuffix}
          refLabel={getModalContent.refLabel}
          refPrefix={getModalContent.refPrefix}
          doneLabel={getModalContent.doneLabel}
        />
      )}
    </UICard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 18,
    gap: 14,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  headLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE9E9",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#FFC7C7",
  },
  title: {
    flex: 1,
    fontFamily: "Inter_900Black",
    fontSize: 15,
    letterSpacing: -0.2,
    color: COLORS.portalInk,
  },
  activeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#FFE9E9",
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.error,
  },
  activeText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    color: COLORS.error,
  },
  body: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.ink2,
  },
  bodyStrong: {
    fontFamily: "Inter_900Black",
    color: COLORS.portalInk,
  },
  statRow: {
    flexDirection: "row",
    gap: 8,
  },
  statBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    gap: 4,
  },
  statLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 1.2,
    color: COLORS.ink5,
  },
  statValue: {
    fontFamily: "Inter_900Black",
    fontSize: 12,
    letterSpacing: -0.2,
    color: COLORS.portalInk,
    fontVariant: ["tabular-nums"],
  },
  statValueDanger: {
    color: COLORS.error,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: "auto",
  },
  actionBtn: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  actionGhost: {
    flex: 0,
    backgroundColor: COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  actionGhostText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  actionPrimary: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.portalInk,
  },
  actionPrimaryText: {
    fontFamily: "Inter_900Black",
    fontSize: 13,
    color: COLORS.portalInk,
  },
});
