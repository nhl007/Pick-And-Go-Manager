import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { COLORS } from "@/constants/styles";

import { UiText, UiTextProps } from "./UiText";

type UICheckBoxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  labelProps?: UiTextProps;
  checkboxStyle?: StyleProp<ViewStyle>;
  checkboxActiveStyle?: StyleProp<ViewStyle>;
};

const UICheckBox = ({
  checked,
  onChange,
  label,
  labelProps,
  checkboxStyle,
  checkboxActiveStyle,
}: UICheckBoxProps) => {
  return (
    <Pressable
      onPress={() => {
        onChange(!checked);
      }}
      style={[styles.checkboxWrap, checkboxStyle]}
      hitSlop={8}
    >
      <View
        style={[styles.checkbox, checked && styles.checkboxActive, checkboxActiveStyle]}
      >
        {checked ? (
          <UiText size="xs" font="bold" color="white">
            ✓
          </UiText>
        ) : null}
      </View>
      <UiText size="sm" font="regular" align="left" {...labelProps}>
        {label}
      </UiText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  checkboxActive: {
    backgroundColor: COLORS.black,
  },
});

export default UICheckBox;
