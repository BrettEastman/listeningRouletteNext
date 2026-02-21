import { Container, Stack } from "@/app/styles";
import { useAuthContext } from "@/context/AuthContext";
import { signOutOfApp } from "@/firebase/auth/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function Header() {
  const router = useRouter();
  const { userName } = useCurrentUser();
  const signOutOfAppButton = () => {
    signOutOfApp();
    router.push("/signin");
  };

  const groupName = localStorage.getItem("currentGroup");

  const { user } = useAuthContext();

  return (
    <header>
      <Container $justifyContent="space-between">
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
            <Stack $gap="1rem">
              <Span>{`Welcome ${userName}!`}</Span>
              <Button onClick={signOutOfAppButton}>Sign out</Button>
            </Stack>
          </>
        )}
      </Container>
    </header>
  );
}

const Title = styled.header`
  color: var(--color-accent);
  font-size: var(--font-size-5xl);
  font-weight: 600;
  letter-spacing: 0.025em;
`;

const Span = styled.span`
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  font-weight: 500;
  letter-spacing: 0.025em;
`;

export const Button = styled.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-primary);
  font-size: var(--font-size-base);
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  letter-spacing: 0.025em;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

const NavButton = styled.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-lg);
  letter-spacing: 0.025em;
  color: var(--color-text-primary);
  background: transparent;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: var(--color-text-inverse);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;
