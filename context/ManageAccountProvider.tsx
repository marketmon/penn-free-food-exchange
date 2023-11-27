"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type Section = {
  label: string;
  value: string;
  description: string;
};

type ManageAccountContextType = {
  currSection: Section;
  setCurrSection: Dispatch<SetStateAction<Section>>;
};

const ManageAccountContext = createContext<ManageAccountContextType | undefined>(
  undefined
);

export function ManageAccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currSection, setCurrSection] = useState({
    label: "Profile",
    value: "profile",
    description: "Edit your profile information",
  });

  return (
    <ManageAccountContext.Provider
      value={{
        currSection,
        setCurrSection,
      }}
    >
      {children}
    </ManageAccountContext.Provider>
  );
}

export function useManageAccount() {
  const context = useContext(ManageAccountContext);

  if (context === undefined) {
    throw new Error("useManageAccount must be used within a ManageAccountProvider");
  }

  return context;
}
