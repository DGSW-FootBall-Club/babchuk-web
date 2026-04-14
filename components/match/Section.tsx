interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-subtle rounded-2xl px-4 py-4">
      <p className="text-base font-bold text-foreground mb-3">{title}</p>
      {children}
    </div>
  );
}
