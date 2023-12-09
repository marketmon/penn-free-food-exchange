"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Position } from "@/lib/types";

type ListingsContextType = {
  clickedListingCardPosition: Position;
  setClickedListingCardPosition: Dispatch<SetStateAction<Position>>;
  dashboardFor: string;
  setDashboardFor: Dispatch<SetStateAction<string>>;
  meadowId: string | null;
  setMeadowId: Dispatch<SetStateAction<string | null>>;
};

type ListingsProviderProps = {
  children: React.ReactNode;
};

const ListingsContext = createContext<ListingsContextType | undefined>(
  undefined
);

export function ListingsProvider({ children }: ListingsProviderProps) {
  const [meadowId, setMeadowId] = useState<string | null>(null);
  const [clickedListingCardPosition, setClickedListingCardPosition] =
    useState<Position>(null);
  const [dashboardFor, setDashboardFor] = useState("view");

  return (
    <ListingsContext.Provider
      value={{
        clickedListingCardPosition,
        setClickedListingCardPosition,
        dashboardFor,
        setDashboardFor,
        meadowId,
        setMeadowId,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const context = useContext(ListingsContext);

  if (context === undefined) {
    throw new Error(
      "useCreateListing must be used within a CreateListingProvider"
    );
  }

  return context;
}
