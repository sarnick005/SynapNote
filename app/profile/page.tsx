"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfilePage() {
  const { user, isLoggedIn, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-6 w-[120px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return <h1>Not authorized</h1>;
  }

  return <h1>Hey {user.name}</h1>;
}
