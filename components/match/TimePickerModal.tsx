"use client";

import "@ncdai/react-wheel-picker/style.css";
import { useState } from "react";
import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@ncdai/react-wheel-picker";
import { CenterModal } from "@/components/CenterModal";

interface TimePickerModalProps {
  startTime: string;
  onConfirm: (start: string) => void;
  onClose: () => void;
}

export const formatTime = (time: string) => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const ampm = h < 12 ? "오전" : "오후";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${ampm} ${hour}:${String(m).padStart(2, "0")}`;
};

const hourOptions: WheelPickerOption<number>[] = Array.from(
  { length: 24 },
  (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i,
  }),
);

const minuteOptions: WheelPickerOption<number>[] = Array.from(
  { length: 60 },
  (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i,
  }),
);

function getKSTNow() {
  const now = new Date();
  const kst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  return { h: kst.getHours(), m: kst.getMinutes() };
}

export function TimePickerModal({
  startTime,
  onConfirm,
  onClose,
}: TimePickerModalProps) {
  const getInitValues = () => {
    if (startTime) {
      return {
        h: Number(startTime.split(":")[0]),
        m: Number(startTime.split(":")[1]),
      };
    }
    return getKSTNow();
  };

  const { h: initH, m: initM } = getInitValues();

  const [hour, setHour] = useState<number>(initH);
  const [minute, setMinute] = useState<number>(initM);

  const handleConfirm = () => {
    onConfirm(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    );
    onClose();
  };

  return (
    <CenterModal onClose={onClose}>
      <style>{`
        .rwp [data-rwp-highlight-wrapper] {
          background: #F2F4F6;
          border-radius: 14px;
          border: none;
        }
        .rwp [data-rwp-option] {
          font-size: 18px;
          color: #C4C9D1;
          font-weight: 400;
          padding: 0 8px;
        }
        .rwp [data-rwp-highlight-item] {
          font-size: 22px;
          font-weight: 700;
          color: #191F28;
        }
      `}</style>

      <div className="px-6 pt-5 pb-6">
        <p className="text-base font-bold text-[#191F28] mb-5">
          시간 선택
        </p>

        <div className="rwp flex gap-2 justify-center mb-6">
          <div className="flex-1">
            <WheelPickerWrapper>
              <WheelPicker
                options={hourOptions}
                defaultValue={initH}
                onValueChange={(v) => setHour(v as number)}
                infinite
                visibleCount={12}
                optionItemHeight={44}
              />
            </WheelPickerWrapper>
          </div>

          <p className="text-2xl font-bold text-[#C4C9D1] self-center">:</p>

          <div className="flex-1">
            <WheelPickerWrapper>
              <WheelPicker
                options={minuteOptions}
                defaultValue={initM}
                onValueChange={(v) => setMinute(v as number)}
                infinite
                visibleCount={12}
                optionItemHeight={44}
              />
            </WheelPickerWrapper>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full py-3.5 rounded-2xl text-white font-semibold text-base transition-all duration-150 active:scale-95 active:brightness-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          선택
        </button>
      </div>
    </CenterModal>
  );
}
