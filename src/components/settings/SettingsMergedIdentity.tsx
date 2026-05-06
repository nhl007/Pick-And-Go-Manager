import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import { Image, Pressable, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { settingsStyles } from "@/constants/settings.styles";
import { COLORS } from "@/constants/styles";

type Props = {
  t: TFunction;
  isRtl: boolean;
  onChangePhoto: () => void;
  onView: () => void;
  onDownload: () => void;
  onShare: () => void;
};

export function SettingsMergedIdentity({
  t,
  isRtl,
  onChangePhoto,
  onView,
  onDownload,
  onShare,
}: Props) {
  const metaCols: { labelKey: string; valKey: string; live?: boolean }[] = [
    { labelKey: "metaColEmployeeId", valKey: "metaValEmployeeId" },
    { labelKey: "metaColBranch", valKey: "metaValBranch" },
    { labelKey: "metaColMemberSince", valKey: "metaValMemberSince" },
    { labelKey: "metaColLastLogin", valKey: "metaValLastLogin", live: true },
    { labelKey: "metaColAccess", valKey: "metaValAccess" },
  ];

  return (
    <View style={settingsStyles.mergedCard}>
      <View style={[settingsStyles.mergedMain, isRtl && settingsStyles.rowRtl]}>
        <View style={[settingsStyles.mergedLeft, isRtl && settingsStyles.rowRtl]}>
          <View style={settingsStyles.mergedAvatarCol}>
            <View style={settingsStyles.mergedAvRing}>
              {/* <UiText style={settingsStyles.mergedAvPhoto}>JM</UiText> */}
              <Image
                source={require("@/assets/images/user.png")}
                resizeMode="cover"
                style={settingsStyles.mergedAvPhoto}
              />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("settings.changePhotoTitle")}
              onPress={onChangePhoto}
              style={settingsStyles.mergedAvEdit}
            >
              <Ionicons name="camera-outline" size={14} color={COLORS.white} />
            </Pressable>
          </View>
          <View style={settingsStyles.mergedBody}>
            <UiText style={settingsStyles.mergedName}>{t("settings.mergedName")}</UiText>
            <UiText style={settingsStyles.mergedTitle}>
              {t("settings.mergedTitle")}
            </UiText>
            <View style={[settingsStyles.pillRow, isRtl && settingsStyles.rowRtl]}>
              <View style={[settingsStyles.pill, settingsStyles.pillGold]}>
                <Ionicons name="star" size={9} color={COLORS.neonYellow} />
                <UiText style={settingsStyles.pillText}>{t("settings.pillGold")}</UiText>
              </View>
              <View style={settingsStyles.pill}>
                <UiText style={settingsStyles.pillText}>{t("settings.pillId")}</UiText>
              </View>
              <View style={settingsStyles.pill}>
                <UiText style={settingsStyles.pillText}>{t("settings.pillKyc")}</UiText>
              </View>
              <View style={[settingsStyles.pill, settingsStyles.pillGreen]}>
                <UiText style={settingsStyles.pillText}>{t("settings.pill2fa")}</UiText>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={settingsStyles.qrWrap}>
         
        </View> */}
        <Image
          source={require("@/assets/images/qr.png")}
          resizeMode="stretch"
          style={settingsStyles.qrImage}
        />

        <View style={[settingsStyles.mergedActions, isRtl && settingsStyles.rowRtl]}>
          <Pressable
            accessibilityRole="button"
            onPress={onView}
            style={({ pressed }) => [
              settingsStyles.darkAct,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Ionicons name="eye-outline" size={14} color={COLORS.white} />
            <UiText style={settingsStyles.darkActText}>{t("settings.actionView")}</UiText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={onDownload}
            style={({ pressed }) => [
              settingsStyles.darkAct,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Ionicons name="download-outline" size={14} color={COLORS.white} />
            <UiText style={settingsStyles.darkActText}>
              {t("settings.actionDownload")}
            </UiText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={onShare}
            style={({ pressed }) => [
              settingsStyles.darkAct,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Ionicons name="share-social-outline" size={14} color={COLORS.white} />
            <UiText style={settingsStyles.darkActText}>
              {t("settings.actionShare")}
            </UiText>
          </Pressable>
        </View>
      </View>

      <View style={[settingsStyles.mergedMetaBar, isRtl && settingsStyles.rowRtl]}>
        {metaCols.map((col) => (
          <View key={col.valKey} style={settingsStyles.metaCol}>
            <UiText style={settingsStyles.metaColLabel}>
              {t(`settings.${col.labelKey}`)}
            </UiText>
            <UiText
              style={[
                settingsStyles.metaColValue,
                col.live ? settingsStyles.metaColLive : null,
              ]}
            >
              {t(`settings.${col.valKey}`)}
            </UiText>
          </View>
        ))}
      </View>
    </View>
  );
}
