import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

import { burnoutAlertCardStyles as s } from "@/components/staff/BurnoutAlertCard.styles";
import { BurnoutRotateModal } from "@/components/staff/BurnoutRotateModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type Stat = {
  id: string;
  lblKey: string;
  valKey: string;
  danger?: boolean;
};

const STATS: Stat[] = [
  { id: "hours", lblKey: "staff.burnoutHoursLbl", valKey: "staff.burnoutHoursVal" },
  { id: "orders", lblKey: "staff.burnoutOrdersLbl", valKey: "staff.burnoutOrdersVal", danger: true },
  { id: "delivery", lblKey: "staff.burnoutDeliveryLbl", valKey: "staff.burnoutDeliveryVal", danger: true },
];

export type BurnoutAlertCardProps = {
  t: TFunction;
};

export function BurnoutAlertCard({ t }: BurnoutAlertCardProps) {
  const [rotateModalVisible, setRotateModalVisible] = useState(false);
  return (
    <View style={s.card}>
      <View style={s.headerRow}>
        <UiText style={s.headerTitle} numberOfLines={1}>
          {t("staff.burnoutAlertTitle")}
        </UiText>
        <View style={s.activeBadge}>
          <View style={s.activeDot} />
          <UiText style={s.activeBadgeTxt}>{t("staff.burnoutActiveBadge")}</UiText>
        </View>
      </View>

      <View style={s.userRow}>
        <View style={s.userIconWrap}>
          <Ionicons name="bicycle-outline" size={16} color={COLORS.portalInk} />
        </View>
        <View style={s.userBody}>
          <UiText style={s.userName} numberOfLines={1}>
            {t("staff.burnoutUserName")}
          </UiText>
          <UiText style={s.userSub} numberOfLines={1}>
            {t("staff.burnoutUserSub")}
          </UiText>
        </View>
        <View style={s.durationBadge}>
          <UiText style={s.durationBadgeTxt}>{t("staff.burnoutDuration")}</UiText>
        </View>
      </View>

      {STATS.map((stat) => (
        <View key={stat.id} style={s.statRow}>
          <UiText style={s.statLbl} numberOfLines={1}>
            {t(stat.lblKey)}
          </UiText>
          <UiText style={[s.statVal, stat.danger && s.statValDanger]} numberOfLines={1}>
            {t(stat.valKey)}
          </UiText>
        </View>
      ))}

      <View style={s.suggestBox}>
        <Ionicons name="information-circle-outline" size={14} color={COLORS.trendPositiveDeep} />
        <UiText style={s.suggestText}>
          {t("staff.burnoutSuggestPrefix")}
          <UiText style={s.suggestStrong}>{t("staff.burnoutSuggestStrong")}</UiText>
          {t("staff.burnoutSuggestSuffix")}
        </UiText>
      </View>

      <View style={s.actionsRow}>
        <Pressable style={s.ignoreBtn}>
          <UiText style={s.ignoreBtnTxt}>{t("staff.burnoutIgnore")}</UiText>
        </Pressable>
        <Pressable style={s.rotateBtn} onPress={() => { setRotateModalVisible(true); }}>
          <UiText style={s.rotateBtnTxt}>{t("staff.burnoutRotateTask")}</UiText>
        </Pressable>
      </View>

      <BurnoutRotateModal
        visible={rotateModalVisible}
        onClose={() => { setRotateModalVisible(false); }}
        onConfirm={(station, duration) => {
          console.log("Rotate task confirmed:", { station, duration });
          // Handle the rotation confirmation here
        }}
        t={t}
      />
    </View>
  );
}
