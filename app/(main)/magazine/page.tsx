import { BackButton } from "@/components/BackButton";

export default function MagazinePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">
      <div className="px-5">
        <BackButton />
      </div>

      <div className="text-center px-6 pb-6">
        <p className="text-sm text-[#8B95A1] mb-1">
          대소고 FC
        </p>
        <p className="text-xl md:text-2xl font-bold text-[#191F28] leading-tight mb-2">
          밥축 문화 가이드
        </p>
        <p className="text-sm text-[#8B95A1]">
          존중하고 격려하고 함께 즐겨요
        </p>
      </div>

      <div className="px-5 mb-6">
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            backgroundImage: "url(/icons/banner.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "clamp(250px, 60vw, 400px)",
          }}
        />
      </div>

      <div className="flex flex-col gap-3 px-5 pb-12">
        <Section title="밥축이 뭐에요?">
          <p className="text-base text-[#4B5563] font-medium leading-relaxed">
            밥축은 점심, 저녁을 먹고 남은 시간에 함께 축구를 즐갈수 있어요.{" "}
            <br />
            실력보다 즐거움을, 경쟁보다 함께하는 기쁨을 소중히 여겨요. 신청만
            하면 누구든 함께할 수 있어요!
          </p>
        </Section>

        <Section title="모두의 시간은 소중해요">
          <BulletList
            items={[
              "매치가 정시에 시작할 수 있도록 10분 전에 도착해요",
              "늦을 때는 미리 알려줘요",
            ]}
          />
        </Section>

        <Section title="이타적인 플레이를 해요">
          <BulletList
            items={[
              "긴 드리블보다 패스를 주고받으며 플레이를 만들어요",
              "모든 포지션에서 열심히 뛰어요",
            ]}
          />
        </Section>

        <Section title="실력, 성별 상관없이 모두 즐거워요">
          <BulletList
            items={[
              "실력에 상관없이 함께 플레이를 만들어요",
              "상대팀의 멋진 득점에 존중의 박수를 보내요",
              "혼자 오는 사람들이 소외되지 않도록 친분을 과도하게 드러내지 않아요",
            ]}
          />
        </Section>

        <Section title="서로를 응원하고 존중해요">
          <BulletList
            items={[
              "존댓말로 대화해요",
              "힘을 불어넣는 긍정적인 콜을 해요",
              "서로에게 지시하지 않아요",
            ]}
          />
        </Section>

        <Section title="다치지 않고 건강하게 즐겨요">
          <BulletList
            items={[
              "축구화를 신거나 운동화를 신어요",
              "파울을 하면 잠시 경기를 멈춰요",
              "위협적인 플레이(백 태클, 사람을 향한 슈팅)는 자제해요",
            ]}
          />
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F8F9FB] rounded-2xl p-5">
      <p className="text-lg font-rocket text-[#191F28] mb-3">{title}</p>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-2 text-sm text-[#4B5563] font-medium leading-relaxed"
        >
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}
