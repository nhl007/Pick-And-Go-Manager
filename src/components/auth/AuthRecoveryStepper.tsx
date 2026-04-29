import React from "react";
import { StyleSheet, View } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/constants/styles";

type AuthRecoveryStepperProps = {
  /** 1–4, matching prototype stages */
  activeStep: number;
};

export function AuthRecoveryStepper({ activeStep }: AuthRecoveryStepperProps) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4].map((step) => (
        <View
          key={step}
          style={[styles.dot, step === activeStep ? styles.dotActive : styles.dotInactive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  dot: {
    height: 6,
    borderRadius: RADIUS.full,
  },
  dotActive: {
    flex: 1,
    maxWidth: 48,
    backgroundColor: COLORS.gray,
  },
  dotInactive: {
    width: 6,
    backgroundColor: COLORS.border,
  },
});
