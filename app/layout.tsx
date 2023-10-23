import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/context/QueryProvider";
import Navigation from "@/components/common/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Panbo",
  description:
    "Welcome to Panbo, the online platform dedicated to fostering a positive and caring community by connecting individuals with surplus food to those in need.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={`${inter.className} h-screen`}>
            <Navigation />
            <div className="h-[calc(100vh-40px)]">{children}</div>
          </body>
        </html>
      </ClerkProvider>
    </QueryProvider>
  );
}
