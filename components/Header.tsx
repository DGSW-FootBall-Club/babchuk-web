type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="w-full h-12 md:h-15 flex items-center justify-start px-4 md:px-5">
      <p className="text-xl md:text-2xl font-rocket">{title}</p>
    </div>
  );
};