import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { prismadb } from "@/lib/prismadb";
import ToastProvider from "@/providers/toast-provider";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={` ${geistMono.variable} `}>
          <ModalProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
