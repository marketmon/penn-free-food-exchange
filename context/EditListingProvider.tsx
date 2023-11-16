"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { CurrentListing } from "@/lib/types";

type EditListingContextType = {
  currentListing: CurrentListing;
  setCurrentListing: Dispatch<SetStateAction<CurrentListing>>;
};

const EditListingContext = createContext<EditListingContextType | undefined>(
  undefined
);

export function EditListingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentListing, setCurrentListing] = useState<CurrentListing>(null);

  return (
    <EditListingContext.Provider
      value={{
        currentListing,
        setCurrentListing,
      }}
    >
      {children}
    </EditListingContext.Provider>
  );
}

export function useEditListing() {
  const context = useContext(EditListingContext);

  if (context === undefined) {
    throw new Error("useEditListing must be used within a EditListingProvider");
  }

  return context;
}
