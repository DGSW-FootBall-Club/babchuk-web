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
    <p className="text-sm font-rocket text-muted-foreground mb-3">{children}</p>
  );
}

export default function CreateAnnouncementPage() {
  const { values, handleChange, isValid, isLoading, handleSubmit } =
    useCreateAnnouncement();

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
            className="w-full bg-subtle rounded-2xl px-4 py-4 text-sm text-foreground outline-none resize-none placeholder:text-placeholder focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <Button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? "작성 중..." : "공지사항 등록"}
        </Button>
      </form>
    </div>
  );
}
