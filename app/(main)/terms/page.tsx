"use client";

import { BackButton } from "@/components/BackButton";
import { Header } from "@/components/Header";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="px-4 md:px-5">
        <BackButton />
      </div>
      <Header title="이용약관" />

      <div className="px-6 md:px-8 pb-12 flex flex-col gap-6 text-foreground">
        <section>
          <p className="text-sm text-muted-foreground leading-relaxed">
            본 약관은 밥축 서비스 이용에 관한 제반 사항을 규정합니다. 서비스를
            이용함으로써 본 약관에 동의한 것으로 간주됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">제1조 (목적)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            본 약관은 대구소프트웨어마이스터고등학교 축구 동아리 “밥축”이
            제공하는 매치 모집 서비스(이하 “서비스”)의 이용 조건과 절차,
            이용자와 운영자의 권리·의무 등을 정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">제2조 (이용 자격)</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li>본 서비스는 도담(DAuth) 인증을 통해 학생 계정으로만 이용할 수 있습니다.</li>
            <li>교직원 및 외부 사용자는 이용이 제한될 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">제3조 (서비스의 제공)</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li>매치 모집 및 참가 신청</li>
            <li>선수 명단 조회</li>
            <li>공지사항 열람</li>
            <li>기타 운영자가 정하는 부가 서비스</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">제4조 (이용자의 의무)</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li>타 이용자에 대한 비방, 욕설, 차별적 발언 금지</li>
            <li>매치 신청 후 정당한 사유 없이 무단 불참하지 않을 것</li>
            <li>본인의 정보를 정확하게 입력하고 관리할 책임</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">제5조 (서비스 변경 및 중단)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            운영자는 학교 일정, 시스템 점검, 기술적 사유 등에 따라 서비스의
            전부 또는 일부를 변경하거나 중단할 수 있으며, 사전 공지가 어려운
            경우 사후에 안내할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">제6조 (책임의 제한)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            매치 진행 중 발생한 부상, 분쟁, 분실 등에 대한 1차적 책임은 해당
            이용자에게 있으며, 운영자는 고의 또는 중대한 과실이 없는 한 책임을
            지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">제7조 (약관의 변경)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            본 약관은 필요에 따라 개정될 수 있으며, 변경 시 서비스 내 공지를
            통해 안내합니다.
          </p>
        </section>

        <section>
          <p className="text-xs text-muted-foreground mt-4">
            본 약관은 2026년 5월 7일부터 적용됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
