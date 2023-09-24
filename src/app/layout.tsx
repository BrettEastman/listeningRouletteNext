"use client";
import { ReactNode } from "react";
import "./globals.css";
import AuthContextProvider from "@/context/AuthContext";

// export const metadata = {
//   title: "Listening Roulette",
//   description: "A place to share music with friends",
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
