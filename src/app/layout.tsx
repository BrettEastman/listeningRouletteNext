"use client";
import { ReactNode } from "react";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* <h1>Fake header</h1> */}
        <AuthContextProvider>{props.children}</AuthContextProvider>
        {/* <h1>Fake footer</h1> */}
      </body>
    </html>
  );
}
