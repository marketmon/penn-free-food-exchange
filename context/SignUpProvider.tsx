"use client";

import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useSignUp } from "@clerk/nextjs";
import { SignUp } from "@/lib/types";

interface SignUpContextType {
  isLoaded: boolean;
  signUp: SignUp | undefined;
  setActive: ((config: { session: string }) => Promise<void>) | undefined;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  meadow: string;
  setMeadow: Dispatch<SetStateAction<string>>;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export default function SignUpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [step, setStep] = useState(1);
  const [meadow, setMeadow] = useState("");

  return (
    <SignUpContext.Provider
      value={{ isLoaded, signUp, setActive, step, setStep, meadow, setMeadow }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

export function useSignUpContext() {
  const context = useContext(SignUpContext);

  if (!context) {
    throw new Error("useSignUpContext must be used within a SignUpProvider");
  }

  return context;
}
