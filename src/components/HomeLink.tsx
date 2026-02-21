"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/AuthContext";

// HomeLink is a link to the home page that only appears if the user is signed in, otherwise it redirects to the sign in page
export default function Homelink() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      return router.push("/signin");
    }
  }, [router, user]);

  return (
    <LinkWrapper>
      <StyledLink href="/home">Home</StyledLink>
    </LinkWrapper>
  );
}

const LinkWrapper = styled.div`
  display: inline-block;
`;

const StyledLink = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--font-size-lg);
  transition: color 0.2s ease;
  &:hover {
    color: var(--color-primary-dark);
    text-decoration: underline;
  }
`;
