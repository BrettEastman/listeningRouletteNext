"use client";
import Head from "next/head";
import { ReactNode } from "react";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthContextProvider from "../context/AuthContext";
import { CurrentUserContextProvider } from "@/context/CurrentUserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { lexend_deca } from "./fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lexend_deca.className}>
      <Head>
        <title>Listening Roulette</title>
        <meta
          name="description"
          content="A place to share music with friends"
        />
      </Head>
      <body>
        <ThemeProvider>
          <AuthContextProvider>
            <CurrentUserContextProvider>
              <GlobalStyles />
              <ContainerWrapper>
                <TitleGridColumn>
                  <Header />
                </TitleGridColumn>
                <ContentWrapper>{children}</ContentWrapper>
                <FooterWrapper>
                  <Footer />
                </FooterWrapper>
                <Spacer></Spacer>
              </ContainerWrapper>
            </CurrentUserContextProvider>
          </AuthContextProvider>
        </ThemeProvider>
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
  min-height: 100dvh;
  padding: var(--spacing-md);
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-sm);
  }
`;

const TitleGridColumn = styled.header`
  grid-column: 2 / 5;
  color: var(--color-accent);
  font-size: var(--font-size-5xl);
  font-weight: 600;
  letter-spacing: 0.025em;
  padding-bottom: var(--spacing-3xl);
`;

const ContentWrapper = styled.main`
  grid-column: 3;
`;

const FooterWrapper = styled.div`
  grid-column: 2 / 5;
  margin-top: var(--spacing-4xl);
  margin-bottom: var(--spacing-3xl);
`;

const Spacer = styled.div`
  grid-column: 1 / 6;
`;
