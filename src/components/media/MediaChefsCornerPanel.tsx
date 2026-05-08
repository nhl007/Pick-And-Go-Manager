import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, TextInput, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";
import { COLORS } from "@/constants/styles";

const MSG_MAX = 220;

type MediaChefsCornerPanelProps = {
  isRtl: boolean;
  title: string;
  badgeLabel: string;
  chefName: string;
  chefSub: string;
  recordLabel: string;
  uploadLabel: string;
  onRecord: () => void;
  onUpload: () => void;
  message: string;
  onMessageChange: (v: string) => void;
  saveLabel: string;
  clearLabel: string;
  onSave: () => void;
  onClear: () => void;
};

export function MediaChefsCornerPanel({
  isRtl,
  title,
  badgeLabel,
  chefName,
  chefSub,
  recordLabel,
  uploadLabel,
  onRecord,
  onUpload,
  message,
  onMessageChange,
  saveLabel,
  clearLabel,
  onSave,
  onClear,
}: MediaChefsCornerPanelProps) {
  return (
    <>
      <View style={[mediaStyles.flexBetween, isRtl && mediaStyles.flexBetweenRtl]}>
        <UiText style={mediaStyles.panelTitleInline}>{title}</UiText>
        <View style={mediaStyles.badgeOk}>
          <View style={mediaStyles.liveDot} />
          <UiText style={mediaStyles.badgeOkText}>{badgeLabel}</UiText>
        </View>
      </View>
      <View style={[mediaStyles.chefRow, isRtl && controlStyles.rowRtl]}>
        <View style={mediaStyles.chefAvatar}>
          <Ionicons name="person-outline" size={22} color={COLORS.ink3} />
        </View>
        <View style={mediaStyles.chefBody}>
          <UiText style={mediaStyles.chefNm}>{chefName}</UiText>
          <UiText style={mediaStyles.chefS}>{chefSub}</UiText>
        </View>
        <View style={[mediaStyles.chefCapture, isRtl && controlStyles.rowRtl]}>
          <Pressable
            accessibilityRole="button"
            onPress={onRecord}
            style={mediaStyles.chefCam}
          >
            <Ionicons name="videocam-outline" size={14} color={COLORS.white} />
            <UiText style={mediaStyles.chefCamText}>{recordLabel}</UiText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={onUpload}
            style={mediaStyles.chefUp}
          >
            <Ionicons name="cloud-upload-outline" size={14} color={COLORS.portalInk} />
            <UiText style={mediaStyles.chefUpText}>{uploadLabel}</UiText>
          </Pressable>
        </View>
      </View>
      <TextInput
        value={message}
        onChangeText={(t) => { onMessageChange(t.slice(0, MSG_MAX)); }}
        multiline
        maxLength={MSG_MAX}
        style={mediaStyles.chefMsg}
        placeholderTextColor={COLORS.ink4}
      />
      <View style={[mediaStyles.mhActions, isRtl && controlStyles.rowRtl]}>
        <Pressable
          accessibilityRole="button"
          onPress={onSave}
          style={mediaStyles.ghostSmBtn}
        >
          <UiText style={mediaStyles.ghostSmBtnText}>{saveLabel}</UiText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onClear}
          style={mediaStyles.ghostSmBtn}
        >
          <UiText style={mediaStyles.ghostSmBtnText}>{clearLabel}</UiText>
        </Pressable>
      </View>
    </>
  );
}
