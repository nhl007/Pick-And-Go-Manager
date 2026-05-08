import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

import { ActionConfirmationModal } from "@/components/staff/ActionConfirmationModal";
import { shiftDetailModalStyles as s } from "@/components/staff/ShiftDetailModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

export type ShiftKind = "morning" | "afternoon" | "night";

type ShiftToolKind = "swap" | "move" | "edit" | "delete";

const TOOL_CONFIG: Record<
  ShiftToolKind,
  {
    icon: React.ComponentProps<typeof Ionicons>["name"];
    titleKey: string;
    bodyPrefixKey: string;
    bodySuffixKey: string;
    refPrefix: string;
  }
> = {
  swap: {
    icon: "swap-horizontal",
    titleKey: "staff.swapShiftConfirmTitle",
    bodyPrefixKey: "staff.swapShiftConfirmBodyPrefix",
    bodySuffixKey: "staff.swapShiftConfirmBodySuffix",
    refPrefix: "SWAP",
  },
  move: {
    icon: "checkmark",
    titleKey: "staff.moveShiftConfirmTitle",
    bodyPrefixKey: "staff.moveShiftConfirmBodyPrefix",
    bodySuffixKey: "staff.moveShiftConfirmBodySuffix",
    refPrefix: "MOVE",
  },
  edit: {
    icon: "create-outline",
    titleKey: "staff.editShiftConfirmTitle",
    bodyPrefixKey: "staff.editShiftConfirmBodyPrefix",
    bodySuffixKey: "staff.editShiftConfirmBodySuffix",
    refPrefix: "EDIT",
  },
  delete: {
    icon: "trash-outline",
    titleKey: "staff.deleteShiftConfirmTitle",
    bodyPrefixKey: "staff.deleteShiftConfirmBodyPrefix",
    bodySuffixKey: "staff.deleteShiftConfirmBodySuffix",
    refPrefix: "DEL",
  },
};

type Employee = {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

const EMPLOYEES_BY_SHIFT: Record<ShiftKind, Employee[]> = {
  morning: [
    { id: "1", name: "Rami Abbas", icon: "restaurant-outline" },
    { id: "2", name: "Ahmed Khalil", icon: "bicycle-outline" },
    { id: "3", name: "Layla Masoud", icon: "cafe-outline" },
    { id: "7", name: "Karim Hassan", icon: "ice-cream-outline" },
    { id: "20", name: "Maryam Saleh", icon: "location-outline" },
    { id: "12", name: "Dina Habib", icon: "card-outline" },
    { id: "13", name: "Ibrahim Farah", icon: "clipboard-outline" },
    { id: "14", name: "Zaid Omar", icon: "file-tray-outline" },
  ],
  afternoon: [
    { id: "4", name: "Omar Mansour", icon: "bicycle-outline" },
    { id: "5", name: "Yousef Karim", icon: "briefcase-outline" },
    { id: "6", name: "Nadia Ahmed", icon: "fast-food-outline" },
    { id: "9", name: "Tarek Ali", icon: "flame-outline" },
    { id: "10", name: "Hana Rashid", icon: "person-outline" },
    { id: "15", name: "Sara Fahmy", icon: "card-outline" },
  ],
  night: [
    { id: "11", name: "Samir Nasr", icon: "bicycle-outline" },
    { id: "16", name: "Basem Rouf", icon: "trash-outline" },
    { id: "17", name: "Yara Abbas", icon: "cafe-outline" },
    { id: "18", name: "Fatima Boudaoud", icon: "flame-outline" },
  ],
};

const SHIFT_META: Record<
  ShiftKind,
  { titleKey: string; timeKey: string; scheduleKey: string; durationKey: string; staffCount: number }
> = {
  morning: {
    titleKey: "staff.shiftMorning",
    timeKey: "staff.shiftTimeMorning",
    scheduleKey: "staff.shiftScheduleMorning",
    durationKey: "staff.shiftDurationMorning",
    staffCount: 8,
  },
  afternoon: {
    titleKey: "staff.shiftAfternoon",
    timeKey: "staff.shiftTimeAfternoon",
    scheduleKey: "staff.shiftScheduleAfternoon",
    durationKey: "staff.shiftDurationAfternoon",
    staffCount: 6,
  },
  night: {
    titleKey: "staff.shiftNight",
    timeKey: "staff.shiftTimeNight",
    scheduleKey: "staff.shiftScheduleNight",
    durationKey: "staff.shiftDurationNight",
    staffCount: 4,
  },
};

export type ShiftDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  shiftKind: ShiftKind | null;
  t: TFunction;
};

