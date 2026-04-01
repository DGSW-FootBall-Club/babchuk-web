"use client";

import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useCreateAnnouncement } from "@/feature/announcement/hooks/useCreateAnnouncement";

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-rocket text-[#8B95A1] mb-3">{children}</p>
  );
}

export default function CreateAnnouncementPage() {
  const { values, handleChange, handleImage, preview, isValid, isLoading, handleSubmit } =
    useCreateAnnouncement();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-5">
        <BackButton />
      </div>

      <div className="px-4 md:px-6 pt-2 pb-6 md:pb-8">
        <p className="text-2xl md:text-3xl font-rocket">공지사항 작성</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) handleSubmit();
        }}
        className="flex flex-col px-4 md:px-6 pb-16 gap-6 md:gap-8"
      >
        <Input
          label={
            <>
              제목 <Required />
            </>
          }
          type="text"
          value={values.title}
          onChange={(v) => handleChange("title", v)}
        />

        <div>
          <Label>
            내용 <Required />
          </Label>
          <textarea
            value={values.content}
            onChange={(e) => handleChange("content", e.target.value)}
            placeholder="공지사항 내용을 입력하세요"
            rows={8}
            className="w-full bg-[#F8F9FB] rounded-2xl px-4 py-4 text-sm text-[#191F28] outline-none resize-none placeholder:text-[#C4C9D1] focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <div>
          <Label>이미지</Label>
          <label className="cursor-pointer">
            <div className="w-full aspect-video rounded-2xl bg-[#F8F9FB] border-2 border-dashed border-[#E5E8EB] flex items-center justify-center overflow-hidden transition-all active:scale-[0.98]">
              {preview ? (
                <img
                  src={preview}
                  alt="미리보기"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C4C9D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p className="text-xs text-[#C4C9D1]">이미지를 선택하세요</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </div>

        <Button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? "작성 중..." : "공지사항 등록"}
        </Button>
      </form>
    </div>
  );
}
