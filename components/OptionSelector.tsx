interface Option<T extends string> {
  label: string;
  value: T;
}

interface OptionSelectorProps<T extends string> {
  title: string;
  options: Option<T>[];
  selected: T | null;
  onChange: (value: T) => void;
}

export function OptionSelector<T extends string>({
  title,
  options,
  selected,
  onChange,
}: OptionSelectorProps<T>) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#191F28] mb-3">
        {title}
      </p>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
      >
        {options.map((opt) => (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="h-12 rounded-xl border text-base font-medium transition-all duration-200 active:scale-95"
            style={{
              borderColor: selected === opt.value ? "var(--color-primary)" : "#E5E8EB",
              color: selected === opt.value ? "var(--color-primary)" : "#8B95A1",
              backgroundColor: selected === opt.value ? "#EEF3FF" : "white",
              transform: selected === opt.value ? "scale(1.03)" : "scale(1)",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}