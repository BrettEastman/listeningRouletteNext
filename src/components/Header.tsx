import { Container, Stack } from "@/app/styles";
import { useAuthContext } from "@/context/AuthContext";
import { signOutOfApp } from "@/firebase/auth/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

export default function Header() {
  const router = useRouter();
  const signOutOfAppButton = () => {
    signOutOfApp();
    router.push("/");
  };

  const groupName = localStorage.getItem("currentGroup");

  const { user } = useAuthContext();

  return (
    <header>
      <Container justifyContent="space-between">
        <Link href="/home" style={{ textDecoration: "none" }}>
          <Title>Listening Roulette</Title>
        </Link>
        {user !== null && (
          <>
            <Link href="/groups" style={{ textDecoration: "none" }}>
              <NavButton>Groups</NavButton>
            </Link>
            <Link href={`chat/${groupName}`} style={{ textDecoration: "none" }}>
              <NavButton>ChatRoom</NavButton>
            </Link>
            <Stack gap="1rem">
              <Span>{`Welcome ${user.displayName}!`}</Span>
              <Button onClick={signOutOfAppButton}>Sign out</Button>
            </Stack>
          </>
        )}
      </Container>
    </header>
  );
}

const Title = styled.header`
  color: var(--text-color-tuscan-red);
  opacity: 0.9;
  font-size: 5rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

const Span = styled.span`
  color: var(--text-color-tuscan-red);
  opacity: 0.8;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

export const Button = styled.button`
  padding: 0.5rem;
  color: var(--text-color-light);
  border: 0.5px solid white;
  font-size: 1rem;
  border-radius: 20px;
  background: transparent;
  letter-spacing: 2px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  cursor: pointer;
  transition: 0.2s all;
  :hover {
    box-shadow: none;
    color: hsla(204deg 90% 66% / 0.9);
    background: radial-gradient(
      hsl(358deg 99% 84% /0.3),
      hsl(358deg 99% 64% /0.3)
    );
  }
`;

const NavButton = styled.button`
  padding: 1.5rem;
  font-size: 1.5rem;
  letter-spacing: 2px;
  color: var(--text-color-tuscan-red-dark);
  background: transparent;
  border-radius: 50%;
  border: none;
  transition: all 0.4s ease-out;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  cursor: pointer;
  :hover {
    border: 0.5px solid white;
    background: radial-gradient(
      hsl(358deg 99% 84% /0.3),
      hsl(358deg 99% 64% /0.3)
    );
    box-shadow: none;
    color: hsla(204deg 90% 66% / 0.9);
  }
`;
