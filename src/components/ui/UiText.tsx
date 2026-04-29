import { StyleSheet, Text, TextProps } from "react-native";

import { COLORS, FONT_FAMILIES, FONT_SIZE } from "@/constants/styles";

export type UiTextProps = TextProps & {
  size?: keyof typeof FONT_SIZE | number;
  font?: keyof typeof FONT_FAMILIES;
  color?: keyof typeof COLORS;
  align?: "left" | "center" | "right";
};

export const UiText = ({
  size = "md",
  font = "regular",
  color = "textPrimary",
  align = "left",
  style,
  ...props
}: UiTextProps) => {
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: typeof size === "number" ? size : FONT_SIZE[size],
          fontFamily: FONT_FAMILIES[font],
          color: COLORS[color],
          textAlign: align,
        },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {},
});
