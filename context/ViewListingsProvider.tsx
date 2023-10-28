"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Position } from "@/lib/types";

type ViewListingsContextType = {
  clickedListingCardPosition: Position;
  setClickedListingCardPosition: Dispatch<SetStateAction<Position>>;
};

const ViewListingsContext = createContext<ViewListingsContextType | undefined>(
  undefined
);

export function ViewListingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clickedListingCardPosition, setClickedListingCardPosition] =
    useState<Position>(null);

  return (
    <ViewListingsContext.Provider
      value={{
        clickedListingCardPosition,
        setClickedListingCardPosition,
      }}
    >
      {children}
    </ViewListingsContext.Provider>
  );
}

export function useViewListings() {
  const context = useContext(ViewListingsContext);

  if (context === undefined) {
    throw new Error(
      "useCreateListing must be used within a CreateListingProvider"
    );
  }

  return context;
}
