"use client" 

import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { SignIn, SignUp } from "@/lib/types";

type AuthType = {
  isLoaded: boolean;
  signIn?: SignIn;
  signUp?: SignUp;
  setActive: ((config: { session: string }) => Promise<void>) | undefined;
};

type AuthContextType = AuthType & {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  domain?: string;
  setDomain?: Dispatch<SetStateAction<string>>;
};

function createAuthContext(useAuth: () => AuthType, authFor: string) {
  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  function AuthProvider({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    const [step, setStep] = useState(1);
    const [domain, setDomain] = useState("");

    return (
      <AuthContext.Provider
        value={{
          ...auth,
          step,
          setStep,
          ...(authFor === "signUp" ? { domain, setDomain } : {}),
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

const {
  AuthProvider: SignUpProvider,
  useAuthContext: useSignUpContext,
} = createAuthContext(useSignUp, "signUp");

const {
  AuthProvider: SignInProvider,
  useAuthContext: useSignInContext,
} = createAuthContext(useSignIn, "signIn");

export { SignUpProvider, useSignUpContext, SignInProvider, useSignInContext };