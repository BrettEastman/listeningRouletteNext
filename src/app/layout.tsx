"use client";
import { ReactNode } from "react";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import Footer from "../components/Footer";
import AuthContextProvider from "../context/AuthContext";
import { lexend_deca } from "./fonts";

// export const metadata = {
//   title: "Listening Roulette",
//   description: "A place to share music with friends",
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lexend_deca.className}>
      <head />
      <body>
        <AuthContextProvider>
          <GlobalStyles />
          <Title>Listening Roulette</Title>
          {children}
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}

const Title = styled.h1`
  font-family: "Cedarville Cursive", cursive;
  color: #f1181f;
  opacity: 0.8;
  font-size: 5rem;
  letter-spacing: 2px;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: #f44a50;
  text-shadow: 1px 1px 2px black;
  padding-bottom: 4rem;
  margin-left: 1.5rem;
`;
