"use client";

import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Auth, Domain } from "@/lib/types";

type AuthContextType = Auth & {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

function createAuthContext(useAuth: () => Auth, authFor: string) {
  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  function AuthProvider({ children }: AuthProviderProps) {
    const auth = useAuth();
    const [step, setStep] = useState(1);

    return (
      <AuthContext.Provider
        value={{
          ...auth,
          step,
          setStep,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
      throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return context;
  }

  return { AuthProvider, useAuthContext };
}

const { AuthProvider: SignUpProvider, useAuthContext: useSignUpContext } =
  createAuthContext(useSignUp, "signUp");

const { AuthProvider: SignInProvider, useAuthContext: useSignInContext } =
  createAuthContext(useSignIn, "signIn");

export { SignUpProvider, useSignUpContext, SignInProvider, useSignInContext };
