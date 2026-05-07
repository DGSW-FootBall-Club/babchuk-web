interface ChoiceCardProps {
  label: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

export function ChoiceCard({ label, icon, selected, onClick }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 py-5 rounded-2xl transition-all duration-200 active:scale-95"
      style={{
        borderWidth: 2,
        borderColor: selected ? "var(--color-primary)" : "var(--color-line)",
        backgroundColor: selected
          ? "var(--color-primary-subtle)"
          : "var(--color-background)",
        transform: selected ? "scale(1.03)" : "scale(1)",
      }}
    >
      <img src={icon} alt={label} width={40} height={40} />
      <p
        className="text-base font-semibold"
        style={{
          color: selected
            ? "var(--color-primary)"
            : "var(--color-muted-foreground)",
        }}
      >
        {label}
      </p>
    </button>
  );
}
