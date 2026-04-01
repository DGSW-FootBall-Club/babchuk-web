"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { ScheduleCalendar } from "@/components/schedule/ScheduleCalendar";
import { ScheduleMatchList } from "@/components/schedule/ScheduleMatchList";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(todayStr());

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-4 md:px-5">
        <BackButton />
      </div>
      <Header title="일정" />
      <div className="flex flex-col pb-12 pt-2">
        <ScheduleCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
        <ScheduleMatchList selectedDate={selectedDate} />
      </div>
    </div>
  );
}
