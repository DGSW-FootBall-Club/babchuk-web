"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnnounceResponse } from "@/feature/announcement/types/response/announceResponse";
import { useAnnouncementActions } from "@/feature/announcement/hooks/useAnnouncementActions";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

interface AnnouncementDetailProps {
  announcement: AnnounceResponse;
  onEditingChange?: (editing: boolean) => void;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold text-muted-foreground mb-3">
      {children}
    </p>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function AnnouncementDetail({
  announcement,
  onEditingChange,
}: AnnouncementDetailProps) {
  const router = useRouter();
  const { handleDelete, handlePatch, isLoading } = useAnnouncementActions(
    announcement.id,
  );
  const [isEditing, _setIsEditing] = useState(false);
  const setIsEditing = (v: boolean) => {
    _setIsEditing(v);
    onEditingChange?.(v);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(announcement.title);
  const [content, setContent] = useState(announcement.content);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(announcement.image || "");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const image = imageFile ? await toBase64(imageFile) : announcement.image;
    await handlePatch({ title, content, image });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(announcement.title);
    setContent(announcement.content);
    setImageFile(null);
    setPreview(announcement.image || "");
    setIsEditing(false);
  };

  const onDelete = async () => {
    setMenuOpen(false);
    if (!confirm("정말 삭제하시겠어요?")) return;
    await handleDelete();
    router.back();
  };

  if (isEditing) {
    return (
      <div className="px-4 md:px-5">
        <button
          onClick={handleCancel}
          className="mt-6 mb-4 flex items-center gap-1 transition-all duration-150 active:scale-95 active:brightness-70"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="text-base font-semibold">취소</span>
        </button>

        <div className="flex flex-col gap-6">
          <Input label="제목" type="text" value={title} onChange={setTitle} />

          <div>
            <Label>내용</Label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full bg-subtle rounded-2xl px-4 py-4 text-sm text-foreground outline-none resize-none placeholder:text-placeholder focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div>
            <Label>이미지</Label>
            <label className="cursor-pointer">
              <div className="w-full aspect-video rounded-2xl bg-subtle border-2 border-dashed border-line flex items-center justify-center overflow-hidden transition-all active:scale-[0.98]">
                {preview ? (
                  <img
                    src={preview}
                    alt="미리보기"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-placeholder)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p className="text-xs text-placeholder">
                      이미지를 선택하세요
                    </p>
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

          <Button
            onClick={handleSave}
            disabled={isLoading || title.length === 0 || content.length === 0}
          >
            {isLoading ? "수정 중..." : "수정 완료"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-5">
      {announcement.image && (
        <img
          src={announcement.image}
          alt={announcement.title}
          className="w-full aspect-video object-cover object-center rounded-xl mb-6"
        />
      )}
      <div className="flex items-start justify-between mb-3">
        <h1 className="text-xl md:text-2xl font-bold text-foreground flex-1 mr-2 leading-tight">
          {announcement.title}
        </h1>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-full active:bg-muted transition-all"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="var(--color-muted-foreground)"
            >
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-9 bg-background rounded-xl shadow-lg border border-muted py-1 z-10 min-w-28">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setIsEditing(true);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-subtle transition-colors"
              >
                수정
              </button>
              <button
                onClick={onDelete}
                disabled={isLoading}
                className="w-full px-4 py-2.5 text-left text-sm text-danger hover:bg-danger-subtle transition-colors disabled:opacity-50"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <p className="text-xs text-muted-foreground">
          {formatDate(announcement.createdAt)}
        </p>
        <div className="w-0.5 h-0.5 rounded-full bg-placeholder" />
        <p className="text-xs font-medium text-muted-foreground">
          {announcement.author}
        </p>
      </div>

      <div className="w-full h-px bg-muted mb-6" />

      <p className="text-[15px] md:text-base text-body leading-7 whitespace-pre-wrap">
        {announcement.content}
      </p>
    </div>
  );
}
