import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  clamp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

import { UiSpacer } from "./UiSpacer";

const TRACK_HEIGHT = 72;
const THUMB_SIZE = 64;

/** Max upward drag of the whole control (negative Y). */
const MAX_DRAG_UP = -80;
/** Unlock when released past this offset (more negative = further up). */
const UNLOCK_THRESHOLD = -40;

const SPRING = { damping: 18, stiffness: 220 };

type UiSlideUpUnlockProps = {
  onUnlock: () => void;
  style?: StyleProp<ViewStyle>;
};

export function UiSlideUpUnlock({ onUnlock, style }: UiSlideUpUnlockProps) {
  const translateY = useSharedValue(0);
  const startY = useSharedValue(0);

  const pan = Gesture.Pan()
    .activeOffsetY([-12, 12])
    .failOffsetX([-28, 28])
    .onBegin(() => {
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      const next = startY.value + e.translationY;
      translateY.value = clamp(next, MAX_DRAG_UP, 0);
    })
    .onEnd(() => {
      if (translateY.value <= UNLOCK_THRESHOLD) {
        runOnJS(onUnlock)();
      }
      translateY.value = withSpring(0, SPRING);
    });

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const thumbTop = (TRACK_HEIGHT - THUMB_SIZE) / 2;

  return (
    <GestureHandlerRootView style={[styles.root, style]}>
      <GestureDetector gesture={pan}>
        <View>
          <UiSpacer size={12} />

          <Animated.View style={[styles.trackWrap, slideStyle]} collapsable={false}>
            <View style={styles.track}>
              <UiText size="md" font="semiBold" color="textPrimary" style={styles.label}>
                Slide Up to Unlock Your City
              </UiText>
            </View>
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    overflow: "visible",
  },
  trackWrap: {
    height: TRACK_HEIGHT,
    width: "100%",
    overflow: "visible",
  },
  track: {
    height: TRACK_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.white,
    paddingLeft: SPACING.lg,
    paddingRight: THUMB_SIZE + SPACING.xs * 2,
    overflow: "hidden",
  },
  mapLocationIcon: {
    width: 20,
    height: 20,
    marginRight: SPACING.md,
  },
  label: {
    flex: 1,
  },
  thumb: {
    position: "absolute",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbIcon: {
    width: 24,
    height: 24,
  },
  slideUpIcon: {
    width: 16,
    height: 24,
    marginHorizontal: "auto",
  },
});
