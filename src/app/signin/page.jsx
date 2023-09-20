"use client";
import React, { useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GlobalStyles from "../../GlobalStyles.js";
import styled from "styled-components";

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
      <GlobalStyles />
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

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: inherit;
  color: #f02127;
  border: 1px solid white;
  opacity: 0.8;
  font-size: 1rem;
  text-shadow: 0.5px 0.5px 1px black;
  padding: 1rem;
  margin-top: 10rem;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: inherit;
  gap: 3rem;
  color: #f02127;
  font-size: 1rem;
  text-shadow: 0.5px 0.5px 1px black;
  padding: 1rem;
`;

const Button = styled.button`
  background-color: "#f02127";
  height: "24px";
  width: "auto";
  padding: "0px 20px";
  border-radius: "5px";
  border: "none";
  color: "#ffffff";
  font-family: "Quicksand";
  font-size: "16px";
  font-weight: "bold";
  cursor: "pointer";
  text-align: "center";
  text-decoration: "none";
  display: "inline-block";
  margin: "4px 2px";
  transition-duration: "0.4s";
  &:hover {
    background-color: #ffffff;
    color: #f02127;
  }
`;
