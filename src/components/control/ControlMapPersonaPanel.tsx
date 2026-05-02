import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";
import Svg, { Circle, Ellipse, Path, Text as SvgText } from "react-native-svg";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

type ControlMapPersonaPanelProps = {
  panelTitle: string;
  personaName: string;
  personaSub: string;
  dropLabel: string;
  dropSub: string;
  footer: string;
  letter?: string;
  onPickPhoto: () => void;
};

export function ControlMapPersonaPanel({
  panelTitle,
  personaName,
  personaSub,
  dropLabel,
  dropSub,
  footer,
  letter = "S",
  onPickPhoto,
}: ControlMapPersonaPanelProps) {
  return (
    <>
      <UiText style={controlStyles.panelTitle}>{panelTitle}</UiText>

      <View style={styles.personaCurrent}>
        <Svg width={52} height={60} viewBox="0 0 120 140">
          <Ellipse cx={60} cy={134} rx={18} ry={4} fill="rgba(0,0,0,0.18)" />
          <Path
            d="M60 10 C35 10 18 28 18 54 C18 86 60 126 60 126 C60 126 102 86 102 54 C102 28 85 10 60 10 Z"
            fill={COLORS.portalInk}
          />
          <Circle cx={60} cy={52} r={24} fill={COLORS.white} />
          <SvgText
            x={60}
            y={63}
            textAnchor="middle"
            fill={COLORS.portalInk}
            fontSize={30}
            fontWeight="900"
            fontFamily="Inter_900Black"
          >
            {letter}
          </SvgText>
        </Svg>
        <View style={styles.personaMeta}>
          <UiText style={styles.personaName}>{personaName}</UiText>
          <UiText style={styles.personaSub}>{personaSub}</UiText>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onPickPhoto}
        style={styles.personaUpload}
      >
        <Ionicons name="image-outline" size={22} color={COLORS.ink3} />
        <UiText style={styles.personaUpLbl}>{dropLabel}</UiText>
        <UiText style={styles.personaUpSub}>{dropSub}</UiText>
      </Pressable>

      <View style={styles.personaFooter}>
        <Ionicons name="create-outline" size={14} color={COLORS.ink4} />
        <UiText style={styles.personaFooterText}>{footer}</UiText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  personaCurrent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  personaMeta: {
    flex: 1,
    gap: 4,
  },
  personaName: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 15,
    color: COLORS.portalInk,
  },
  personaSub: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  personaUpload: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
    gap: 6,
    marginBottom: SPACING.md,
  },
  personaUpLbl: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  personaUpSub: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
    textAlign: "center",
  },
  personaFooter: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingTop: SPACING.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.hairline,
    marginTop: "auto",
  },
  personaFooterText: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    lineHeight: 16,
  },
});
