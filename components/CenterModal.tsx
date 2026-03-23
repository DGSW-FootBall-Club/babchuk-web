'use client'

interface CenterModalProps {
  children: React.ReactNode
  onClose: () => void
}

export function CenterModal({ children, onClose }: CenterModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
        {children}
      </div>
    </div>
  )
}