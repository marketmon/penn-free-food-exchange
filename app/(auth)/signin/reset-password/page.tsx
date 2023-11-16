"use client";

import { useSignInContext } from "@/context/AuthProvider";
import StepOne from "@/components/Auth/ResetPassword/StepOne";
import StepTwo from "@/components/Auth/ResetPassword/StepTwo";
import StepThree from "@/components/Auth/ResetPassword/StepThree";
import MultiStepAuthManager from "@/components/Auth/MultiStepAuthManager";

export default function Page() {
  const { isLoaded, step } = useSignInContext();

  return (
    <div className="flex flex-col items-center w-[350px]">
      <h1 className="text-3xl font-bold tracking-tight">Reset your password</h1>
      <MultiStepAuthManager
        isLoaded={isLoaded}
        step={step}
        stepComponents={[
          <StepOne key="step-one" />,
          <StepTwo key="step-two" />,
          <StepThree key="step-three" />,
        ]}
      />
    </div>
  );
}
