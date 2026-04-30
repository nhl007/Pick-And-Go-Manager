import { router } from "expo-router";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

import { UiButton, UiButtonProps } from "./UiButton";
import { UiText } from "./UiText";

type UiHeaderProps = {
  title: string;
  leftActionProps?: UiButtonProps;
  rightActionProps?: UiButtonProps;
  rightActionIcon?: ImageSourcePropType;
  rightActionOnPress?: () => void;
};

export default function UiHeader({
  title,
  rightActionIcon,
  rightActionOnPress,
  leftActionProps,
  rightActionProps,
}: UiHeaderProps) {
  return (
    <View style={styles.container}>
      <UiButton
        width={48}
        height={48}
        radius="full"
        {...leftActionProps}
        onPress={() => {
          router.back();
        }}
        backgroundColor="whiteTertiary"
      >
        <Image source={require("@/assets/icons/arrow-left.png")} style={styles.icon} />
      </UiButton>
      <UiText size="lg" font="medium" color="black">
        {title}
      </UiText>
      {rightActionIcon && rightActionOnPress ? (
        <UiButton
          width={48}
          height={48}
          radius="full"
          {...rightActionProps}
          onPress={rightActionOnPress}
        >
          <Image source={rightActionIcon} style={styles.icon} />
        </UiButton>
      ) : (
        <View style={styles.emptyView} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 20,
    height: 20,
  },
  emptyView: {
    width: 48,
    height: 48,
  },
});
