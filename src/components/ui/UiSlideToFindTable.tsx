import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  LayoutChangeEvent,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  clamp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { UiText } from "@/components/ui/UiText";
import { COLORS, FONT_SIZE, SPACING } from "@/constants/styles";

const SLIDE_PILL_HEIGHT = 64;
const SPRING = { damping: 18, stiffness: 240 };

const TRACK_SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 24,
  elevation: 4,
};

export type UiSlideToFindTableProps = {
  label: string;
  enabled: boolean;
  onUnlock: () => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * “Find A Table” pill: the whole label + “Slide >>>” cluster pans horizontally; release past threshold fires onUnlock.
 */
export function UiSlideToFindTable({
  label,
  enabled,
  onUnlock,
  style,
}: UiSlideToFindTableProps) {
  const trackWidth = useSharedValue(0);
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const maxDrag = useSharedValue(0);

  const onLayoutTrack = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    trackWidth.value = w;
    maxDrag.value = Math.max(0, w * 0.42);
  };

  const pan = Gesture.Pan()
    .enabled(enabled)
    .activeOffsetX(8)
    .failOffsetY([-24, 24])
    .onBegin(() => {
      startX.value = translateX.value;
      if (maxDrag.value <= 0 && trackWidth.value > 0) {
        maxDrag.value = Math.max(0, trackWidth.value * 0.42);
      }
    })
    .onUpdate((e) => {
      const next = startX.value + e.translationX;
      translateX.value = clamp(next, 0, maxDrag.value);
    })
    .onEnd(() => {
      const threshold = maxDrag.value * 0.72;
      if (maxDrag.value > 0 && translateX.value >= threshold) {
        runOnJS(onUnlock)();
      }
      translateX.value = withSpring(0, SPRING);
    });

  const slideContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <View style={[styles.track, style]} onLayout={onLayoutTrack}>
        <Animated.View style={[styles.slideableInner, slideContentStyle]}>
          <UiText font="medium" style={styles.labelLeft}>
            {label}
          </UiText>
          <View style={styles.rightCluster}>
            <UiText font="regular" style={styles.hint}>
              Slide
            </UiText>
            <View style={styles.chevronRow}>
              <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.55)" />
              <Ionicons
                name="chevron-forward"
                size={14}
                color="rgba(255,255,255,0.38)"
                style={styles.chevronTight}
              />
              <Ionicons
                name="chevron-forward"
                size={14}
                color="rgba(255,255,255,0.22)"
                style={styles.chevronTight}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  track: {
    height: SLIDE_PILL_HEIGHT,
    borderRadius: 36,
    backgroundColor: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.white,
    overflow: "hidden",
    ...TRACK_SHADOW,
  },
  slideableInner: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
  },
  labelLeft: {
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
  },
  rightCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hint: {
    color: COLORS.white,
    fontSize: 12,
  },
  chevronRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  chevronTight: {
    marginLeft: -6,
  },
});
