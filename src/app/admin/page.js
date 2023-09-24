"use client";
import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext.tsx";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      return router.push("/signin");
    }
  }, [router, user]);

  return (
    <div>
      <Link href="/home">Home</Link>
    </div>
  );
}
