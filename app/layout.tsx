import "./globals.css";

import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/context/QueryProvider";
import Navigation from "@/components/common/Navigation";

const Disclaimer = dynamic(() => import("@/components/Home/Disclaimer"), {
  ssr: false,
});

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Panbo",
  description:
    "Welcome to Panbo, the online platform dedicated to fostering a positive and caring community by connecting individuals with surplus food to those in need.",
  icons: {
    icon: "/favicon.ico",
  },
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
          <body className={`${nunito.className} h-dvh`}>
            <Disclaimer />
            <Navigation />
            <div className="h-[calc(100%-40px)]">{children}</div>
          </body>
        </html>
      </ClerkProvider>
    </QueryProvider>
  );
}
