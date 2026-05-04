import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { permissionMatrixModalStyles as s } from "@/components/staff/PermissionMatrixModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type AccessLevel = "full" | "conditional" | "restricted";

const ACCESS_CYCLE: Record<AccessLevel, AccessLevel> = {
  full: "conditional",
  conditional: "restricted",
  restricted: "full",
};

type RoleKey = "manager" | "assistMgr" | "cashier" | "runner" | "kitchen";

const ROLES: { id: RoleKey; labelKey: string }[] = [
  { id: "manager", labelKey: "staff.permRoleManager" },
  { id: "assistMgr", labelKey: "staff.permRoleAssistMgr" },
  { id: "cashier", labelKey: "staff.permRoleCashier" },
  { id: "runner", labelKey: "staff.permRoleRunner" },
  { id: "kitchen", labelKey: "staff.permRoleKitchen" },
];

type PermissionRow = {
  id: string;
  labelKey: string;
  defaults: Record<RoleKey, AccessLevel>;
};

const PERMISSIONS: PermissionRow[] = [
  {
    id: "viewOrders",
    labelKey: "staff.permViewOrders",
    defaults: { manager: "full", assistMgr: "full", cashier: "full", runner: "full", kitchen: "full" },
  },
  {
    id: "editMenu",
    labelKey: "staff.permEditMenu",
    defaults: { manager: "full", assistMgr: "full", cashier: "restricted", runner: "restricted", kitchen: "restricted" },
  },
  {
    id: "processRefunds",
    labelKey: "staff.permProcessRefunds",
    defaults: { manager: "full", assistMgr: "full", cashier: "conditional", runner: "restricted", kitchen: "restricted" },
  },
  {
    id: "financialReports",
    labelKey: "staff.permFinancialReports",
    defaults: { manager: "full", assistMgr: "full", cashier: "restricted", runner: "restricted", kitchen: "restricted" },
  },
  {
    id: "staffManagement",
    labelKey: "staff.permStaffManagement",
    defaults: { manager: "full", assistMgr: "conditional", cashier: "restricted", runner: "restricted", kitchen: "restricted" },
  },
  {
    id: "marketingPromos",
    labelKey: "staff.permMarketingPromos",
    defaults: { manager: "full", assistMgr: "full", cashier: "restricted", runner: "restricted", kitchen: "restricted" },
  },
  {
    id: "privilegeFreeze",
    labelKey: "staff.permPrivilegeFreeze",
    defaults: { manager: "full", assistMgr: "restricted", cashier: "restricted", runner: "restricted", kitchen: "restricted" },
  },
];

type Matrix = Record<string, Record<RoleKey, AccessLevel>>;

const buildInitialMatrix = (): Matrix =>
  PERMISSIONS.reduce<Matrix>((acc, row) => {
    acc[row.id] = { ...row.defaults };
    return acc;
  }, {});

const AccessChip = ({ level, editing }: { level: AccessLevel; editing: boolean }) => {
  const chipStyle =
    level === "full" ? s.cellChipFull : level === "conditional" ? s.cellChipConditional : s.cellChipRestricted;
  const iconName: React.ComponentProps<typeof Ionicons>["name"] =
    level === "full" ? "checkmark" : level === "conditional" ? "ellipse-outline" : "remove";
  const iconColor =
    level === "full"
      ? COLORS.trendPositiveDeep
      : level === "conditional"
        ? COLORS.accentAmber
        : COLORS.ink4;
  return (
    <View style={[s.cellChip, chipStyle, editing && s.cellChipEditing]}>
      <Ionicons name={iconName} size={14} color={iconColor} />
    </View>
  );
};

export type PermissionMatrixModalProps = {
  visible: boolean;
  onClose: () => void;
  t: TFunction;
};

