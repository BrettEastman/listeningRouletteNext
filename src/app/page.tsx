"use client";
import styled from "styled-components";
import HomeLink from "../components/HomeLink";

export default function App() {
  return (
    <StyledApp>
      <h1>Welcome to Listening Roulette.</h1>
      <br />
      <h2>
        <HomeLink />
      </h2>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: inherit;
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  padding: var(--spacing-xl);
  margin-top: var(--spacing-4xl);

  h1 {
    color: var(--color-accent);
    font-size: var(--font-size-3xl);
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
  }

  h2 {
    color: var(--color-text-secondary);
    font-size: var(--font-size-xl);
  }
`;
