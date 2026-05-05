import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import { signAndHandOverModalStyles as s } from "@/components/staff/SignAndHandOverModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

export type SignAndHandOverModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm?: (notes: string) => void;
  doneCount: number;
  totalCount: number;
  t: TFunction;
};

export function SignAndHandOverModal({
  visible,
  onClose,
  onConfirm,
  doneCount,
  totalCount,
  t,
}: SignAndHandOverModalProps) {
  const [notes, setNotes] = useState("");

  const pendingCount = Math.max(totalCount - doneCount, 0);

  const handleClear = () => {
    setNotes("");
  };

  const handleConfirm = () => {
    onConfirm?.(notes);
    onClose();
  };

  return (
    <StaffBaseModal
      visible={visible}
      onClose={onClose}
      maxWidth={720}
      maxHeight={820}
      bodyContentContainerStyle={s.bodyPad}
      header={
        <View style={s.headerRow}>
          <View style={s.headerIconWrap}>
            <Ionicons name="image-outline" size={22} color={COLORS.white} />
          </View>
          <View style={s.headerCol}>
            <UiText style={s.headerTitle}>{t("staff.signAndHandOver")}</UiText>
            <UiText style={s.headerSubtitle}>
              {t("staff.signHandoverModalSubtitle")}
            </UiText>
          </View>
        </View>
      }
      footer={
        <View style={s.footerRow}>
          <Pressable style={s.cancelBtn} onPress={onClose}>
            <UiText style={s.cancelBtnTxt}>{t("staff.signHandoverCancel")}</UiText>
          </Pressable>
          <Pressable style={s.confirmBtn} onPress={handleConfirm}>
            <Ionicons name="checkmark" size={14} color={COLORS.ink4} />
            <UiText style={s.confirmBtnTxt}>
              {t("staff.signHandoverConfirm")}
            </UiText>
          </Pressable>
        </View>
      }
    >
      <View style={s.fromToCard}>
        <View style={s.partyCol}>
          <UiText style={s.partyKicker}>{t("staff.signHandoverFromLabel")}</UiText>
          <View style={s.partyAvatar}>
            <Ionicons name="briefcase-outline" size={16} color={COLORS.portalInk} />
          </View>
          <UiText style={s.partyName}>{t("staff.signHandoverFromName")}</UiText>
          <UiText style={s.partyMeta}>
            {t("staff.signHandoverFromShiftMeta")}
          </UiText>
        </View>
        <View style={s.partyArrow}>
          <Ionicons name="arrow-forward" size={18} color={COLORS.ink4} />
        </View>
        <View style={s.partyCol}>
          <UiText style={s.partyKicker}>{t("staff.signHandoverToLabel")}</UiText>
          <View style={s.partyAvatar}>
            <Ionicons name="briefcase-outline" size={16} color={COLORS.portalInk} />
          </View>
          <UiText style={s.partyName}>{t("staff.signHandoverToName")}</UiText>
          <UiText style={s.partyMeta}>
            {t("staff.signHandoverToShiftMeta")}
          </UiText>
        </View>
      </View>

      <View style={s.summaryCard}>
        <View style={s.summaryRow}>
          <UiText style={s.summaryLbl}>
            {t("staff.signHandoverChecklistProgressLbl")}
          </UiText>
          <UiText style={s.summaryVal}>
            {t("staff.signHandoverChecklistProgressVal", {
              done: doneCount,
              total: totalCount,
            })}
          </UiText>
        </View>
        <View style={[s.summaryRow, s.summaryRowDivider]}>
          <UiText style={s.summaryLbl}>
            {t("staff.signHandoverShiftDurationLbl")}
          </UiText>
          <UiText style={s.summaryVal}>
            {t("staff.signHandoverShiftDurationVal")}
          </UiText>
        </View>
        <View style={[s.summaryRow, s.summaryRowDivider]}>
          <UiText style={s.summaryLbl}>
            {t("staff.signHandoverOrdersCompletedLbl")}
          </UiText>
          <UiText style={s.summaryVal}>
            {t("staff.signHandoverOrdersCompletedVal", { count: 387 })}
          </UiText>
        </View>
        <View style={[s.summaryRow, s.summaryRowDivider]}>
          <UiText style={s.summaryLbl}>
            {t("staff.signHandoverNotesSummaryLbl")}
          </UiText>
          <UiText style={s.summaryValMuted}>
            {t("staff.signHandoverNotesNoneOptional")}
          </UiText>
        </View>
      </View>

      {pendingCount > 0 ? (
        <View style={s.warningBox}>
          <Ionicons
            name="warning-outline"
            size={16}
            color={COLORS.trendPositiveDeep}
          />
          <UiText style={s.warningTxt}>
            {t("staff.signHandoverPendingWarning", { count: pendingCount })}
          </UiText>
        </View>
      ) : null}

      <View>
        <View style={s.sectionLabelRow}>
          <UiText style={s.sectionLbl}>
            {t("staff.signHandoverNotesSectionLbl")}
          </UiText>
          <UiText style={s.sectionLblOptional}>
            {t("staff.signHandoverNotesOptional")}
          </UiText>
        </View>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder={t("staff.signHandoverNotesPlaceholder")}
          placeholderTextColor={COLORS.ink5}
          multiline
          style={[s.notesInput, { marginTop: 8 }]}
        />
      </View>

      <View>
        <View style={s.signatureHeader}>
          <UiText style={s.sectionLbl}>
            {t("staff.signHandoverYourSignatureLbl")}
          </UiText>
          <Pressable style={s.clearBtn} onPress={handleClear}>
            <Ionicons name="trash-outline" size={12} color={COLORS.portalInk} />
            <UiText style={s.clearBtnTxt}>{t("staff.signHandoverClear")}</UiText>
          </Pressable>
        </View>
        <View style={[s.signaturePad, { marginTop: 8 }]}>
          <UiText style={s.signaturePadTxt}>
            {t("staff.signHandoverDrawHere")}
          </UiText>
        </View>
        <View style={[s.securityRow, { marginTop: 8 }]}>
          <Ionicons name="shield-checkmark-outline" size={12} color={COLORS.ink4} />
          <UiText style={s.securityTxt}>
            {t("staff.signHandoverSecurityNote")}
          </UiText>
        </View>
      </View>

      <View>
        <UiText style={s.sectionLbl}>
          {t("staff.signHandoverSigningAsLbl")}
        </UiText>
      </View>
    </StaffBaseModal>
  );
}
