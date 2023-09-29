"use client";
import React, { ReactNode } from "react";
import GlobalStyles from "../GlobalStyles";
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
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
