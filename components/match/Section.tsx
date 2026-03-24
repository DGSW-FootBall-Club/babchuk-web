interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-[#F8F9FB] rounded-2xl px-4 py-4">
      <p className="text-base font-bold text-[#191F28] mb-3">{title}</p>
      {children}
    </div>
  );
}
