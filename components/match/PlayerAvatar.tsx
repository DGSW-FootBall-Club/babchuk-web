import { UserResponse } from "@/feature/user/types/response/UserResponse";

export function PlayerAvatar({ user }: { user: UserResponse }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={user.profileImage}
        alt={user.nickname}
        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover bg-[#C4C9D1]"
      />
      <p className="text-xs md:text-sm text-[#000000] text-center font-medium">
        {user.grade} {user.nickname}
      </p>
    </div>
  );
}
