import { PhoneNumberResource } from "@clerk/types";
import { SignIn, SignUp } from "@/lib/types";
import { useEffect, useState } from "react";

type ResendVerificationCodeProps = {
  authData: SignUp | SignIn | PhoneNumberResource;
};

export default function ResendVerificationCode({
  authData,
}: ResendVerificationCodeProps) {
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setDisabled(false);
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
      } else if ("prepareVerification" in authData) {
        await authData.prepareVerification();
      }
    } catch (error: any) {
      console.log(error.errors);
    }
    setDisabled(true);
    setTimeRemaining(30);
  };

  return (
    <button
      onClick={handleResend}
      disabled={disabled}
      className={`${disabled && "text-neutral-500"}`}
    >
      Resend ({timeRemaining})
    </button>
  );
}
