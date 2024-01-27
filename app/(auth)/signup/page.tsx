"use client";

import { useSignUpContext } from "@/context/AuthProvider";
import SignUp from "@/components/Auth/Actions/SignUp/SignUp";
import VerifyEmail from "@/components/Auth/Actions/SignUp/VerifyEmail";
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
          <SignUp key="sign-up" />,
          <VerifyEmail key="verify-email" />,
        ]}
      />
    </div>
  );
}
