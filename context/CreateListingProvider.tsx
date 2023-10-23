"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Position } from "@/lib/types";

type CreateListingContextType = {
  position: Position;
  setPosition: Dispatch<SetStateAction<Position>>;
  hasClickedMap: boolean;
  setHasClickedMap: Dispatch<SetStateAction<boolean>>;
  isPositionBasedOnUserLocation: boolean;
  setIsPositionBasedOnUserLocation: Dispatch<SetStateAction<boolean>>;
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
};

const CreateListingContext = createContext<
  CreateListingContextType | undefined
>(undefined);

export function CreateListingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [position, setPosition] = useState<Position>(null);
  const [hasClickedMap, setHasClickedMap] = useState(false);
  const [isPositionBasedOnUserLocation, setIsPositionBasedOnUserLocation] =
    useState(false);
  const [icon, setIcon] = useState("Default pin");

  return (
    <CreateListingContext.Provider
      value={{
        position,
        setPosition,
        hasClickedMap,
        setHasClickedMap,
        isPositionBasedOnUserLocation,
        setIsPositionBasedOnUserLocation,
        icon,
        setIcon,
      }}
    >
      {children}
    </CreateListingContext.Provider>
  );
}

export function useCreateListing() {
  const context = useContext(CreateListingContext);

  if (context === undefined) {
    throw new Error(
      "useCreateListing must be used within a CreateListingProvider"
    );
  }

  return context;
}
