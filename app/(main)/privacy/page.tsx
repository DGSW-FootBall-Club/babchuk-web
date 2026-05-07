"use client";

import { BackButton } from "@/components/BackButton";
import { Header } from "@/components/Header";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="px-4 md:px-5">
        <BackButton />
      </div>
      <Header title="개인정보 처리방침" />

      <div className="px-6 md:px-8 pb-12 flex flex-col gap-6 text-foreground">
        <section>
          <p className="text-sm text-muted-foreground leading-relaxed">
            본 방침은 밥축 서비스 이용 시 수집·이용·보관되는 개인정보 처리에
            관한 사항을 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">1. 수집하는 개인정보 항목</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li>도담 계정 식별자 (publicId)</li>
            <li>학번, 이름, 학년/반/번호</li>
            <li>프로필 이미지 (도담에서 제공)</li>
            <li>사용자가 직접 입력한 정보 (성별, 축구 실력)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">2. 개인정보의 이용 목적</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li>본인 확인 및 서비스 이용 자격 검증</li>
            <li>매치 모집·참가 기능 제공</li>
            <li>이용자 간 식별 (이름, 학번 표시)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">3. 개인정보의 보관 및 파기</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            서비스 이용 종료 또는 회원 탈퇴 시 관련 법령에 따라 보관이 필요한
            정보를 제외하고 즉시 파기합니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">4. 제3자 제공</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            법령에 의한 경우를 제외하고는 사용자 동의 없이 제3자에게 개인정보를
            제공하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">5. 문의처</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            3307 김은찬 (플로우 메시지)
          </p>
        </section>

        <section>
          <p className="text-xs text-muted-foreground mt-4">
            본 방침은 2026년 5월 7일부터 적용됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
