import { AuthResponse } from "@/types/auth.types";

export const loginApi = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  return {
    user: { id: "1", name: "Asif", email },
    token: "mock-token",
  };
};
