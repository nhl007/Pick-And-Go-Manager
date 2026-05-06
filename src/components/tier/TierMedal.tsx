import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, { Keyframe } from "react-native-reanimated";

import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

import { type Tier, TIER_THEMES } from "./tier.types";

type TierMedalProps = {
  tier: Tier;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const MEDAL_NUMBER: Record<Tier, string> = {
  bronze: "3",
  silver: "2",
  gold: "1",
  diamond: "",
};

const MEDAL_EMOJI: Record<Tier, string> = {
  bronze: "🥉",
  silver: "🥈",
  gold: "🥇",
  diamond: "💎",
};

const medalBounceKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1 }],
  },
  50: {
    transform: [{ scale: 1.1 }],
  },
  100: {
    transform: [{ scale: 1 }],
  },
});

export function TierMedal({ tier, size = 88, style }: TierMedalProps) {
  const theme = TIER_THEMES[tier];
  const emoji = MEDAL_EMOJI[tier];

  if (tier === "diamond") {
    return (
      <Animated.View
        entering={medalBounceKeyframe.duration(2000).delay(300)}
        style={[styles.wrap, { width: size, height: size }, style]}
      >
        <View style={[styles.emojiContainer, { width: size * 1.2, height: size * 1.2 }]}>
          <Text style={[styles.emoji, { fontSize: size * 0.75 }]}>{emoji}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="diamond" size={size * 0.86} color={theme.medalColor} />
        </View>
      </Animated.View>
    );
  }

  const ribbonW = size * 0.6;
  const ribbonH = size * 0.46;
  const discSize = size * 0.66;

  return (
    <Animated.View
      entering={medalBounceKeyframe.duration(2000).delay(300)}
      style={[styles.wrap, { width: size, height: size }, style]}
    >
      <View style={[styles.emojiContainer, { width: size * 1.2, height: size * 1.2 }]}>
        <Text style={[styles.emoji, { fontSize: size * 0.5 }]}>{emoji}</Text>
      </View>
      <View
        style={[
          styles.ribbon,
          {
            width: ribbonW,
            height: ribbonH,
            backgroundColor: theme.medalRibbon,
            top: 0,
          },
        ]}
      />
      <View
        style={[
          styles.disc,
          {
            width: discSize,
            height: discSize,
            borderRadius: discSize / 2,
            backgroundColor: theme.medalColor,
            bottom: 0,
          },
        ]}
      >
        <UiText style={[styles.discNum, { fontSize: discSize * 0.46 }]}>
          {MEDAL_NUMBER[tier]}
        </UiText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  emojiContainer: {
    position: "absolute",
    top: -10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  emoji: {
    fontFamily: "System",
    textAlignVertical: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  ribbon: {
    position: "absolute",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    overflow: "hidden",
  },
  disc: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.08)",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  discNum: {
    fontFamily: "Inter_900Black",
    color: COLORS.white,
    letterSpacing: -0.5,
  },
});
