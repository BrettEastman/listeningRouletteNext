"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GlobalStyles from "../../GlobalStyles.js";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) {
      return router.push("/signin");
    }
  }, [user]);

  return (
    <div>
      <GlobalStyles />
      <h1>Only logged in users can view this page</h1>
      <Link href="/home">Home</Link>
    </div>
  );
}
