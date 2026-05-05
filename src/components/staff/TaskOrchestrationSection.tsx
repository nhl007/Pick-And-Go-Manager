import type { TFunction } from "i18next";
import React from "react";
import { View } from "react-native";

import { OperationalChecklistCard } from "@/components/staff/OperationalChecklistCard";
import { PrepStationCard } from "@/components/staff/PrepStationCard";
import { taskOrchestrationSectionStyles as s } from "@/components/staff/TaskOrchestrationSection.styles";
import { UiText } from "@/components/ui/UiText";
import { staffStyles as base } from "@/constants/staff";
import { SPACING } from "@/constants/styles";

export type TaskOrchestrationSectionProps = {
  t: TFunction;
  isRtl?: boolean;
  onAssignStation?: (stationId: string) => void;
};

export function TaskOrchestrationSection({
  t,
  isRtl,
  onAssignStation,
}: TaskOrchestrationSectionProps) {
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
          <UiText style={base.sectionTitle}>{t("staff.taskOrchestrationTitle")}</UiText>
          <UiText style={base.sectionCaption}>{t("staff.taskOrchestrationCaption")}</UiText>
        </View>
      </View>

      <View style={[s.cardsRow, isRtl && base.rowRtl]}>
        <PrepStationCard t={t} onAssign={onAssignStation} />
        <OperationalChecklistCard t={t} />
      </View>
    </View>
  );
}
