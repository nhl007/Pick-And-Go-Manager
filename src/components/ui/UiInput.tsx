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
  containerStyle?: StyleProp<ViewStyle>;
  logo?: React.ReactNode;
};

export function UiInput({
  containerStyle,
  logo,
  placeholder,
  style,
  ...textInputProps
}: UiInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {logo && <View style={styles.logoContainer}>{logo}</View>}
      <TextInput
        placeholderTextColor={COLORS.textPrimary}
        {...textInputProps}
        style={[
          styles.input,
          style,
          logo ? { paddingLeft: SPACING.xl } : { paddingLeft: SPACING.sm },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.whiteSecondary,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  logoContainer: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  input: {
    flex: 1,
    alignSelf: "stretch",
    minHeight: 0,
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZE.base,
    paddingVertical: SPACING.sm,
  },
});
export default UiInput;
