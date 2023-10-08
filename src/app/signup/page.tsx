"use client";
import { signUp } from "@/firebase/auth/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Input2, Label, StyledWrapper, Paragraph } from "../styles";

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
    <StyledWrapper>
      <h1>Sign up</h1>
      <form onSubmit={handleForm}>
        <StyledWrapper justifyContent="space-between" gap="2rem">
          <Label htmlFor="email">
            <Paragraph>Email</Paragraph>
            <Input2
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </Label>
          <Label htmlFor="password">
            <Paragraph>Password</Paragraph>
            <Input2
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </Label>
          <Button type="submit">Sign up</Button>
        </StyledWrapper>
      </form>
    </StyledWrapper>
  );
}
