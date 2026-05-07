import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { announcementApi } from "@/feature/announcement/api/announcementApi";

export function useCreateAnnouncement() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [values, setValues] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: "title" | "content", value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = values.title.length > 0 && values.content.length > 0;

  const handleSubmit = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await announcementApi.createAnnouncement(values);
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      router.back();
    } catch (e: any) {
      alert(e.response?.data?.message ?? "공지사항 작성에 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  return { values, handleChange, isValid, isLoading, handleSubmit };
}
