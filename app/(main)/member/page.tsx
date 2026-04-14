"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/feature/user/api/userApi";
import { SkillTypeLabel, GenderTypeLabel } from "@/shared/types/Enum";
import { Header } from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { MemberSkeleton } from "@/components/member/MemberSkeleton";
import Image from "next/image";

export default function MemberPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: userApi.fetchAllUsers,
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="px-4 md:px-5">
        <BackButton />
      </div>
      <Header title="선수명단" />

      <div className="flex items-center justify-between px-5 py-4 border-b border-muted">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-subtle flex items-center justify-center overflow-hidden">
            <Image src="/icons/club.svg" alt="club" width={32} height={32} />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              대소고 FC
            </p>
            <p className="text-sm text-muted-foreground">
              대구소프트웨어마이스터고
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">총 멤버</p>
          <p className="text-lg font-bold text-foreground">
            {users?.length ?? ""}명
          </p>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="bg-background rounded-2xl overflow-hidden border border-muted">
          <div className="grid grid-cols-[1fr_60px_44px_44px] md:grid-cols-[1fr_80px_60px_60px] px-4 py-3 bg-subtle border-b border-muted">
            <p className="text-xs text-muted-foreground">이름</p>
            <p className="text-xs text-muted-foreground text-center">
              학번
            </p>
            <p className="text-xs text-muted-foreground text-center">
              실력
            </p>
            <p className="text-xs text-muted-foreground text-center">
              성별
            </p>
          </div>

          {isLoading && <MemberSkeleton />}

          {!isLoading &&
            users?.map((user, index) => (
              <div
                key={user.id}
                className={`grid grid-cols-[1fr_60px_44px_44px] md:grid-cols-[1fr_80px_60px_60px] px-4 py-3 items-center ${index !== users.length - 1 ? "border-b border-muted" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0">
                    <img
                      src={user.profileImage}
                      alt={user.nickname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {user.nickname}
                  </p>
                </div>
                <p className="text-sm text-foreground text-center">
                  {user.grade}
                </p>
                <p className="text-sm text-foreground text-center">
                  {SkillTypeLabel[user.skillType]}
                </p>
                <p className="text-sm text-foreground text-center">
                  {GenderTypeLabel[user.gender]}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
