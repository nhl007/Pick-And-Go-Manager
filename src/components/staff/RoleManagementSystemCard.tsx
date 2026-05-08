import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

import { ActionConfirmationModal } from "@/components/staff/ActionConfirmationModal";
import { PermissionMatrixModal } from "@/components/staff/PermissionMatrixModal";
import { roleManagementSystemCardStyles as s } from "@/components/staff/RoleManagementSystemCard.styles";
import { ShiftDetailModal, type ShiftKind } from "@/components/staff/ShiftDetailModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type QuickAction = {
  id: string;
  titleKey: string;
  subKey: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  highlight?: boolean;
};

type Shift = {
  id: ShiftKind;
  titleKey: string;
  metaKey: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  status: "live" | "scheduled";
};

type TaskList = {
  id: string;
  titleKey: string;
  metaKey: string;
  pct: number;
};

type RecentAction = {
  id: string;
  whoKey?: string;
  midKey: string;
  targetKey?: string;
  atKey: string;
  prefixKey?: string;
  nameKey?: string;
  suffixKey?: string;
};

const QUICK_ACTIONS: QuickAction[] = [
  { id: "shift", titleKey: "staff.quickCreateShift", subKey: "staff.quickCreateShiftSub", icon: "calendar-outline" },
  { id: "task", titleKey: "staff.quickTaskList", subKey: "staff.quickTaskListSub", icon: "checkbox-outline" },
  { id: "perm", titleKey: "staff.quickPermissions", subKey: "staff.quickPermissionsSub", icon: "lock-closed-outline" },
  { id: "add", titleKey: "staff.quickAddMember", subKey: "staff.quickAddMemberSub", icon: "person-add-outline" },
];

const SHIFTS: Shift[] = [
  { id: "morning", titleKey: "staff.shiftMorning", metaKey: "staff.shiftMorningMeta", icon: "sunny-outline", status: "live" },
  { id: "afternoon", titleKey: "staff.shiftAfternoon", metaKey: "staff.shiftAfternoonMeta", icon: "partly-sunny-outline", status: "scheduled" },
  { id: "night", titleKey: "staff.shiftNight", metaKey: "staff.shiftNightMeta", icon: "moon-outline", status: "scheduled" },
];

const TASK_LISTS: TaskList[] = [
  { id: "open", titleKey: "staff.openingChecklist", metaKey: "staff.openingChecklistMeta", pct: 64 },
  { id: "close", titleKey: "staff.closingChecklist", metaKey: "staff.closingChecklistMeta", pct: 0 },
];

const RECENT_ACTIONS: RecentAction[] = [
  {
    id: "froze",
    whoKey: "staff.recentActionFrozeWho",
    midKey: "staff.recentActionFrozeMid",
    targetKey: "staff.recentActionFrozeTarget",
    atKey: "staff.recentActionFrozeAt",
  },
  {
    id: "shift",
    prefixKey: "staff.recentActionShiftPrefix",
    nameKey: "staff.recentActionShiftName",
    midKey: "staff.recentActionShiftSuffix",
    atKey: "staff.recentActionShiftAt",
  },
  {
    id: "promoted",
    whoKey: "staff.recentActionPromotedWho",
    midKey: "staff.recentActionPromotedMid",
    atKey: "staff.recentActionPromotedAt",
  },
];

const statusStyle = (status: "live" | "scheduled") => {
  if (status === "live") return { box: s.statusLive, txt: s.statusLiveTxt, key: "staff.shiftStatusLive" };
  return { box: s.statusScheduled, txt: s.statusScheduledTxt, key: "staff.shiftStatusScheduled" };
};

export type RoleManagementSystemCardProps = {
  t: TFunction;
};

