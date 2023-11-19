"use client";

import { useSignUpContext } from "@/context/AuthProvider";
import StepOne from "@/components/Auth/SignUp/StepOne";
import StepTwo from "@/components/Auth/SignUp/StepTwo";
import StepThree from "@/components/Auth/SignUp/StepThree";
import MultiStepAuthManager from "@/components/Auth/MultiStepAuthManager";
import Loading from "@/components/common/Loading";

export default function Page() {
  const { isLoaded, step } = useSignUpContext();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-[350px]">
      <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
      <MultiStepAuthManager
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
