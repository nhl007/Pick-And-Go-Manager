import { View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";

type ControlSectionHeaderProps = {
  title: string;
  caption: string;
  isRtl: boolean;
  tightTop?: boolean;
};

export function ControlSectionHeader({
  title,
  caption,
  isRtl,
  tightTop,
}: ControlSectionHeaderProps) {
  return (
    <View
      style={[
        controlStyles.sectionHeadRow,
        tightTop && controlStyles.sectionHeadRowTight,
        isRtl && controlStyles.rowRtl,
      ]}
    >
      <UiText style={controlStyles.sectionTitle}>{title}</UiText>
      <UiText style={controlStyles.sectionCaption}>{caption}</UiText>
    </View>
  );
}