export function RoleManagementSystemCard({ t }: RoleManagementSystemCardProps) {
  const [selectedShift, setSelectedShift] = useState<ShiftKind | null>(null);
  const [selectedTaskList, setSelectedTaskList] = useState<string | null>(null);
  const [permissionMatrixOpen, setPermissionMatrixOpen] = useState(false);

  return (
    <>
      <View style={s.card}>
      <View style={s.headerRow}>
        <UiText style={s.headerTitle} numberOfLines={1}>
          {t("staff.roleSystemTitle")}
        </UiText>
        <Pressable hitSlop={6} onPress={() => { setPermissionMatrixOpen(true); }}>
          <UiText style={s.headerLink} font="bold">{t("staff.permissionMatrix")} →</UiText>
        </Pressable>
      </View>

      <View style={s.quickGrid}>
        {QUICK_ACTIONS.map((action) => (
          <Pressable
            key={action.id}
            style={[s.quickTile, action.highlight && s.quickTileHighlight]}
          >
            <View
              style={[
                s.quickIconWrap,
                action.highlight && s.quickIconWrapHighlight,
              ]}
            >
              <Ionicons
                name={action.icon}
                size={18}
                color={action.highlight ? COLORS.financeRose : COLORS.portalInk}
              />
            </View>
            <UiText style={s.quickTitle} numberOfLines={1} font="extraBold" size="sm">
              {t(action.titleKey)}
            </UiText>
            <UiText style={s.quickSub} numberOfLines={1}>
              {t(action.subKey)}
            </UiText>
          </Pressable>
        ))}
      </View>

      <View style={s.sectionHeadRow}>
        <View style={s.sectionHeadLeft}>
          <UiText style={s.sectionKicker} font="extraBold">{t("staff.activeShiftsLabel")}</UiText>
          <View style={s.sectionCountBadge}>
            <UiText style={s.sectionCountTxt}>{SHIFTS.length}</UiText>
          </View>
        </View>
        <Pressable hitSlop={6}>
          <UiText style={s.sectionLink}>{t("staff.viewAll")} →</UiText>
        </Pressable>
      </View>

      {SHIFTS.map((shift) => {
        const st = statusStyle(shift.status);
        return (
          <Pressable
  key={shift.id}
  onPress={() => { setSelectedShift(shift.id); }}
  style={({ hovered }) => [
    s.rowItem,
    hovered && { borderColor: "#000" }
  ]}
>
  <View style={s.rowIconWrap}>
    <Ionicons name={shift.icon} size={18} color={COLORS.portalInk} />
  </View>

  <View style={s.rowBody}>
    <UiText style={s.rowTitle} numberOfLines={1} font="extraBold">
      {t(shift.titleKey)}
    </UiText>
    <UiText style={s.rowMeta} numberOfLines={1}>
      {t(shift.metaKey)}
    </UiText>
  </View>

  <View style={[s.statusBadge, st.box]}>
    <UiText style={[s.statusBadgeTxt, st.txt]}>
      {t(st.key)}
    </UiText>
  </View>
</Pressable>
        );
      })}

      <View style={s.sectionHeadRow}>
        <View style={s.sectionHeadLeft}>
          <UiText style={s.sectionKicker}>{t("staff.taskListsLabel")}</UiText>
          <View style={s.sectionCountBadge}>
            <UiText style={s.sectionCountTxt}>{TASK_LISTS.length}</UiText>
          </View>
        </View>
        <Pressable hitSlop={6}>
          <UiText style={s.sectionLink}>{t("staff.viewAll")} →</UiText>
        </Pressable>
      </View>

      {TASK_LISTS.map((task) => (
        <Pressable
          key={task.id}
          onPress={() => { setSelectedTaskList(task.titleKey); }}
          style={s.rowItem}
        >
          <View style={s.rowIconWrap}>
            <Ionicons name="clipboard-outline" size={18} color={COLORS.portalInk} />
          </View>
          <View style={s.rowBody}>
            <UiText style={s.rowTitle} numberOfLines={1}>
              {t(task.titleKey)}
            </UiText>
            <UiText style={s.rowMeta} numberOfLines={1}>
              {t(task.metaKey)}
            </UiText>
          </View>
          <View style={s.pctBadge}>
            <UiText style={s.pctBadgeTxt}>{task.pct}%</UiText>
          </View>
        </Pressable>
      ))}

      <View style={s.sectionHeadRow}>
        <View style={s.sectionHeadLeft}>
          <UiText style={s.sectionKicker}>{t("staff.recentActionsLabel")}</UiText>
        </View>
      </View>

      {RECENT_ACTIONS.map((action) => (
        <View key={action.id} style={s.recentItem}>
          <View style={s.recentDot} />
          <View style={s.recentTextWrap}>
            <UiText style={s.recentText} numberOfLines={2}>
              {action.whoKey ? (
                <UiText style={s.recentTextStrong} size="sm" font="extraBold">{t(action.whoKey)}</UiText>
              ) : null}
              {action.prefixKey ? t(action.prefixKey) : null}
              {action.nameKey ? (
                <UiText style={s.recentTextStrong}>{t(action.nameKey)}</UiText>
              ) : null}
              {t(action.midKey)}
              {action.targetKey ? (
                <UiText style={s.recentTextStrong}>{t(action.targetKey)}</UiText>
              ) : null}
            </UiText>
          </View>
          <UiText style={s.recentAt}>{t(action.atKey)}</UiText>
        </View>
      ))}
      </View>

      <ShiftDetailModal
        visible={selectedShift !== null}
        onClose={() => { setSelectedShift(null); }}
        shiftKind={selectedShift}
        t={t}
      />

      <PermissionMatrixModal
        visible={permissionMatrixOpen}
        onClose={() => { setPermissionMatrixOpen(false); }}
        t={t}
      />

      <ActionConfirmationModal
        visible={selectedTaskList !== null}
        onClose={() => { setSelectedTaskList(null); }}
        title={t("staff.taskListLoadingTitle")}
        bodyPrefix={t("staff.taskListLoadingBodyPrefix")}
        bodyBold={selectedTaskList ? t(selectedTaskList) : undefined}
        bodySuffix={t("staff.taskListLoadingBodySuffix")}
        refLabel={t("staff.taskListRefLbl")}
        refPrefix="TLD"
        doneLabel={t("staff.done")}
      />
    </>
  );
}
