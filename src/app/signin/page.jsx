"use client";
import React, { useState } from "react";
import { signIn } from "@/firebase/auth/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StyledWrapper, FormWrapper, Button } from "../styles";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      return console.log("signIn error:", error);
    }
    return router.push("/home");
  };

  return (
    <div>
      <StyledWrapper>
        <h1>Sign in</h1>
        <form onSubmit={handleForm}>
          <FormWrapper>
            <label htmlFor="email">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />
            </label>
            <label htmlFor="password">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </label>
            <Button type="submit">Sign in</Button>
            <Link href={"/signup"}>
              Do not have an account? <span>Register here</span>
            </Link>
          </FormWrapper>
        </form>
      </StyledWrapper>
    </div>
  );
}
