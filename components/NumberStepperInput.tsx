"use client";

import { useState } from "react";

interface NumberStepperInputProps {
  label: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberStepperInput({
  label,
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
}: NumberStepperInputProps) {
  const [focused, setFocused] = useState(false);
  const display = value === 0 ? "" : String(value);
  const isActive = focused || display.length > 0;

  const decrement = () => {
    const next =
      value % step === 0 ? value - step : Math.floor(value / step) * step;
    if (next >= min) onChange(next);
  };

  const increment = () => {
    const next =
      value % step === 0 ? value + step : Math.ceil(value / step) * step;
    if (next <= max) onChange(next);
  };

  const upIcon = (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 15l6-6 6 6" />
    </svg>
  );

  const downIcon = (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  return (
    <div className="relative w-full py-2">
      <label
        className="absolute transition-all duration-200 pointer-events-none select-none font-rocket"
        style={{
          top: isActive ? "0px" : "18px",
          fontSize: isActive ? "12px" : "16px",
          color: focused
            ? "var(--color-primary)"
            : "var(--color-muted-foreground)",
        }}
      >
        {label}
      </label>

      <div className="flex items-center pt-5 pb-2 gap-2">
        <input
          type="text"
          inputMode="numeric"
          value={display}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") {
              onChange(0);
              return;
            }
            const num = Number(v);
            if (!isNaN(num) && num >= 0 && num <= max) onChange(num);
          }}
          className="flex-1 bg-transparent outline-none text-base text-foreground font-rocket"
        />

        <div className="flex flex-col -gap-px">
          <button
            type="button"
            onClick={increment}
            disabled={value >= max}
            aria-label="증가"
            className="w-7 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
          >
            {upIcon}
          </button>
          <button
            type="button"
            onClick={decrement}
            disabled={value <= min}
            aria-label="감소"
            className="w-7 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
          >
            {downIcon}
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-line" />
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-200"
        style={{ width: focused ? "100%" : "0%" }}
      />
    </div>
  );
}
