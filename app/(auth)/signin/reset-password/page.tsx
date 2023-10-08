"use client";

import { useSignInContext } from "@/context/SignInProvider";
import StepOne from "@/components/Auth/ResetPassword/StepOne";
import StepTwo from "@/components/Auth/ResetPassword/StepTwo";
import StepThree from "@/components/Auth/ResetPassword/StepThree";
import MultiStepAuthManager from "@/components/Auth/MultiStepAuthManager";

export default function Page() {
  const { isLoaded, step } = useSignInContext();

  return (
    <MultiStepAuthManager
      isLoaded={isLoaded}
      step={step}
      stepComponents={[
        <StepOne key="step-one" />,
        <StepTwo key="step-two" />,
        <StepThree key="step-three" />,
      ]}
    />
  );
}
