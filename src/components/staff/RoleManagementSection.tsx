import type { TFunction } from "i18next";
import React from "react";
import { View } from "react-native";

import { ActiveTabletsCard } from "@/components/staff/ActiveTabletsCard";
import { roleManagementSectionStyles as s } from "@/components/staff/RoleManagementSection.styles";
import { RoleManagementSystemCard } from "@/components/staff/RoleManagementSystemCard";
import { UiText } from "@/components/ui/UiText";
import { staffStyles as base } from "@/constants/staff";
import { SPACING } from "@/constants/styles";

export type RoleManagementSectionProps = {
  t: TFunction;
  isRtl?: boolean;
};

export function RoleManagementSection({ t, isRtl }: RoleManagementSectionProps) {
  return (
    <View>
      <View
        style={[
          base.sectionHeadRow,
          isRtl && base.rowRtl,
          { marginTop: SPACING.lg, justifyContent: "space-between", width: "100%" },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "baseline", flex: 1 }}>
          <UiText style={base.sectionTitle}>{t("staff.roleSecurityTitle")}</UiText>
          <UiText style={base.sectionCaption}>{t("staff.roleSecurityCaption")}</UiText>
        </View>
        <View style={s.restrictedBadge}>
          <UiText style={s.restrictedBadgeTxt}>{t("staff.restrictedBadge")}</UiText>
        </View>
      </View>

      <View style={[s.cardsRow, isRtl && base.rowRtl]}>
        <RoleManagementSystemCard t={t} />
        <ActiveTabletsCard t={t} />
      </View>
    </View>
  );
}
