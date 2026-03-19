'use client'

import { useState } from 'react'

interface InputProps {
  label: React.ReactNode
  type: string
  value: string
  onChange: (value: string) => void
  maxLength?: number
  inputMode?: 'numeric' | 'text' | 'decimal'
}

export function Input({ label, type, value, onChange, maxLength, inputMode }: InputProps) {
  const [focused, setFocused] = useState(false)
  const [show, setShow] = useState(false)
  const isActive = focused || value.length > 0
  const isPassword = type === 'password'

  return (
    <div className="relative w-full py-2">
      <label
        className="absolute transition-all duration-200 pointer-events-none select-none font-rocket"
        style={{
          top: isActive ? '0px' : '18px',
          fontSize: isActive ? '12px' : '16px',
          color: focused ? 'var(--color-primary)' : '#8B95A1',
        }}
      >
        {label}
      </label>

      <input
        type={isPassword ? (show ? 'text' : 'password') : type === 'number' ? 'text' : type}
        inputMode={inputMode ?? (type === 'number' ? 'numeric' : undefined)}
        value={value}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none text-[16px] text-[#191F28] pt-5 pb-2 font-rocket pr-8"
      />

      {isPassword && focused && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShow(prev => !prev)}
          className="absolute right-2 bottom-5 text-[#8B95A1] active:opacity-60 transition-opacity"
        >
          {show ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B95A1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.88 9.88a3 3 0 104.24 4.24"/>
              <path d="M10.73 5.08A10.43 10.43 0 0112 5c7 0 10 7 10 7a13.16 13.16 0 01-1.67 2.68"/>
              <path d="M6.61 6.61A13.526 13.526 0 002 12s3 7 10 7a9.74 9.74 0 005.39-1.61"/>
              <line x1="2" y1="2" x2="22" y2="22"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B95A1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      )}

      <div className="absolute bottom-0 left-0 w-full h-px bg-[#E5E8EB]" />
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-200"
        style={{ width: focused ? '100%' : '0%' }}
      />
    </div>
  )
}