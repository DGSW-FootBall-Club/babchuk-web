import { UserResponse } from "@/feature/user/types/response/UserResponse";
import { ProfileImage } from "@/components/ProfileImage";

export function PlayerAvatar({ user }: { user: UserResponse }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <ProfileImage
        src={user.profileImage}
        alt={user.name}
        className="w-12 h-12 md:w-16 md:h-16 rounded-full"
      />
      <p className="text-xs md:text-sm text-foreground text-center font-medium">
        {user.studentId} {user.name}
      </p>
    </div>
  );
}
