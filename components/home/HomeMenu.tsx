import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "멤버", icon: "/icons/club.svg", href: "/member" },
  { label: "MY", icon: "/icons/player.svg", href: "/myinfo" },
  { label: "매치생성", icon: "/icons/ball.svg", href: "/match/create" },
  { label: "공지사항", icon: "/icons/speaker.svg", href: "/announcement" },
  { label: "일정", icon: "/icons/callendar.svg", href: "/schedule" },
];

export const HomeMenu = () => {
  return (
    <div className="grid grid-cols-5 gap-1.5 md:gap-2 md:px-4 py-3 md:py-4">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex flex-col items-center gap-1.5 md:gap-2.5 bg-[#F8F9FB] rounded-xl md:rounded-2xl p-2 md:p-3 transition-all duration-150 active:scale-95 active:brightness-90"
        >
          <Image
            src={item.icon}
            alt={item.label}
            width={24}
            height={24}
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <p className="text-[10px] md:text-xs font-rocket text-center leading-tight">
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
};
