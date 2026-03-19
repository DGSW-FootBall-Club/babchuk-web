type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="w-full h-15 flex items-center justify-start px-4">
      <p className="text-2xl font-rocket">{title}</p>
    </div>
  );
};