export function PermissionMatrixModal({ visible, onClose, t }: PermissionMatrixModalProps) {
  const [editing, setEditing] = useState(false);
  const [matrix, setMatrix] = useState<Matrix>(() => buildInitialMatrix());
  const [draft, setDraft] = useState<Matrix>(() => buildInitialMatrix());

  useEffect(() => {
    if (!visible) {
      setEditing(false);
      const fresh = buildInitialMatrix();
      setMatrix(fresh);
      setDraft(fresh);
    }
  }, [visible]);

  const activeMatrix = editing ? draft : matrix;

  const handleEnterEdit = () => {
    setDraft(JSON.parse(JSON.stringify(matrix)) as Matrix);
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setDraft(matrix);
  };

  const handleSave = () => {
    if (editing) {
      setMatrix(draft);
      setEditing(false);
      return;
    }
    onClose();
  };

  const cycleCell = (permId: string, role: RoleKey) => {
    if (!editing) return;
    setDraft((prev) => ({
      ...prev,
      [permId]: {
        ...prev[permId],
        [role]: ACCESS_CYCLE[prev[permId][role]],
      },
    }));
  };

  const headerSubtitle = useMemo(
    () => (editing ? t("staff.permMatrixSubtitleEdit") : t("staff.permMatrixSubtitleView")),
    [editing, t]
  );

  return (
    <StaffBaseModal
      visible={visible}
      onClose={onClose}
      maxWidth={960}
      maxHeight={720}
      bodyContentContainerStyle={s.bodyPad}
      header={
        <View style={s.headerRow}>
          <View style={s.headerTextCol}>
            <View style={[s.headerBadge, editing && s.headerBadgeEditing]}>
              <View style={[s.headerBadgeDot, editing && s.headerBadgeDotEditing]} />
              <UiText style={[s.headerBadgeTxt, editing && s.headerBadgeTxtEditing]}>
                {editing ? t("staff.permMatrixBadgeEdit") : t("staff.permMatrixBadgeView")}
              </UiText>
            </View>
            <UiText style={s.headerTitle}>{t("staff.permMatrixTitle")}</UiText>
            <UiText style={s.headerSubtitle}>{headerSubtitle}</UiText>
          </View>
        </View>
      }
      footer={
        <View style={s.footerRow}>
          {editing ? (
            <>
              <Pressable style={s.footerBtn} onPress={handleCancelEdit}>
                <UiText style={s.footerBtnTxt}>{t("staff.cancel")}</UiText>
              </Pressable>
              <Pressable style={[s.footerBtn, s.footerBtnStrong]} onPress={handleSave}>
                <Ionicons name="checkmark" size={16} color={COLORS.portalInk} />
                <UiText style={[s.footerBtnTxt, s.footerBtnTxtStrong]}>
                  {t("staff.permMatrixSaveChanges")}
                </UiText>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable style={s.footerBtn} onPress={onClose}>
                <UiText style={s.footerBtnTxt}>{t("staff.close")}</UiText>
              </Pressable>
              <Pressable style={[s.footerBtn, s.footerBtnStrong]} onPress={handleEnterEdit}>
                <Ionicons name="create-outline" size={16} color={COLORS.portalInk} />
                <UiText style={[s.footerBtnTxt, s.footerBtnTxtStrong]}>
                  {t("staff.permMatrixEditPermissions")}
                </UiText>
              </Pressable>
              <Pressable style={s.footerBtn} onPress={onClose}>
                <UiText style={s.footerBtnTxt}>{t("staff.cancel")}</UiText>
              </Pressable>
              <Pressable style={[s.footerBtn, s.footerBtnStrong]} onPress={handleSave}>
                <Ionicons name="checkmark" size={16} color={COLORS.portalInk} />
                <UiText style={[s.footerBtnTxt, s.footerBtnTxtStrong]}>
                  {t("staff.permMatrixSaveChanges")}
                </UiText>
              </Pressable>
            </>
          )}
        </View>
      }
    >
      <View style={s.tableWrap}>
        <View style={s.tableHeadRow}>
          <View style={s.permCellHead}>
            <UiText style={s.permLabelHead}>{t("staff.permMatrixColPermission")}</UiText>
          </View>
          {ROLES.map((role) => (
            <View key={role.id} style={s.roleCellHead}>
              <UiText style={s.roleLabelHead} numberOfLines={1}>
                {t(role.labelKey)}
              </UiText>
            </View>
          ))}
        </View>

        {PERMISSIONS.map((perm, idx) => (
          <View
            key={perm.id}
            style={[s.tableRow, idx === PERMISSIONS.length - 1 && s.tableRowLast]}
          >
            <View style={s.permCell}>
              <UiText style={s.permLabel} numberOfLines={1}>
                {t(perm.labelKey)}
              </UiText>
            </View>
            {ROLES.map((role) => {
              const level = activeMatrix[perm.id][role.id];
              return (
                <Pressable
                  key={role.id}
                  style={s.roleCell}
                  onPress={() => cycleCell(perm.id, role.id)}
                  disabled={!editing}
                >
                  <AccessChip level={level} editing={editing} />
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <View style={s.legendRow}>
        <View style={s.legendItem}>
          <View style={[s.legendChip, s.cellChipFull]}>
            <Ionicons name="checkmark" size={12} color={COLORS.trendPositiveDeep} />
          </View>
          <UiText style={s.legendTxt}>{t("staff.permLegendFull")}</UiText>
        </View>
        <View style={s.legendItem}>
          <View style={[s.legendChip, s.cellChipConditional]}>
            <Ionicons name="ellipse-outline" size={10} color={COLORS.accentAmber} />
          </View>
          <UiText style={s.legendTxt}>{t("staff.permLegendConditional")}</UiText>
        </View>
        <View style={s.legendItem}>
          <View style={[s.legendChip, s.cellChipRestricted]}>
            <Ionicons name="remove" size={12} color={COLORS.ink4} />
          </View>
          <UiText style={s.legendTxt}>{t("staff.permLegendRestricted")}</UiText>
        </View>
      </View>
    </StaffBaseModal>
  );
}
