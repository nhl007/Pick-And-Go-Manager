import { View } from "react-native";

import { SPACING } from "@/constants/styles";

type Props = {
  size?: keyof typeof SPACING | number;
};

export const UiSpacer = ({ size = "md" }: Props) => {
  return <View style={{ height: typeof size === "number" ? size : SPACING[size] }} />;
};
