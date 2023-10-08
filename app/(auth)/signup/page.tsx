"use client";

import { useSignUpContext } from "@/context/SignUpProvider";
import StepOne from "@/components/Auth/SignUp/StepOne";
import StepTwo from "@/components/Auth/SignUp/StepTwo";
import StepThree from "@/components/Auth/SignUp/StepThree";
import MultiStepAuthManager from "@/components/Auth/MultiStepAuthManager";

export default function Page() {
  const { isLoaded, step } = useSignUpContext();

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
