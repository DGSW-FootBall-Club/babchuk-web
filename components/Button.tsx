interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function Button({ children, onClick, className, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-[56px] rounded-2xl text-white text-[17px] font-semibold font-pretendard transition-all
        ${disabled
          ? 'bg-[#E5E8EB] text-[#8B95A1] cursor-not-allowed'
          : 'bg-primary active:scale-[0.98] active:brightness-90 cursor-pointer'
        }
        ${className ?? ''}`}
    >
      {children}
    </button>
  )
}