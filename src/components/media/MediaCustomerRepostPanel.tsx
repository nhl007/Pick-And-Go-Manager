import { Pressable, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";

import { UiButton } from "../ui/UiButton";

type Tile = { key: string; handle: string; onApprove: () => void; onSkip: () => void };

type MediaCustomerRepostPanelProps = {
  isRtl: boolean;
  title: string;
  badgeLabel: string;
  desc: string;
  tiles: Tile[];
  foot: string;
  reviewAllLabel: string;
  onReviewAll: () => void;
};

export function MediaCustomerRepostPanel({
  isRtl,
  title,
  badgeLabel,
  desc,
  tiles,
  foot,
  reviewAllLabel,
  onReviewAll,
}: MediaCustomerRepostPanelProps) {
  return (
    <>
      <View style={[mediaStyles.flexBetween, isRtl && mediaStyles.flexBetweenRtl]}>
        <UiText style={mediaStyles.panelTitleInline}>{title}</UiText>
        <View style={mediaStyles.badgeAmber}>
          <UiText style={mediaStyles.badgeAmberText}>{badgeLabel}</UiText>
        </View>
      </View>
      <UiText style={mediaStyles.crDesc}>{desc}</UiText>
      <View style={mediaStyles.crGrid}>
        {tiles.map((t) => (
          <View key={t.key} style={mediaStyles.crTile}>
            <UiText style={mediaStyles.crHandle}>{t.handle}</UiText>
            <View style={[mediaStyles.crBadges, isRtl && controlStyles.rowRtl]}>
              <Pressable accessibilityRole="button" accessibilityLabel="Approve" />
              <UiButton
                width={32}
                height={32}
                radius={999}
                variant="outline"
                onPress={t.onApprove}
                backgroundColor="black"
              >
                <UiText color="white" size="xs" font="semiBold">
                  Ok
                </UiText>
              </UiButton>
              <UiButton
                width={32}
                height={32}
                radius={999}
                variant="outline"
                onPress={t.onSkip}
              >
                <UiText size="xs" font="semiBold">
                  No
                </UiText>
              </UiButton>
            </View>
          </View>
        ))}
      </View>
      <View style={[mediaStyles.crFoot, isRtl && controlStyles.rowRtl]}>
        <UiText style={mediaStyles.crFootText}>{foot}</UiText>
        <Pressable
          accessibilityRole="button"
          onPress={onReviewAll}
          style={mediaStyles.ghostSmBtn}
        >
          <UiText style={mediaStyles.ghostSmBtnText}>{reviewAllLabel}</UiText>
        </Pressable>
      </View>
    </>
  );
}
