"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <Button onClick={() => router.push("/signup")}>Signup</Button>
      <Button onClick={() => router.push("/signin")}>Signin</Button>
    </div>
  );
}
