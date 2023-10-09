import Link from "next/link";
import ResendVerificationCode from "./ResendVerificationCode";
import { SignIn, SignUp } from "@/lib/types";

type AuthPromptProps = {
  promptTo: string;
  authData?: SignUp | SignIn;
};

export default function AuthPrompt({ promptTo, authData }: AuthPromptProps) {
  if (promptTo === "Sign in") {
    return (
      <div>
        Have an account? <Link href="/signin">Sign in</Link>
      </div>
    );
  }
  if (promptTo === "Sign up") {
    return (
      <div>
        No account? <Link href="/signup">Sign up</Link>
      </div>
    );
  }
  if (promptTo === "Forgot password") {
    return (
      <div>
        <Link href="/signin/reset-password">Forgot password</Link>
      </div>
    );
  }
  if (promptTo === "Resend code") {
    return (
      <div>
        Didn&apos;t receive a verification code? <ResendVerificationCode authData={authData!} /> 
      </div>
    );
  }
}
