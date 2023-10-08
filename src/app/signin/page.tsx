"use client";
import { signIn } from "@/firebase/auth/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  InputRectangle,
  Label,
  StyledWrapper,
  Paragraph,
  Subtitle,
  Form,
} from "../styles";

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
    <StyledWrapper>
      <Subtitle>Sign in</Subtitle>
      <Form onSubmit={handleForm}>
        <StyledWrapper justifyContent="space-between" gap="2rem">
          <Label htmlFor="email">
            <Paragraph>Email</Paragraph>
            <InputRectangle
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
            <InputRectangle
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </Label>
          <Button type="submit">Sign in</Button>
          <div>
            Create new account{" "}
            <Link href={"/signup"}>
              <span>here</span>
            </Link>
          </div>
        </StyledWrapper>
      </Form>
    </StyledWrapper>
  );
}
