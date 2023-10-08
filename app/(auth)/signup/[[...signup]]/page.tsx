"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import StepOne from "@/components/Auth/SignUp/StepOne";
import StepTwo from "@/components/Auth/SignUp/StepTwo";
import StepThree from "@/components/Auth/SignUp/StepThree";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [step, setStep] = useState(1);
  const [meadow, setMeadow] = useState("");

  return (
    <>
      {step === 1 && <StepOne setMeadow={setMeadow} setStep={setStep} />}
      {step === 2 && <StepTwo meadow={meadow} isLoaded={isLoaded} signUp={signUp} setStep={setStep} />}
      {step === 3 && <StepThree isLoaded={false} signUp={signUp} setActive={setActive} /> }
    </>
  );
}
