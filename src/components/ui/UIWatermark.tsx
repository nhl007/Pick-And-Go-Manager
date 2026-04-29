import { Image, StyleSheet, View } from "react-native";

import { UiText } from "./UiText";

const UIWatermark = () => {
  return (
    <View style={styles.container}>
      <UiText size="xs" font="medium" color="white">
        Powered by
      </UiText>
      <Image source={require("@/assets/images/watermark.png")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    left: 16,
    gap: 8,
    zIndex: 5,
  },
  logo: {
    width: 88,
    height: 24,
    objectFit: "contain",
  },
});

export default UIWatermark;
