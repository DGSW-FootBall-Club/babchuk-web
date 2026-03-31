  "use client";

  import { useRouter } from "next/navigation";
  import { Input } from "@/components/Input";
  import { SlideIn } from "@/components/SlideIn";
  import { Button } from "@/components/Button";
  import { useLogin } from "@/feature/auth/hooks/useLogin";

  export default function LoginPage() {
    const router = useRouter();
    const { values, handleChange, isValid, handleLogin, isLoading } = useLogin();

    return (
      <div className="flex flex-col min-h-screen px-6 bg-white">
        <div className="flex-1 flex items-center justify-center flex-col">
          <SlideIn delay={0}>
            <p className="text-6xl md:text-[85px] font-rocket">밥축</p>
          </SlideIn>
          <SlideIn delay={0.3}>
            <p className="text-base md:text-xl font-rocket">밥먹고 축구 할 사람?</p>
          </SlideIn>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isValid) handleLogin();
          }}
        >
          <div className="flex flex-col gap-8 mb-12 p-2">
            <Input
              label="아이디"
              type="text"
              value={values.id}
              onChange={(v) => handleChange("id", v)}
            />
            <Input
              label="비밀번호"
              type="password"
              value={values.password}
              onChange={(v) => handleChange("password", v)}
            />
          </div>

          <div className="flex flex-col gap-4 mb-12">
            <Button type="submit" disabled={!isValid || isLoading}>
              {isLoading ? "로그인 하는중..." : "로그인"}
            </Button>
            <p className="text-center text-sm text-[#8B95A1]">
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
        </form>
      </div>
    );
  }
