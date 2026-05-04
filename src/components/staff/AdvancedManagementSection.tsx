import type { TFunction } from "i18next";
import React from "react";
import { View } from "react-native";

import { advancedManagementSectionStyles as s } from "@/components/staff/AdvancedManagementSection.styles";
import { BurnoutAlertCard } from "@/components/staff/BurnoutAlertCard";
import { DigitalSignOffCard } from "@/components/staff/DigitalSignOffCard";
import { TopRunnerCard } from "@/components/staff/TopRunnerCard";
import { UiText } from "@/components/ui/UiText";
import { staffStyles as base } from "@/constants/staff";
import { SPACING } from "@/constants/styles";

export type AdvancedManagementSectionProps = {
  t: TFunction;
  isRtl?: boolean;
};

export function AdvancedManagementSection({ t, isRtl }: AdvancedManagementSectionProps) {
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
          <UiText style={base.sectionTitle}>{t("staff.advancedMgmtTitle")}</UiText>
          <UiText style={base.sectionCaption}>{t("staff.advancedMgmtCaption")}</UiText>
        </View>
      </View>

      <View style={[s.cardsRow, isRtl && base.rowRtl]}>
        <TopRunnerCard t={t} />
        <BurnoutAlertCard t={t} />
        <DigitalSignOffCard t={t} />
      </View>
    </View>
  );
}
