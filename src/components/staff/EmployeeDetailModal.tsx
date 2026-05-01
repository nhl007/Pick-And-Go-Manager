import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React from "react";
import { Pressable, View } from "react-native";

import type { TeamMember } from "@/components/staff/AllTeamMembersModal";
import { employeeDetailModalStyles as s } from "@/components/staff/EmployeeDetailModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { staffBaseModalStyles as mb } from "@/components/staff/StaffBaseModal.styles";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

export type EmployeeDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onEditProfile?: (member: TeamMember) => void;
  t: TFunction;
};

export function EmployeeDetailModal({
  visible,
  onClose,
  member,
  onEditProfile,
  t,
}: EmployeeDetailModalProps) {
  if (!member) return null;

  return (
    <StaffBaseModal
      maxWidth={760}
      visible={visible}
      onClose={onClose}
      bodyContentContainerStyle={s.bodyPad}
      header={
        <View style={s.headerRow}>
          <View style={s.avatarLg}>
            <Ionicons name={member.icon} size={26} color={COLORS.portalInk} />
          </View>
          <View style={s.headerCenterCol}>
            <UiText style={s.empIdLine} numberOfLines={1}>
              {t("staff.detailEmployeeId", { id: member.badgeId })}
            </UiText>
            <UiText style={s.empName} numberOfLines={1}>
              {member.name}
            </UiText>
            <UiText style={s.empRole} numberOfLines={1}>
              {member.roleDept}
            </UiText>
          </View>
          <View style={s.brandCol}>
            <View style={s.brandPill}>
              <Ionicons name="storefront-outline" size={12} color={COLORS.portalInk} />
              <UiText style={s.brandPillTxt}>{t("staff.detailBrand")}</UiText>
            </View>
            <UiText style={s.brandSub}>{t("staff.detailBranch")}</UiText>
          </View>
        </View>
      }
      footer={
        <View style={mb.modalFooterRow}>
          <Pressable style={mb.outlineBtn} onPress={onClose}>
            <UiText style={mb.outlineBtnLabel}>{t("staff.btnClose")}</UiText>
          </Pressable>
          <Pressable style={mb.outlineBtnStrong} onPress={() => onEditProfile?.(member)}>
            <Ionicons name="create-outline" size={16} color={COLORS.portalInk} />
            <UiText style={mb.outlineBtnLabel}>{t("staff.detailEditProfile")}</UiText>
          </Pressable>
        </View>
      }
    >
      <View style={s.divider} />

      <View style={s.qrCard}>
        <View style={s.qrBox}>
          <Ionicons name="qr-code" size={62} color={COLORS.portalInk} />
        </View>
        <View style={s.qrBody}>
          <UiText style={s.qrKicker}>{t("staff.detailQrKicker")}</UiText>
          <UiText style={s.qrTitle}>{t("staff.detailQrTitle")}</UiText>
          <UiText style={s.qrDesc}>{t("staff.detailQrDesc")}</UiText>
          <UiText style={s.qrIssue}>{t("staff.detailQrIssued")}</UiText>
        </View>
      </View>

      <UiText style={s.sectionTitle}>{t("staff.detailContactSection")}</UiText>

      <View style={s.fieldGrid}>
        <View style={s.fieldHalf}>
          <UiText style={s.fieldLbl}>{t("staff.detailFieldStation")}</UiText>
          <UiText style={s.fieldVal} numberOfLines={1}>
            {member.station}
          </UiText>
        </View>
        <View style={s.fieldHalf}>
          <UiText style={s.fieldLbl}>{t("staff.detailFieldAccess")}</UiText>
          <UiText style={s.fieldVal} numberOfLines={1}>
            {member.accessLevel}
          </UiText>
        </View>
        <View style={s.fieldHalf}>
          <UiText style={s.fieldLbl}>{t("staff.detailFieldPhone")}</UiText>
          <UiText style={s.fieldVal} numberOfLines={1}>
            {member.phone}
          </UiText>
        </View>
        <View style={s.fieldHalf}>
          <UiText style={s.fieldLbl}>{t("staff.detailFieldEmail")}</UiText>
          <UiText style={s.fieldVal} numberOfLines={1}>
            {member.email}
          </UiText>
        </View>
      </View>

      <View style={s.fieldFull}>
        <UiText style={s.fieldLbl}>{t("staff.detailFieldShift")}</UiText>
        <UiText style={s.fieldVal} numberOfLines={1}>
          {member.shift}
        </UiText>
      </View>

      <UiText style={s.sectionTitle}>{t("staff.detailTenureSection")}</UiText>

      <View style={s.perfRow}>
        <View style={s.perfBox}>
          <UiText style={s.perfVal}>{member.tenure}</UiText>
          <UiText style={s.perfLbl}>{t("staff.detailPerfTenure")}</UiText>
        </View>
        <View style={s.perfBox}>
          <UiText style={s.perfVal}>{member.ordersPerMonth}</UiText>
          <UiText style={s.perfLbl}>{t("staff.detailPerfOrders")}</UiText>
        </View>
        <View style={s.perfBox}>
          <UiText style={s.perfVal}>{member.attendance}</UiText>
          <UiText style={s.perfLbl}>{t("staff.detailPerfAttendance")}</UiText>
        </View>
        <View style={[s.perfBox, s.perfBoxStrong]}>
          <UiText style={[s.perfVal, s.perfValStrong]}>{member.rating}</UiText>
          <UiText style={[s.perfLbl, s.perfLblStrong]}>
            {t("staff.detailPerfRating")}
          </UiText>
        </View>
      </View>

      <View style={s.startDateRow}>
        <UiText style={s.startDateLbl}>{t("staff.detailStartDate")}</UiText>
        <UiText style={s.startDateVal}>{member.startDate}</UiText>
      </View>

      <UiText style={s.sectionTitle}>{t("staff.detailEmergencySection")}</UiText>

      <View style={s.emergencyRow}>
        <UiText style={s.emergencyTxt} numberOfLines={1}>
          {member.emergencyContact}
        </UiText>
      </View>
    </StaffBaseModal>
  );
}
