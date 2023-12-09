"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Position } from "@/lib/types";

type DraggableMarkerContextType = {
  position: Position;
  setPosition: Dispatch<SetStateAction<Position>>;
  hasClickedMap: boolean;
  setHasClickedMap: Dispatch<SetStateAction<boolean>>;
  isPositionBasedOnUserLocation: boolean;
  setIsPositionBasedOnUserLocation: Dispatch<SetStateAction<boolean>>;
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
};

type DraggableMarkerProviderProps = {
  children: React.ReactNode;
};

const DraggableMarkerContext = createContext<
  DraggableMarkerContextType | undefined
>(undefined);

export function DraggableMarkerProvider({
  children,
}: DraggableMarkerProviderProps) {
  const [position, setPosition] = useState<Position>(null);
  const [hasClickedMap, setHasClickedMap] = useState(false);
  const [isPositionBasedOnUserLocation, setIsPositionBasedOnUserLocation] =
    useState(false);
  const [icon, setIcon] = useState("📍");

  return (
    <DraggableMarkerContext.Provider
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
    </DraggableMarkerContext.Provider>
  );
}

export function useDraggableMarker() {
  const context = useContext(DraggableMarkerContext);

  if (context === undefined) {
    throw new Error(
      "useDraggableMarker must be used within a DraggableMarkerContext"
    );
  }

  return context;
}
