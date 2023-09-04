// import { AuthContextProvider } from "@/context/AuthContext";
"use client";
import Link from "next/link.js";
import GlobalStyles from "../GlobalStyles.js";
import styled from "styled-components";

export default function App() {
  return (
    <div>
      <GlobalStyles />
      <StyledApp>
        <h1>Welcome to Listening Roulette.</h1>
        <br />
        <h2>
          Enter <Link href="/admin">here</Link>
        </h2>
      </StyledApp>
    </div>
  );
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: inherit;
  color: #f02127;
  opacity: 0.8;
  font-size: 1rem;
  text-shadow: 0.5px 0.5px 1px black;
  padding: 1rem;
  margin-top: 10rem;
`;
