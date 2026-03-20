import Image from 'next/image'
import Link from 'next/link'

const menuItems = [
  { label: '멤버', icon: '/icons/club.svg', href: '/member' },
  { label: 'MY', icon: '/icons/player.svg', href: '/myinfo' },
  { label: '매치생성', icon: '/icons/ball.svg', href: '/write' },
  { label: '공지사항', icon: '/icons/speaker.svg', href: '/announcement' },
  { label: '일정', icon: '/icons/callendar.svg', href: '/schedule' },
]

export const HomeMenu = () => {
  return (
    <div className="grid grid-cols-5 gap-2 px-4 py-4">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex flex-col items-center gap-2.5 bg-[#F8F9FB] rounded-2xl p-3 transition-all duration-150 active:scale-95 active:brightness-90"
        >
          <Image src={item.icon} alt={item.label} width={32} height={32} />
          <p className="text-xs font-rocket text-center">{item.label}</p>
        </Link>
      ))}
    </div>
  )
}