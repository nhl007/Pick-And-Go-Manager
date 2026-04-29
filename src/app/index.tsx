import { Redirect } from "expo-router";

import { EXPLORE_TAB_HREF, LOGIN_SCREEN_HREF } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

export default function Index() {
  const authHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!authHydrated) {
    return null;
  }

  return <Redirect href={isAuthenticated ? EXPLORE_TAB_HREF : LOGIN_SCREEN_HREF} />;
}
