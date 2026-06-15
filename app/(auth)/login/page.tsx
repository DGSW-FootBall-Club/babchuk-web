"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { SlideIn } from "@/components/SlideIn";
import { Button } from "@/components/Button";
import { useLogin } from "@/feature/auth/hooks/useLogin";

export default function LoginPage() {
  const router = useRouter();
  const { values, handleChange, isValid, handleLogin, isLoading } = useLogin();
  const [method, setMethod] = useState<null | "self">(null);

  return (
    <div className="flex flex-col min-h-screen px-6 bg-background">
      <div className="flex-1 flex items-center justify-center flex-col">
        <SlideIn delay={0}>
          <p className="text-6xl md:text-[85px] font-rocket">밥축</p>
        </SlideIn>
        <SlideIn delay={0.3}>
          <p className="text-base md:text-xl font-rocket">밥먹고 축구 할 사람?</p>
        </SlideIn>
      </div>

      {method === null && (
        <div className="flex flex-col gap-3 mb-12 p-2">
          <button
            type="button"
            onClick={() => alert("도담 앱에서 밥축 미니앱으로 진입해주세요.")}
            className="w-full h-14 rounded-2xl bg-foreground text-background font-semibold text-base active:scale-[0.98] active:brightness-90 transition-all"
          >
            도담으로 로그인
          </button>
          <button
            type="button"
            onClick={() => setMethod("self")}
            className="w-full h-14 rounded-2xl border border-line bg-background text-foreground font-semibold text-base active:scale-[0.98] active:bg-subtle transition-all"
          >
            밥축 계정으로 로그인
          </button>
          <p className="text-center text-sm text-muted-foreground mt-2">
            계정이 없다면?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-primary font-semibold underline cursor-pointer"
            >
              회원가입
            </button>
          </p>
        </div>
      )}

      {method === "self" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isValid) handleLogin();
          }}
        >
          <div className="flex flex-col gap-8 mb-8 p-2">
            <Input
              label="아이디"
              type="text"
              value={values.username}
              onChange={(v) => handleChange("username", v)}
            />
            <Input
              label="비밀번호"
              type="password"
              value={values.password}
              onChange={(v) => handleChange("password", v)}
            />
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <Button type="submit" disabled={!isValid || isLoading}>
              {isLoading ? "로그인 하는중..." : "로그인"}
            </Button>
            <button
              type="button"
              onClick={() => setMethod(null)}
              className="text-sm text-muted-foreground py-2 active:opacity-60"
            >
              ← 다른 방식으로 로그인
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground mb-12">
            계정이 없다면?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-primary font-semibold underline cursor-pointer"
            >
              회원가입
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
