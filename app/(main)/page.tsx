"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { HomeBanner } from "@/components/home/HomeBanner";
import { HomeMenu } from "@/components/home/HomeMenu";
import { MatchList } from "@/components/match/MatchList";
import { DateFilter } from "@/components/match/DateFilter";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(todayStr());

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="밥축" />
      <div className="flex flex-col gap-4 md:gap-6 pt-2 pb-12">
        <div className="px-4 md:px-5 flex flex-col gap-4 md:gap-6">
          <HomeBanner />
          <HomeMenu />
        </div>

        <DateFilter selectedDate={selectedDate} onSelect={setSelectedDate} />

        <div className="md:px-5 mt-2 md:mt-4">
          <MatchList selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}
