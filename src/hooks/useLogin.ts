import { useMutation } from "@tanstack/react-query";

import { loginApi } from "@/services/auth.services";
import { useAuthStore } from "@/store/auth.store";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),

    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
};
