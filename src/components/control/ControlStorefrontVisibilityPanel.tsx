import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { COLORS, SPACING } from "@/constants/styles";

export type StorefrontViz = "online" | "invisible" | "closed";

type VizDef = {
  key: StorefrontViz;
  ledColor: string;
  name: string;
  desc: string;
};

type ControlStorefrontVisibilityPanelProps = {
  value: StorefrontViz;
  onChange: (v: StorefrontViz) => void;
  /** When set, selecting a different option invokes this instead of applying immediately. */
  onChangeRequest?: (next: StorefrontViz) => void;
  panelTitle: string;
  items: VizDef[];
  footer: string;
};

export function ControlStorefrontVisibilityPanel({
  value,
  onChange,
  onChangeRequest,
  panelTitle,
  items,
  footer,
}: ControlStorefrontVisibilityPanelProps) {
  return (
    <>
      <UiText style={controlStyles.panelTitle}>{panelTitle}</UiText>
      <View style={styles.vizStates}>
        {items.map((item) => {
          const active = value === item.key;
          return (
            <Pressable
              key={item.key}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => {
                if (item.key === value) return;
                if (onChangeRequest) {
                  onChangeRequest(item.key);
                } else {
                  onChange(item.key);
                }
              }}
              style={[styles.vizState, active && styles.vizStateActive]}
            >
              <View style={[styles.vizLed, { backgroundColor: item.ledColor }]} />
              <View style={styles.vizBody}>
                <UiText style={styles.vizName}>{item.name}</UiText>
                <UiText style={styles.vizDesc}>{item.desc}</UiText>
              </View>
              {active ? (
                <View style={styles.vizCheck}>
                  <Ionicons name="checkmark" size={14} color={COLORS.portalInk} />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>
      <View style={styles.vizFooter}>
        <Ionicons name="information-circle-outline" size={14} color={COLORS.ink4} />
        <UiText style={styles.vizFooterText}>{footer}</UiText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  vizStates: {
    gap: SPACING.sm,
  },
  vizState: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingVertical: 12,
    paddingHorizontal: SPACING.sm,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  vizStateActive: {
    borderColor: COLORS.portalInk,
    backgroundColor: COLORS.white,
  },
  vizLed: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  vizBody: {
    flex: 1,
    gap: 2,
  },
  vizName: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  vizDesc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
    lineHeight: 15,
  },
  vizCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
  },
  vizFooter: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: "auto",
    paddingTop: SPACING.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.hairline,
  },
  vizFooterText: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    lineHeight: 16,
  },
});
