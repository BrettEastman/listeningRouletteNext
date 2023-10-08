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
  color: #f02127;
  opacity: 0.8;
  font-size: 1rem;
  text-shadow: 0.5px 0.5px 1px black;
  padding: 1rem;
  margin-top: 10rem;
`;
