import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { COLORS, FONT_FAMILIES, FONT_SIZE, RADIUS, SPACING } from "@/constants/styles";

export type UiInputProps = TextInputProps & {
  height?: number;
  width?: number;
  containerStyle?: StyleProp<ViewStyle>;
  logo?: React.ReactNode;
};

export function UiInput({
  height = 40,
  width,
  containerStyle,
  logo,
  placeholder,
  style,
  ...textInputProps
}: UiInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { borderColor: isFocused ? COLORS.black : COLORS.border },
      ]}
    >
      {logo && <View style={styles.logoContainer}>{logo}</View>}
      <TextInput
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        placeholderTextColor={COLORS.textPrimary}
        {...textInputProps}
        style={[
          styles.input,
          style,
          {
            height,
            width,
          },
          logo ? { paddingLeft: SPACING.xl } : { paddingLeft: SPACING.sm },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: COLORS.whiteSecondary,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  logoContainer: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: "-50%" }],
  },
  input: {
    flex: 1,
    alignSelf: "stretch",
    minHeight: 0,
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZE.base,
  },
});
export default UiInput;
