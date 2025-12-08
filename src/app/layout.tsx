"use client";
import Head from "next/head";
import { ReactNode } from "react";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthContextProvider from "../context/AuthContext";
import { CurrentUserContextProvider } from "@/context/CurrentUserContext";
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
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const TitleGridColumn = styled.header`
  grid-column: 2 / 5;
  color: var(--text-color-tuscan-red);
  opacity: 0.8;
  font-size: 5rem;
  font-weight: 600;
  letter-spacing: 1px;
  padding-bottom: 4rem;
`;

const ContentWrapper = styled.main`
  grid-column: 3;
`;

const FooterWrapper = styled.div`
  grid-column: 2 / 5;
  margin-top: 8rem;
  margin-bottom: 4rem;
`;

const Spacer = styled.div`
  grid-column: 1 / 6;
`;
