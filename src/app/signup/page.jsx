"use client";
import React, { useState } from "react";
import signUp from "@/firebase/auth/api";
import { useRouter } from "next/navigation";
import { StyledWrapper, FormWrapper, Button } from "../styles";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);
    if (error) {
      return console.log("signUp error:", error);
    }
    return router.push("/admin");
  };

  return (
    <div>
      <StyledWrapper>
        <h1>Sign up</h1>
        <form onSubmit={handleForm} className="form">
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
            <Button type="submit">Sign up</Button>
          </FormWrapper>
        </form>
      </StyledWrapper>
    </div>
  );
}
