import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

const DOUBLE_TAP_MS = 380;

type ControlSmartSosCardProps = {
  title: string;
  description: string;
  sosLabel: string;
  sosSub: string;
  onEmergencyActivate: () => void;
};

export function ControlSmartSosCard({
  title,
  description,
  sosLabel,
  sosSub,
  onEmergencyActivate,
}: ControlSmartSosCardProps) {
  const lastTapRef = useRef<number>(0);

  const handlePress = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      onEmergencyActivate();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  }, [onEmergencyActivate]);

  return (
    <>
      <View style={styles.smartHead}>
        <View style={[styles.smartIc, styles.sosIc]}>
          <Ionicons name="warning-outline" size={18} color={COLORS.white} />
        </View>
        <UiText style={styles.smartTitle}>{title}</UiText>
      </View>
      <UiText style={styles.sosDesc}>{description}</UiText>
      <Pressable
        accessibilityRole="button"
        accessibilityHint={sosSub}
        onPress={handlePress}
        style={({ pressed }) => [styles.sosButton, pressed && styles.sosButtonPressed]}
      >
        <View style={styles.sosRing} />
        <UiText style={styles.sosLabel}>{sosLabel}</UiText>
        <UiText style={styles.sosSub}>{sosSub}</UiText>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  sosPanel: {
    borderColor: COLORS.neonRed,
    borderWidth: 2,
    gap: SPACING.md,
  },
  smartHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  smartIc: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
  },
  sosIc: {
    backgroundColor: COLORS.neonRed,
    borderColor: COLORS.neonRed,
  },
  smartTitle: {
    flex: 1,
    fontFamily: "Inter_800ExtraBold",
    fontSize: 14,
    color: COLORS.portalInk,
  },
  sosDesc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
    lineHeight: 17,
  },
  sosButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.neonRed,
    gap: 6,
    marginTop: "auto",
    overflow: "hidden",
  },
  sosButtonPressed: {
    opacity: 0.92,
  },
  sosRing: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
  },
  sosLabel: {
    fontFamily: "Inter_900Black",
    fontSize: 13,
    letterSpacing: 1.2,
    color: COLORS.white,
    textAlign: "center",
  },
  sosSub: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
});
