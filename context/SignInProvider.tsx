"use client";

import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useSignIn } from "@clerk/nextjs";

interface SignInContextType {
  isLoaded: boolean;
  signIn: any;
  setActive: ((config: { session: string }) => Promise<void>) | undefined;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const SignInContext = createContext<SignInContextType | undefined>(undefined);

export default function SignInProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [step, setStep] = useState(1);

  return (
    <SignInContext.Provider
      value={{ isLoaded, signIn, setActive, step, setStep }}
    >
      {children}
    </SignInContext.Provider>
  );
}

export function useSignInContext() {
  const context = useContext(SignInContext);

  if (!context) {
    throw new Error("useSignUpContext must be used within a SignUpProvider");
  }

  return context;
}
