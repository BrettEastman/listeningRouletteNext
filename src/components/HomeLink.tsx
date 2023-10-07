"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

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
