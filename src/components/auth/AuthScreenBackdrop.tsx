import React from "react";
import { StyleSheet, View } from "react-native";

import { RADIUS } from "@/constants/styles";

export function AuthScreenBackdrop() {
  return (
    <View style={styles.backgroundLayer}>
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />
      <View style={styles.gridDecoration} />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  blobTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(79, 70, 229, 0.15)",
  },
  blobBottom: {
    position: "absolute",
    bottom: -160,
    left: -120,
    width: 340,
    height: 340,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(34, 197, 94, 0.12)",
  },
  gridDecoration: {
    position: "absolute",
    top: "20%",
    left: "15%",
    width: 420,
    height: 420,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: "rgba(17, 24, 39, 0.04)",
  },
});
