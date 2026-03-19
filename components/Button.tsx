interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ children, onClick, className, disabled, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-14 rounded-2xl text-white text-[17px] font-semibold font-pretendard transition-all
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