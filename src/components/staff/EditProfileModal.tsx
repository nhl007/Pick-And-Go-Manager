import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import type { TeamMember } from "@/components/staff/AllTeamMembersModal";
import { editProfileModalStyles as s } from "@/components/staff/EditProfileModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { staffBaseModalStyles as mb } from "@/components/staff/StaffBaseModal.styles";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type AccessId = "basic" | "standard" | "full";

const ACCESS_TILES: { id: AccessId; titleKey: string; subKey: string }[] = [
  { id: "basic", titleKey: "staff.editAccessBasicTitle", subKey: "staff.editAccessBasicSub" },
  { id: "standard", titleKey: "staff.editAccessStandardTitle", subKey: "staff.editAccessStandardSub" },
  { id: "full", titleKey: "staff.editAccessFullTitle", subKey: "staff.editAccessFullSub" },
];

const accessFromMember = (level: string): AccessId => {
  const lower = level.toLowerCase();
  if (lower.includes("basic")) return "basic";
  if (lower.includes("admin") || lower.includes("full") || lower.includes("advanced")) return "full";
  return "standard";
};

export type EditProfileModalProps = {
  visible: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onSave?: (updates: { fullName: string; jobTitle: string; phone: string; access: AccessId }) => void;
  t: TFunction;
};

export function EditProfileModal({
  visible,
  onClose,
  member,
  onSave,
  t,
}: EditProfileModalProps) {
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [access, setAccess] = useState<AccessId>("standard");

  useEffect(() => {
    if (visible && member) {
      setFullName(member.name);
      setJobTitle(member.roleDept);
      setPhone(member.phone);
      setAccess(accessFromMember(member.accessLevel));
    }
  }, [visible, member]);

  const subtitle = useMemo(() => {
    if (!member) return "";
    return t("staff.editSubtitle", { name: member.name, id: member.badgeId });
  }, [member, t]);

  if (!member) return null;

  const handleSave = () => {
    onSave?.({ fullName, jobTitle, phone, access });
    onClose();
  };

  return (
    <StaffBaseModal
      maxWidth={640}
      visible={visible}
      onClose={onClose}
      bodyContentContainerStyle={s.bodyPad}
      header={
        <View style={s.headerLeft}>
          <View style={s.headerIconBox}>
            <Ionicons name="create-outline" size={20} color={COLORS.portalInk} />
          </View>
          <View style={s.headerTextCol}>
            <UiText style={s.headerTitle}>{t("staff.editTitle")}</UiText>
            <UiText style={s.headerSubtitle} numberOfLines={1}>
              {subtitle}
            </UiText>
          </View>
        </View>
      }
      footer={
        <View style={mb.modalFooterRow}>
          <Pressable style={mb.outlineBtn} onPress={onClose}>
            <UiText style={mb.outlineBtnLabel}>{t("staff.cancel")}</UiText>
          </Pressable>
          <Pressable style={mb.outlineBtnStrong} onPress={handleSave}>
            <Ionicons name="checkmark" size={16} color={COLORS.portalInk} />
            <UiText style={mb.outlineBtnLabel}>{t("staff.editSaveChanges")}</UiText>
          </Pressable>
        </View>
      }
    >
      <View style={s.divider} />

      <View style={s.fieldBlock}>
        <UiText style={s.fieldLabel}>{t("staff.editFullName")}</UiText>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor={COLORS.ink5}
          style={s.textField}
        />
      </View>

      <View style={s.fieldBlock}>
        <UiText style={s.fieldLabel}>{t("staff.editJobTitle")}</UiText>
        <TextInput
          value={jobTitle}
          onChangeText={setJobTitle}
          placeholderTextColor={COLORS.ink5}
          style={s.textField}
        />
      </View>

      <View style={s.fieldBlock}>
        <UiText style={s.fieldLabel}>{t("staff.editPhoneNumber")}</UiText>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.ink5}
          style={s.textField}
        />
      </View>

      <View style={s.fieldBlock}>
        <UiText style={s.fieldLabel}>{t("staff.editAccessLevel")}</UiText>
        <View style={s.accessRow}>
          {ACCESS_TILES.map((tile) => {
            const active = access === tile.id;
            return (
              <Pressable
                key={tile.id}
                onPress={() => { setAccess(tile.id); }}
                style={[s.accessTile, active && s.accessTileActive]}
              >
                <UiText style={s.accessTileTitle}>{t(tile.titleKey)}</UiText>
                <UiText style={s.accessTileSub}>{t(tile.subKey)}</UiText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={s.infoBanner}>
        <Ionicons name="information-circle-outline" size={16} color={COLORS.ink3} />
        <UiText style={s.infoBannerTxt}>{t("staff.editAuditNotice")}</UiText>
      </View>
    </StaffBaseModal>
  );
}
