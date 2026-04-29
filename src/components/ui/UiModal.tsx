import { BlurTargetView, BlurView } from "expo-blur";
import { type ComponentRef, useRef } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type FullScreenModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function FullScreenModal({
  children,
  onClose,
  style,
}: FullScreenModalProps) {
  const blurRef = useRef<ComponentRef<typeof BlurTargetView> | null>(null);

  return (
    <View style={styles.container}>
      <BlurTargetView ref={blurRef} style={StyleSheet.absoluteFill} />
      <BlurView
        blurTarget={blurRef}
        style={StyleSheet.absoluteFill}
        intensity={60}
        tint="dark"
        blurMethod="dimezisBlurViewSdk31Plus"
      />
      <View style={styles.scrim} />
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close modal"
      />
      <View style={[styles.content, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  content: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
  },
});
