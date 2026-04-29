import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { ColorValue } from "react-native";

import { UiText, UiTextProps } from "./UiText";

type UiGradientTextProps = UiTextProps & {
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};

export const UiGradientText = ({
  children,
  style,
  colors = ["#000000", "rgba(0,0,0,0.5)"],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  ...props
}: UiGradientTextProps) => {
  return (
    <MaskedView
      style={{ flexDirection: "row" }}
      maskElement={
        <UiText style={style} {...props}>
          {children}
        </UiText>
      }
    >
      <LinearGradient colors={colors} start={start} end={end}>
        <UiText style={{ opacity: 0 }} {...props}>
          {children}
        </UiText>
      </LinearGradient>
    </MaskedView>
  );
};
