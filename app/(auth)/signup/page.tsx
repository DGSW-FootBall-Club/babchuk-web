"use client";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { BackButton } from "@/components/BackButton";
import { useSignup } from "@/feature/auth/hooks/useSignup";

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

export default function SignupPage() {
  const {
    values,
    handleChange,
    preview,
    handleImage,
    isValid,
    isLoading,
    handleSignup,
  } = useSignup();

  return (
    <div className="flex flex-col min-h-screen px-6 bg-background">
      <BackButton />

      <div className="mb-6 md:mb-8">
        <p className="text-2xl md:text-3xl font-rocket">회원가입</p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <label className="cursor-pointer">
          <div className="w-18 h-18 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-line">
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl text-muted-foreground">+</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </label>
        <div>
          <p className="text-sm font-medium text-foreground">
            프로필 이미지 선택
            <span className="text-xs text-muted-foreground ml-1">(선택)</span>
          </p>
          <p className="text-xs text-muted-foreground">
            나중에 마이페이지에서 바꿀 수 있어요
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) handleSignup();
        }}
      >
        <div className="flex flex-col gap-8 mb-8">
          <Input
            label={
              <>
                아이디 (4자 이상) <Required />
              </>
            }
            type="text"
            value={values.username}
            onChange={(v) => handleChange("username", v)}
          />
          <Input
            label={
              <>
                비밀번호 (8자 이상) <Required />
              </>
            }
            type="password"
            value={values.password}
            onChange={(v) => handleChange("password", v)}
          />
          <Input
            label={
              <>
                이름 <Required />
              </>
            }
            type="text"
            value={values.name}
            onChange={(v) => handleChange("name", v)}
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label={
                <>
                  학년 <Required />
                </>
              }
              type="number"
              value={values.grade}
              onChange={(v) => handleChange("grade", v)}
              maxLength={1}
            />
            <Input
              label={
                <>
                  반 <Required />
                </>
              }
              type="number"
              value={values.room}
              onChange={(v) => handleChange("room", v)}
              maxLength={2}
            />
            <Input
              label={
                <>
                  번호 <Required />
                </>
              }
              type="number"
              value={values.number}
              onChange={(v) => handleChange("number", v)}
              maxLength={2}
            />
          </div>
        </div>

        <div className="mb-12">
          <Button type="submit" disabled={!isValid || isLoading}>
            {isLoading ? "처리 중..." : "회원가입"}
          </Button>
        </div>
      </form>
    </div>
  );
}
