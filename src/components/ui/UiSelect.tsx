import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet,View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type SelectOption = {
  label: string;
  value: string;
};

type UiSelectProps = {
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  style?: any;
  disabled?: boolean;
};

export function UiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  label,
  style,
  disabled = false,
}: UiSelectProps) {
  const [visible, setVisible] = useState(false);
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <>
      {label && (
        <UiText
          style={{
            fontFamily: "Inter_800ExtraBold",
            fontSize: 10,
            letterSpacing: 0.8,
            color: COLORS.ink2,
            marginBottom: 6,
            textTransform: "uppercase",
          }}
        >
          {label}
        </UiText>
      )}

      <Pressable
        onPress={() => !disabled && setVisible(true)}
        disabled={disabled}
        style={[
          {
            borderWidth: 1,
            borderColor: COLORS.hairline,
            borderRadius: RADIUS.sm,
            paddingHorizontal: SPACING.sm,
            paddingVertical: 12,
            backgroundColor: COLORS.whiteSecondary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: disabled ? 0.6 : 1,
          },
          style,
        ]}
      >
        <UiText
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 14,
            color: COLORS.portalInk,
          }}
        >
          {selectedLabel}
        </UiText>
        <Ionicons name="chevron-down" size={18} color={COLORS.ink3} />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "flex-end",
          }}
          onPress={() => setVisible(false)}
        >
          <Pressable
            style={{
              backgroundColor: COLORS.white,
              borderTopLeftRadius: RADIUS.lg,
              borderTopRightRadius: RADIUS.lg,
              maxHeight: "75%",
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Selected Item - Blue Header */}
            <View
              style={{
                backgroundColor: "#1E40AF",
                paddingVertical: 14,
                paddingHorizontal: SPACING.md,
              }}
            >
              <UiText
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 14,
                  color: COLORS.white,
                }}
              >
                {selectedLabel}
              </UiText>
            </View>

            {/* Options List */}
            <ScrollView
              style={{
                paddingHorizontal: 0,
              }}
              showsVerticalScrollIndicator={true}
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      onValueChange(option.value);
                      setVisible(false);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 14,
                      paddingHorizontal: SPACING.md,
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: COLORS.hairline,
                      backgroundColor: isSelected
                        ? `${COLORS.portalInk}10`
                        : COLORS.white,
                    }}
                  >
                    <UiText
                      style={{
                        fontFamily: isSelected
                          ? "Inter_700Bold"
                          : "Inter_600SemiBold",
                        fontSize: 14,
                        color: isSelected ? COLORS.portalInk : COLORS.ink3,
                      }}
                    >
                      {option.label}
                    </UiText>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={COLORS.portalInk}
                      />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={{ height: SPACING.md }} />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

