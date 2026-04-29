import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name="confirmation"
        options={{ presentation: "transparentModal", headerShown: false }}
      />
    </Stack>
  );
}
