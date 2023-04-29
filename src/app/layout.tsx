'use client'
import { ReactNode } from 'react';
import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext'

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContextProvider>
          {props.children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
