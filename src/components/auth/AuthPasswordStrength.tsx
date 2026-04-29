import React from "react";
import { StyleSheet, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";
import { evaluatePasswordStrength, type PasswordRuleKey } from "@/lib/passwordStrength";

const RULE_COLUMNS: [PasswordRuleKey, PasswordRuleKey][] = [
  ["length", "number"],
  ["upper", "symbol"],
];

type AuthPasswordStrengthProps = {
  password: string;
  strengthLabel: string;
  ruleLabels: Record<PasswordRuleKey, string>;
};

export function AuthPasswordStrength({
  password,
  strengthLabel,
  ruleLabels,
}: AuthPasswordStrengthProps) {
  const state = evaluatePasswordStrength(password);
  const label = strengthLabel;

  return (
    <View style={styles.block}>
      <View style={styles.bars}>
        {[1, 2, 3, 4].map((level) => (
          <View
            key={level}
            style={[
              styles.bar,
              level <= state.score ? styles.barFilled : styles.barEmpty,
            ]}
          />
        ))}
      </View>
      <UiText size="xs" font="medium" color="textSecondary" style={styles.strengthText}>
        {label}
      </UiText>

      <View style={styles.rules}>
        <View style={styles.rulesGrid}>
          {RULE_COLUMNS.map((columnKeys, columnIndex) => (
            <View key={columnIndex} style={styles.rulesColumn}>
              {columnKeys.map((key) => {
                const ok = state.rules[key];
                return (
                  <View key={key} style={styles.ruleCell}>
                    <UiText
                      size="xs"
                      font="bold"
                      color={ok ? "secondary" : "textSecondary"}
                      style={styles.tick}
                    >
                      ✓
                    </UiText>
                    <UiText
                      size="xs"
                      font="regular"
                      color={ok ? "textPrimary" : "textSecondary"}
                      style={styles.ruleText}
                      numberOfLines={2}
                    >
                      {ruleLabels[key]}
                    </UiText>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: SPACING.sm,
    gap: SPACING.sm,
  },
  bars: {
    flexDirection: "row",
    gap: SPACING.xs,
  },
  bar: {
    flex: 1,
    height: 4,
    borderRadius: RADIUS.xs,
  },
  barFilled: {
    backgroundColor: COLORS.secondary,
  },
  barEmpty: {
    backgroundColor: COLORS.border,
  },
  strengthText: {
    marginTop: SPACING.xs,
  },
  rules: {
    width: "100%",
    marginTop: SPACING.sm,
  },
  rulesGrid: {
    flexDirection: "row",
    width: "100%",
    gap: SPACING.md,
    alignItems: "stretch",
  },
  rulesColumn: {
    flex: 1,
    minWidth: 0,
    gap: SPACING.sm,
  },
  ruleCell: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.xs,
    width: "100%",
  },
  tick: {
    lineHeight: 16,
    marginTop: 1,
  },
  ruleText: {
    flex: 1,
    minWidth: 0,
  },
});
