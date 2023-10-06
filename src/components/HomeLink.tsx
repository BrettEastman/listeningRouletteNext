"use client";
import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

// HomeLink is a link to the home page that only appears if the user is signed in, otherwise it redirects to the sign in page
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
