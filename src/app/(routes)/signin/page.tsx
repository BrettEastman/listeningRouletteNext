"use client";
import { signIn } from "@/firebase/auth/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  Button,
  Form,
  InputRectangle,
  Label,
  Paragraph,
  StyledWrapper,
  Subtitle,
} from "../../styles";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signIn(email, password);
    router.push("/groups");
  };

  return (
    <StyledWrapper>
      <Subtitle>Sign in</Subtitle>
      <Form onSubmit={handleSubmit}>
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
