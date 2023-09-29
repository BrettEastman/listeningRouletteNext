"use client";
import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Homelink() {
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
