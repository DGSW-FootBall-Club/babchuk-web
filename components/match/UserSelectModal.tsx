"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/feature/user/api/userApi";
import { UserResponse } from "@/feature/user/types/response/UserResponse";
import { CenterModal } from "@/components/CenterModal";

interface UserSelectModalProps {
  title: string;
  selectedId: number;
  excludeId?: number;
  onSelect: (user: UserResponse) => void;
  onClose: () => void;
}

export function UserSelectModal({
  title,
  selectedId,
  excludeId,
  onSelect,
  onClose,
}: UserSelectModalProps) {
  const { data: users, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: userApi.fetchAllUsers,
  });

  const filtered = users?.filter((u) => u.id !== excludeId);

  return (
    <CenterModal onClose={onClose}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F2F4F6]">
        <p className="text-lg font-bold text-[#191F28]">
          {title}
        </p>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F4F6] active:brightness-90"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#191F28"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="overflow-y-auto max-h-100">
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm text-[#8B95A1]">
              불러오는 중...
            </p>
          </div>
        )}
        {filtered?.map((user, index) => (
          <button
            key={user.id}
            onClick={() => {
              onSelect(user);
              onClose();
            }}
            className={`flex items-center justify-between w-full px-5 py-3 transition-all active:brightness-95 ${
              index !== filtered.length - 1 ? "border-b border-[#F2F4F6]" : ""
            } ${selectedId === user.id ? "bg-[#EEF3FF]" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F2F4F6] overflow-hidden shrink-0">
                <img
                  src={user.profileImage}
                  alt={user.nickname}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-[#191F28]">
                  {user.nickname}
                </p>
                <p className="text-xs text-[#8B95A1]">
                  {user.grade}학번
                </p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedId === user.id
                  ? "border-primary bg-primary"
                  : "border-[#E5E8EB]"
              }`}
            >
              {selectedId === user.id && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </CenterModal>
  );
}
