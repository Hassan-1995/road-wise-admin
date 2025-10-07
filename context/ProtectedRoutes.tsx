"use client";
import { useAuth } from "@/context/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // allow login page without redirect
  const publicRoutes = ["/AuthPage"];

  useEffect(() => {
    if (!publicRoutes.includes(pathname) && status === "unauthenticated") {
      router.replace("/AuthPage");
    }
  }, [status, pathname, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated" && !publicRoutes.includes(pathname)) {
    return null; // don't render children (fixes the flash)
  }

  return <>{children}</>;
}
