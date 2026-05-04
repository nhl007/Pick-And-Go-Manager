import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

import { actionConfirmationModalStyles as s } from "@/components/staff/ActionConfirmationModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

export type ActionConfirmationModalProps = {
  visible: boolean;
  onClose: () => void;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  bodyPrefix?: string;
  bodyBold?: string;
  bodySuffix?: string;
  refLabel: string;
  refPrefix: string;
  doneLabel: string;
};

export function ActionConfirmationModal({
  visible,
  onClose,
  icon = "checkmark",
  title,
  bodyPrefix,
  bodyBold,
  bodySuffix,
  refLabel,
  refPrefix,
  doneLabel,
}: ActionConfirmationModalProps) {
  const ref = useMemo(() => {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `#${refPrefix}-${num}`;
  }, [refPrefix, visible]);

  return (
    <StaffBaseModal
      visible={visible}
      onClose={onClose}
      showCloseIcon={false}
      scrollableBody={false}
      maxWidth={520}
      maxHeight={350}
      bodyContentContainerStyle={s.body}
    >
      <View style={s.iconWrap}>
        <Ionicons name={icon} size={28} color={COLORS.portalInk} />
      </View>
      <UiText style={s.title}>{title}</UiText>
      <Text style={s.bodyTxt}>
        {bodyPrefix ?? ""}
        {bodyBold ? <Text style={s.bodyBold}>{bodyBold}</Text> : null}
        {bodySuffix ?? ""}
      </Text>
      <View style={s.refBox}>
        <UiText style={s.refLbl}>{refLabel}</UiText>
        <UiText style={s.refVal}>{ref}</UiText>
      </View>
      <Pressable style={s.doneBtn} onPress={onClose}>
        <UiText style={s.doneBtnTxt}>{doneLabel}</UiText>
      </Pressable>
    </StaffBaseModal>
  );
}
