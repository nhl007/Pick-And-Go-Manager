import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { COLORS, FONT_FAMILIES } from "@/constants/styles";

const WATERMARK_MIN = 140;
const WATERMARK_MAX = 420;
const VIEWPORT_WIDTH_FRACTION = 0.25;
const LINE_HEIGHT_FACTOR = 0.85;
const LETTER_SPACING_EM = -0.04;

export default function AppBackground() {
  const { width } = useWindowDimensions();
  const fontSize = Math.min(
    WATERMARK_MAX,
    Math.max(WATERMARK_MIN, width * VIEWPORT_WIDTH_FRACTION),
  );

  return (
    <View style={styles.layer} pointerEvents="none">
      <Text
        allowFontScaling={false}
        selectable={false}
        style={[
          styles.mark,
          {
            fontSize,
            lineHeight: fontSize * LINE_HEIGHT_FACTOR,
            letterSpacing: fontSize * LETTER_SPACING_EM,
          },
        ]}
      >
        {"PICK\n&GO"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  mark: {
    color: COLORS.inkWatermark,
    fontFamily: FONT_FAMILIES.black,
    textAlign: "center",
  },
});
