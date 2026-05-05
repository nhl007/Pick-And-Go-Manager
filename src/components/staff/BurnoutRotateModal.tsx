import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

import { burnoutRotateModalStyles as s } from "@/components/staff/BurnoutRotateModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { type SelectOption,UiSelect } from "@/components/ui/UiSelect";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

export type BurnoutRotateModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm?: (station: string, duration: string) => void;
  employeeName?: string;
  employeeRole?: string;
  continuousTime?: string;
  t: TFunction;
};

const DURATION_OPTIONS = [
  { id: "1hour", labelKey: "staff.burnoutRotate1Hour", subKey: "staff.burnoutRotateQuickReset" },
  { id: "rest", labelKey: "staff.burnoutRotateRestShift", subKey: "staff.burnoutRotateUntilTime" },
  { id: "early", labelKey: "staff.burnoutRotateEndEarly", subKey: "staff.burnoutRotateSendHome" },
];

const STATION_OPTIONS: SelectOption[] = [
  { label: "Expeditor · Kitchen (low activity)", value: "expeditor-kitchen" },
  { label: "Counter · Front Desk", value: "counter-front" },
  { label: "Stockroom · Inventory", value: "stockroom-inventory" },
  { label: "Delivery Prep · Packing", value: "delivery-prep" },
];

export function BurnoutRotateModal({
  visible,
  onClose,
  onConfirm,
  employeeName = "Ahmed Khalii",
  employeeRole = "Runner",
  continuousTime = "8h 22m continuous · on shift since 07:15",
  t,
}: BurnoutRotateModalProps) {
  const [selectedStation, setSelectedStation] = useState("expeditor-kitchen");
  const [selectedDuration, setSelectedDuration] = useState("1hour");

  const handleConfirm = () => {
    onConfirm?.(selectedStation, selectedDuration);
    onClose();
  };

  return (
    <StaffBaseModal
      visible={visible}
      onClose={onClose}
      maxWidth={780}
      maxHeight={560}
      bodyContentContainerStyle={s.bodyPad}
      header={
        <View style={s.headerRow}>
          <View style={s.headerIconWrap}>
            <Ionicons name="swap-horizontal" size={22} color={COLORS.white} />
          </View>
          <View style={s.headerCol}>
            <UiText style={s.headerTitle}>{t("staff.burnoutRotateTitle")}</UiText>
            <UiText style={s.headerSubtitle}>
              {t("staff.burnoutRotateSubtitle")}
            </UiText>
          </View>
        </View>
      }
      footer={
        <View style={s.footerRow}>
          <Pressable style={s.cancelBtn} onPress={onClose}>
            <UiText style={s.cancelBtnTxt}>{t("staff.burnoutRotateCancel")}</UiText>
          </Pressable>
          <Pressable style={s.confirmBtn} onPress={handleConfirm}>
            <Ionicons name="checkmark" size={14} color={COLORS.ink4} />
            <UiText style={s.confirmBtnTxt}>
              {t("staff.burnoutRotateConfirm")}
            </UiText>
          </Pressable>
        </View>
      }
    >
      {/* Employee Info Card */}
      <View style={s.employeeCard}>
        <View style={s.employeeRow}>
          <View style={s.employeeIconWrap}>
            <Ionicons name="bicycle-outline" size={16} color={COLORS.portalInk} />
          </View>
          <View style={s.employeeBody}>
            <UiText style={s.employeeName}>{employeeName}</UiText>
            <UiText style={s.employeeMeta}>{continuousTime}</UiText>
          </View>
          <View style={s.fatigueRiskBadge}>
            <Ionicons name="warning" size={12} color={COLORS.financeRose} />
            <UiText style={s.fatigueRiskTxt}>
              {t("staff.burnoutRotateFatigueRisk")}
            </UiText>
          </View>
        </View>
      </View>

      {/* Move to Station Section */}
      <View style={s.section}>
        <UiText style={s.sectionLabel}>
          {t("staff.burnoutRotateMoveToStation")}
        </UiText>
        <UiSelect
          options={STATION_OPTIONS}
          value={selectedStation}
          onValueChange={setSelectedStation}
          placeholder={t("staff.burnoutRotateSelectStation")}
          style={s.stationSelect}
        />
      </View>

      {/* Duration Section */}
      <View style={s.section}>
        <UiText style={s.sectionLabel}>
          {t("staff.burnoutRotateDuration")}
        </UiText>
        <View style={s.durationOptionsRow}>
          {DURATION_OPTIONS.map((option) => {
            const isSelected = option.id === selectedDuration;
            return (
              <Pressable
                key={option.id}
                style={[s.durationOption, isSelected && s.durationOptionActive]}
                onPress={() => setSelectedDuration(option.id)}
              >
                <UiText style={[s.durationLabel, isSelected && s.durationLabelActive]}>
                  {t(option.labelKey)}
                </UiText>
                <UiText style={[s.durationSub, isSelected && s.durationSubActive]}>
                  {t(option.subKey)}
                </UiText>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Info Message */}
      <View style={s.infoBox}>
        <Ionicons name="information-circle-outline" size={14} color={COLORS.ink3} />
        <UiText style={s.infoTxt}>
          {t("staff.burnoutRotateInfoMessage")}
        </UiText>
      </View>
    </StaffBaseModal>
  );
}
