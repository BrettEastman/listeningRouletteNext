"use client";
import { signUp } from "@/firebase/auth/api";
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
import styled from "styled-components";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signUp(email, password, `${firstName} ${lastName}`);
    router.push("/groups");
  };

  return (
    <StyledWrapper>
      <Subtitle>Sign up</Subtitle>
      <Form onSubmit={handleSubmit}>
        <StyledWrapper $justifyContent="space-between" $gap="2rem">
          <Label htmlFor="firstName">
            <Paragraph>First Name</Paragraph>
            <InputRectangle
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />
          </Label>
          <Label htmlFor="lastName">
            <Paragraph>Last Name</Paragraph>
            <InputRectangle
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />
          </Label>
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
          <Button type="submit">Sign up</Button>
          <LinkText>
            Already have an account? Sign in{" "}
            <Link href={"/signin"}>
              <LinkSpan>here</LinkSpan>
            </Link>
          </LinkText>
        </StyledWrapper>
      </Form>
    </StyledWrapper>
  );
}

const LinkText = styled.div`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  text-align: center;
`;

const LinkSpan = styled.span`
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  &:hover {
    color: var(--color-primary-dark);
    text-decoration: underline;
  }
`;
