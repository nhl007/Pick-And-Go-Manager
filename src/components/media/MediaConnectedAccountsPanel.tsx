import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Switch, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";
import { COLORS } from "@/constants/styles";

type SocialRow = {
  key: string;
  icon: "logo-instagram" | "logo-tiktok" | "logo-snapchat" | "logo-twitter";
  name: string;
  desc: string;
  connectLabel: string;
  onConnect: () => void;
};

type SyncRow = {
  key: string;
  title: string;
  sub: string;
  value: boolean;
  onChange: (v: boolean) => void;
};

type MediaConnectedAccountsPanelProps = {
  isRtl: boolean;
  title: string;
  socialRows: SocialRow[];
  syncSectionTitle: string;
  syncRows: SyncRow[];
};

export function MediaConnectedAccountsPanel({
  isRtl,
  title,
  socialRows,
  syncSectionTitle,
  syncRows,
}: MediaConnectedAccountsPanelProps) {
  return (
    <>
      <UiText style={controlStyles.panelTitle}>{title}</UiText>
      {socialRows.map((row) => (
        <View
          key={row.key}
          style={[mediaStyles.socialRow, isRtl && controlStyles.rowRtl]}
        >
          <View style={mediaStyles.socialIc}>
            <Ionicons name={row.icon} size={20} color={COLORS.portalInk} />
          </View>
          <View style={mediaStyles.socialBody}>
            <UiText style={mediaStyles.socialNm}>{row.name}</UiText>
            <UiText style={mediaStyles.socialDs}>{row.desc}</UiText>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={row.onConnect}
            style={mediaStyles.connectBtn}
          >
            <UiText style={mediaStyles.connectBtnText}>{row.connectLabel}</UiText>
          </Pressable>
        </View>
      ))}
      <UiText style={mediaStyles.syncTitle}>{syncSectionTitle}</UiText>
      {syncRows.map((row) => (
        <View
          key={row.key}
          style={[mediaStyles.syncRow, isRtl && mediaStyles.syncRowRtl]}
        >
          <View style={{ flex: 1, minWidth: 0 }}>
            <UiText style={mediaStyles.syncT}>{row.title}</UiText>
            <UiText style={mediaStyles.syncS}>{row.sub}</UiText>
          </View>
          <Switch
            value={row.value}
            onValueChange={row.onChange}
            trackColor={{ false: COLORS.chartMist, true: COLORS.secondary }}
            thumbColor={COLORS.white}
          />
        </View>
      ))}
    </>
  );
}
