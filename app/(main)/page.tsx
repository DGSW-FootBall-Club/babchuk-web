import { Header } from "@/components/Header";
import { HomeBanner } from "@/components/home/HomeBanner";
import { HomeMenu } from "@/components/home/HomeMenu";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Header title="밥축"/>
      <div className="px-6">
        <HomeBanner />
        <HomeMenu />
      </div>
    </div>
  )
}