export function ShiftDetailModal({ visible, onClose, shiftKind, t }: ShiftDetailModalProps) {
  const [activeTool, setActiveTool] = useState<ShiftToolKind | null>(null);

  if (!shiftKind) return null;

  const meta = SHIFT_META[shiftKind];
  const employees = EMPLOYEES_BY_SHIFT[shiftKind];
  const headerMeta = t("staff.shiftHeaderMeta", {
    time: t(meta.timeKey),
    schedule: t(meta.scheduleKey),
    count: meta.staffCount,
  });

  const toolConfig = activeTool ? TOOL_CONFIG[activeTool] : null;

  return (
    <>
      <StaffBaseModal
        visible={visible && activeTool === null}
        onClose={onClose}
        maxWidth={780}
        maxHeight={680}
        bodyContentContainerStyle={s.bodyPad}
        footer={
          <Pressable style={s.closeBtn} onPress={onClose}>
            <UiText style={s.closeBtnTxt}>{t("staff.close")}</UiText>
          </Pressable>
        }
        header={
          <View style={s.headerRow}>
            <View style={s.headerIconWrap}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.white} />
            </View>
            <View style={s.headerTextCol}>
              <UiText style={s.headerTitle}>{t(meta.titleKey)}</UiText>
              <UiText style={s.headerMeta}>{headerMeta}</UiText>
            </View>
          </View>
        }
      >
        <View style={s.statsRow}>
          <View style={s.statTile}>
            <UiText style={s.statLbl} font="extraBold">{t("staff.shiftDetailScheduleLbl")}</UiText>
            <UiText style={s.statVal} font="extraBold">{t(meta.scheduleKey)}</UiText>
          </View>
          <View style={s.statTile}>
            <UiText style={s.statLbl}>{t("staff.shiftDetailDurationLbl")}</UiText>
            <UiText style={s.statVal}>{t(meta.durationKey)}</UiText>
          </View>
          <View style={s.statTile}>
            <UiText style={s.statLbl}>{t("staff.shiftDetailStaffLbl")}</UiText>
            <UiText style={s.statVal}>
              {t("staff.shiftStaffAssigned", { count: meta.staffCount })}
            </UiText>
          </View>
        </View>

        <View>
          <UiText style={s.sectionKicker} font="black">{t("staff.assignedEmployeesLbl")}</UiText>
          <View style={s.employeesGrid}>
            {employees.map((employee) => (
              <View key={employee.id} style={s.employeePill}>
                <View style={s.employeeIconWrap}>
                  <Ionicons name={employee.icon} size={16} color={COLORS.portalInk} />
                </View>
                <UiText style={s.employeeName} numberOfLines={1}>
                  {employee.name}
                </UiText>
              </View>
            ))}
          </View>
        </View>

        <View>
          <UiText style={s.sectionKicker}>{t("staff.shiftToolsLbl")}</UiText>
          <View style={s.toolsGrid}>
            <Pressable style={s.toolBtn} onPress={() => { setActiveTool("swap"); }}>
              <Ionicons name="swap-horizontal-outline" size={16} color={COLORS.portalInk} />
              <UiText style={s.toolBtnTxt} font="extraBold">{t("staff.swapEmployee")}</UiText>
            </Pressable>
            <Pressable style={s.toolBtn} onPress={() => { setActiveTool("move"); }}>
              <Ionicons name="arrow-forward-outline" size={16} color={COLORS.portalInk} />
              <UiText style={s.toolBtnTxt} font="extraBold">{t("staff.moveToAnotherShift")}</UiText>
            </Pressable>
            <Pressable style={s.toolBtn} onPress={() => { setActiveTool("edit"); }}>
              <Ionicons name="create-outline" size={16} color={COLORS.portalInk} />
              <UiText style={s.toolBtnTxt} font="extraBold">{t("staff.editShift")}</UiText>
            </Pressable>
            <Pressable style={[s.toolBtn, s.toolBtnDanger]} onPress={() => { setActiveTool("delete"); }}>
              <Ionicons name="trash-outline" size={16} color={COLORS.financeRose} />
              <UiText style={[s.toolBtnTxt, s.toolBtnTxtDanger]}>{t("staff.deleteShift")}</UiText>
            </Pressable>
          </View>
        </View>
      </StaffBaseModal>

      {toolConfig ? (
        <ActionConfirmationModal
          visible={activeTool !== null}
          onClose={() => {
            setActiveTool(null);
            onClose();
          }}
          icon={toolConfig.icon}
          title={t(toolConfig.titleKey)}
          bodyPrefix={t(toolConfig.bodyPrefixKey)}
          bodyBold={t(meta.titleKey)}
          bodySuffix={t(toolConfig.bodySuffixKey)}
          refLabel={t("staff.ref")}
          refPrefix={toolConfig.refPrefix}
          doneLabel={t("staff.done")}
        />
      ) : null}
    </>
  );
}
