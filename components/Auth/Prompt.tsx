import Link from "next/link";
import { PhoneNumberResource } from "@clerk/types";
import { SignIn, SignUp } from "@/lib/types";
import ResendVerificationCode from "@/components/Auth/ResendVerificationCode";

type PromptProps = {
  promptTo: string;
  authData?: SignUp | SignIn | PhoneNumberResource;
};

export default function Prompt({ promptTo, authData }: PromptProps) {
  if (promptTo === "Sign in from sign up") {
    return (
      <div className="text-center text-sm">
        Have an account? <Link href="/signin">Sign in</Link>
      </div>
    );
  }
  if (promptTo === "Sign in from reset password") {
    return (
      <div className="text-center text-sm">
        <Link href="/signin">Back to Sign In</Link>
      </div>
    );
  }
  if (promptTo === "Sign up") {
    return (
      <div className="text-center text-sm">
        No account? <Link href="/signup">Sign up</Link>
      </div>
    );
  }
  if (promptTo === "Forgot password") {
    return (
      <div className="text-sm">
        <Link href="/signin/reset-password">Forgot password</Link>
      </div>
    );
  }
  if (promptTo === "Resend code") {
    return (
      <div
        className={`${
          "prepareVerification" in authData! ? "text-left" : "text-center"
        } text-sm `}
      >
        Didn&apos;t receive a code?{" "}
        <ResendVerificationCode authData={authData!} />
      </div>
    );
  }
}
