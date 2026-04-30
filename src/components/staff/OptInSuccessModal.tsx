import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React from "react";
import { Pressable, View } from "react-native";

import { optInSuccessStyles as s } from "@/components/staff/AddTeamMemberModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS, SPACING } from "@/constants/styles";

export type OptInSuccessModalProps = {
  visible: boolean;
  onClose: () => void;
  memberName: string;
  roleLabel: string;
  requestId: string;
  t: TFunction;
};

export function OptInSuccessModal({
  visible,
  onClose,
  memberName,
  roleLabel,
  requestId,
  t,
}: OptInSuccessModalProps) {
  return (
    <StaffBaseModal
      visible={visible}
      onClose={onClose}
      showCloseIcon={true}
      scrollableBody={false}
      maxWidth={520}
      maxHeight={480}
    >
      <View style={{ alignItems: "center", gap: SPACING.md, paddingVertical: SPACING.md }}>
        <View style={s.iconWrap}>
          <View style={s.iconCircle}>
            <Ionicons name="checkmark" size={38} color={COLORS.white} />
          </View>
        </View>

        <UiText style={s.title}>{t("staff.optInTitle")}</UiText>

        <UiText style={s.desc}>
          {t("staff.optInDescPrefix")}{" "}
          <UiText style={s.descStrong}>
            {t("staff.optInTeamInvite")} · {memberName} ({roleLabel})
          </UiText>{" "}
          {t("staff.optInDescSuffix")}
        </UiText>

        <View style={s.statsRow}>
          <View style={s.statCol}>
            <UiText style={s.statValue}>48h</UiText>
            <UiText style={s.statLabel}>{t("staff.optInAvgApproval")}</UiText>
          </View>
          <View style={[s.statCol, s.statColMid]}>
            <UiText style={s.statValueMono} numberOfLines={2}>
              {requestId}
            </UiText>
            <UiText style={s.statLabel}>{t("staff.optInRequestId")}</UiText>
          </View>
          <View style={s.statCol}>
            <UiText style={s.statValue}>{t("staff.optInEmail")}</UiText>
            <UiText style={s.statLabel}>{t("staff.optInNotification")}</UiText>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: SPACING.sm }}>
          <Pressable 
            onPress={onClose}
            style={s.doneBtn}
          >
            <UiText style={s.doneBtnTxt}>{t("staff.btnDone")}</UiText>
          </Pressable>
        </View>
      </View>
    </StaffBaseModal>
  );
}