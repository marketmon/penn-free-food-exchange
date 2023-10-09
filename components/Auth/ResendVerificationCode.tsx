import { SignIn, SignUp } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ResendVerificationCode({
  authData,
}: {
  authData: SignUp | SignIn;
}) {
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setIsDisabled(false);
    }
  }, [timeRemaining]);

  const handleResend = async () => {
    try {
      if ("prepareEmailAddressVerification" in authData) {
        await authData.prepareEmailAddressVerification({
          strategy: "email_code",
        });
      } else if ("prepareFirstFactor" in authData && "identifier" in authData) {
        await authData.create({
          strategy: "reset_password_email_code",
          identifier: authData.identifier as string,
        });
      }
    } catch (error: any) {
      // TODO: show this on UI later
      console.log(error.errors);
    }
    setIsDisabled(true);
    setTimeRemaining(30);
  };

  return (
    <button onClick={handleResend} disabled={isDisabled}>
      Resend ({timeRemaining})
    </button>
  );
}
