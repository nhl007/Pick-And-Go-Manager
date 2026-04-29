import React, { useCallback, useRef } from "react";
import {
  I18nManager,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

import { COLORS, FONT_FAMILIES, FONT_SIZE, RADIUS, SPACING } from "@/constants/styles";

const LENGTH = 6;

type AuthOtpDigitRowProps = {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
};

export function AuthOtpDigitRow({ value, onChange, disabled }: AuthOtpDigitRowProps) {
  const refs = useRef<(TextInput | null)[]>([]);

  const digits = Array.from({ length: LENGTH }, (_, index) => value[index] ?? "");

  const focusIndex = useCallback((index: number) => {
    const input = refs.current[index];
    if (input) {
      input.focus();
    }
  }, []);

  const handleChange = useCallback(
    (index: number, char: string) => {
      const digit = char.replace(/[^0-9]/g, "").slice(0, 1);
      const chars = Array.from({ length: LENGTH }, (_, i) => value[i] ?? "");
      chars[index] = digit;
      onChange(chars.join("").slice(0, LENGTH));
      if (digit && index < LENGTH - 1) {
        focusIndex(index + 1);
      }
    },
    [focusIndex, onChange, value],
  );

  const handleKeyPress = useCallback(
    (index: number, event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (event.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
        focusIndex(index - 1);
      }
    },
    [digits, focusIndex],
  );

  return (
    <View style={[styles.row, I18nManager.isRTL && styles.rowRtl]}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          style={styles.cell}
          value={digit}
          onChangeText={(text) => {
            handleChange(index, text);
          }}
          onKeyPress={(e) => {
            handleKeyPress(index, e);
          }}
          keyboardType="number-pad"
          maxLength={1}
          editable={!disabled}
          selectTextOnFocus
          textAlign="center"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.sm,
    marginVertical: SPACING.md,
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  cell: {
    flex: 1,
    minWidth: 0,
    height: 52,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.whiteSecondary,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
});
