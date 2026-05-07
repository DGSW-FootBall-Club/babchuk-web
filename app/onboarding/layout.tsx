"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/feature/user/api/userApi";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    setHasToken(!!localStorage.getItem("accessToken"));
  }, []);

  const { data: user } = useQuery({
    queryKey: ["myInfo"],
    queryFn: userApi.fetchMyInfo,
    enabled: hasToken === true,
  });

  useEffect(() => {
    if (hasToken === false) router.replace("/");
  }, [hasToken, router]);

  useEffect(() => {
    if (user && user.gender !== null && user.skillType !== null) {
      router.replace("/");
    }
  }, [user, router]);

  if (hasToken !== true) return null;
  if (user && user.gender !== null && user.skillType !== null) return null;

  return <>{children}</>;
}
