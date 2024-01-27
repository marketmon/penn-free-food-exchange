import "./globals.css";

import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { EditListingProvider } from "@/context/EditListingProvider";
import { DraggableMarkerProvider } from "@/context/DraggableMarkerProvider";
import { ListingsProvider } from "@/context/ListingsProvider";
import { EdgeStoreProvider } from "@/context/EdgeStoreProvider";
import { ListingImageProvider } from "@/context/ListingImageProvider";
import QueryProvider from "@/context/QueryProvider";
import Navigation from "@/components/common/Navigation";

const Disclaimer = dynamic(() => import("@/components/Home/Disclaimer"), {
  ssr: false,
});

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Penn Free Food Exchange",
  description:
    "Welcome to Penn Free Food Exchange, the online platform dedicated to fostering a positive and caring community by connecting individuals with surplus food to those in need.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <QueryProvider>
      <ClerkProvider>
        <ListingsProvider>
          <DraggableMarkerProvider>
            <EditListingProvider>
              <EdgeStoreProvider>
                <ListingImageProvider>
                  <html lang="en">
                    <body className={`${nunito.className} h-dvh`}>
                      <Disclaimer />
                      <Navigation />
                      <div className="h-[calc(100%-40px)]">{children}</div>
                    </body>
                  </html>
                </ListingImageProvider>
              </EdgeStoreProvider>
            </EditListingProvider>
          </DraggableMarkerProvider>
        </ListingsProvider>
      </ClerkProvider>
    </QueryProvider>
  );
}
