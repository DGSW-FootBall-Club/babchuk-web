import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/feature/auth/api/authApi";

export function useLogin() {
  const router = useRouter();
  const [values, setValues] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: "username" | "password", value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    values.username.length >= 4 && values.password.length >= 8;

  const handleLogin = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const { accessToken } = await authApi.login(values);
      localStorage.setItem("accessToken", accessToken);
      window.location.href = "/";
    } catch (e: any) {
      alert(e.response?.data?.message ?? "로그인에 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  return { values, handleChange, isValid, isLoading, handleLogin };
}
