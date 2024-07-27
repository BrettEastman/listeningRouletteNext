import { useRouter } from "next/navigation";
import { signOutOfApp } from "@/firebase/auth/api";
import styled from "styled-components";
import { auth } from "@/firebase/config";
import { Container, Stack } from "@/app/styles";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const signOutOfAppButton = () => {
    signOutOfApp();
    router.push("/");
  };

  return (
    <header>
      <Container justifyContent="space-between">
        <Link href="/home" style={{ textDecoration: "none" }}>
          <Title>Listening Roulette</Title>
        </Link>
        <Stack gap="1rem">
          <Span>{`Welcome ${auth.currentUser?.displayName}!`}</Span>
          <Button onClick={signOutOfAppButton}>Sign out</Button>
        </Stack>
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
