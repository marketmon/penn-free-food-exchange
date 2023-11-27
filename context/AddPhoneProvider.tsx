"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type AddPhoneContextType = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

const AddPhoneContext = createContext<AddPhoneContextType | undefined>(
  undefined
);

export function AddPhoneProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);

  return (
    <AddPhoneContext.Provider
      value={{
        step,
        setStep,
      }}
    >
      {children}
    </AddPhoneContext.Provider>
  );
}

export function useAddPhone() {
  const context = useContext(AddPhoneContext);

  if (context === undefined) {
    throw new Error("useAddPhone must be used within a AddPhoneProvider");
  }

  return context;
}
