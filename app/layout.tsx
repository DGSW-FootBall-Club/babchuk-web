"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/queryClient";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/Pretendard-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

const aRocket = localFont({
  src: "../public/fonts/a로케트.otf",
  variable: "--font-a-rocket",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${aRocket.variable}`}>
      <body className="font-pretendard">
        <QueryClientProvider client={queryClient}>
          <div className="max-w-240 mx-auto min-h-screen">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
