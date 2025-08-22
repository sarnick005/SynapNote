"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const rehydrate = useAuthStore((state) => state.rehydrate);

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  return <>{children}</>;
}
