import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

import { ActionConfirmationModal } from "@/components/staff/ActionConfirmationModal";
import { activeTabletsCardStyles as s } from "@/components/staff/ActiveTabletsCard.styles";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type Tablet = {
  id: string;
  titleKey: string;
  metaKey: string;
  label: string; // human-readable name for the modal body
};

const TABLETS: Tablet[] = [
  {
    id: "front",
    titleKey: "staff.tabletFrontDesk",
    metaKey: "staff.tabletFrontDeskMeta",
    label: "iPad #01",
  },
  {
    id: "kitchen",
    titleKey: "staff.tabletKitchen",
    metaKey: "staff.tabletKitchenMeta",
    label: "iPad #02",
  },
  {
    id: "coffee",
    titleKey: "staff.tabletCoffeeBar",
    metaKey: "staff.tabletCoffeeBarMeta",
    label: "iPad #03",
  },
];

export type ActiveTabletsCardProps = {
  t: TFunction;
};

export function ActiveTabletsCard({ t }: ActiveTabletsCardProps) {
  const [loggedOutTablet, setLoggedOutTablet] = useState<Tablet | null>(null);

  return (
    <>
      <View style={s.card}>
        <View style={s.headerRow}>
          <UiText style={s.headerTitle} numberOfLines={1}>
            {t("staff.activeTabletsTitle")}
          </UiText>
          <View style={s.onlineBadge}>
            <UiText style={s.onlineBadgeTxt}>
              {t("staff.tabletsOnlineCount", { count: TABLETS.length })}
            </UiText>
          </View>
        </View>

        {TABLETS.map((tablet) => (
          <View key={tablet.id} style={s.tabletItem}>
            <View style={s.tabletIconWrap}>
              <Ionicons name="tablet-portrait-outline" size={16} color={COLORS.portalInk} />
            </View>
            <View style={s.tabletBody}>
              <UiText style={s.tabletTitle} numberOfLines={1}>
                {t(tablet.titleKey)}
              </UiText>
              <UiText style={s.tabletMeta} numberOfLines={1}>
                {t(tablet.metaKey)}
              </UiText>
            </View>
            <Pressable
              hitSlop={6}
              style={s.logoutBtn}
              onPress={() => { setLoggedOutTablet(tablet); }}
            >
              <UiText style={s.logoutBtnTxt}>{t("staff.tabletLogout")}</UiText>
            </Pressable>
          </View>
        ))}
      </View>

      <ActionConfirmationModal
        visible={loggedOutTablet !== null}
        onClose={() => { setLoggedOutTablet(null); }}
        icon="checkmark"
        title={t("staff.tabletLogoutConfirmTitle")}
        bodyPrefix={t("staff.tabletLogoutConfirmBodyPrefix", {
          label: loggedOutTablet?.label ?? "",
        })}
        bodyBold={t("staff.tabletLogoutConfirmBodyBold")}
        bodySuffix={t("staff.tabletLogoutConfirmBodySuffix")}
        refLabel={t("staff.tabletLogoutRefLabel")}
        refPrefix="LOGOUT"
        doneLabel={t("staff.tabletLogoutDone")}
      />
    </>
  );
}