"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { AnnouncementList } from "@/components/announcement/AnnouncementList";

export default function AnnouncementPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-4 md:px-5">
        <BackButton />
      </div>
      <Header title="공지사항" />
      <div className="pb-12">
        <AnnouncementList />
      </div>

      <button
        onClick={() => router.push("/announcement/create")}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center active:scale-90 transition-all"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
