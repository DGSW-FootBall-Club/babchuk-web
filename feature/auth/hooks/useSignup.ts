import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/feature/auth/api/authApi";

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function useSignup() {
  const router = useRouter();
  const [values, setValues] = useState({
    username: "",
    password: "",
    name: "",
    grade: "",
    room: "",
    number: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const isValid =
    values.username.length >= 4 &&
    values.password.length >= 8 &&
    values.name.length > 0 &&
    /^[1-3]$/.test(values.grade) &&
    /^\d+$/.test(values.room) &&
    /^\d+$/.test(values.number);

  const handleSignup = async () => {
    if (isLoading || !isValid) return;
    try {
      setIsLoading(true);
      const profileImage = imageFile ? await toBase64(imageFile) : undefined;
      await authApi.signup({
        username: values.username,
        password: values.password,
        name: values.name,
        grade: Number(values.grade),
        room: Number(values.room),
        number: Number(values.number),
        profileImage,
      });
      alert("가입 완료. 로그인해주세요.");
      router.replace("/login");
    } catch (e: any) {
      alert(e.response?.data?.message ?? "회원가입에 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    values,
    handleChange,
    preview,
    handleImage,
    isValid,
    isLoading,
    handleSignup,
  };
}
