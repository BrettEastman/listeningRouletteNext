"use client";
import signUp from "@/firebase/auth/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, FormWrapper, Input2, Label, StyledWrapper } from "../styles";

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
            <Label htmlFor="email">
              <p>Email</p>
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
              <p>Password</p>
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
          </FormWrapper>
        </form>
      </StyledWrapper>
    </div>
  );
}
