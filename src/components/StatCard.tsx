import React, { useState } from "react";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";

import { UiSpacer } from "@/components/ui/UiSpacer";
import { UiText } from "@/components/ui/UiText";
import { COLORS, SPACING } from "@/constants/styles";

import { UICard } from "./ui/UICard";

export type StatCardProps = {
  title: string;
  topRight?: string;
  topRightColor?: keyof typeof COLORS;
  value: string;
  valueColor: keyof typeof COLORS;
  footer?: string;
  footerColor?: keyof typeof COLORS;
  footerFont?: "regular" | "medium" | "semiBold";
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  onPress?: () => void;
};

export function StatCard({
  title,
  topRight,
  topRightColor = "textSecondary",
  value,
  valueColor,
  footer,
  footerColor = "textSecondary",
  footerFont = "regular",
  style,
  selected = false,
  onPress,
}: StatCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <UICard
      style={{
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.xl,
      }}
    >
      <Pressable
        accessibilityRole={onPress ? "button" : undefined}
        onPress={onPress}
        onHoverIn={() => {
          setHovered(true);
        }}
        onHoverOut={() => {
          setHovered(false);
        }}
        style={({ pressed }) => {
          // const active = selected || hovered || pressed;
          // return [styles.card, active && styles.cardActive, style];
          return [styles.card, style];
        }}
      >
        {(state) => {
          const active = selected || hovered || state.pressed;

          const titleColor = active ? "white" : "black";
          const metaColor = active ? "white" : topRightColor;
          const footerResolved = active ? "white" : footerColor;
          const valueResolved =
            active && valueColor === "textPrimary" ? "white" : valueColor;

          return (
            <View>
              <View style={styles.topRow}>
                <UiText size="md" font="semiBold" color={titleColor} align="left">
                  {title}
                </UiText>
                {topRight != null && topRight !== "" ? (
                  <UiText size="xs" font="semiBold" color={metaColor} align="right">
                    {topRight}
                  </UiText>
                ) : null}
              </View>
              <UiSpacer size="sm" />
              <View style={styles.valueContainer}>
                <UiText size="xxxxl" font="bold" color={valueResolved} align="left">
                  {value}
                </UiText>
                {footer != null && footer !== "" ? (
                  <View style={styles.footer}>
                    <UiText
                      size="xs"
                      font={footerFont}
                      color={footerResolved}
                      align="right"
                    >
                      {footer}
                    </UiText>
                  </View>
                ) : null}
              </View>
            </View>
          );
        }}
      </Pressable>
    </UICard>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: COLORS.white,
    // borderRadius: RADIUS.xl,
    // borderWidth: 1,
    // borderColor: COLORS.border,
    // paddingHorizontal: SPACING.lg,
    // paddingVertical: 18,
    // shadowColor: COLORS.black,
    // shadowOpacity: 0.06,
    // shadowRadius: 16,
    // shadowOffset: { width: 0, height: 6 },
  },
  cardActive: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
    shadowOpacity: 0.12,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  footer: {
    marginTop: SPACING.sm,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
