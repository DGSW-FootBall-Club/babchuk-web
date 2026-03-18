"use client";

import { useEffect, useState } from "react";

interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
}

export function SlideIn({ children, delay = 0 }: SlideInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        transform: visible ? "translateX(0)" : "translateX(-120%)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, opacity 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
