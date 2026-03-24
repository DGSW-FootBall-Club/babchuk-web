import { UserResponse } from "@/feature/user/types/response/UserResponse";

export function PlayerAvatar({ user }: { user: UserResponse }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <img
        src={user.profileImage}
        alt={user.nickname}
        className="w-16 h-16 rounded-full object-cover bg-[#C4C9D1]"
      />
      <p className="text-sm text-[#000000] text-center font-medium">
        {user.nickname}
      </p>
    </div>
  );
}
