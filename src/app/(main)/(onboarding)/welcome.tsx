import { router } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";

import { UiGradientText } from "@/components/ui/UiGradientText";
import { UiSlideUpUnlock } from "@/components/ui/UiSlideUpUnlock";
import { COLORS, SPACING } from "@/constants/styles";

const OnBoard = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.gradientTextContainer}>
          <UiGradientText font="bold" size={36} color="textPrimary">
            Discover the best local eats, hangouts & authentic spot
          </UiGradientText>
          <UiSlideUpUnlock
            style={styles.button}
            onUnlock={() => {
              router.replace("/(main)/(auth)/login");
            }}
          />
        </View>
      </View>
    </>
  );
};

export default OnBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  onBoardContainer: {
    flex: 3.5,
    position: "relative",
  },
  onBoardImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logo: {
    width: 148,
    height: 40,
    position: "absolute",
    bottom: 32,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  gradientTextContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    flex: 2,
    overflow: "visible",
  },
  button: {
    marginTop: "auto",
  },
});
