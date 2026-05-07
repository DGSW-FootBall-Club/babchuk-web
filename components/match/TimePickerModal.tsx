"use client";

import "@ncdai/react-wheel-picker/style.css";
import { useEffect, useMemo, useState } from "react";
import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@ncdai/react-wheel-picker";
import { CenterModal } from "@/components/CenterModal";
import { getKSTNow } from "@/shared/utils/time";

interface TimePickerModalProps {
  matchDate?: string;
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

export function TimePickerModal({
  matchDate,
  startTime,
  onConfirm,
  onClose,
}: TimePickerModalProps) {
  const kstNow = useMemo(() => getKSTNow(), []);
  const isToday = matchDate === kstNow.date;

  const getInitValues = () => {
    if (startTime) {
      const h = Number(startTime.split(":")[0]);
      const m = Number(startTime.split(":")[1]);
      if (isToday && (h < kstNow.h || (h === kstNow.h && m < kstNow.m))) {
        return { h: kstNow.h, m: kstNow.m };
      }
      return { h, m };
    }
    return isToday ? { h: kstNow.h, m: kstNow.m } : { h: 12, m: 0 };
  };

  const init = getInitValues();
  const [hour, setHour] = useState<number>(init.h);
  const [minute, setMinute] = useState<number>(init.m);

  const hourOptions: WheelPickerOption<number>[] = useMemo(() => {
    const start = isToday ? kstNow.h : 0;
    return Array.from({ length: 24 - start }, (_, i) => ({
      label: (start + i).toString().padStart(2, "0"),
      value: start + i,
    }));
  }, [isToday, kstNow.h]);

  const minuteOptions: WheelPickerOption<number>[] = useMemo(() => {
    const start = isToday && hour === kstNow.h ? kstNow.m : 0;
    return Array.from({ length: 60 - start }, (_, i) => ({
      label: (start + i).toString().padStart(2, "0"),
      value: start + i,
    }));
  }, [isToday, hour, kstNow.h, kstNow.m]);

  useEffect(() => {
    if (
      minuteOptions.length > 0 &&
      !minuteOptions.some((o) => o.value === minute)
    ) {
      setMinute(minuteOptions[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minuteOptions]);

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
          background: var(--color-muted);
          border-radius: 14px;
          border: none;
        }
        .rwp [data-rwp-option] {
          font-size: 18px;
          color: var(--color-placeholder);
          font-weight: 400;
          padding: 0 8px;
        }
        .rwp [data-rwp-highlight-item] {
          font-size: 22px;
          font-weight: 700;
          color: var(--color-foreground);
        }
      `}</style>

      <div className="px-6 pt-5 pb-6">
        <p className="text-base font-bold text-foreground mb-5">시간 선택</p>

        <div className="rwp flex gap-2 justify-center mb-6">
          <div className="flex-1">
            <WheelPickerWrapper>
              <WheelPicker
                options={hourOptions}
                defaultValue={init.h}
                onValueChange={(v) => setHour(v as number)}
                infinite={!isToday}
                visibleCount={12}
                optionItemHeight={44}
              />
            </WheelPickerWrapper>
          </div>

          <p className="text-2xl font-bold text-placeholder self-center">:</p>

          <div className="flex-1">
            <WheelPickerWrapper>
              <WheelPicker
                key={`minute-${hour}`}
                options={minuteOptions}
                defaultValue={
                  minuteOptions.some((o) => o.value === minute)
                    ? minute
                    : minuteOptions[0]?.value
                }
                onValueChange={(v) => setMinute(v as number)}
                infinite={!isToday || hour > kstNow.h}
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
