import { Stack } from "expo-router";

function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
    </Stack>
  );
}

export default OnboardingLayout;
