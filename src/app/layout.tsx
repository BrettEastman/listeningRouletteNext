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
          <ContainerWrapper>
            <Title>Listening Roulette</Title>
            <ContentWrapper>{children}</ContentWrapper>
            <FooterWrapper>
              <Footer />
            </FooterWrapper>
            <Spacer></Spacer>
          </ContainerWrapper>
        </AuthContextProvider>
      </body>
    </html>
  );
}

const ContainerWrapper = styled.div`
  display: grid;
  grid-template-columns:
    1fr
    min(100px, 1fr)
    min(1100px, 100%)
    min(100px, 1fr)
    1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  min-height: 100dvh;
`;

const Title = styled.header`
  color: var(--text-color-tuscan-red);
  opacity: 0.8;
  grid-column: 2 / 5;
  font-size: 5rem;
  font-weight: 600;
  letter-spacing: 1px;
  padding-bottom: 4rem;
`;

const ContentWrapper = styled.main`
  grid-column: 3;
`;

const FooterWrapper = styled.div`
  margin-top: 8rem;
  margin-bottom: 4rem;
  grid-column: 2 / 5;
`;

const Spacer = styled.div`
  grid-column: 1 / 6;
`;
